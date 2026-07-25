import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { resolveImage } from "../../utils/imageUrl";
import "../../styles/dashboardLayout.css";

/**
 * Shared sidebar-nav dashboard shell used by both the Guide panel and the
 * Admin panel — same look/feel, different nav items passed in as props.
 */
const DashboardLayout = ({ title, navItems, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dash-shell">
      <aside className={`dash-sidebar${mobileOpen ? " open" : ""}`}>
        <Link to="/" className="dash-logo">
          Hidden<span>Paths</span>
        </Link>
        <p className="dash-role-label">{title}</p>
        <nav className="dash-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `dash-nav-link${isActive ? " active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className="dash-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="dash-logout" onClick={handleLogout}>
          Log out
        </button>
      </aside>

      <div className="dash-content">
        <header className="dash-topbar">
          <button className="dash-burger" onClick={() => setMobileOpen((v) => !v)}>☰</button>
          <div className="dash-topbar-profile">
            <span className="navbar-avatar">
              {user?.profileImage ? <img src={resolveImage(user.profileImage)} alt={user.name} /> : user?.name?.[0]}
            </span>
            <span>{user?.name}</span>
          </div>
        </header>
        <main className="dash-main">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
