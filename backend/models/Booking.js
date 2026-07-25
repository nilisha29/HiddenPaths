import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
    guideId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    referenceNumber: { type: String, unique: true },
    // Correlates an in-progress eSewa redirect back to this booking
    // (eSewa's callback only gives us the transaction_uuid we sent it).
    transactionUuid: { type: String },
    fullName: { type: String, default: "" },
    email: { type: String, default: "" },
    date: { type: Date, required: [true, "Booking date is required"] },
    numberOfPeople: { type: Number, required: true, min: 1 },
    extras: [
      {
        name: { type: String },
        price: { type: Number, default: 0 },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid" },
    contactPhone: { type: String, default: "" },
    notes: { type: String, default: "" },
    isReviewed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

bookingSchema.pre("save", function (next) {
  if (!this.referenceNumber) {
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    this.referenceNumber = `HP-${year}-${rand}`;
  }
  next();
});

export default mongoose.model("Booking", bookingSchema);
