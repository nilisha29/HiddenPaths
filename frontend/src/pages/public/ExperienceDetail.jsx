import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../../components/common/Layout";
import MapView from "../../components/common/MapView";
import { RatingLine, StarSelector } from "../../components/common/StarRating";
import experienceService from "../../services/experienceService";
import reviewService from "../../services/reviewService";
import userService from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import { resolveImage } from "../../utils/imageUrl";
import { useToast } from "../../context/ToastContext";
import "../../styles/experienceDetail.css";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=1200&q=80";

const ExperienceDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reviewSectionRef = useRef(null);

  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewError, setReviewError] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setLoading(true);
    experienceService
      .getById(id)
      .then((res) => setExperience(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  // Support being deep-linked here from My Bookings' "Write review" button,
  // or from the "Write a Review" button further down this same page.
  useEffect(() => {
    if (searchParams.get("review") === "1" && reviewSectionRef.current) {
      setShowReviewForm(true);
      setTimeout(() => reviewSectionRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }, [searchParams, experience]);

  if (loading) {
    return (
      <Layout>
        <div className="loading-state">Loading experience...</div>
      </Layout>
    );
  }

  if (!experience) {
    return (
      <Layout>
        <div className="empty-state">Experience not found.</div>
      </Layout>
    );
  }

  const images = experience.images?.length > 0 ? experience.images.map((i) => resolveImage(i)) : [FALLBACK_IMAGE];
  const total = experience.price * guests;

  const handleWishlist = async () => {
    if (!user) return navigate("/login");
    try {
      if (isWishlisted) {
        await userService.removeFromWishlist(experience._id);
        toast.success("Removed from wishlist.");
      } else {
        await userService.addToWishlist(experience._id);
        toast.success("Saved to wishlist.");
      }
      setIsWishlisted((v) => !v);
    } catch {
      toast.error("Could not update wishlist.");
    }
  };

  const handleBookNow = () => {
    if (!user) return navigate("/login");
    navigate(`/book/${experience._id}`, { state: { date, guests } });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setReviewError("");
    setSubmittingReview(true);
    try {
      const formData = new FormData();
      formData.append("experienceId", experience._id);
      formData.append("rating", reviewForm.rating);
      formData.append("comment", reviewForm.comment);
      await reviewService.create(formData);
      const res = await experienceService.getById(id);
      setExperience(res.data.data);
      setShowReviewForm(false);
      setReviewForm({ rating: 5, comment: "" });
      toast.success("Thanks for your review!");
    } catch (err) {
      const msg = err.response?.data?.message || "Could not submit review.";
      setReviewError(msg);
      toast.error(msg);
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <Layout>
      <div className="container detail-container">
        <div className="detail-header">
          <div>
            <h1>{experience.title}</h1>
            <div className="detail-meta">
              <RatingLine rating={experience.rating} numReviews={experience.numReviews} />
              <span className="detail-dot">•</span>
              <span className="text-muted">{experience.location}</span>
              <span className="badge badge-success">Verified Authenticity</span>
            </div>
          </div>
          <div className="detail-header-actions">
            <button className="btn btn-secondary btn-sm">Share</button>
            <button className="btn btn-secondary btn-sm" onClick={handleWishlist}>
              {isWishlisted ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        <div className="detail-gallery">
          <div className="detail-gallery-main">
            <img src={images[0]} alt={experience.title} />
          </div>
          <div className="detail-gallery-grid">
            {images.slice(1, 5).map((img, i) => (
              <img key={i} src={img} alt={`${experience.title} ${i + 2}`} />
            ))}
          </div>
        </div>

        <div className="detail-layout">
          <div className="detail-main">
            <div className="host-mini-card">
              <div className="host-mini-info">
                <div className="host-avatar">
                  {experience.guideId?.profileImage ? (
                    <img src={resolveImage(experience.guideId.profileImage)} alt={experience.guideId.name} />
                  ) : (
                    experience.guideId?.name?.[0]
                  )}
                </div>
                <div>
                  <p className="host-mini-label">Hosted by</p>
                  <p className="host-mini-name">{experience.guideId?.name}</p>
                </div>
              </div>
              <Link to={`/guides/${experience.guideId?._id}`} className="btn btn-secondary btn-sm">
                View Profile
              </Link>
            </div>

            <section className="detail-section">
              <h2>About the Experience</h2>
              <p className="detail-description">{experience.description}</p>
            </section>

            {(experience.included?.length > 0 || experience.excluded?.length > 0) && (
              <section className="detail-section">
                <h2>What's included</h2>
                <div className="included-grid">
                  {experience.included?.map((item, i) => (
                    <div key={`inc-${i}`} className="included-tile">
                      <span className="included-icon">✓</span> {item}
                    </div>
                  ))}
                  {experience.excluded?.map((item, i) => (
                    <div key={`exc-${i}`} className="included-tile excluded">
                      <span className="included-icon">✕</span> {item}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {experience.itinerary?.length > 0 && (
              <section className="detail-section">
                <h2>Itinerary</h2>
                <div className="itinerary-list">
                  {experience.itinerary.map((step, i) => (
                    <div key={i} className="itinerary-item">
                      <span className="itinerary-dot" />
                      <div>
                        <p className="itinerary-time">{step.time} • {step.title}</p>
                        <p className="text-muted">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {experience.faqs?.length > 0 && (
              <section className="detail-section">
                <h2>FAQs</h2>
                <div className="faq-list">
                  {experience.faqs.map((f, i) => (
                    <details key={i} className="faq-item">
                      <summary>{f.question}</summary>
                      <p className="text-muted">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <section className="detail-section">
              <h2>Where you'll be</h2>
              <MapView
                latitude={experience.latitude}
                longitude={experience.longitude}
                label={experience.meetingPoint || experience.location}
                height={280}
              />
              <p className="text-muted" style={{ fontSize: 13, marginTop: 10 }}>
                📍 {experience.meetingPoint || experience.location}
              </p>
            </section>

            <section className="detail-section" ref={reviewSectionRef}>
              <div className="section-heading" style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: 22 }}>
                  <RatingLine rating={experience.rating} numReviews={experience.numReviews} size={16} />
                </h2>
                {user?.role === "user" && !showReviewForm && (
                  <button className="btn btn-primary btn-sm" onClick={() => setShowReviewForm(true)}>
                    Write a Review
                  </button>
                )}
              </div>

              <div className="review-list">
                {experience.reviews?.length === 0 && <p className="text-muted">No reviews yet.</p>}
                {experience.reviews?.map((r) => (
                  <div key={r._id} className="review-item">
                    <div className="review-item-header">
                      <span className="review-avatar">{r.userId?.name?.[0]}</span>
                      <div>
                        <p className="review-author">{r.userId?.name}</p>
                        <RatingLine rating={r.rating} />
                      </div>
                    </div>
                    <p className="text-muted">{r.comment}</p>
                    {r.guideReply && (
                      <div className="review-reply">
                        <strong>Host reply:</strong> {r.guideReply}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="review-form">
                  <h3 style={{ marginBottom: 12 }}>How was your experience?</h3>
                  {reviewError && <div className="form-error">{reviewError}</div>}
                  <StarSelector value={reviewForm.rating} onChange={(v) => setReviewForm((f) => ({ ...f, rating: v }))} />
                  <textarea
                    className="textarea-field"
                    style={{ marginTop: 16 }}
                    rows={4}
                    placeholder="Share your experience with future travelers..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
                    required
                  />
                  <div className="flex gap-2" style={{ marginTop: 16 }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowReviewForm(false)}>
                      Cancel
                    </button>
                    <button type="submit" disabled={submittingReview} className="btn btn-primary">
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>

          <aside className="booking-widget">
            <div className="booking-widget-price">
              NPR {experience.price?.toLocaleString()} <span>/ person</span>
              <span className="booking-widget-rating"><RatingLine rating={experience.rating} /></span>
            </div>

            <div className="field-group">
              <label className="field-label">Date</label>
              <input type="date" className="input-field" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="field-group">
              <label className="field-label">Guests</label>
              <div className="guest-stepper">
                <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))}>−</button>
                <span>{guests} guests</span>
                <button type="button" onClick={() => setGuests((g) => g + 1)}>+</button>
              </div>
            </div>

            <button className="btn btn-primary btn-block" onClick={handleBookNow}>
              Book Experience
            </button>
            <p className="text-center text-muted" style={{ fontSize: 12, marginTop: 8 }}>
              You won't be charged yet
            </p>

            <div className="booking-widget-breakdown">
              <div className="flex justify-between">
                <span className="text-muted">NPR {experience.price} x {guests} guests</span>
                <span>NPR {total.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-between booking-widget-total">
              <span>Total</span>
              <span>NPR {total.toLocaleString()}</span>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default ExperienceDetail;
