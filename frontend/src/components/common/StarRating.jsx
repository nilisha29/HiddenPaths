import React from "react";

const StarIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path
      d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5z"
      fill="#D9A441"
      stroke="#D9A441"
    />
  </svg>
);

export const RatingLine = ({ rating, numReviews, size = 14 }) => (
  <div className="rating-line">
    <StarIcon size={size} />
    <span className="rating-value">{Number(rating || 0).toFixed(1)}</span>
    {numReviews !== undefined && <span className="rating-count">({numReviews} reviews)</span>}
  </div>
);

export const StarSelector = ({ value, onChange, size = 28 }) => (
  <div className="star-selector">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        type="button"
        key={n}
        onClick={() => onChange(n)}
        className="star-selector-btn"
        aria-label={`${n} star`}
      >
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
          <path
            d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5z"
            fill={n <= value ? "#D9A441" : "none"}
            stroke="#D9A441"
          />
        </svg>
      </button>
    ))}
  </div>
);

export default StarIcon;
