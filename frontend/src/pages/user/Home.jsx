import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import ExperienceCard from "../../components/common/ExperienceCard";
import userService from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import { resolveImage } from "../../utils/imageUrl";
import "../../styles/home.css";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    userService
      .homeSummary()
      .then((res) => setSummary(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore${query ? `?search=${encodeURIComponent(query)}` : ""}`);
  };

  return (
    <Layout>
      <section className="home-hero">
        <div className="container home-hero-inner">
          <span className="pill-tag home-greeting">Namaste, {user?.name?.split(" ")[0]}</span>
          <h1 className="home-hero-title">
            Where will your path <br /> lead <em>next?</em>
          </h1>
          <form onSubmit={handleSearch} className="hero-search home-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a secret spot..." />
            <button type="submit" className="btn btn-primary btn-sm">Find Magic</button>
          </form>
        </div>
      </section>

      <div className="container">
        {loading ? (
          <div className="loading-state">Loading your journey...</div>
        ) : (
          <>
            <div className="home-top-grid">
              {summary?.nextBooking ? (
                <div className="card next-adventure-card">
                  <div className="next-adventure-image-wrap">
                    <img
                      src={
                        summary.nextBooking.experienceId?.images?.[0]
                          ? resolveImage(summary.nextBooking.experienceId.images[0])
                          : "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=600&q=80"
                      }
                      alt=""
                    />
                    <span className="next-adventure-badge">Next Adventure</span>
                  </div>
                  <div className="next-adventure-body">
                    <span className="next-adventure-countdown">
                      📅{" "}
                      {(() => {
                        const days = Math.ceil(
                          (new Date(summary.nextBooking.date) - new Date()) / (1000 * 60 * 60 * 24)
                        );
                        return days > 0 ? `In ${days} day${days === 1 ? "" : "s"}` : "Coming up";
                      })()}
                    </span>
                    <h3>{summary.nextBooking.experienceId?.title}</h3>
                    <p className="text-muted next-adventure-desc">
                      {summary.nextBooking.experienceId?.description?.slice(0, 120) ||
                        `A journey through ${summary.nextBooking.experienceId?.location || "Nepal"}.`}
                      {summary.nextBooking.experienceId?.description?.length > 120 ? "..." : ""}
                    </p>
                    <div className="next-adventure-footer">
                      <div className="next-adventure-avatars">
                        <span className="next-adventure-avatar">
                          {summary.name?.[0]?.toUpperCase()}
                        </span>
                        {summary.nextBooking.numberOfPeople > 1 && (
                          <span className="next-adventure-avatar next-adventure-avatar-more">
                            +{summary.nextBooking.numberOfPeople - 1}
                          </span>
                        )}
                      </div>
                      <Link
                        to={`/explore/${summary.nextBooking.experienceId?._id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        View Itinerary
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card next-adventure-empty">
                  <h3>No upcoming adventures yet</h3>
                  <p className="text-muted" style={{ margin: "8px 0 16px" }}>
                    Explore experiences hand-picked by local hosts across Nepal.
                  </p>
                  <Link to="/explore" className="btn btn-primary btn-sm">Explore Experiences</Link>
                </div>
              )}

              {/* <div className="card impact-card"> */}
                              <div className="impact-card">

                <h3>Your Impact</h3>
                <p className="text-muted" style={{ fontSize: 13, margin: "6px 0 16px" }}>
                  Since joining HiddenPaths, your journeys have directly supported:
                </p>
                <div className="impact-row">
                  <span>Local Hosts Supported</span>
                  <strong>{summary?.impact?.artisanFamilies || 0}</strong>
                </div>
                <div className="impact-row">
                  <span>Days of Local Experiences</span>
                  <strong>{summary?.impact?.daysOfLocalWork || 0}</strong>
                </div>
                <div className="impact-row">
                  <span>Experiences Completed</span>
                  <strong>{summary?.impact?.experiencesCompleted || 0}</strong>
                </div>
              </div>
            </div>

            <section className="page-section">
              <div className="section-heading">
                <div>
                  <h2>Handpicked for you</h2>
                  <p className="text-muted">
                    {user?.interests?.length > 0
                      ? `Based on your interest in ${user.interests.join(", ")}.`
                      : "Top-rated experiences to get you started."}
                  </p>
                </div>
                <Link to="/explore" className="auth-inline-link">Explore all →</Link>
              </div>
              {summary?.handpicked?.length > 0 ? (
                <div className="grid grid-3">
                  {summary.handpicked.map((exp) => (
                    <ExperienceCard key={exp._id} experience={exp} />
                  ))}
                </div>
              ) : (
                <p className="empty-state">No recommendations yet — check back soon.</p>
              )}
            </section>

            {summary?.journals?.length > 0 && (
              <section className="page-section">
                <div className="section-heading">
                  <h2>From the Journal</h2>
                  <p className="text-muted" style={{ maxWidth: 360 }}>
                    Reflections and stories from the travelers who walk the hidden paths with us.
                  </p>
                </div>
                <div className="journal-preview-grid">
                  {summary.journals.map((j) => (
                    <Link key={j._id} to={`/journal/${j._id}`} className="card journal-preview-card">
                      {j.image && (
                        <img src={resolveImage(j.image)} alt={j.title} className="journal-preview-image" />
                      )}
                      <div className="journal-preview-body">
                        <span className="journal-preview-date">
                          {new Date(j.createdAt).toLocaleDateString(undefined, {
                            month: "long",
                            year: "numeric",
                          }).toUpperCase()}
                        </span>
                        <h3>{j.title}</h3>
                        <p className="journal-preview-excerpt">"{j.excerpt || j.content?.slice(0, 140)}"</p>
                        <div className="journal-preview-author">
                          <span className="journal-preview-avatar">
                            {j.authorImage ? (
                              <img src={resolveImage(j.authorImage)} alt={j.authorName} />
                            ) : (
                              j.authorName?.[0]
                            )}
                          </span>
                          <div>
                            <p className="journal-preview-author-name">{j.authorName}</p>
                            {j.visitedLocation && (
                              <p className="journal-preview-visited">{j.visitedLocation}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
