import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import "../../styles/welcome.css";

const INTERESTS = [
  { label: "Adventure", icon: "🏔️" },
  { label: "Artisan", icon: "🏺" },
  { label: "Culinary", icon: "🍲" },
  { label: "Cultural", icon: "🏛️" },
  { label: "Wellness", icon: "🧘" },
  { label: "Trekking", icon: "🎵" },
];

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name || "traveler";
  const [selected, setSelected] = useState([]);
  const [saving, setSaving] = useState(false);

  const toggle = (label) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const finishOnboarding = async (withInterests) => {
    setSaving(true);
    try {
      if (withInterests && selected.length > 0) {
        await authService.updateInterests(selected);
      }
    } catch {
      // non-blocking — interests can be edited later from Account settings
    } finally {
      // The registration session was only ever meant to get us through this
      // screen; per the required flow the user now logs in explicitly.
      localStorage.removeItem("hiddenpaths_token");
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-inner">
        <p className="welcome-brand">
          Hidden<span>Paths</span>
        </p>
        <h1 className="welcome-title">
          Namaste, {name}. <span aria-hidden>🙏</span>
        </h1>
        <p className="welcome-subtitle">Tell us what calls to you...</p>

        <div className="welcome-grid">
          {INTERESTS.map((interest) => (
            <button
              key={interest.label}
              type="button"
              className={`welcome-tile${selected.includes(interest.label) ? " selected" : ""}`}
              onClick={() => toggle(interest.label)}
            >
              <span className="welcome-tile-icon">{interest.icon}</span>
              <span className="welcome-tile-label">{interest.label.toUpperCase()}</span>
            </button>
          ))}
        </div>

        <button
          className="btn btn-primary welcome-cta"
          disabled={saving}
          onClick={() => finishOnboarding(true)}
        >
          {saving ? "Saving..." : "Start My Journey →"}
        </button>
        <button className="welcome-skip" onClick={() => finishOnboarding(false)} disabled={saving}>
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default Welcome;
