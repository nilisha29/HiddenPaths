import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/onboarding.css'

const CATEGORIES = [
  { key: 'adventure', label: 'ADVENTURE', emoji: '🏔️' },
  { key: 'artisan', label: 'ARTISAN', emoji: '🏺' },
  { key: 'food', label: 'FOOD', emoji: '🍲' },
  { key: 'culture', label: 'CULTURE', emoji: '🏛️' },
  { key: 'wellness', label: 'WELLNESS', emoji: '🧘' },
  { key: 'music', label: 'MUSIC', emoji: '🥁' },
]

export default function Onboarding() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)

  const userName = state?.fullName || 'Traveler'
  const userId = state?.userId

  function toggle(key) {
    // single-select for now; if multiple allowed, change to array handling
    setSelected((prev) => (prev === key ? null : key))
  }

  async function handleStart() {
    if (!userId) return navigate('/login')
    try {
      setLoading(true)
      await axios.patch('/api/user/onboarding', { userId, intent: selected })
      navigate('/login')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="onboard-shell">
      <header className="onboard-header">
        <div style={{ letterSpacing: '0.28em', fontSize: '0.9rem' }}>H I D D E N P A T H S</div>
        <h1>Namaste, {userName}. <span>🙏</span></h1>
        <p style={{ marginTop: '0.5rem', color: '#6b5b4f' }}>Tell us what calls to you...</p>
      </header>

      <main className="onboard-main">
        <div className="onboard-card">
          <div className="intent-grid">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => toggle(c.key)}
                className={`intent-card ${selected === c.key ? 'selected' : ''}`}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{c.emoji}</div>
                <div style={{ fontSize: '0.95rem', letterSpacing: '0.12em', fontWeight: 700 }}>{c.label}</div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="onboard-footer">
        <button onClick={handleStart} disabled={loading} className="start-btn">
          {loading ? 'Saving...' : 'Start My Journey →'}
        </button>
        <div className="skip-link" onClick={() => navigate('/login')}>SKIP FOR NOW</div>
      </footer>
    </div>
  )
}
