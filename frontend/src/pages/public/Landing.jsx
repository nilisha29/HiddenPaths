import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import ExperienceCard from "../../components/common/ExperienceCard";
import experienceService from "../../services/experienceService";
import journalService from "../../services/journalService";
import categoryService from "../../services/categoryService";
import "../../styles/landing.css";

const heroTags = ["Food", "Culture", "Adventure", "Nature", "Workshops", "Hidden Places"];

const steps = [
  { title: "Discover", desc: "Browse through handpicked local experiences." },
  { title: "Explore Details", desc: "Read stories, view photos, and meet your host." },
  { title: "Book Instantly", desc: "Secure your spot with our simple booking system." },
  { title: "Live the Moment", desc: "Create memories that last a lifetime." },
];

const Landing = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [journals, setJournals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalExperiences, setTotalExperiences] = useState(0);

  useEffect(() => {
    experienceService.list({ sort: "rating", limit: 3 }).then((res) => {
      setExperiences(res.data.data);
      setTotalExperiences(res.data.total);
    }).catch(() => {});
    journalService.list({ limit: 3 }).then((res) => setJournals(res.data.data)).catch(() => {});
    categoryService.list().then((res) => setCategories(res.data.data)).catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore${query ? `?search=${encodeURIComponent(query)}` : ""}`);
  };

  return (
    <Layout>
      <section className="hero">
        <div className="hero-inner container">
          <span className="eyebrow hero-badge">Nepal's #1 Local Discovery Platform</span>
          <h1 className="hero-title">
            Travel that touches <br />
            <em>the soul.</em>
          </h1>
          <p className="hero-text">
            Step away from the tourist path and into the heart of local life.
            Hand-crafted journeys designed by those who call Nepal home.
          </p>

          <form onSubmit={handleSearch} className="hero-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Where to?" />
            <button type="submit" className="btn btn-primary btn-sm">Find Magic</button>
          </form>

          <div className="hero-tags">
            {heroTags.map((tag) => (
              <Link key={tag} to={`/explore?search=${encodeURIComponent(tag)}`} className="pill-tag hero-tag">
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section container">
        <div className="section-heading">
          <div>
            <h2>Popular Experiences</h2>
            <p className="text-muted">Top-rated adventures loved by our community.</p>
          </div>
          <Link to="/explore" className="auth-inline-link">View all →</Link>
        </div>

        {experiences.length > 0 ? (
          <div className="grid grid-3">
            {experiences.map((exp) => (
              <ExperienceCard key={exp._id} experience={exp} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No experiences yet — check back soon.</p>
        )}
      </section>

      <section className="intent-section">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: 40 }}>Find your path by intent</h2>
          <div className="intent-grid">
            {(categories.length > 0 ? categories : [{ name: "Adventure" }, { name: "Cultural" }, { name: "Culinary" }, { name: "Artisan" }, { name: "Wellness" }, { name: "Trekking" }]).map((c) => (
              <Link key={c.name} to={`/explore?category=${c._id || ""}`} className="intent-tile">
                <span className="intent-tile-icon">🧭</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-inner">
          <div>
            <h2>Community-powered discovery</h2>
            <p>
              We believe the best travel stories aren't found in guidebooks. They're
              lived through the eyes of the people who call this place home. HiddenPaths
              connects curious travelers with local guardians of tradition.
            </p>
            <Link to="/about" className="btn btn-outline-light">Our Story</Link>
          </div>
          <div className="stats-grid">
            {[
              { label: "Experiences", value: totalExperiences || "—" },
              { label: "Hosts", value: "84" },
              { label: "Travelers", value: "3.2k" },
              { label: "Rating", value: "4.9" },
            ].map((stat) => (
              <div key={stat.label} className="stat-card">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section container text-center">
        <h2>Your Path to Discovery</h2>
        <p className="text-muted" style={{ marginBottom: 48 }}>Simple steps to an unforgettable journey.</p>
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.title} className="step-item">
              <div className="step-circle">{step.title[0]}</div>
              <h3>{step.title}</h3>
              <p className="text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {journals.length > 0 && (
        <section className="journal-section">
          <div className="container">
            <span className="eyebrow">The Community</span>
            <div className="section-heading">
              <h2>Journal Entries</h2>
              <Link to="/journal" className="auth-inline-link">Read more →</Link>
            </div>
            <div className="grid grid-3">
              {journals.map((j) => (
                <Link key={j._id} to={`/journal/${j._id}`} className="card journal-card">
                  <p className="text-muted" style={{ fontSize: 13, marginBottom: 10 }}>{j.authorName}</p>
                  <h3 style={{ fontSize: 18, marginBottom: 8 }}>{j.title}</h3>
                  <p className="text-muted" style={{ fontSize: 14 }}>{j.content?.slice(0, 140)}...</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Landing;
