import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';
import '../styles/experienceDetail.css';

export default function ExperienceDetail() {
  const navigate = useNavigate();
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);
  const [bookingDate, setBookingDate] = useState('2026-06-15');
  const [guestsCount, setGuestsCount] = useState(2);

  const basePricePerPerson = 1250;
  const convenienceFee = 180;
  const localTaxValue = 250;
  const totalCalculatedAmount = (basePricePerPerson * guestsCount) + convenienceFee + localTaxValue;

  const itinerarySteps = [
    { time: "09:00 AM", title: "Welcome Ceremony", desc: "Meet at Patan Square and share traditional welcome tea along with local briefing updates." },
    { time: "10:30 AM", title: "Clay Preparation", desc: "Learn individual soil refining techniques alongside masters in ancestral workspace backyards." },
    { time: "01:30 PM", title: "Life On The Wheel", desc: "Step up onto active wheel mounts to throw your signature local project models under supervision." }
  ];

  const userReviewsCollection = [
    { name: "Julian S.", location: "United States", date: "April 2026", critique: "A beautiful journey through space and time. Hand-throwing pottery alongside masters who have protected this culture for generations was deeply moving. Highly recommend!" },
    { name: "Sarah M.", location: "United Kingdom", date: "May 2026", critique: "The workspace context feels completely original. Our host was patient, passionate, and incredibly knowledgeable. The traditional lunch inclusion was an amazing bonus." }
  ];

  return (
    <div style={{ backgroundColor: '#FFFDF9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Platform Navigation Header Bar */}
      <nav className="auth-nav">
        <a href="#" onClick={() => navigate('/home')} className="logo">HiddenPaths</a>
        <div className="nav-links">
          <a href="#" onClick={() => navigate('/home')}>Home</a>
          <a href="#" onClick={() => navigate('/explore')} className="active">Explore</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <div className="user-profile-actions">
          <button className="icon-btn">🔍</button>
          <button className="icon-btn">🔔</button>
          <div className="avatar-circle">E</div>
        </div>
      </nav>

      {/* Main Experience Layout Body Frame */}
      <div className="detail-page-container" style={{ flex: '1 0 auto' }}>
        
        {/* Header Title Information Context block */}
        <header className="detail-header-section">
          <div className="detail-header-top-row">
            <div>
              <h1 className="detail-main-title">Traditional Newari Pottery Workshop in Bhaktapur</h1>
              <div className="detail-meta-row">
                <span className="rating-star-badge">★ 4.89 (124 reviews)</span>
                <span>•</span>
                <span>Bhaktapur Pottery Square, Nepal</span>
                <span className="verified-badge">✓ Verified Experience</span>
              </div>
            </div>
            <div className="action-trigger-buttons">
              <button className="btn-utility-action"><span>📤</span> Share</button>
              <button className="btn-utility-action"><span>♡</span> Save</button>
            </div>
          </div>
        </header>

        {/* Media Mosaic Collage Block Grid Layout */}
        <div className="media-mosaic-grid">
          <div className="mosaic-hero-pane">
            <img src="https://images.unsplash.com/photo-1565192647048-f997ed87f5e2?q=80&w=800" alt="Pottery focus workspace" />
          </div>
          <div className="mosaic-sub-panes">
            <div className="sub-image-cell"><img src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400" alt="Artisan courtyard rows" /></div>
            <div className="sub-image-cell"><img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=400" alt="Master workspace row" /></div>
            <div className="sub-image-cell"><img src="https://images.unsplash.com/photo-1534531173927-aeb928d54385?q=80&w=400" alt="Finished local projects" /></div>
            <div className="sub-image-cell"><img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=400" alt="Beautiful landscape scene" /></div>
          </div>
        </div>

        {/* Workspace Column Splitting Engine Frame */}
        <div className="detail-workspace-split">
          
          {/* Main Context Left Side Block Area */}
          <div className="content-narrative-column">
            
            {/* Host Identity Badge Context */}
            <div className="host-profile-card">
              <div className="host-avatar-group">
                <img className="host-avatar-img" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150" alt="Host Avatar" />
                <div className="host-details-meta">
                  <h4>Hosted by Laxmi Prajapati</h4>
                  <p>Master Artisan • 15 years preserving regional craft lines</p>
                </div>
              </div>
              <button className="btn-view-profile">View Profile</button>
            </div>

            {/* About Narrative Block Section */}
            <div className="narrative-block">
              <h3>About the Experience</h3>
              <p>
                Step inside the heart of Bhaktapur where local art cultures have been preserved directly within clay structures for centuries. 
                You will learn the precise balancing dynamics of wheel mechanics, soil properties handling, and oven treatment signatures. 
                This hands-on journey offers complete historical immersion alongside families who continue to preserve this legacy line today.
              </p>
            </div>

            {/* Inclusions Feature Block Icons Layout Grid */}
            <div className="narrative-block">
              <h3>What's included</h3>
              <div className="features-icon-matrix">
                <div className="feature-matrix-item">
                  <div className="feature-icon-wrapper">🏺</div>
                  <div className="feature-text-block">
                    <h5>Materials Provided</h5>
                    <p>All raw clay lines, active workstation wheels, and signature baking cycles are covered.</p>
                  </div>
                </div>
                <div className="feature-matrix-item">
                  <div className="feature-icon-wrapper">🍵</div>
                  <div className="feature-text-block">
                    <h5>Refreshments</h5>
                    <p>Traditional Newari welcome tea served with local market pastries.</p>
                  </div>
                </div>
                <div className="feature-matrix-item">
                  <div className="feature-icon-wrapper">📦</div>
                  <div className="feature-text-block">
                    <h5>Take-home Piece</h5>
                    <p>Your finished project piece packed securely for transit operations.</p>
                  </div>
                </div>
                <div className="feature-matrix-item">
                  <div className="feature-icon-wrapper">🗣️</div>
                  <div className="feature-text-block">
                    <h5>Translation</h5>
                    <p>Fluent English-speaking community host assistance throughout.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Timeline Schedule Element Section */}
            <div className="narrative-block">
              <h3>Itinerary Schedule</h3>
              <div className="itinerary-timeline-axis">
                {itinerarySteps.map((step, idx) => (
                  <div key={idx} className="itinerary-step-node">
                    <div className="step-marker-dot"></div>
                    <span className="step-time-label">{step.time}</span>
                    <h4 className="step-title-text">{step.title}</h4>
                    <p className="step-description-text">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographical Interactive Map Integration Display Shell */}
            <div className="narrative-block">
              <h3>Where you'll be</h3>
              <div className="map-visual-frame">
                <img className="map-placeholder-bg" src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800" alt="Bhaktapur Location Map View" />
                <div className="map-floating-pin">📍 Bhaktapur Pottery Square</div>
              </div>
            </div>

          </div>

          {/* Right Fixed Side Position Pricing Reservation Widget Box */}
          <aside className="sticky-pricing-widget">
            <h3 className="widget-price-header">NPR {basePricePerPerson.toLocaleString()} <span>/ person</span></h3>
            
            <div className="widget-form-group">
              <label>Target Date</label>
              <input type="date" className="widget-input-field" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
            </div>

            <div className="widget-form-group">
              <label>Traveler Count</label>
              <input type="number" min="1" max="10" className="widget-input-field" value={guestsCount} onChange={(e) => setGuestsCount(parseInt(e.target.value) || 1)} />
            </div>

            {/* Calculations Ledger Table */}
            <div className="pricing-breakdown-table">
              <div className="breakdown-row">
                <span>NPR {basePricePerPerson.toLocaleString()} × {guestsCount} travelers</span>
                <span>NPR {(basePricePerPerson * guestsCount).toLocaleString()}</span>
              </div>
              <div className="breakdown-row">
                <span>Community Convenience Fee</span>
                <span>NPR {convenienceFee}</span>
              </div>
              <div className="breakdown-row">
                <span>Local Conservation Tax</span>
                <span>NPR {localTaxValue}</span>
              </div>
            </div>

            <div className="breakdown-total-row">
              <span>Total Bill</span>
              <span>NPR {totalCalculatedAmount.toLocaleString()}</span>
            </div>

            <button className="btn-primary-reserve" onClick={() => alert('Booking processing window activation placeholder')}>Book Experience</button>
            
            <div className="recommendation-alert-banner">
              <span>⚡</span>
              <p><strong>Highly Rated:</strong> This artisan experience path has received high check-in scores over the last 30 days.</p>
            </div>
          </aside>

        </div>

        {/* Public Evaluations Feed Section */}
        <section className="public-reviews-block">
          <h3 className="reviews-summary-title">Community Reflections</h3>
          <div className="reviews-grid-display">
            {userReviewsCollection.map((rev, index) => (
              <div key={index} className="individual-review-card">
                <div className="reviewer-meta-row">
                  <div className="avatar-circle" style={{ width: 40, height: 40, fontSize: '0.9rem' }}>{rev.name[0]}</div>
                  <div className="reviewer-identity">
                    <h5>{rev.name}</h5>
                    <p>{rev.location} • {rev.date}</p>
                  </div>
                </div>
                <div className="review-stars-line">★★★★★</div>
                <p className="review-critique-text">"{rev.critique}"</p>
              </div>
            ))}
          </div>
          <button className="btn-trigger-all-reviews">View all 124 reviews</button>

          {/* User Review Submission Module Box */}
          <div className="feedback-submission-box">
            <h3>How was your experience?</h3>
            <p>Share your authentic journey story to help direct the community network lines.</p>
            
            {/* Interactive Stars Rating Selector */}
            <div className="rating-selection-row">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <span 
                  key={starValue} 
                  className={`star-interactive-node ${(hoveredStars || selectedStars) >= starValue ? 'filled' : ''}`}
                  onClick={() => setSelectedStars(starValue)}
                  onMouseEnter={() => setHoveredStars(starValue)}
                  onMouseLeave={() => setHoveredStars(0)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea placeholder="Write details about the workshop atmosphere, instructions quality, or scheduling highlights..." className="feedback-textarea"></textarea>
            
            <div className="submission-actions-row">
              <button className="btn-cancel-submission" onClick={() => setSelectedStars(0)}>Reset</button>
              <button className="btn-submit-feedback" onClick={() => alert('Review registration submission logged successfully.')}>Submit Feedback</button>
            </div>
          </div>
        </section>

      </div>

      {/* Global Shared Layout Footer Component */}
      <footer className="main-footer" style={{ flexShrink: 0, marginTop: '5rem' }}>
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>HiddenPaths</h2>
            <p>Authentic, local experiences handcrafted for the mindful traveler. Join us in preserving heritage through discovery.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', opacity: 0.8 }}>
              <span>🌐</span> <span>📷</span> <span>✉️</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#">Experiences</a></li>
              <li><a href="#">Local Hosts</a></li>
              <li><a href="#">Adventure Guide</a></li>
              <li><a href="#">Destinations</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Impact Report</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>The Journal</h4>
            <p style={{ color: '#a1a1aa', fontSize: '0.8rem', marginBottom: '1rem' }}>Receive monthly stories from the hidden paths of Nepal.</p>
            <input type="email" placeholder="Your email address" className="newsletter-input" />
            <button className="btn-subscribe">Subscribe</button>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 HiddenPaths. Handcrafted in Nepal.</div>
          <div className="footer-bottom-links">
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}