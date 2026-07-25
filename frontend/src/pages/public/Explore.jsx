import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../../components/common/Layout";
import ExperienceCard from "../../components/common/ExperienceCard";
import Pagination from "../../components/common/Pagination";
import experienceService from "../../services/experienceService";
import categoryService from "../../services/categoryService";
import userService from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import "../../styles/explore.css";

const DURATIONS = [
  { value: "short", label: "1-3 Days" },
  { value: "medium", label: "4-7 Days" },
  { value: "long", label: "8+ Days" },
];

const Explore = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minRating: searchParams.get("minRating") || "",
    duration: searchParams.get("duration") || "",
    search: searchParams.get("search") || "",
    sort: searchParams.get("sort") || "",
    page: Number(searchParams.get("page")) || 1,
  });

  useEffect(() => {
    categoryService.list().then((res) => setCategories(res.data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (user?.role === "user") {
      userService.wishlist().then((res) => setWishlist(res.data.data.map((e) => e._id))).catch(() => {});
    }
  }, [user]);

  const fetchExperiences = useCallback(() => {
    setLoading(true);
    const params = { ...filters, limit: 6 };
    Object.keys(params).forEach((k) => (params[k] === "" ? delete params[k] : null));

    experienceService
      .list(params)
      .then((res) => {
        setExperiences(res.data.data);
        setTotal(res.data.total);
        setPages(res.data.pages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    fetchExperiences();
    const params = {};
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params[k] = v;
    });
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const updateFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value, page: 1 }));

  const clearAll = () =>
    setFilters({ category: "", minPrice: "", maxPrice: "", minRating: "", duration: "", search: "", sort: "", page: 1 });

  const toggleWishlist = async (experienceId) => {
    if (!user) return;
    try {
      if (wishlist.includes(experienceId)) {
        await userService.removeFromWishlist(experienceId);
        setWishlist((w) => w.filter((id) => id !== experienceId));
      } else {
        await userService.addToWishlist(experienceId);
        setWishlist((w) => [...w, experienceId]);
      }
    } catch {
      /* no-op */
    }
  };

  return (
    <Layout>
      <div className="explore-hero container">
        <p className="explore-tagline">Discover Nepal's best-kept secrets.</p>
      </div>

      <div className="container explore-body">
        <aside className="explore-sidebar">
          <div className="explore-sidebar-header">
            <h3>Filters</h3>
            <button className="auth-inline-link" onClick={clearAll}>Clear all</button>
          </div>

          <div className="filter-block">
            <p className="filter-label">Categories</p>
            {categories.map((c) => (
              <label key={c._id} className="filter-checkbox">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === c._id}
                  onChange={() => updateFilter("category", c._id)}
                />
                {c.name}
              </label>
            ))}
          </div>

          <div className="filter-block">
            <p className="filter-label">Price range (NPR)</p>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => updateFilter("minPrice", e.target.value)}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => updateFilter("maxPrice", e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div className="filter-block">
            <p className="filter-label">Rating</p>
            {[4, 3, 2].map((r) => (
              <label key={r} className="filter-checkbox">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === String(r)}
                  onChange={() => updateFilter("minRating", String(r))}
                />
                {r}+ stars
              </label>
            ))}
          </div>

          <div className="filter-block">
            <p className="filter-label">Duration</p>
            <div className="duration-chips">
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  className={`chip${filters.duration === d.value ? " active" : ""}`}
                  onClick={() => updateFilter("duration", filters.duration === d.value ? "" : d.value)}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="explore-results">
          <div className="explore-results-header">
            <div>
              <h2>Curated Experiences</h2>
              <p className="text-muted">Showing {total} authentic paths through the Nepal landscape.</p>
            </div>
            <div className="explore-controls">
              <input
                type="text"
                placeholder="Search paths..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="input-field"
              />
              <select
                value={filters.sort}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="select-field"
              >
                <option value="">Most Authentic</option>
                <option value="rating">Highest Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">Loading experiences...</div>
          ) : experiences.length === 0 ? (
            <div className="empty-state">No experiences match these filters yet.</div>
          ) : (
            <div className="grid grid-3">
              {experiences.map((exp) => (
                <ExperienceCard
                  key={exp._id}
                  experience={exp}
                  onToggleWishlist={user?.role === "user" ? toggleWishlist : undefined}
                  isWishlisted={wishlist.includes(exp._id)}
                />
              ))}
            </div>
          )}

          <Pagination
            page={filters.page}
            totalPages={pages}
            onPageChange={(p) => setFilters((f) => ({ ...f, page: p }))}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
