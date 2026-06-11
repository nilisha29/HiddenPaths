import React, { useState, useRef, useEffect } from 'react';
import '../styles/experienceDetailPage.css';

export default function ExperienceDetailPage({ initialReviewMode = false }) {
  // Star rating state manager for the interactive review module
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(initialReviewMode);

  // Reference hooks to target the smooth viewport translation
  const reviewSectionRef = useRef(null);

  // Trigger scroll transformation if page initializes with review mode active
  useEffect(() => {
    if (initialReviewMode && reviewSectionRef.current) {
      scrollToReview();
    }
  }, [initialReviewMode]);

  const scrollToReview = () => {
    setShowReviewForm(true);
    setTimeout(() => {
      reviewSectionRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 100);
  };

  return (
    <div className="hp-detail-view-root">
      {/* Global Navigation Header */}
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

      {/* Main Container Core */}
      <main className="detail-page-layout-container">
        
        {/* Title Heading Bar */}
        <header className="experience-title-header">
          <div className="header-breadcrumbs-meta">
            <span className="rating-pill-avg">⭐ 4.98 (125 reviews)</span>
            <span className="location-context-tag">📍 Bhaktapur, Nepal</span>
            <span className="verification-pill">✓ Verified Experience</span>
          </div>
          <div className="title-action-flex-row">
            <h1 className="experience-main-heading">Traditional Newari Pottery Workshop in Bhaktapur</h1>
            <div className="utility-share-save-group">
              <button className="util-action-btn">🔗 Share</button>
              <button className="util-action-btn">❤️ Save</button>
            </div>
          </div>
        </header>

        {/* Mosaic Image Grid Pattern */}
        <section className="experience-mosaic-grid">
          <div className="mosaic-main-hero-frame">
            <img src="https://images.unsplash.com/photo-1563918544111-9ecdf3d2746c?w=800&auto=format&fit=crop&q=80" alt="Pottery master wheel alignment" />
          </div>
          <div className="mosaic-sub-thumbnails-column">
            <img src="https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=400&auto=format&fit=crop&q=80" alt="Kiln lineup processing" />
            <img src="https://images.unsplash.com/photo-1627894167527-38e2bc7775bc?w=400&auto=format&fit=crop&q=80" alt="Clay preparation tools" />
          </div>
          <div className="mosaic-sub-thumbnails-column">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80" alt="Local host profile overview" />
            <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&auto=format&fit=crop&q=80" alt="Square courtyard pottery yard" />
          </div>
        </section>

        {/* Content Splitting Interface Layer */}
        <div className="detail-two-column-split-grid">
          
          {/* Left Column Description Contextual Ledger */}
          <div className="context-narrative-left-pane">
            
            <div className="host-profile-byline-card">
              <img className="host-avatar-large" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Laxmi Prajapati Profile picture" />
              <div>
                <h3>Hosted by Laxmi Prajapati</h3>
                <p className="host-meta-subtext">Master Artisan • 10 years of experience</p>
              </div>
              <button className="view-host-profile-btn">View Profile</button>
            </div>

            <hr className="pane-separator" />

            <section className="narrative-block">
              <h4>About the Experience</h4>
              <p>Step into the heart of Bhaktapur where clay has been shaped by the red and black earth of the Kathmandu Valley for generations. This isn't just about throwing clay on a wheel; it's an intimate connection with the soil and traditions of our Newari heritage.</p>
              <p>Laxmi will guide you through the process of prepping the "Black Clay"—a specific type unique to this region. You'll learn the delicate balance of hand pressure required to center the clay on the traditional heavy wood-stoked wheels.</p>
            </section>

            <section className="amenities-included-box-matrix">
              <h4>What's included</h4>
              <div className="amenities-flex-grid">
                <div className="amenity-item-tile">📦 <span><strong>Materials</strong><br />All clay and tools provided</span></div>
                <div className="amenity-item-tile">☕ <span><strong>Refreshments</strong><br />Traditional Newari tea and local snacks</span></div>
                <div className="amenity-item-tile">🏺 <span><strong>Take-home Piece</strong><br />Your fired masterpiece (delivery optional)</span></div>
                <div className="amenity-item-tile">🗣️ <span><strong>Translation</strong><br />English-speaking community host</span></div>
              </div>
            </section>

            <section className="itinerary-timeline-vertical">
              <h4>Itinerary</h4>
              <div className="timeline-node-item">
                <div className="node-timestamp">09:00 AM</div>
                <div className="node-content-text">
                  <h5>Welcome Ceremony</h5>
                  <p>Meet at Pottery Square for fresh Newari tea and a brief introduction to the local community history.</p>
                </div>
              </div>
              <div className="timeline-node-item">
                <div className="node-timestamp">09:30 AM</div>
                <div className="node-content-text">
                  <h5>Clay Preparation</h5>
                  <p>Learn the historical kneading and air-pocket removal processes necessary for structural integrity.</p>
                </div>
              </div>
              <div className="timeline-node-item">
                <div className="node-timestamp">10:30 AM</div>
                <div className="node-content-text">
                  <h5>On the Wheel</h5>
                  <p>Hands-on wheel instruction. Spend two hours crafting shapes under Laxmi's personalized master tracking.</p>
                </div>
              </div>
            </section>

            <section className="location-mapping-preview-section">
              <h4>Where you'll be</h4>
              <div className="map-placeholder-graphic">
                <span className="map-overlay-pin">📍 Pottery Square, Bhaktapur</span>
              </div>
            </section>

          </div>

          {/* Right Column Floating Booking Engine Ledger */}
          <div className="booking-engine-sticky-sidebar-pane">
            <div className="sticky-booking-checkout-card">
              <div className="price-header-line">
                <h2>NPR 2,500 <span className="per-person-unit">/ person</span></h2>
                <span className="rating-sidebar-inline">⭐ 4.98</span>
              </div>
              
              <form className="booking-parameters-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-input-field-group">
                  <label>DATE</label>
                  <input type="date" defaultValue="2026-06-15" />
                </div>
                <div className="form-input-field-group">
                  <label>GUESTS</label>
                  <select defaultValue="2">
                    <option value="1">1 Explorer</option>
                    <option value="2">2 Explorers</option>
                    <option value="3">3 Explorers</option>
                  </select>
                </div>
                <button type="submit" className="primary-booking-submit-cta">Book Experience</button>
              </form>
              
              <p className="no-charge-warning-notice">You won't be charged yet</p>
              
              <div className="price-breakdown-ledger-summary">
                <div className="ledger-row"><span>NPR 2,500 x 2 guests</span><span>NPR 5,000</span></div>
                <div className="ledger-row"><span>HiddenPaths service fee</span><span>NPR 450</span></div>
                <div className="ledger-row total-row"><span>Total</span><span>NPR 5,450</span></div>
              </div>

              <div className="impact-endorsement-banner-pill">
                🌱 Highly Rated: This experience is steady top tier-rated across sustainable metrics.
              </div>
            </div>
          </div>

        </div>

        <hr className="section-divider-line" />

        {/* Consolidated Community Review / Feedback Engine */}
        <section className="community-reviews-presentation-section">
          <div className="reviews-section-header-row">
            <h2>Reviews (125)</h2>
            {/* Dynamic Button Handler converts Explore Page layout into Review Entry field */}
            <button 
              className="write-review-trigger-action-btn"
              onClick={scrollToReview}
            >
              ✍️ Write a Review
            </button>
          </div>

          <div className="reviews-cards-masonry-layout">
            <div className="individual-feedback-bubble-card">
              <div className="reviewer-identity-bar">
                <div className="reviewer-avatar">MT</div>
                <div>
                  <h6>Mark T.</h6>
                  <p className="review-date">London, UK • Oct 2024</p>
                </div>
                <span className="stars-output">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="review-body-text">Spending an afternoon with Laxmi was the absolute highlight of our trip. She is patient, incredibly skilled, and the tea she served was the best we had in Bhaktapur.</p>
            </div>

            <div className="individual-feedback-bubble-card">
              <div className="reviewer-identity-bar">
                <div className="reviewer-avatar">SL</div>
                <div>
                  <h6>Sarah L.</h6>
                  <p className="review-date">Toronto, CA • Sept 2024</p>
                </div>
                <span className="stars-output">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="review-body-text">The workshop is tucked away in a beautiful courtyard. Laxmi's stories about her family's history made the experience feel so personal and authentic. Highly recommend!</p>
            </div>
          </div>

          <button className="load-all-reviews-outline-btn">Show all 125 reviews</button>

          {/* Inline Action Target Drawer Element */}
          <div 
            ref={reviewSectionRef} 
            className={`dynamic-review-composer-form-drawer ${showReviewForm ? 'expanded-visible' : 'collapsed-hidden'}`}
          >
            {showReviewForm && (
              <div className="review-card-cardboard-wrapper animate-slide-up-quick">
                <div className="review-form-header">
                  <div className="experience-thumbnail-mini">🏺</div>
                  <div>
                    <h5>Traditional Newari Pottery Workshop</h5>
                    <p>Community Experience • Bhaktapur</p>
                  </div>
                </div>

                <h3 className="composer-headline-prompt">How was your experience?</h3>
                
                {/* Interactive Rating Component */}
                <div className="star-rating-interactive-row">
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <span
                      key={starIndex}
                      className={`interactive-star-unit ${starIndex <= (hoverRating || rating) ? 'filled-star' : 'empty-star'}`}
                      onClick={() => setRating(starIndex)}
                      onMouseEnter={() => setHoverRating(starIndex)}
                      onMouseLeave={() => setHoverRating(0)}
                      role="button"
                      aria-label={`Rate ${starIndex} Stars`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <form className="inner-review-inputs-control" onSubmit={(e) => { e.preventDefault(); alert("Review submitted gracefully!"); }}>
                  <textarea 
                    placeholder="Share your personal narrative about the host, workshop pace, and community environment to help future mindful travelers..." 
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  />
                  
                  <div className="image-uploader-dashed-container">
                    <span className="upload-icon-vector">📷</span>
                    <p className="upload-main-text">Add Photos</p>
                    <p className="upload-sub-text">Drag and drop or click to upload</p>
                  </div>

                  <div className="form-drawer-footer-actions-row">
                    <button 
                      type="button" 
                      className="cancel-form-btn" 
                      onClick={() => setShowReviewForm(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="submit-review-cta-btn">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Global Brand Footer Layer */}
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
            <div className="footer-subscribe-input-form-control">
              <input type="email" placeholder="Your email address" readOnly />
              <button type="button">Subscribe</button>
            </div>
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