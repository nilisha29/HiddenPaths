import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/common/DashboardLayout";
import { adminNavItems } from "../../components/admin/AdminNav";
import adminService from "../../services/adminService";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.stats().then((res) => setStats(res.data.data)).finally(() => setLoading(false));
  }, []);

  const maxCount = stats?.bookingsByMonth?.length
    ? Math.max(...stats.bookingsByMonth.map((m) => m.count))
    : 1;

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNavItems}>
      <div className="panel-header"><h1>Platform Overview</h1></div>

      {loading ? (
        <div className="loading-state">Loading stats...</div>
      ) : (
        <>
          <div className="stat-tile-grid">
            <div className="stat-tile">
              <p className="stat-tile-label">Total Users</p>
              <p className="stat-tile-value">{stats.totalUsers}</p>
            </div>
            <div className="stat-tile">
              <p className="stat-tile-label">Total Guides</p>
              <p className="stat-tile-value">{stats.totalGuides}</p>
            </div>
            <div className="stat-tile">
              <p className="stat-tile-label">Total Experiences</p>
              <p className="stat-tile-value">{stats.totalExperiences}</p>
            </div>
            <div className="stat-tile">
              <p className="stat-tile-label">Total Bookings</p>
              <p className="stat-tile-value">{stats.totalBookings}</p>
            </div>
          </div>

          <div className="stat-tile-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className="stat-tile">
              <p className="stat-tile-label">Total Revenue</p>
              <p className="stat-tile-value accent">NPR {stats.totalRevenue?.toLocaleString()}</p>
            </div>
            <div className="stat-tile">
              <p className="stat-tile-label">Pending Guide Approvals</p>
              <p className="stat-tile-value">{stats.pendingGuides}</p>
            </div>
            <div className="stat-tile">
              <p className="stat-tile-label">Pending Experience Approvals</p>
              <p className="stat-tile-value">{stats.pendingExperiences}</p>
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ marginBottom: 20 }}>Bookings — last 6 months</h3>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 160 }}>
              {stats.bookingsByMonth?.length === 0 ? (
                <p className="text-muted">No booking activity yet.</p>
              ) : (
                stats.bookingsByMonth.map((m, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                    <div
                      style={{
                        width: "100%",
                        maxWidth: 40,
                        height: `${(m.count / maxCount) * 120 + 8}px`,
                        background: "var(--color-rust)",
                        borderRadius: "6px 6px 0 0",
                      }}
                    />
                    <span style={{ fontSize: 12, marginTop: 8, color: "var(--color-ink-60)" }}>
                      {m._id.month}/{m._id.year}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
