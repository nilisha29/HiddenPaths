import React, { useState } from 'react';
import '../styles/myBookingsPage.css';

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Sample static data populated from your application scope UI configurations
  const bookingsData = {
    upcoming: [
      {
        id: "b1",
        title: "Annapurna Hearth",
        curator: "Tsering N.",
        location: "Bhaktapur, Nepal",
        date: "Oct 14 – Oct 21, 2024",
        guests: "2 Explorers",
        badge: "Eco-Conscious",
        badgeType: "eco",
        image: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=500&auto=format&fit=crop&q=80"
      },
      {
        id: "b2",
        title: "Artisan Pottery Workshop",
        curator: "Elena Rossi",
        location: "Bhaktapur, Nepal",
        date: "Nov 02, 2024",
        duration: "4 Hours (10 AM)",
        badge: "Cultural Preservation",
        badgeType: "culture",
        image: "https://images.unsplash.com/photo-1563918544111-9ecdf3d2746c?w=500&auto=format&fit=crop&q=80"
      }
    ],
    past: [],
    cancelled: []
  };

  return (
    <div className="hp-bookings-dashboard-root">
      {/* Global Navigation Bar */}
      <nav className="hp-global-nav">
        <div className="nav-brand-logo">HiddenPaths</div>
        <div className="nav-menu-links">
          <a href="#home">Home</a>
          <a href="#explore" className="active">Explore</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-profile-section">
          <button className="notification-bell-btn">🔔</button>
          <div className="user-profile-badge">
            <span className="profile-name">Elena R.</span>
            <div className="profile-avatar-circle"></div>
          </div>
        </div>
      </nav>

      {/* Main Content Layout */}
      <main className="bookings-dashboard-container">
        <header className="dashboard-header-block">
          <h1 className="dashboard-main-title">My Bookings</h1>
          <p className="dashboard-subtitle">
            Manage your upcoming journeys, revisit past memories, and track your local impact across the globe.
          </p>
        </header>

        {/* Dynamic Status Segment Controls */}
        <div className="status-tab-navigation-bar">
          <button 
            className={`tab-toggle-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming <span className="tab-count-indicator">2</span>
          </button>
          <button 
            className={`tab-toggle-btn ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past <span className="tab-count-indicator count-zero">3</span>
          </button>
          <button 
            className={`tab-toggle-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled <span className="tab-count-indicator count-zero">0</span>
          </button>
        </div>

        {/* Dynamic Booking Grid Ledger */}
        <section className="bookings-list-view-column">
          {bookingsData[activeTab].length > 0 ? (
            bookingsData[activeTab].map((booking) => (
              <div key={booking.id} className="booking-horizontal-row-card animate-fade-in">
                
                {/* Visual Preview Frame */}
                <div 
                  className="booking-card-media-viewport"
                  style={{ backgroundImage: `url(${booking.image})` }}
                >
                  <span className={`media-context-badge badge-${booking.badgeType}`}>
                    ✨ {booking.badge}
                  </span>
                </div>

                {/* Structured Metadata Payload Details */}
                <div className="booking-card-metadata-payload">
                  <div className="payload-header-row">
                    <div>
                      <h2 className="booking-item-title">{booking.title}</h2>
                      <p className="booking-item-curator">Curated by <span className="curator-highlight">{booking.curator}</span></p>
                    </div>
                    <span className="itinerary-live-status-pill">Upcoming</span>
                  </div>

                  <p className="booking-item-location-pin">📍 {booking.location}</p>

                  <div className="booking-logistical-parameters-grid">
                    <div className="param-block">
                      <span className="param-label">DATE</span>
                      <p className="param-value">{booking.date}</p>
                    </div>
                    <div className="param-block">
                      {booking.guests ? (
                        <>
                          <span className="param-label">GUESTS</span>
                          <p className="param-value">{booking.guests}</p>
                        </>
                      ) : (
                        <>
                          <span className="param-label">DURATION</span>
                          <p className="param-value">{booking.duration}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Primary Operational Actions */}
                  <div className="booking-action-buttons-footer-row">
                    <button className="primary-tinted-action-btn">View Details</button>
                    <button className="secondary-minimal-action-btn">Write review</button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="empty-state-fallback-card">
              <p>No bookings found under this lifecycle selection.</p>
            </div>
          )}
        </section>

        {/* Reflection & Travel Log Callout */}
        <section className="journal-reflection-callout-card">
          <div className="reflection-text-content">
            <h3 className="reflection-title">Reflect on your journeys.</h3>
            <p className="reflection-description">
              Your travels contribute to a global narrative of conscious exploration. Browse your past experiences to share your insights with the community.
            </p>
            <a href="#trip-archive" className="archive-navigation-anchor-link">
              VIEW TRIP ARCHIVE <span className="arrow-vector">→</span>
            </a>
          </div>
          <div className="reflection-visuals-composition">
            <img 
              src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=300&auto=format&fit=crop&q=80" 
              alt="Travel Journal" 
              className="composition-img stack-under"
            />
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80" 
              alt="Destination Pagoda" 
              className="composition-img stack-over"
            />
          </div>
        </section>
      </main>

      {/* Global Layout Footer */}
      <footer className="hp-global-footer">
        <div className="footer-top-columns-layout">
          <div className="footer-brand-summary-column">
            <h3 className="footer-brand-logo-text">HiddenPaths</h3>
            <p className="footer-brand-tagline">Authentic local experiences curated for the soulful traveler. Join us in preserving heritage through discovery.</p>
            <div className="footer-social-icons-row">
              <span>🌐</span> <span>📸</span> <span>✉️</span>
            </div>
          </div>
          <div className="footer-navigation-links-column">
            <h4>Explore</h4>
            <a href="#experiences">Experiences</a>
            <a href="#hosts">Local Hosts</a>
            <a href="#guides">Adventure Guides</a>
            <a href="#destinations">Destinations</a>
          </div>
          <div className="footer-navigation-links-column">
            <h4>Company</h4>
            <a href="#story">Our Story</a>
            <a href="#careers">Careers</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#impact">Impact Report</a>
          </div>
          <div className="footer-newsletter-subscribe-column">
            <h4>The Journal</h4>
            <p>Receive monthly stories from the hidden paths of Nepal.</p>
            <form className="footer-subscribe-input-form-control" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-copyright-bottom-legal-bar">
          <p>© 2026 HiddenPaths. Made with ❤️ in Kathmandu.</p>
          <div className="footer-legal-links-row">
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}