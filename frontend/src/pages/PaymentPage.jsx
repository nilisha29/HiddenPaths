import React, { useState } from 'react';
import '../styles/paymentPage.css';

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'esewa' | 'khalti'

  return (
    <div className="hp-payment-view-wrapper">
      {/* Top Navbar */}
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

      {/* Main Payment Container */}
      <div className="payment-body-container">
        
        {/* Horizontal Progress Flow Indicator */}
        <div className="step-flow-stepper">
          <div className="flow-node completed">
            <span className="node-idx">1</span> Details
          </div>
          <div className="flow-connector"></div>
          <div className="flow-node active">
            <span className="node-idx">2</span> Payment
          </div>
          <div className="flow-connector"></div>
          <div className="flow-node pending">
            <span className="node-idx">3</span> Confirmation
          </div>
        </div>

        {/* Dynamic Split Layout Columns */}
        <div className="payment-grid-layout">
          
          {/* LEFT PANEL: PAYMENT GATEWAY INTERFACE */}
          <main className="payment-gateway-panel">
            <h2 className="section-title-header">🔒 Secure Payment</h2>
            <p className="section-subtitle-label">Payment Method</p>

            {/* Interactive Gateway Switchers */}
            <div className="gateway-selector-row">
              <button 
                type="button"
                className={`gateway-card-btn ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="radio-dot-indicator"></div>
                <span className="gateway-emoji-icon">💳</span>
                <div className="gateway-btn-text">
                  <strong>Card</strong>
                  <span className="sub-tag">Credit or Debit</span>
                </div>
              </button>

              <button 
                type="button"
                className={`gateway-card-btn ${paymentMethod === 'esewa' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('esewa')}
              >
                <div className="radio-dot-indicator"></div>
                <span className="gateway-emoji-icon">🟢</span>
                <div className="gateway-btn-text">
                  <strong>eSewa</strong>
                  <span className="sub-tag">Digital Wallet</span>
                </div>
              </button>

              <button 
                type="button"
                className={`gateway-card-btn ${paymentMethod === 'khalti' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('khalti')}
              >
                <div className="radio-dot-indicator"></div>
                <span className="gateway-emoji-icon"> </span >
                <span className="gateway-emoji-icon" style={{color: '#5C2D91'}}>🟣</span>
                <div className="gateway-btn-text">
                  <strong>Khalti</strong>
                  <span className="sub-tag">Quick Pay</span>
                </div>
              </button>
            </div>

            {/* Contextual Input Fields Base on State Selection */}
            {paymentMethod === 'card' ? (
              <div className="card-credentials-form-box fade-in-smooth">
                <div className="input-field-group">
                  <label className="field-input-label">Card Number</label>
                  <div className="input-with-inline-assets">
                    <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" />
                    <div className="inline-card-icons-row">
                      <span className="card-brand-mini visa-mini"></span>
                      <span className="card-brand-mini mc-mini"></span>
                    </div>
                  </div>
                </div>

                <div className="input-fields-split-row">
                  <div className="input-field-group">
                    <label className="field-input-label">Expiry Date</label>
                    <input type="text" placeholder="MM / YY" maxLength="5" />
                  </div>
                  <div className="input-field-group">
                    <label className="field-input-label">
                      CVV <span className="info-tooltip-trigger" title="3-digit security code on back of card">❓</span>
                    </label>
                    <input type="password" placeholder="123" maxLength="3" />
                  </div>
                </div>

                <div className="input-field-group">
                  <label className="field-input-label">Cardholder Name</label>
                  <input type="text" placeholder="Full name as on card" />
                </div>
              </div>
            ) : (
              <div className="wallet-redirection-notice-box fade-in-smooth">
                <p>Upon clicking validation, a secure popup portal will redirect you to authorize your local **{paymentMethod === 'esewa' ? 'eSewa' : 'Khalti'}** credentials to complete this standard transaction protocol.</p>
              </div>
            )}

            {/* Trust & Encryption Banner */}
            <div className="ssl-encryption-compliance-banner">
              <span className="compliance-shield-icon">🛡️</span>
              <p>Your payment is protected with 256-bit SSL encryption. We do not store your full card details.</p>
            </div>

            {/* CTA Execution Button */}
            <button type="submit" className="payment-submission-cta-btn">
              Confirm and Pay NPR 5,450
            </button>
          </main>

          {/* RIGHT PANEL: STICKY ITINERARY LEDGER SUMMARY */}
          <aside className="itinerary-summary-sidebar">
            <div className="itinerary-sticky-card">
              
              {/* Card Hero Banner Visual Header */}
              <div className="itinerary-hero-banner-image">
                <div className="banner-vignette-overlay">
                  <span className="selected-category-tag">SELECTED TRAIL</span>
                  <h3 className="itinerary-title-heading">The Forgotten Gumbas of Mustang</h3>
                </div>
              </div>

              {/* Pricing Line Item Ledger Details */}
              <div className="ledger-breakdown-table-box">
                <div className="ledger-data-row">
                  <span className="ledger-label-text">Base Trail Experience (2pax)</span>
                  <span className="ledger-numeric-val">NPR 4,200</span>
                </div>
                <div className="ledger-data-row">
                  <span className="ledger-label-text">Local Sherpa Guide</span>
                  <span className="ledger-numeric-val">NPR 800</span>
                </div>
                <div className="ledger-data-row">
                  <span className="ledger-label-text">Sustainable Pack (Eco-kit)</span>
                  <span className="ledger-numeric-val">NPR 350</span>
                </div>

                <div className="ledger-grand-total-divider-line"></div>

                <div className="ledger-grand-total-display-row">
                  <div>
                    <span className="total-title-text">Total Amount</span>
                    <p className="total-disclaimer-subtext">*Includes all local permits and community impact fee.</p>
                  </div>
                  <span className="total-prominent-price-tag">NPR 5,450</span>
                </div>
              </div>

              {/* Social Sustainability Eco Impact Footer Section */}
              <div className="itinerary-impact-footer-metrics-box">
                <p className="impact-box-header-title">YOUR IMPACT</p>
                <div className="impact-badges-flex-row">
                  <span className="sustainability-badge badge-green">
                    <span className="badge-bullet-dot"></span> Carbon Neutral
                  </span>
                  <span className="sustainability-badge badge-orange">
                    <span className="badge-bullet-dot"></span> Community Led
                  </span>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* Global Brand Footer Component */}
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