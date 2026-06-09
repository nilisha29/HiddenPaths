import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';
import '../styles/home.css';
import '../styles/explore.css';

export default function Explore() {
  const navigate = useNavigate();
  const [maxPrice, setMaxPrice] = useState(2000);
  const [activeDuration, setActiveDuration] = useState('4-7 Days');

  // Unified sample database items structured for the 3-column view
  const experiences = [
    {
      title: "The Potter's Path: Clay & Community",
      location: "Langtang Valley",
      priceBadge: "$450",
      duration: "5 Days",
      rating: "4.9",
      snippet: "Spend three days living with local artisans, learning traditional techniques...",
      img: "https://images.unsplash.com/photo-1565192647048-f997ed87f5e2?q=80&w=600"
    },
    {
      title: "The Forbidden Kingdom Trek",
      location: "Upper Mustang",
      priceBadge: "$450",
      duration: "12 Days",
      rating: "4.9",
      snippet: "A journey through a high-altitude desert to the walled city of Lo Manthang, a place of red...",
      img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600"
    },
    {
      title: "Monastery Silent Retreat",
      location: "Upper Mustang",
      priceBadge: "$820",
      duration: "7 Days",
      rating: "5.0",
      snippet: "A journey into the self. Seven days of guided meditation and monastic lifestyle alignment...",
      img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600"
    },
    {
      title: "Hearth & Harvest: Cooking",
      location: "Kathmandu Valley",
      priceBadge: "$310",
      duration: "2 Days",
      rating: "4.8",
      snippet: "Learn the secrets of Himalayan spices. Visit local spice markets and assemble dynamic home recipes...",
      img: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=600"
    },
    {
      title: "The Potter's Path: Clay & Community",
      location: "Langtang Valley",
      priceBadge: "$450",
      duration: "5 Days",
      rating: "4.9",
      snippet: "Spend three days living with local artisans, learning traditional throw and kiln styles...",
      img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600"
    },
    {
      title: "The Green Gold Experience",
      location: "Ilam Hills",
      priceBadge: "$590",
      duration: "4 Days",
      rating: "4.7",
      snippet: "Walk through rolling tea gardens, help with the morning harvest, and master artisan tea processing...",
      img: "https://images.unsplash.com/photo-1563889362352-b0492c225f62?q=80&w=600"
    }
  ];

  return (
    <div style={{ backgroundColor: '#FFFDF9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Application Header Navbar */}
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

      {/* Main Split Layout Workspace */}
      <div className="explore-layout" style={{ flex: '1 0 auto' }}>
        
        {/* Left Filters Selection Block */}
        <aside className="filter-sidebar-card">
          <div className="sidebar-title-row">
            <h3>Filters</h3>
            <button className="btn-clear-filters">Clear all</button>
          </div>

          {/* Categories Option Group */}
          <div className="filter-group-box">
            <h4>Categories</h4>
            <label className="checkbox-row-item">
              <input type="checkbox" defaultChecked />
              <span>Mountain Treks</span>
            </label>
            <label className="checkbox-row-item">
              <input type="checkbox" />
              <span>Cultural Immersion</span>
            </label>
            <label className="checkbox-row-item">
              <input type="checkbox" />
              <span>Artisan Workshops</span>
            </label>
            <label className="checkbox-row-item">
              <input type="checkbox" />
              <span>Wellness Retreats</span>
            </label>
          </div>

          {/* Slider Adjustment Price Group */}
          <div className="filter-group-box">
            <h4>Price Range</h4>
            <input 
              type="range" 
              min="50" 
              max="2000" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{ width: '100%', accentColor: '#A8441B' }}
            />
            <div className="price-range-labels">
              <span>$50</span>
              <span>$2000+</span>
            </div>
          </div>

          {/* Ratings Radio Button Segment */}
          <div className="filter-group-box">
            <h4>Rating</h4>
            <label className="checkbox-row-item">
              <input type="radio" name="rating-select" defaultChecked />
              <span>★ 4.5 &amp; up</span>
            </label>
          </div>

          {/* Track Filter Duration Options */}
          <div className="filter-group-box">
            <h4>Duration</h4>
            <div className="duration-selector-column">
              {['1-3 Days', '4-7 Days', '8+ Days'].map((dur, i) => (
                <button 
                  key={i} 
                  className={`duration-chip-btn ${activeDuration === dur ? 'active' : ''}`}
                  onClick={() => setActiveDuration(dur)}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Dynamic Stream Dashboard Display */}
        <main className="explore-main-display">
          
          <div className="explore-header-titles">
            <h2>Curated Experiences</h2>
            <p>Showing 24 authentic paths through the Nepal landscape.</p>
          </div>

          {/* Upper Action Tools Controls Container Bar */}
          <div className="search-sort-bar">
            <div className="explore-search-input-wrapper">
              <span className="search-glass-icon">🔍</span>
              <input type="text" placeholder="Search paths..." />
            </div>
            <div className="sort-container-wrapper">
              <span>SORT BY:</span>
              <select className="sort-select-dropdown">
                <option>Most Authentic</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Capsule Tracker Pill Tags Row Layout */}
          <div className="active-pill-row">
            <div className="active-filter-badge">
              <span>Mountain Treks</span>
              <button>×</button>
            </div>
            <div className="active-filter-badge">
              <span>4-7 Days</span>
              <button>×</button>
            </div>
            <div className="active-filter-badge">
              <span>Under $800</span>
              <button>×</button>
            </div>
          </div>

          {/* Card Results List Block Grid Matrix */}
          <div className="explore-grid-layout">
            {experiences.map((exp, index) => (
              <div key={index} className="explore-card-wrapper">
                
                {/* Image Wrap Layer with Price Tag Display overlay */}
                <div className="card-image-container">
                  <img src={exp.img} alt={exp.title} />
                  <span className="card-price-overlay">{exp.priceBadge}</span>
                </div>

                {/* Main Descriptive Info Content Area */}
                <div className="card-content-body">
                  <div className="card-location-row">
                    <span className="card-location-text">📍 {exp.location}</span>
                    <button className="btn-view-details">View Details</button>
                  </div>

                  <h3 className="card-main-title">{exp.title}</h3>
                  <p className="card-description-snippet">{exp.snippet}</p>

                  {/* Horizontal Meta Separator Footer Layer Line */}
                  <div className="card-meta-footer">
                    <span>🕒 {exp.duration}</span>
                    <span className="card-meta-rating"><span>★</span> {exp.rating}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Numerical Page Stepper Controls Pagination Navigation */}
          <div className="pagination-nav-container">
            <button className="pagination-btn-step">&lt;</button>
            <button className="pagination-btn-step active">1</button>
            <button className="pagination-btn-step">2</button>
            <button className="pagination-btn-step">3</button>
            <button className="pagination-btn-step">...</button>
            <button className="pagination-btn-step">8</button>
            <button className="pagination-btn-step">&gt;</button>
          </div>

        </main>
      </div>

      {/* Global Shared Platform Layout Footer System block */}
      <footer className="main-footer" style={{ flexShrink: 0, marginTop: '4rem' }}>
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