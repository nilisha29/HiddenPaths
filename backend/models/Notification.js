import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: [
        "booking_created",
        "booking_confirmed",
        "booking_cancelled",
        "guide_approved",
        "guide_rejected",
        "experience_approved",
        "experience_removed",
        "new_review",
        "general",
      ],
      default: "general",
    },
    message: { type: String, required: true },
    link: { type: String, default: "" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
