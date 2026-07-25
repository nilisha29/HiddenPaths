import React from "react";
import { Link } from "react-router-dom";
import { RatingLine } from "./StarRating";
import { resolveImage } from "../../utils/imageUrl";
import "../../styles/experienceCard.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=600&q=80";

const ExperienceCard = ({ experience, onToggleWishlist, isWishlisted }) => {
  const image = experience.images?.[0] ? resolveImage(experience.images[0]) : FALLBACK_IMAGE;

  return (
    <div className="card experience-card">
      <div className="experience-card-media">
        <img src={image} alt={experience.title} />
        <span className="experience-card-price-badge">
          NPR {experience.price?.toLocaleString()}
        </span>
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleWishlist(experience._id);
            }}
            className="experience-card-wishlist"
            aria-label="Toggle wishlist"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isWishlisted ? "#B5471B" : "none"}
              stroke="#B5471B"
              strokeWidth="1.8"
            >
              <path d="M12 21s-7.5-4.6-10-9.1C.4 8.5 2 5 5.6 5c2 0 3.4 1.1 4.4 2.6C11 6.1 12.4 5 14.4 5 18 5 19.6 8.5 22 11.9 19.5 16.4 12 21 12 21z" />
            </svg>
          </button>
        )}
      </div>
      <div className="experience-card-body">
        <div className="experience-card-toprow">
          <span className="experience-card-location">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 21s7-6.4 7-12a7 7 0 10-14 0c0 5.6 7 12 7 12z" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            {experience.location}
          </span>
          <Link to={`/explore/${experience._id}`} className="experience-card-view-btn">
            View Details
          </Link>
        </div>

        <h3 className="experience-card-title">{experience.title}</h3>
        <p className="experience-card-desc">
          {experience.description?.slice(0, 90)}
          {experience.description?.length > 90 ? "..." : ""}
        </p>

        <div className="experience-card-divider" />

        <div className="experience-card-footer">
          <span className="experience-card-duration">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            {experience.duration || `${experience.durationDays || 1} day(s)`}
          </span>
          <RatingLine rating={experience.rating} />
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
