import React from 'react';
import '../styles/guideProfile.css';

// Mock Data matching the UI perfectly
const guideData = {
  name: "Laxmi Prajapati",
  title: "MASTER ARTISAN",
  badge: "Verified Host",
  avatar: "https://via.placeholder.com/150", 
  stats: { experiences: 23, reviews: 128, activeYears: 6 },
  languages: ["Newari", "Nepali", "English"],
  specialties: ["Red Clay Pottery", "Wheel Throwing", "Traditional Kiln Firing"],
  bio: `"For three generations, my family has shaped the red and black clay of Bhaktapur. My craft is more than pottery; it is a conversation with the earth and our ancestors. When you join me at my wheel, you aren't just making a vessel — you are continuing a story that began centuries ago in these hidden alleys."`,
  experiences: [
    {
      id: 1,
      type: "POTTERY WORKSHOP",
      title: "The Art of Black Clay",
      rating: "5.0",
      price: "NPR 4,500",
      image: "https://via.placeholder.com/400x250"
    },
    {
      id: 2,
      type: "CULTURAL IMMERSION",
      title: "Morning Kiln Ritual",
      rating: "4.9",
      price: "NPR 3,200",
      image: "https://via.placeholder.com/400x250"
    }
  ],
  reviews: [
    {
      id: 1,
      text: "Spending an afternoon with Laxmi was the highlight of our Nepal trip. She is patient, incredibly skilled, and the tea she served was the best we had in Bhaktapur.",
      user: "Mark T.",
      location: "London, UK",
      date: "Oct 2025"
    },
    {
      id: 2,
      text: "The workshop is tucked away in a beautiful courtyard. Laxmi's stories about her family's history made the experience feel so personal and authentic. Highly recommend!",
      user: "Sarah L.",
      location: "Toronto, CA",
      date: "Sept 2025"
    },
    {
      id: 3,
      text: "An incredible masterclass. We learned so much about the specific chemistry of the black clay. Laxmi is truly a master of her craft.",
      user: "David K.",
      location: "Berlin, DE",
      date: "July 2025"
    }
  ]
};

// --- NAVBAR SUB-COMPONENT ---
function Navbar() {
  return (
    <nav className="hp-navbar">
      <div className="navbar-brand">HiddenPaths</div>
      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#explore" className="active">Explore</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="navbar-actions">
        <button className="nav-icon-btn">
          <span className="bell-icon">🔔</span>
        </button>
        <div className="user-profile-trigger">
          <span className="user-name">Elena R.</span>
          <div className="user-avatar-mini"></div>
        </div>
      </div>
    </nav>
  );
}

// --- FOOTER SUB-COMPONENT ---
function Footer() {
  return (
    <footer className="hp-footer">
      <div className="footer-top-grid">
        <div className="footer-brand-section">
          <h2 className="footer-logo">HiddenPaths</h2>
          <p>Authentic local experiences curated for the soulful traveler. Join us in preserving heritage through discovery.</p>
          <div className="social-icons">
            <span>🌐</span>
            <span>📷</span>
            <span>✉️</span>
          </div>
        </div>
        
        <div className="footer-links-column">
          <h3>Explore</h3>
          <ul>
            <li><a href="#experiences">Experiences</a></li>
            <li><a href="#hosts">Local Hosts</a></li>
            <li><a href="#guides">Adventure Guides</a></li>
            <li><a href="#destinations">Destinations</a></li>
          </ul>
        </div>

        <div className="footer-links-column">
          <h3>Company</h3>
          <ul>
            <li><a href="#story">Our Story</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#impact">Impact Report</a></li>
          </ul>
        </div>

        <div className="footer-subscribe-column">
          <h3>The Journal</h3>
          <p>Receive monthly stories from the hidden paths of Nepal.</p>
          <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom-bar">
        <p>© 2026 HiddenPaths. Made with ❤️ in Kathmandu.</p>
        <div className="footer-legal-links">
          <a href="#terms">Terms of Service</a>
          <a href="#cookies">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

// --- MAIN PAGE CONTAINER ---
export default function GuideProfile() {
  return (
    <div className="page-wrapper-layout">
      {/* Dynamic Native Navigation Header */}
      <Navbar />

      {/* Main Container Content */}
      <div className="guide-profile-page">
        {/* Top Navigation Control */}
        <div className="back-navigation">
          <button className="back-btn">
            <span className="arrow">←</span> Back to Details
          </button>
        </div>

        {/* Layout Column System */}
        <div className="profile-container">
          
          {/* Left Side Content Area */}
          <main className="profile-main-content">
            
            {/* Header Profile Info Section */}
            <section className="profile-hero-header">
              <img src={guideData.avatar} alt={guideData.name} className="guide-avatar" />
              <div className="guide-meta">
                <div className="name-row">
                  <h1>{guideData.name}</h1>
                  <span className="verified-host-tag">{guideData.badge}</span>
                </div>
                <p className="artisan-title">{guideData.title}</p>
                
                <div className="stats-row">
                  <div className="stat-item"><strong>{guideData.stats.experiences}</strong> Experiences</div>
                  <div className="stat-item"><strong>{guideData.stats.reviews}</strong> Reviews</div>
                  <div className="stat-item"><strong>{guideData.stats.activeYears} Years</strong> Active</div>
                </div>
              </div>
            </section>

            {/* About Narrative Block */}
            <section className="profile-section">
              <h2>About {guideData.name}</h2>
              <p className="bio-text">{guideData.bio}</p>
              
              <div className="meta-sub-group">
                <h3>LANGUAGES</h3>
                <div className="tag-container">
                  {guideData.languages.map((lang, idx) => (
                    <span key={idx} className="outline-tag">{lang}</span>
                  ))}
                </div>
              </div>

              <div className="meta-sub-group">
                <h3>SPECIALTIES</h3>
                <div className="tag-container">
                  {guideData.specialties.map((spec, idx) => (
                    <span key={idx} className="filled-tag">{spec}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* Experiences Showcase Loop */}
            <section className="profile-section">
              <h2>Hosted by {guideData.name}</h2>
              <div className="experiences-list-grid">
                {guideData.experiences.map((exp) => (
                  <div key={exp.id} className="mini-experience-card">
                    <div className="card-image-wrapper">
                      <img src={exp.image} alt={exp.title} />
                      <span className="rating-badge">★ {exp.rating}</span>
                    </div>
                    <div className="card-details">
                      <span className="exp-type">{exp.type}</span>
                      <h3>{exp.title}</h3>
                      <div className="card-footer">
                        <p className="price-tag"><strong>{exp.price}</strong> / person</p>
                        <button className="details-link-btn">Details →</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Right Column Contextual Widgets */}
          <aside className="profile-sidebar">
            <div className="sidebar-card action-card">
              <h3>Book with {guideData.name.split(' ')[0]}</h3>
              <p className="response-time">⚡ Responds in less than 2 hours</p>
              <button className="btn-primary-action">View Experiences</button>
              <button className="btn-secondary-action">Message Host</button>
            </div>

            <div className="sidebar-card verification-card">
              <h3>Host Verification</h3>
              <ul>
                <li><span className="icon">✓</span> Identity Verified</li>
                <li><span className="icon">✓</span> Artisan Certification</li>
                <li><span className="icon">✓</span> Secure Payments only through HiddenPaths</li>
              </ul>
            </div>

            <div className="sidebar-card impact-card">
              <div className="impact-header">
                <span className="leaf-icon">🍂</span>
                <h3>Sustainable Impact</h3>
              </div>
              <p>Booking with {guideData.name.split(' ')[0]} directly supports the Prajapati community and ensures the survival of traditional firing techniques that are otherwise disappearing.</p>
            </div>
          </aside>
        </div>

        {/* Review Comments Panel Component */}
        <section className="reviews-section-wrapper">
          <div className="reviews-header-row">
            <h2>What travelers say about {guideData.name.split(' ')[0]}</h2>
            <div className="rating-summary">
              <span className="star-big">★ 4.98</span> • {guideData.stats.reviews} Reviews
              <button className="see-all-link">See all reviews</button>
            </div>
          </div>

          <div className="reviews-carousel-grid">
            {guideData.reviews.map((rev) => (
              <div key={rev.id} className="review-comment-card">
                <p className="review-body-text">{rev.text}</p>
                <div className="reviewer-info">
                  <div className="reviewer-avatar-placeholder"></div>
                  <div>
                    <h4>{rev.user}</h4>
                    <p>{rev.location} • {rev.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Global Application Footer layout */}
      <Footer />
    </div>
  );
}