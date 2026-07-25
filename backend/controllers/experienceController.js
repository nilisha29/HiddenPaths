import asyncHandler from "express-async-handler";
import Experience from "../models/Experience.js";
import Guide from "../models/Guide.js";

// @desc    Browse/search/filter approved & active experiences
// @route   GET /api/experiences
// @access  Public
export const getExperiences = asyncHandler(async (req, res) => {
  const {
    category,
    location,
    minPrice,
    maxPrice,
    minRating,
    duration,
    search,
    sort,
    page = 1,
    limit = 12,
  } = req.query;

  const query = { isApproved: true, isActive: true };

  if (category) query.category = category;
  if (location) query.location = { $regex: location, $options: "i" };
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (minRating) query.rating = { $gte: Number(minRating) };
  if (duration === "short") query.durationDays = { $lte: 3 };
  if (duration === "medium") query.durationDays = { $gte: 4, $lte: 7 };
  if (duration === "long") query.durationDays = { $gte: 8 };
  if (search) {
    const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "i");
    query.$or = [{ title: regex }, { location: regex }, { description: regex }];
  }

  let sortOption = { createdAt: -1 };
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };
  if (sort === "rating") sortOption = { rating: -1 };
  if (sort === "popular") sortOption = { numReviews: -1 };

  const skip = (Number(page) - 1) * Number(limit);

  const [experiences, total] = await Promise.all([
    Experience.find(query)
      .populate("category", "name icon")
      .populate("guideId", "name profileImage")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit)),
    Experience.countDocuments(query),
  ]);

  res.json({
    success: true,
    count: experiences.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: experiences,
  });
});

// @desc    Single experience detail (+ populated reviews)
// @route   GET /api/experiences/:id
// @access  Public
export const getExperienceById = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id)
    .populate("category", "name icon")
    .populate("guideId", "name profileImage")
    .populate({
      path: "reviews",
      populate: { path: "userId", select: "name profileImage" },
      options: { sort: { createdAt: -1 } },
    });

  if (!experience) {
    res.status(404);
    throw new Error("Experience not found");
  }

  res.json({ success: true, data: experience });
});

// @desc    Create new experience (guide, must be approved)
// @route   POST /api/experiences
// @access  Private (guide)
export const createExperience = asyncHandler(async (req, res) => {
  if (req.user.guideStatus !== "approved") {
    res.status(403);
    throw new Error("Your guide account is not yet approved by the admin.");
  }

  const images = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];

  const payload = { ...req.body, guideId: req.user._id, isApproved: false, status: "draft" };
  ["highlights", "included", "excluded", "itinerary", "faqs", "availableDates"].forEach((f) => {
    if (typeof payload[f] === "string") {
      try {
        payload[f] = JSON.parse(payload[f]);
      } catch {
        // leave as-is if it wasn't JSON (e.g. comma-separated string)
        payload[f] = payload[f].split(",").map((s) => s.trim()).filter(Boolean);
      }
    }
  });
  if (images.length > 0) payload.images = images;

  const experience = await Experience.create(payload);

  await Guide.findOneAndUpdate(
    { userId: req.user._id },
    { $push: { experiences: experience._id } }
  );

  res.status(201).json({ success: true, data: experience });
});

// @desc    Update own experience
// @route   PUT /api/experiences/:id
// @access  Private (guide - owner only)
export const updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    res.status(404);
    throw new Error("Experience not found");
  }
  if (experience.guideId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this experience");
  }

  const updatableFields = [
    "title",
    "description",
    "price",
    "location",
    "meetingPoint",
    "latitude",
    "longitude",
    "category",
    "duration",
    "durationDays",
    "groupSize",
    "availableSeats",
    "highlights",
    "included",
    "excluded",
    "itinerary",
    "faqs",
    "availableDates",
    "cancellationPolicy",
    "isActive",
    "status",
  ];

  updatableFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      let value = req.body[field];
      if (
        ["highlights", "included", "excluded", "itinerary", "faqs", "availableDates"].includes(field) &&
        typeof value === "string"
      ) {
        try {
          value = JSON.parse(value);
        } catch {
          value = value.split(",").map((s) => s.trim()).filter(Boolean);
        }
      }
      experience[field] = value;
    }
  });

  if (req.files && req.files.length > 0) {
    experience.images = req.files.map((f) => `/uploads/${f.filename}`);
  }

  experience.isApproved = false; // any edit requires re-approval
  const updated = await experience.save();
  res.json({ success: true, data: updated });
});

// @desc    Delete own experience
// @route   DELETE /api/experiences/:id
// @access  Private (guide - owner only)
export const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    res.status(404);
    throw new Error("Experience not found");
  }
  if (experience.guideId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this experience");
  }

  await experience.deleteOne();
  await Guide.findOneAndUpdate(
    { userId: req.user._id },
    { $pull: { experiences: experience._id } }
  );

  res.json({ success: true, message: "Experience deleted" });
});

// @desc    Logged-in guide's own experiences (any status)
// @route   GET /api/experiences/me/all
// @access  Private (guide)
export const getMyExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find({ guideId: req.user._id })
    .populate("category", "name icon")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: experiences.length, data: experiences });
});
