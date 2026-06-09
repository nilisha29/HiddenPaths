import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/reviewPage.css';

export default function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { experienceName } = location.state || { experienceName: "Experience" };

  return (
    <div className="review-page">
      <nav className="auth-nav">
        <a href="#" onClick={() => navigate('/home')} className="logo">HiddenPaths</a>
      </nav>

      <div className="review-card-container">
        <div className="review-card">
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
          
          <div className="review-header">
            <h1 className="serif-title">How was your experience?</h1>
            <p className="subtitle">{experienceName}</p>
          </div>

          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= (hover || rating) ? 'active' : ''}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            ))}
          </div>

          <form className="review-form">
            <div className="form-group">
              <label>Tell us your story</label>
              <textarea 
                placeholder="Share details about the atmosphere, the host, or your favorite moment..."
                rows="6"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Add photos (Optional)</label>
              <div className="upload-placeholder">
                <span>📷 Click to upload field notes</span>
              </div>
            </div>

            <button 
              type="button" 
              className="submit-review-btn" 
              onClick={() => {
                alert('Review submitted successfully!');
                navigate(-1);
              }}
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}