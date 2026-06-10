import React, { useState } from 'react';
import '../styles/confirmationPage.css';

export default function ConfirmationPage() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <div className="hp-confirmation-view-wrapper">
      {/* Global Navigation Header */}
      <nav className="hp-global-nav">
        <div className="nav-brand-logo">HiddenPaths</div>
        <div className="nav-menu-links">
          <a href="#home">Home</a>
          <a href="#explore" className="active">Explore</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        
        {/* Interactive Profile Area */}
        <div className="nav-profile-section">
          <button className="notification-bell-btn">🔔</button>
          <div 
            className="user-profile-badge" 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            role="button"
            tabIndex={0}
          >
            <span className="profile-name">Elena R.</span>
            <div className="profile-avatar-circle"></div>
            <span className="dropdown-arrow-icon">▼</span>

            {/* Contextual Dropdown Menu (Matches mockup positioning) */}
            {isProfileMenuOpen && (
              <div className="profile-context-menu fade-in-quick">
                <a href="#profile" className="context-menu-item">👤 Profile</a>
                <a href="#bookings" className="context-menu-item">🎟️ My Bookings</a>
                <a href="#settings" className="context-menu-item">⚙️ Settings</a>
                <div className="context-menu-divider"></div>
                <a href="#logout" className="context-menu-item logout-action">🚪 Sign Out</a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="confirmation-body-container">
        
        {/* Animated Success Seal Indicator */}
        <div className="success-seal-container animate-pop-in">
          <div className="success-checkmark-circle">✓</div>
        </div>

        <h1 className="main-success-title">You're going!</h1>
        <p className="success-confirmation-subtitle">
          We've sent your itinerary and receipt to <strong className="user-email-highlight">julian@example.com</strong>
        </p>

        {/* Digital Ticket / Booking Ledger Card */}
        <section className="booking-ticket-card-container animate-slide-up">
          <div className="ticket-header-row">
            <div>
              <span className="ticket-meta-label">REFERENCE NUMBER</span>
              <h3 className="ticket-reference-id">HP-2024-9982</h3>
            </div>
            <span className="booking-status-badge">Confirmed</span>
          </div>

          <div className="ticket-details-grid">
            <div className="ticket-detail-block">
              <span className="ticket-meta-label">GUEST</span>
              <p className="ticket-detail-value">Julian Barnes</p>
            </div>
            <div className="ticket-detail-block">
              <span className="ticket-meta-label">ARRIVAL</span>
              <p className="ticket-detail-value">Oct 12, 14:00</p>
            </div>
          </div>

          <div className="ticket-footer-destination">
            <span className="ticket-meta-label">DESTINATION</span>
            <p className="ticket-detail-value destination-with-pin">
              📍 The Alchemist's Retreat, Silene, Italy
            </p>
          </div>
        </section>

        {/* Primary Operational Actions */}
        <div className="ticket-actions-row-wrapper">
          <button className="secondary-outline-action-btn">
            📂 View my bookings
          </button>
          <button className="secondary-outline-action-btn">
            💾 Save to PDF
          </button>
        </div>

        <hr className="section-divider-line" />

        {/* Cross-Sell Recommendation Matrix Section */}
        <section className="extend-stay-recommendations-section">
          <h2 className="extend-section-title">Extend your stay</h2>
          <p className="extend-section-subtitle">Discover nearby hidden wonders to deepen your journey.</p>

          <div className="recommendations-cards-flex-grid">
            
            {/* Card 1 */}
            <div className="destination-preview-card card-bg-kathmandu">
              <div className="card-gradient-scrim-overlay">
                <div className="card-inner-text-content">
                  <h4 className="rec-card-title">Kathmandu Valley</h4>
                  <p className="rec-card-duration">3 NIGHTS • HERITAGE EXPERIENCE</p>
                  <a href="#explore-ktm" className="rec-explore-link">Explore Details →</a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="destination-preview-card card-bg-ilam">
              <div className="card-gradient-scrim-overlay">
                <div className="card-inner-text-content">
                  <h4 className="rec-card-title">Ilam Hills</h4>
                  <p className="rec-card-duration">2 NIGHTS • TEA RETREAT</p>
                  <a href="#explore-ilam" className="rec-explore-link">Explore Details →</a>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="destination-preview-card card-bg-mustang">
              <div className="card-gradient-scrim-overlay">
                <div className="card-inner-text-content">
                  <h4 className="rec-card-title">Mustang District</h4>
                  <p className="rec-card-duration">5 NIGHTS • HIGH DESERT TREK</p>
                  <a href="#explore-mustang" className="rec-explore-link">Explore Details →</a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Global Footer Layout */}
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