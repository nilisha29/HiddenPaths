import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import { guideNavItems } from "../../components/guide/GuideNav";
import { useAuth } from "../../context/AuthContext";
import guideService from "../../services/guideService";

const GuideDashboard = () => {
  const { user } = useAuth();
  const [earnings, setEarnings] = useState(null);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([guideService.myEarnings(), guideService.myBookings()])
      .then(([earningsRes, bookingsRes]) => {
        setEarnings(earningsRes.data.data);
        setPendingBookings(bookingsRes.data.data.filter((b) => b.status === "pending").slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  if (user?.guideStatus === "pending") {
    return (
      <DashboardLayout title="Guide Panel" navItems={guideNavItems}>
        <div className="empty-state" style={{ background: "var(--color-white)", borderRadius: 20, padding: 60 }}>
          <h2 style={{ marginBottom: 10 }}>Your application is under review</h2>
          <p className="text-muted">
            Our team is reviewing your guide account. You'll be notified as soon as you're
            approved and can start publishing experiences.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (user?.guideStatus === "rejected") {
    return (
      <DashboardLayout title="Guide Panel" navItems={guideNavItems}>
        <div className="empty-state" style={{ background: "var(--color-white)", borderRadius: 20, padding: 60 }}>
          <h2 style={{ marginBottom: 10 }}>Application not approved</h2>
          <p className="text-muted">Your guide application wasn't approved this time. Contact support for details.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Guide Panel" navItems={guideNavItems}>
      <div className="panel-header">
        <h1>Welcome back, {user?.name?.split(" ")[0]}</h1>
        <Link to="/guide/experiences/new" className="btn btn-primary btn-sm">+ Add Experience</Link>
      </div>

      {loading ? (
        <div className="loading-state">Loading dashboard...</div>
      ) : (
        <>
          <div className="stat-tile-grid">
            <div className="stat-tile">
              <p className="stat-tile-label">Total Earnings</p>
              <p className="stat-tile-value accent">NPR {earnings?.totalEarnings?.toLocaleString() || 0}</p>
            </div>
            <div className="stat-tile">
              <p className="stat-tile-label">Total Bookings</p>
              <p className="stat-tile-value">{earnings?.totalBookings || 0}</p>
            </div>
            <div className="stat-tile">
              <p className="stat-tile-label">Pending Requests</p>
              <p className="stat-tile-value">{earnings?.pendingBookings || 0}</p>
            </div>
            <div className="stat-tile">
              <p className="stat-tile-label">Experiences</p>
              <p className="stat-tile-value">{earnings?.totalExperiences || 0}</p>
            </div>
          </div>

          <h2 style={{ marginBottom: 16, fontSize: 20 }}>Recent Booking Requests</h2>
          {pendingBookings.length === 0 ? (
            <p className="empty-state">No pending booking requests.</p>
          ) : (
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr><th>Guest</th><th>Experience</th><th>Date</th><th>Guests</th><th></th></tr>
                </thead>
                <tbody>
                  {pendingBookings.map((b) => (
                    <tr key={b._id}>
                      <td>{b.userId?.name}</td>
                      <td>{b.experienceId?.title}</td>
                      <td>{new Date(b.date).toLocaleDateString()}</td>
                      <td>{b.numberOfPeople}</td>
                      <td><Link to="/guide/bookings" className="auth-inline-link">Review →</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default GuideDashboard;
