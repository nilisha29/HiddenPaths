import asyncHandler from "express-async-handler";
import Review from "../models/Review.js";
import Experience from "../models/Experience.js";
import Guide from "../models/Guide.js";
import Booking from "../models/Booking.js";
import createNotification from "../services/notificationService.js";

const recalculateExperienceRating = async (experienceId) => {
  const reviews = await Review.find({ experienceId });
  const numReviews = reviews.length;
  const rating = numReviews > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / numReviews : 0;
  await Experience.findByIdAndUpdate(experienceId, { rating: rating.toFixed(1), numReviews });
};

const recalculateGuideRating = async (guideId) => {
  const experiences = await Experience.find({ guideId });
  const rated = experiences.filter((e) => e.numReviews > 0);
  const numReviews = rated.reduce((s, e) => s + e.numReviews, 0);
  const rating =
    numReviews > 0 ? rated.reduce((s, e) => s + e.rating * e.numReviews, 0) / numReviews : 0;
  await Guide.findOneAndUpdate(
    { userId: guideId },
    { rating: rating.toFixed(1), numReviews }
  );
};

// @desc    Create a review (must have a confirmed/completed booking; one per user/experience)
// @route   POST /api/reviews
// @access  Private (user)
export const createReview = asyncHandler(async (req, res) => {
  const { experienceId, bookingId, rating, comment } = req.body;

  const experience = await Experience.findById(experienceId);
  if (!experience) {
    res.status(404);
    throw new Error("Experience not found");
  }

  const hasBooked = await Booking.findOne({
    userId: req.user._id,
    experienceId,
    status: { $in: ["confirmed", "completed"] },
  });
  if (!hasBooked) {
    res.status(403);
    throw new Error("You can only review experiences you have booked");
  }

  const alreadyReviewed = await Review.findOne({ userId: req.user._id, experienceId });
  if (alreadyReviewed) {
    res.status(400);
    throw new Error("You have already reviewed this experience");
  }

  const images = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];

  const review = await Review.create({
    userId: req.user._id,
    experienceId,
    bookingId: bookingId || hasBooked._id,
    rating,
    comment,
    images,
  });

  experience.reviews.push(review._id);
  await experience.save();

  if (bookingId || hasBooked) {
    await Booking.findByIdAndUpdate(bookingId || hasBooked._id, { isReviewed: true });
  }

  await recalculateExperienceRating(experienceId);
  await recalculateGuideRating(experience.guideId);

  await createNotification({
    userId: experience.guideId,
    type: "new_review",
    message: `New review on "${experience.title}".`,
    link: `/explore/${experience._id}`,
  });

  res.status(201).json({ success: true, data: review });
});

// @desc    Get all reviews for an experience
// @route   GET /api/reviews/experience/:experienceId
// @access  Public
export const getReviewsForExperience = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ experienceId: req.params.experienceId })
    .populate("userId", "name profileImage")
    .sort({ createdAt: -1 });
  res.json({ success: true, count: reviews.length, data: reviews });
});

// @desc    Guide replies to a review on their experience
// @route   PUT /api/reviews/:id/reply
// @access  Private (guide - owner of the experience)
export const replyToReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id).populate("experienceId");
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }
  if (review.experienceId.guideId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to reply to this review");
  }
  review.guideReply = req.body.reply;
  await review.save();
  res.json({ success: true, data: review });
});

// @desc    Delete own review
// @route   DELETE /api/reviews/:id
// @access  Private (user - owner only)
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }
  if (review.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this review");
  }

  const experience = await Experience.findById(review.experienceId);
  await review.deleteOne();

  if (experience) {
    experience.reviews = experience.reviews.filter((r) => r.toString() !== req.params.id);
    await experience.save();
    await recalculateExperienceRating(experience._id);
    await recalculateGuideRating(experience.guideId);
  }

  res.json({ success: true, message: "Review deleted" });
});
