import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/login.css'

export default function Login() {
  return (
    <div className="auth-shell">
      <div className="auth-visual" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=5c2e7c1f6b315b9b3e4f8d46d1d30f7b')" }}>
        <div className="visual-overlay">
          <div className="visual-brand">
            <div className="brand-mark">◉</div>
            <h2 className="brand-title">HiddenPaths</h2>
            <blockquote className="visual-quote">"The trail is not just a path through the mountains, but a journey through the soul of Nepal."</blockquote>
            <div className="visual-credit">— TENZING SHERPA</div>
          </div>
        </div>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-form-card">
          <h1>Welcome back</h1>
          <p className="muted">Resume your journey through the hidden paths of Nepal.</p>

          <form className="auth-form">
            <label className="form-label">Email Address</label>
            <input className="form-input" placeholder="name@example.com" type="email" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <a className="forgot-link">Forgot password?</a>
            </div>
            <input className="form-input" placeholder="••••••••" type="password" />

            <button className="primary-cta" type="button">Sign In</button>

            <div className="or-row">
              <div className="line" />
              <div className="or-text">OR</div>
              <div className="line" />
            </div>

            <button className="oauth-google" type="button">Continue with Google</button>

            <div className="auth-footer">Don't have an account? <Link to="/register">Register</Link></div>
          </form>
        </div>
      </div>
    </div>
  )
}
