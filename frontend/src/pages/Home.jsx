import {
  FiArrowRight,
  FiCamera,
  FiCompass,
  FiGlobe,
  FiHeart,
  FiLayers,
  FiMail,
  FiMapPin,
  FiMenu,
  FiSearch,
  FiShield,
  FiStar,
  FiSun,
  FiUsers,
} from 'react-icons/fi'
import '../styles/landing.css'
import {
  navLinks,
  hero,
  featuredExperiences,
  intentCategories,
  steps,
  journalEntries,
  stats,
} from '../mockData'

function Home() {
  return (
    <>
      {/* Header */}
      <header className="landing-topbar">
        <div className="container">
          <div className="topbar-inner">
            <div className="brand">HiddenPaths</div>
            <nav className="nav-links">
              {navLinks.map((link, index) => (
                <a key={link} className={`nav-link ${index === 0 ? 'active' : ''}`} href={`#${link.toLowerCase()}`}>
                  {link}
                </a>
              ))}
            </nav>
            <div className="auth-actions">
              <button className="btn ghost">Profile</button>
              <button className="btn ghost icon-button" style={{ display: 'none' }}><FiMenu /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')` }}>
        <div className="container">
          <div className="hero-inner">
            <div className="hero-left">
              <span className="hero-badge">{hero.badge}</span>
              <h1 className="hero-title">
                {hero.title}
                <span className="accent-italic"> {hero.accent}</span>
              </h1>
              <p className="hero-copy">{hero.subtitle}</p>

              <div className="search-row">
                <div className="search-input">
                  <FiMapPin style={{ marginRight: '8px', color: '#888' }} />
                  <input type="text" placeholder="Where to?" />
                </div>
                <button className="btn find">Find Magic</button>
              </div>

              <div className="tag-row">
                {hero.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Experiences */}
      <section className="content" id="explore">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 style={{ margin: '0' }}>Popular Experiences</h2>
              <p className="section-sub">Top-rated adventures loved by our community.</p>
            </div>
            <a href="#journal" style={{ textDecoration: 'none', color: 'var(--accent-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Explore all <FiArrowRight />
            </a>
          </div>

          <div className="experience-grid">
            {featuredExperiences.map((exp) => (
              <div key={exp.id} className="experience-card">
                <div className="experience-media" style={{ backgroundImage: `url(${exp.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <button style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FiHeart size={18} />
                  </button>
                </div>
                <div className="experience-body">
                  <p style={{ margin: '6px 0 8px', color: '#b84b2f' }}>
                    <FiStar size={14} style={{ marginRight: '4px' }} />
                    {exp.rating} ({exp.reviews})
                  </p>
                  <h3>{exp.title}</h3>
                  <p style={{ fontSize: '14px', color: '#888', margin: '4px 0 12px' }}>Hosted by {exp.host}</p>
                  <p className="price">{exp.price} per person</p>
                  <button className="btn small primary">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intent Section */}
      <section className="intent-section" id="intent">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ margin: '0' }}>Find your path by intent</h2>
            <p style={{ color: '#7b6b63', marginTop: '6px' }}>Simple categories for every kind of journey.</p>
          </div>

          <div className="intent-grid">
            {intentCategories.map(({ label, key }) => {
              const Icon = {
                adventure: FiCompass,
                cultural: FiLayers,
                culinary: FiSun,
                artisan: FiCamera,
                wellness: FiShield,
                history: FiGlobe,
              }[key] || FiCompass

              return (
                <div key={label} className="intent-card">
                  <span className="intent-icon">
                    <Icon size={24} />
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>{label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#b84b2f', margin: '0 0 12px', fontSize: '14px', fontWeight: '600' }}>Community-powered discovery</p>
              <h2 style={{ margin: '0 0 18px' }}>Why choose HiddenPaths</h2>
              <p>We believe the best travel stories aren't found in guidebooks. They're lived through the eyes of the people who call this place home. HiddenPaths connects curious travelers with local guardians of tradition.</p>
              <button className="btn ghost" style={{ marginTop: '18px', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Learn More</button>
            </div>

            <div className="stats-grid">
              {stats.map(({ value, label }) => (
                <div key={label} className="stat-card">
                  <strong>{value}</strong>
                  <span style={{ display: 'block', marginTop: '6px', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="content">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ margin: '0' }}>Your Path to Discovery</h2>
            <p style={{ color: '#7b6b63', marginTop: '6px' }}>Simple steps toward an unforgettable journey.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginTop: '24px' }}>
            {steps.map((step, idx) => (
              <div key={step.title} style={{ textAlign: 'center', padding: '24px', borderRadius: '12px', background: '#f9f6f3' }}>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--accent-dark)', marginBottom: '12px' }}>0{idx + 1}</div>
                <h3 style={{ margin: '12px 0 8px', fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                <p style={{ color: '#7b6b63', fontSize: '14px', margin: '0' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section className="content" id="journal" style={{ background: '#fbf6f2' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
            <div>
              <p style={{ color: '#7b6b63', margin: '0 0 8px', fontSize: '14px' }}>The Community</p>
              <h2 style={{ margin: '0' }}>From the Journal</h2>
            </div>
            <p style={{ color: '#7b6b63', fontSize: '15px', lineHeight: '1.6' }}>Words and stories from the travelers who walk the hidden paths with us.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {journalEntries.map((entry, idx) => (
              <article key={entry.name} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '16px', padding: '24px', background: '#fff', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: `hsl(${idx * 60}, 70%, 60%)` }} />
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>{entry.name}</strong>
                  <span style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '12px' }}>{entry.meta}</span>
                  <p style={{ margin: '0', color: '#555', fontSize: '15px', fontStyle: 'italic' }}>"{entry.quote}"</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', paddingBottom: '32px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            <div>
              <h3 style={{ margin: '0 0 12px', fontFamily: "'Playfair Display', serif" }}>HiddenPaths</h3>
              <p style={{ margin: '0', color: '#888', fontSize: '14px', lineHeight: '1.6' }}>Authentic local experiences curated for the soulful traveler.</p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <FiGlobe style={{ cursor: 'pointer' }} />
                <FiCamera style={{ cursor: 'pointer' }} />
                <FiMail style={{ cursor: 'pointer' }} />
              </div>
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px', fontSize: '14px' }}>Explore</h4>
              <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
                {['Experiences', 'Local Hosts', 'Destinations'].map(link => (
                  <li key={link} style={{ marginBottom: '8px' }}>
                    <a href="#" style={{ color: '#888', textDecoration: 'none', fontSize: '14px' }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px', fontSize: '14px' }}>Company</h4>
              <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
                {['Our Story', 'Careers', 'Privacy Policy'].map(link => (
                  <li key={link} style={{ marginBottom: '8px' }}>
                    <a href="#" style={{ color: '#888', textDecoration: 'none', fontSize: '14px' }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px', fontSize: '14px' }}>The Journal</h4>
              <p style={{ margin: '0 0 12px', color: '#888', fontSize: '14px' }}>Monthly stories from hidden paths.</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="email" placeholder="Your email" style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '13px' }} />
                <button style={{ padding: '8px 12px', background: 'var(--accent-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Subscribe</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', fontSize: '13px', color: '#888' }}>
            <span>© 2024 HiddenPaths. Made with ♥ in Nepal.</span>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#" style={{ color: '#888', textDecoration: 'none' }}>Terms of Service</a>
              <a href="#" style={{ color: '#888', textDecoration: 'none' }}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
