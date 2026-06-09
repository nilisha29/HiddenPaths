import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';
import '../styles/home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#FDFBF7', minHeight: '100vh' }}>
      {/* Authenticated Dashboard Header Navbar */}
      <nav className="auth-nav">
        <a href="#" onClick={() => navigate('/home')} className="logo">HiddenPaths</a>
        <div className="nav-links">
          <a href="#" onClick={() => navigate('/home')} className="active">Home</a>
          <a href="#" onClick={() => navigate('/explore')}>Explore</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <div className="user-profile-actions">
          <button className="icon-btn">🔍</button>
          <button className="icon-btn">🔔</button>
          <div className="avatar-circle" title="Rana's Profile">R</div>
        </div>
      </nav>

      {/* Hero Welcome Search Banner Section */}
      <div className="home-hero-bg" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=1920')" }}>
        <div className="home-hero-content">
          <span className="user-salutation">Welcome back, Rana</span>
          <h1>Where will your path <br />lead <span>next?</span></h1>
          
          <div className="search-pill">
            <input type="text" placeholder="Search by destination, craft or guide..." />
            <button className="btn-search" onClick={() => navigate('/explore')}>Find Magic</button>
          </div>

          <div className="pill-suggestions">
            <span className="suggestion-tag" onClick={() => navigate('/explore')}>Artisan Tours</span>
            <span className="suggestion-tag" onClick={() => navigate('/explore')}>Tea Houses</span>
            <span className="suggestion-tag" onClick={() => navigate('/explore')}>High Altitudes</span>
          </div>
        </div>
      </div>

      {/* Split Highlights Dashboard Layout Block */}
      <div className="dashboard-highlights">
        {/* Handpicked Main Showcase Card */}
        <div className="showcase-panel">
          <div className="panel-img-box">
            <img src="https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=800" alt="Annapurna Hearth" />
            <span className="category-badge">Next Adventure</span>
          </div>
          <div className="panel-body-box">
            <div>
              <span className="time-frame">⏳ In 12 days</span>
              <h2>Annapurna Hearth &amp; Heritage</h2>
              <p>A 6-day journey through the heart of Gurung villages, staying with local families and learning the art of wild honey harvesting.</p>
            </div>
            <div className="itinerary-action-row">
              <div className="avatar-stack">
                <div className="stack-avatar" style={{backgroundColor: '#cbd5e1'}}></div>
                <div className="stack-avatar" style={{backgroundColor: '#94a3b8'}}></div>
                <span style={{fontSize: '0.7rem', color: '#71717a', marginLeft: '0.5rem'}}>+2 slots</span>
              </div>
              <button className="btn-itinerary">View Itinerary</button>
            </div>
          </div>
        </div>

        {/* User Impact Tracker Meter Widget */}
        <div className="impact-widget">
          <div className="widget-header">
            <h3>Your Impact</h3>
            <span style={{fontSize: '1.2rem'}}>🌱</span>
          </div>
          <p style={{fontSize: '0.75rem', opacity: 0.8, margin: '0.25rem 0 1rem'}}>Since joining HiddenPaths, your journeys have directly supported:</p>
          
          <div>
            <div className="impact-metric-row">
              <span className="metric-label-text">Artisan Families</span>
              <span className="metric-total-value">4</span>
            </div>
            <div className="impact-metric-row">
              <span className="metric-label-text">Days of Local Work</span>
              <span className="metric-total-value">18</span>
            </div>
          </div>

          <p className="widget-note">You're making a world of difference, Rana.</p>
        </div>
      </div>

      {/* Handpicked For You Experience Grid Component */}
      <section className="section-wrapper" style={{maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem'}}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Handpicked for you</h2>
            <p className="section-subtitle">Based on your interest in mountain culture and Nepalese craftsmanship</p>
          </div>
          <a href="#" onClick={() => navigate('/explore')} className="see-all">Explore all &rarr;</a>
        </div>
        
        <div className="card-grid">
          {[
            { title: "Master Thangka Painting", host: "Maitri Lama", price: "4,500", days: "3 days", img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600", rating: "4.9 (62 reviews)" },
            { title: "Himalayan Spices Journey", host: "Chef Tshering", price: "2,000", days: "Half Day", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600", rating: "5.0 (18 reviews)" },
            { title: "Monastic Silence Retreat", host: "Nawang Rinpoche", price: "6,500", days: "5 days", img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600", rating: "4.8 (34 reviews)" }
          ].map((item, idx) => (
            <div key={idx} className="exp-card">
              <img src={item.img} alt={item.title} className="card-img" />
              <div className="card-body">
                <span className="card-rating">★ {item.rating}</span>
                <h3 className="card-title" style={{fontSize: '1.1rem', marginTop: '0.2rem'}}>{item.title}</h3>
                <p className="card-host">Hosted by {item.host} • {item.days}</p>
                <div className="card-footer">
                  <div>
                    <span style={{fontSize:'0.65rem', color:'#a1a1aa', display:'block'}}>From</span>
                    <span className="price-amount">NPR {item.price}</span><span style={{color:'#71717a', fontSize:'0.75rem'}}> / person</span>
                  </div>
                  <button className="btn-book">Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* From The Journal Section */}
      <section className="section-wrapper" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 5rem'}}>
        <div className="section-header">
          <div>
            <h2 className="section-title">From the Journal</h2>
            <p className="section-subtitle">Reflections and stories from the travelers who walk the hidden paths with us.</p>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem'}}>
          <div className="journal-showcase-card">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400" alt="Mustang" className="journal-side-img" />
            <div className="journal-main-content">
              <span className="journal-datestamp">October 2026</span>
              <h3>The Silence of the Mustang</h3>
              <p className="journal-snippet-text">"I expected the mountains to be loud with wind, but in Upper Mustang, the silence has its own voice. A voice of echoes of prayer and the slow rhythm of the ancient stone..."</p>
              <div className="journal-author-footer">
                <div className="author-circle-pic" style={{backgroundColor: '#e2e8f0'}}></div>
                <div className="author-profile-info">
                  <h5>Marcus Thorne</h5>
                  <p>Guided by Pemba Sherpa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="journal-showcase-card">
            <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400" alt="Patan weaving" className="journal-side-img" />
            <div className="journal-main-content">
              <span className="journal-datestamp">November 2026</span>
              <h3>Threads of Heritage in Patan</h3>
              <p className="journal-snippet-text">"In the narrow alleys of Patan, the rhythmic clacking of looms is the heartbeat of the city. For six generations, this family has spun heritage into silk..."</p>
              <div className="journal-author-footer">
                <div className="author-circle-pic" style={{backgroundColor: '#cbd5e1'}}></div>
                <div className="author-profile-info">
                  <h5>Sarah Jenkins</h5>
                  <p>Visited Artisan House</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standard Shared Structural Site Footer */}
      <footer className="main-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>HiddenPaths</h2>
            <p>Authentic, local experiences handcrafted for the mindful traveler interested in uncovering heritage throughout discovery journeys.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#">Experiences</a></li>
              <li><a href="#">Host a Local</a></li>
              <li><a href="#">Adventure Guide</a></li>
              <li><a href="#">Become a Host</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Support Terms</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>The Journal</h4>
            <p style={{color:'#a1a1aa', fontSize:'0.8rem', marginBottom:'1rem'}}>Receive monthly field notes directly from local hosts.</p>
            <input type="email" placeholder="Your email address" className="newsletter-input" />
            <button className="btn-subscribe">Subscribe</button>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 HiddenPaths. Made with ❤️ in Nepal.</div>
          <div className="footer-bottom-links">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
