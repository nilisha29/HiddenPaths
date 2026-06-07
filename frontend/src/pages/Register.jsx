import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../styles/register.css'

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (password.length < 8) return setError('Password must be at least 8 characters')
    try {
      setLoading(true)
      const res = await axios.post('/api/auth/register', { fullName, email, password })
      const { userId, fullName: name } = res.data
      // navigate to onboarding with state
      navigate('/onboarding', { state: { userId, fullName: name } })
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-shell">
      <div className="register-visual" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=5c2e7c1f6b315b9b3e4f8d46d1d30f7b')" }}>
        <div className="visual-content">
          <h2 className="brand-large">HiddenPaths</h2>
          <blockquote className="visual-quote">"The true journey of discovery consists not in seeking new landscapes, but in having new eyes."</blockquote>
          <div className="visual-foot">—— HANDCRAFTED IN THE HIMALAYAS</div>
        </div>
      </div>

      <div className="register-form">
        <div className="register-box">
          <h1>Create account</h1>
          <p>Start your journey into the unseen Nepal.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Tenzing Norgay" className="form-input" />
            </div>

            <div className="form-row">
              <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="traveler@hiddenpaths.com" type="email" className="form-input" />
            </div>

            <div className="form-row">
              <input required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" className="form-input" />
              <p className="form-note">Minimum 8 characters with one special symbol.</p>
            </div>

            {error && <div style={{ color: '#a94442', marginBottom: '10px' }}>{error}</div>}

            <button disabled={loading} type="submit" className="primary-btn">{loading ? 'Creating...' : 'Create Account'}</button>
          </form>

          <div className="divider-row">
            <div className="line" />
            <div className="text-muted">OR REGISTER WITH</div>
            <div className="line" />
          </div>

          <div className="oauth-grid">
            <button className="oauth-btn">Google</button>
            <button className="oauth-btn">Apple</button>
          </div>

          <div className="footer-links">
            Already have an account? <Link to="/login">Login here</Link>
          </div>

          <div className="footer-links" style={{ marginTop: '12px', fontSize: '0.8rem' }}>
            <a>Privacy Policy</a> · <a>Terms of Service</a> · <a>Help Center</a>
          </div>
        </div>
      </div>
    </div>
  )
}
