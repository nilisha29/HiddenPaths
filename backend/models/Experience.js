import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: { type: String, required: [true, "Description is required"] },
    price: { type: Number, required: [true, "Price is required"], min: 0 },
    images: [{ type: String }],
    location: { type: String, required: [true, "Location is required"] },
    meetingPoint: { type: String, default: "" },
    // Real coordinates for the "Where you'll be" map (OpenStreetMap/Leaflet,
    // no API key required). Defaults to central Kathmandu.
    latitude: { type: Number, default: 27.7172 },
    longitude: { type: Number, default: 85.324 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    guideId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    duration: { type: String, default: "" },
    durationDays: { type: Number, default: 1 },
    groupSize: { type: Number, default: 1 },
    availableSeats: { type: Number, default: 10 },
    highlights: [{ type: String }],
    included: [{ type: String }],
    excluded: [{ type: String }],
    itinerary: [
      {
        time: { type: String },
        title: { type: String },
        description: { type: String },
      },
    ],
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    availableDates: [{ type: Date }],
    cancellationPolicy: {
      type: String,
      default: "Free cancellation up to 48 hours before the experience starts.",
    },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    isApproved: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
  },
  { timestamps: true }
);

experienceSchema.index({ title: "text", location: "text", description: "text" });

export default mongoose.model("Experience", experienceSchema);
