import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import notificationService from "../../services/notificationService";
import { resolveImage } from "../../utils/imageUrl";
import useClickOutside from "../../hooks/useClickOutside";
import "../../styles/navbar.css";

const navLinks = [
  { to: "/explore", label: "Explore" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    notificationService
      .list()
      .then((res) => {
        setNotifications(res.data.data);
        setUnreadCount(res.data.unreadCount);
      })
      .catch(() => {});
  }, [user]);

  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(profileRef, () => setProfileOpen(false));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleOpenNotifications = async () => {
    setNotifOpen((v) => !v);
    if (!notifOpen && unreadCount > 0) {
      await notificationService.markAllRead();
      setUnreadCount(0);
    }
  };

  // Profile dropdown menu items, adapted per role. Travelers get the full
  // Profile / My Bookings / Settings menu; guide and admin get their own
  // dashboard shortcuts instead since they don't have a "My Bookings" page.
  const profileMenuItems =
    user?.role === "admin"
      ? [
          { to: "/admin", label: "Dashboard", icon: "📊" },
          { to: "/admin/settings", label: "Settings", icon: "⚙️" },
        ]
      : user?.role === "guide"
      ? [
          { to: "/guide/dashboard", label: "Dashboard", icon: "📊" },
          { to: "/guide/profile", label: "My Profile", icon: "👤" },
        ]
      : [
          { to: "/account", label: "Profile", icon: "👤" },
          { to: "/bookings", label: "My Bookings", icon: "🎫" },
          { to: "/account", label: "Settings", icon: "⚙️" },
        ];

  return (
    <header className="navbar">
      <nav className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          Hidden<span>Paths</span>
        </Link>

        <div className="navbar-links">
          <NavLink
            to={user?.role === "user" ? "/home" : "/"}
            end
            className={({ isActive }) => `navbar-link${isActive ? " active" : ""}`}
          >
            Home
          </NavLink>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar-link${isActive ? " active" : ""}`}
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <div className="navbar-notif" ref={notifRef}>
                <button className="notif-bell" onClick={handleOpenNotifications} aria-label="Notifications">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M13.7 21a2 2 0 01-3.4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  {unreadCount > 0 && <span className="notif-dot">{unreadCount}</span>}
                </button>
                {notifOpen && (
                  <div className="notif-dropdown">
                    <p className="notif-dropdown-title">Notifications</p>
                    {notifications.length === 0 ? (
                      <p className="notif-empty">You're all caught up.</p>
                    ) : (
                      notifications.slice(0, 8).map((n) => (
                        <Link
                          key={n._id}
                          to={n.link || "#"}
                          className="notif-item"
                          onClick={() => setNotifOpen(false)}
                        >
                          {n.message}
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="navbar-profile-wrap" ref={profileRef}>
                <button className="navbar-profile" onClick={() => setProfileOpen((v) => !v)}>
                  <span className="navbar-avatar">
                    {user.profileImage ? (
                      <img src={resolveImage(user.profileImage)} alt={user.name} />
                    ) : (
                      user.name?.[0]?.toUpperCase()
                    )}
                  </span>
                  <span className="navbar-name">{user.name?.split(" ")[0]}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="navbar-caret">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {profileOpen && (
                  <div className="profile-dropdown">
                    {profileMenuItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="profile-dropdown-item"
                        onClick={() => setProfileOpen(false)}
                      >
                        <span>{item.icon}</span> {item.label}
                      </Link>
                    ))}
                    <button className="profile-dropdown-item profile-dropdown-signout" onClick={handleLogout}>
                      <span>↪</span> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>

        <button className="navbar-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="navbar-mobile">
          <NavLink to={user?.role === "user" ? "/home" : "/"} end onClick={() => setMenuOpen(false)} className="navbar-link">
            Home
          </NavLink>
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="navbar-link">
              {link.label}
            </NavLink>
          ))}
          <div className="navbar-mobile-actions">
            {user ? (
              <>
                {profileMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="btn btn-secondary btn-block"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <button onClick={handleLogout} className="btn btn-dark btn-block">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary btn-block" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-block" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
