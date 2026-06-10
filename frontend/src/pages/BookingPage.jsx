import React, { useState } from 'react';
import '../styles/bookingPage.css';

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Details, 2: Payment
  const [paymentMethod, setPaymentMethod] = useState('card'); // card, esewa, khalti

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    guests: 2,
    pickup: false,
    photography: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateTotal = () => {
    let base = 4200;
    let communityFee = 75;
    let extra = 0;
    if (formData.pickup) extra += 85;
    if (formData.photography) extra += 120;
    return {
      experience: base,
      fee: communityFee,
      extras: extra,
      total: base + communityFee + extra
    };
  };

  const costs = calculateTotal();

  return (
    <div className="page-wrapper-layout">
      {/* Global Navbar */}
      <nav className="hp-navbar">
        <div className="navbar-brand">HiddenPaths</div>
        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#explore" className="active">Explore</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="navbar-actions">
          <button className="nav-icon-btn">🔔</button>
          <div className="user-profile-trigger">
            <span className="user-name">Elena R.</span>
            <div className="user-avatar-mini"></div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="booking-page-container">
        
        {/* Progress Timeline Header */}
        <div className="booking-timeline">
          <div className={`timeline-step ${currentStep >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span> DETAILS
          </div>
          <div className="timeline-line"></div>
          <div className={`timeline-step ${currentStep >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span> PAYMENT
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-step">
            <span className="step-number">3</span> CONFIRMATION
          </div>
        </div>

        {/* Dynamic Multi-step Grid Layout */}
        <div className="booking-grid">
          
          {/* LEFT COLUMN: STEP CONDITIONAL FORMS */}
          <main className="booking-main-form">
            {currentStep === 1 ? (
              <section className="form-step-section fade-in">
                <h2>Secure Your Journey</h2>
                
                <div className="form-input-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      placeholder="Julian Barnes" 
                      value={formData.fullName}
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="julian@example.com" 
                      value={formData.email}
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="+1 (555) 000-0000" 
                    value={formData.phone}
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="form-group">
                  <label>Special Requests (Dietary, Accessibility, etc.)</label>
                  <textarea 
                    name="specialRequests" 
                    rows="4"
                    placeholder="Tell us how we can make your journey more comfortable..."
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="guest-counter-section">
                  <h3>Your Booking</h3>
                  <div className="counter-row">
                    <div>
                      <p className="counter-title">SELECTED DATE</p>
                      <p className="counter-value-text">📅 October 12, 2026</p>
                    </div>
                    <div>
                      <p className="counter-title">GUESTS</p>
                      <div className="counter-controls">
                        <button onClick={() => setFormData(p => ({ ...p, guests: Math.max(1, p.guests - 1) }))}>−</button>
                        <span>{formData.guests}</span>
                        <button onClick={() => setFormData(p => ({ ...p, guests: p.guests + 1 }))}>+</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="optional-extras-section">
                  <h3>Optional Extras</h3>
                  <div className="extras-grid">
                    <label className={`extra-card-option ${formData.pickup ? 'selected' : ''}`}>
                      <input 
                        type="checkbox" 
                        name="pickup" 
                        checked={formData.pickup}
                        onChange={handleInputChange} 
                      />
                      <div className="extra-details">
                        <h4>Private Pickup</h4>
                        <p>Luxury SUV from Kathmandu airport.</p>
                        <span className="extra-price">+ NPR 85</span>
                      </div>
                    </label>

                    <label className={`extra-card-option ${formData.photography ? 'selected' : ''}`}>
                      <input 
                        type="checkbox" 
                        name="photography" 
                        checked={formData.photography}
                        onChange={handleInputChange} 
                      />
                      <div className="extra-details">
                        <h4>Photography Add-on</h4>
                        <p>Professional high-res gallery.</p>
                        <span className="extra-price">+ NPR 120</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button className="btn-action-primary" onClick={() => setCurrentStep(2)}>
                  Continue to Payment →
                </button>
              </section>
            ) : (
              <section className="form-step-section fade-in">
                <h2>🔒 Secure Payment</h2>
                <p className="payment-subtitle">Select your preferred payment gateway</p>

                {/* Gateway Tab Selectors */}
                <div className="payment-tabs-row">
                  <button 
                    className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <span className="tab-icon">💳</span> Card
                  </button>
                  <button 
                    className={`payment-tab ${paymentMethod === 'esewa' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('esewa')}
                  >
                    <span className="tab-icon">🟢</span> eSewa
                  </button>
                  <button 
                    className={`payment-tab ${paymentMethod === 'khalti' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('khalti')}
                  >
                    <span className="tab-icon">🟣</span> Khalti
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="credit-card-form-wrapper">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="card-num-input" />
                    </div>
                    <div className="form-input-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM / YY" />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="password" placeholder="•••" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input type="text" placeholder="Full name as on card" />
                    </div>
                  </div>
                ) : (
                  <div className="wallet-redirect-message">
                    <p>You will be securely redirected to your {paymentMethod} account login interface to complete your verification transfer.</p>
                  </div>
                )}

                <div className="security-notice-banner">
                  <span className="shield-icon">🛡️</span>
                  <p>Your connection is protected with 256-bit SSL encryption. We do not store your complete credentials or card metadata.</p>
                </div>

                <div className="dual-actions-row">
                  <button className="btn-action-secondary" onClick={() => setCurrentStep(1)}>
                    ← Back to Details
                  </button>
                  <button className="btn-action-primary">
                    Confirm and Pay NPR {costs.total}
                  </button>
                </div>
              </section>
            )}
          </main>

          {/* RIGHT COLUMN: STICKY ITINERARY SUMMARY CARD */}
          <aside className="booking-sidebar">
            <div className="summary-sticky-card">
              <div className="summary-hero-img-wrapper">
                <div className="summary-hero-overlay">
                  <h3>Annapurna Hearth & Heritage</h3>
                  <p>📍 Ghandruk, Nepal</p>
                </div>
              </div>

              <div className="host-mini-info-row">
                <div className="host-avatar-placeholder"></div>
                <div>
                  <p className="hosted-by-tag">Hosted by</p>
                  <h4>Pema Dolma</h4>
                </div>
                <div className="trip-dates-meta">
                  <p><strong>Date:</strong> Oct 12–15</p>
                  <p><strong>Guests:</strong> {formData.guests} Adults</p>
                </div>
              </div>

              <div className="pricing-breakdown-ledger">
                <div className="price-item-row">
                  <span>Experience cost</span>
                  <span>NPR {costs.experience}</span>
                </div>
                <div className="price-item-row">
                  <span>Community fee</span>
                  <span>NPR {costs.fee}</span>
                </div>
                {costs.extras > 0 && (
                  <div className="price-item-row extra-item-line">
                    <span>Selected Add-ons</span>
                    <span>NPR {costs.extras}</span>
                  </div>
                )}
                <div className="price-total-row">
                  <span>Total</span>
                  <span className="final-price-amt">NPR {costs.total}</span>
                </div>
              </div>

              <div className="impact-endorsement-banner">
                <span className="sprout-icon">🌱</span>
                <p>Your booking directly supports the Ghandruk Weaving Cooperative, providing autonomous, reliable sustainable income pathways for 15 local artisans.</p>
              </div>

              <div className="impact-tags-footer">
                <span className="tag-green">✓ Carbon Neutral</span>
                <span className="tag-orange">✓ Community Led</span>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Global Footer */}
      <footer className="hp-footer">
        <div className="footer-top-grid">
          <div className="footer-brand-section">
            <h2 className="footer-logo">HiddenPaths</h2>
            <p>Authentic local experiences curated for the soulful traveler. Join us in preserving heritage through discovery.</p>
          </div>
          <div className="footer-links-column">
            <h3>Explore</h3>
            <ul>
              <li><a href="#experiences">Experiences</a></li>
              <li><a href="#hosts">Local Hosts</a></li>
              <li><a href="#guides">Adventure Guides</a></li>
            </ul>
          </div>
          <div className="footer-links-column">
            <h3>Company</h3>
            <ul>
              <li><a href="#story">Our Story</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
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
    </div>
  );
}