import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import "../../styles/auth.css";

const SignIn = () => {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);
      // Same login form for all 3 roles — redirect based on what the backend returns.
      const redirectTo =
        location.state?.from?.pathname ||
        (user.role === "admin" ? "/admin" : user.role === "guide" ? "/guide/dashboard" : "/home");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
      <div className="auth-visual">
        <div className="auth-visual-overlay" />
        <div className="auth-visual-content">
          <Link to="/" className="auth-brand">
            <span className="auth-brand-icon">◈</span> HiddenPaths
          </Link>
          <blockquote className="auth-quote">
            "The trail is not just a path through the mountains, but a journey
            through the soul of Nepal."
          </blockquote>
          <p className="auth-quote-author">— Tenzing Sherpa</p>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-panel-inner">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Resume your journey through the hidden paths of Nepal.</p>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="input-field"
                placeholder="name@example.com"
              />
            </div>

            <div className="field-group">
              <div className="flex justify-between items-center">
                <label className="field-label">Password</label>
                <Link to="/forgot-password" className="auth-inline-link">
                  Forgot password?
                </Link>
              </div>
              <div className="auth-password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary btn-block">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="auth-footer-text">
            Don't have an account? <Link to="/register" className="auth-inline-link">Register</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignIn;
