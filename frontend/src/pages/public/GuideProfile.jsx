import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../../components/common/Layout";
import { RatingLine } from "../../components/common/StarRating";
import guideService from "../../services/guideService";
import { resolveImage } from "../../utils/imageUrl";
import "../../styles/guideProfile.css";

const GuideProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    guideService
      .getProfile(id)
      .then((res) => setData(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="loading-state">Loading profile...</div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="empty-state">Guide not found.</div>
      </Layout>
    );
  }

  const { user, profile, experiences } = data;

  return (
    <Layout>
      <div className="container guide-header">
        <Link to="/explore" className="auth-inline-link">← Back to Explore</Link>

        <div className="guide-header-row">
          <div className="guide-header-info">
            <div className="guide-avatar-lg">
              {user.profileImage ? <img src={resolveImage(user.profileImage)} alt={user.name} /> : user.name?.[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1>{user.name}</h1>
                {profile?.isVerified && <span className="badge badge-success">Verified Host</span>}
              </div>
              <p className="guide-role">Local Guide</p>
              <div className="guide-stat-row">
                <span><strong>{experiences.length}</strong> Experiences</span>
                <span><strong>{profile?.numReviews || 0}</strong> Reviews</span>
                <span><strong>{profile?.yearsOfExperience || 0}</strong> Years Active</span>
              </div>
            </div>
          </div>
          <div className="guide-book-card card">
            <h3>Book with {user.name.split(" ")[0]}</h3>
            <p className="text-muted" style={{ fontSize: 13, marginBottom: 16 }}>
              {profile?.responseTime || "Responds within a day"}
            </p>
            <a href="#experiences" className="btn btn-primary btn-block" style={{ marginBottom: 10 }}>
              View Experiences
            </a>
          </div>
        </div>
      </div>

      <div className="guide-about-section">
        <div className="container guide-about-grid">
          <div>
            <h2>About {user.name.split(" ")[0]}</h2>
            <p className="detail-description">{profile?.bio || "This guide hasn't added a bio yet."}</p>

            {profile?.languages?.length > 0 && (
              <>
                <p className="filter-label" style={{ marginTop: 24 }}>Languages</p>
                <div className="tag-row">
                  {profile.languages.map((l) => (
                    <span key={l} className="pill-tag">{l}</span>
                  ))}
                </div>
              </>
            )}

            {profile?.specialties?.length > 0 && (
              <>
                <p className="filter-label" style={{ marginTop: 20 }}>Specialties</p>
                <div className="tag-row">
                  {profile.specialties.map((s) => (
                    <span key={s} className="pill-tag specialty-tag">{s}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="guide-verification card">
            <h3 style={{ marginBottom: 16 }}>Host Verification</h3>
            <ul className="verification-list">
              <li>✓ Identity Verified</li>
              {profile?.certifications?.map((c) => <li key={c}>✓ {c}</li>)}
              <li>✓ Secure Payments only through HiddenPaths</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container" id="experiences" style={{ padding: "48px 24px" }}>
        <h2 style={{ marginBottom: 24 }}>Hosted by {user.name.split(" ")[0]}</h2>
        {experiences.length === 0 ? (
          <p className="empty-state">No published experiences yet.</p>
        ) : (
          <div className="grid grid-3">
            {experiences.map((exp) => (
              <Link key={exp._id} to={`/explore/${exp._id}`} className="card guide-exp-card">
                <img
                  src={exp.images?.[0] ? resolveImage(exp.images[0]) : "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=500&q=80"}
                  alt={exp.title}
                />
                <div style={{ padding: 16 }}>
                  <p className="text-muted" style={{ fontSize: 12, textTransform: "uppercase" }}>
                    {exp.category?.name}
                  </p>
                  <h3 style={{ fontSize: 16, margin: "6px 0" }}>{exp.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="experience-card-price">NPR {exp.price?.toLocaleString()}</span>
                    <RatingLine rating={exp.rating} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GuideProfile;
