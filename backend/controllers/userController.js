import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";

// @desc    Update logged-in user's profile (optionally replacing photo)
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.phone = req.body.phone || user.phone;
  if (req.file) user.profileImage = `/uploads/${req.file.filename}`;
  if (req.body.password) user.password = req.body.password;

  const updated = await user.save();

  res.json({
    success: true,
    data: {
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      profileImage: updated.profileImage,
      phone: updated.phone,
      interests: updated.interests,
    },
  });
});

// @desc    Get logged-in user's booking history
// @route   GET /api/users/bookings
// @access  Private
export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ userId: req.user._id })
    .populate({
      path: "experienceId",
      select: "title images location price durationDays category",
      populate: { path: "category", select: "name icon" },
    })
    .populate("guideId", "name profileImage")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: bookings.length, data: bookings });
});

// @desc    Get logged-in user's wishlist
// @route   GET /api/users/wishlist
// @access  Private
export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "wishlist",
    match: { isApproved: true },
    populate: { path: "category", select: "name icon" },
  });
  res.json({ success: true, data: user.wishlist });
});

// @desc    Add experience to wishlist
// @route   POST /api/users/wishlist/:experienceId
// @access  Private
export const addToWishlist = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.experienceId);
  if (!experience) {
    res.status(404);
    throw new Error("Experience not found");
  }
  const user = await User.findById(req.user._id);
  if (user.wishlist.includes(req.params.experienceId)) {
    res.status(400);
    throw new Error("Experience already in wishlist");
  }
  user.wishlist.push(req.params.experienceId);
  await user.save();
  res.json({ success: true, message: "Added to wishlist", data: user.wishlist });
});

// @desc    Remove experience from wishlist
// @route   DELETE /api/users/wishlist/:experienceId
// @access  Private
export const removeFromWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.wishlist = user.wishlist.filter((id) => id.toString() !== req.params.experienceId);
  await user.save();
  res.json({ success: true, message: "Removed from wishlist", data: user.wishlist });
});

// @desc    Aggregated data for the logged-in user's Home page: next upcoming
//          trip, simple "impact" stats, and interest-based recommendations.
// @route   GET /api/users/home-summary
// @access  Private
export const getHomeSummary = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // Next upcoming confirmed/pending booking
  const nextBooking = await Booking.findOne({
    userId: user._id,
    status: { $in: ["pending", "confirmed"] },
    date: { $gte: new Date() },
  })
    .sort({ date: 1 })
    .populate("experienceId", "title images location durationDays")
    .populate("guideId", "name profileImage");

  // "Your Impact" — simple counts derived from completed/confirmed bookings
  const impactBookings = await Booking.find({
    userId: user._id,
    status: { $in: ["confirmed", "completed"] },
  }).populate("guideId", "_id");

  const uniqueGuides = new Set(impactBookings.map((b) => b.guideId?._id?.toString()));
  const totalDays = await Experience.find({
    _id: { $in: impactBookings.map((b) => b.experienceId) },
  }).then((exps) => exps.reduce((sum, e) => sum + (e.durationDays || 1), 0));

  const impact = {
    artisanFamilies: uniqueGuides.size,
    daysOfLocalWork: totalDays,
    experiencesCompleted: impactBookings.filter((b) => b.status === "completed").length,
  };

  // Handpicked recommendations based on the user's chosen interests,
  // matched against category name (case-insensitive) or experience title/description.
  // Capped at 3 to match the homepage layout (one row of 3 cards).
  let handpicked = [];
  if (user.interests && user.interests.length > 0) {
    const Category = (await import("../models/Category.js")).default;
    const matchingCategories = await Category.find({
      name: { $regex: user.interests.join("|"), $options: "i" },
    }).select("_id");

    handpicked = await Experience.find({
      isApproved: true,
      isActive: true,
      category: { $in: matchingCategories.map((c) => c._id) },
    })
      .populate("category", "name icon")
      .populate("guideId", "name profileImage")
      .limit(3);
  }

  // Fallback: top-rated experiences if no interests set or no matches yet
  if (handpicked.length === 0) {
    handpicked = await Experience.find({ isApproved: true, isActive: true })
      .populate("category", "name icon")
      .populate("guideId", "name profileImage")
      .sort({ rating: -1 })
      .limit(3);
  }

  // "From the Journal" preview — 2 most recent posts
  const Journal = (await import("../models/Journal.js")).default;
  const journals = await Journal.find({ isPublished: true }).sort({ createdAt: -1 }).limit(2);

  res.json({
    success: true,
    data: {
      name: user.name,
      profileImage: user.profileImage,
      nextBooking,
      impact,
      handpicked,
      journals,
    },
  });
});
