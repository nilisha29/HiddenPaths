import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    images: [{ type: String }],
    guideReply: { type: String, default: "" },
  },
  { timestamps: true }
);

reviewSchema.index({ userId: 1, experienceId: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
