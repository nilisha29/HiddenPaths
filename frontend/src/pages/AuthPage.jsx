import { useState } from 'react'
import { FiEye, FiEyeOff, FiMail, FiUser } from 'react-icons/fi'

function AuthPage({ mode, onBack, onSwitch }) {
  const [showPassword, setShowPassword] = useState(false)
  const isLogin = mode === 'login'

  return (
    <main className="auth-page-shell">
      <section className={`auth-shell ${isLogin ? 'auth-shell-login' : 'auth-shell-register'}`}>
        <section className="auth-visual">
          <div className="auth-visual-overlay" />
          <div className="auth-visual-content">
            <button type="button" className="auth-brand" onClick={onBack}>
              HiddenPaths
            </button>
            <h1>{isLogin ? 'Welcome back' : 'Create account'}</h1>
            <p className="auth-quote">
              {isLogin
                ? '“The trail is not just a path through the mountains, but a journey through the soul of Nepal.”'
                : '“The true journey of discovery consists not in seeking new landscapes, but in having new eyes.”'}
            </p>
            <div className="auth-credit">
              <span />
              <span>{isLogin ? 'TENZING SHERPA' : 'HANDCRAFTED IN THE HIMALAYAS'}</span>
            </div>
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-card">
            <div className="auth-card-header">
              <h2>{isLogin ? 'Welcome back' : 'Create account'}</h2>
              <p>
                {isLogin
                  ? 'Resume your journey through the hidden paths of Nepal.'
                  : 'Start your journey into the unseen Nepal.'}
              </p>
            </div>

            <form className="auth-form">
              {!isLogin && (
                <label className="field-group">
                  <span>Full Name</span>
                  <div className="field-shell">
                    <input type="text" placeholder="Tenzing Norgay" />
                    <FiUser />
                  </div>
                </label>
              )}

              <label className="field-group">
                <span>Email Address</span>
                <div className="field-shell">
                  <input
                    type="email"
                    placeholder={isLogin ? 'name@example.com' : 'traveler@hiddenpaths.com'}
                  />
                  <FiMail />
                </div>
              </label>

              <label className="field-group">
                <div className="field-label-row">
                  <span>Password</span>
                  {isLogin && (
                    <button type="button" className="inline-link">
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="field-shell">
                  <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {!isLogin && (
                  <small className="field-hint">Minimum 8 characters with one special symbol.</small>
                )}
              </label>

              <button type="button" className="auth-submit">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>

              <div className="auth-divider">
                <span />
                <strong>{isLogin ? 'OR' : 'OR REGISTER WITH'}</strong>
                <span />
              </div>

              <div className="social-auth-row">
                <button type="button" className="social-auth-button">
                  <span className="mini-icon">◻</span>
                  Google
                </button>
                <button type="button" className="social-auth-button">
                  <span className="mini-icon">✳</span>
                  Apple
                </button>
              </div>
            </form>

            <div className="auth-footer">
              <p>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button type="button" className="inline-link strong" onClick={onSwitch}>
                  {isLogin ? 'Register here' : 'Login here'}
                </button>
              </p>
              <div className="footer-links-mini">
                <a href="#home">Privacy Policy</a>
                <a href="#home">Terms of Service</a>
                <a href="#home">Help Center</a>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

export default AuthPage
