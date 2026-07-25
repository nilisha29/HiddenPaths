import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/common/Layout";
import userService from "../../services/userService";
import bookingService from "../../services/bookingService";
import { resolveImage } from "../../utils/imageUrl";
import { useToast } from "../../context/ToastContext";
import "../../styles/myBookings.css";

const TABS = [
  { key: "upcoming", label: "Upcoming", statuses: ["pending", "confirmed"] },
  { key: "past", label: "Past", statuses: ["completed"] },
  { key: "cancelled", label: "Cancelled", statuses: ["cancelled"] },
];

const MyBookings = () => {
  const toast = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [cancellingId, setCancellingId] = useState(null);

  const load = () => {
    userService.myBookings().then((res) => setBookings(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const counts = TABS.reduce((acc, tab) => {
    acc[tab.key] = bookings.filter((b) => tab.statuses.includes(b.status)).length;
    return acc;
  }, {});

  const activeTabConfig = TABS.find((t) => t.key === activeTab);
  const filtered = bookings.filter((b) => activeTabConfig.statuses.includes(b.status));

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking? This can only be done up to 48 hours before the start date.")) return;
    setCancellingId(id);
    try {
      await bookingService.cancel(id);
      toast.success("Booking cancelled.");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not cancel booking.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <Layout>
      <div className="container page-section">
        <h1 style={{ marginBottom: 8 }}>My Bookings</h1>
        <p className="text-muted" style={{ marginBottom: 32 }}>
          Manage your upcoming journeys, revisit past memories, and track your local impact.
        </p>

        <div className="booking-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`booking-tab${activeTab === tab.key ? " active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label} <span className="booking-tab-count">{counts[tab.key] || 0}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">Loading bookings...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">Nothing here yet.</div>
        ) : (
          <div className="booking-list">
            {filtered.map((b) => (
              <div key={b._id} className="card booking-list-card">
                <div className="booking-list-image">
                  <img
                    src={b.experienceId?.images?.[0] ? resolveImage(b.experienceId.images[0]) : "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=400&q=80"}
                    alt=""
                  />
                  {b.experienceId?.category?.name && (
                    <span className="booking-list-category-badge">{b.experienceId.category.name}</span>
                  )}
                </div>
                <div className="booking-list-body">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3>{b.experienceId?.title}</h3>
                      <p className="booking-list-host">Curated by {b.guideId?.name}</p>
                      <p className="text-muted" style={{ fontSize: 13 }}>📍 {b.experienceId?.location}</p>
                    </div>
                    <span className={`badge badge-${b.status === "confirmed" || b.status === "completed" ? "success" : b.status === "cancelled" ? "cancelled" : "pending"}`}>
                      {activeTabConfig.label}
                    </span>
                  </div>
                  <div className="booking-list-meta">
                    <span>📅 {new Date(b.date).toLocaleDateString()}</span>
                    <span>👥 {b.numberOfPeople} guests</span>
                    <span>NPR {b.totalPrice?.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2" style={{ marginTop: 14 }}>
                    <Link to={`/explore/${b.experienceId?._id}`} className="btn btn-primary btn-sm">View Details</Link>
                    {b.status === "completed" && !b.isReviewed && (
                      <Link to={`/explore/${b.experienceId?._id}?review=1`} className="btn btn-secondary btn-sm">Write review</Link>
                    )}
                    {["pending", "confirmed"].includes(b.status) && (
                      <button className="btn btn-danger btn-sm" disabled={cancellingId === b._id} onClick={() => handleCancel(b._id)}>
                        {cancellingId === b._id ? "Cancelling..." : "Cancel"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="reflect-section">
          <div className="reflect-text">
            <h2>Reflect on your journeys.</h2>
            <p className="text-muted">
              Your travels contribute to a global narrative of conscious exploration. Browse
              your past experiences to share your insights with the community.
            </p>
            <button className="reflect-link" onClick={() => setActiveTab("past")}>
              VIEW TRIP ARCHIVE →
            </button>
          </div>
          <div className="reflect-images">
            <img src="https://images.unsplash.com/photo-1499591934245-40b55745b905?w=400&q=60" alt="" />
            <img src="https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&q=60" alt="" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyBookings;
