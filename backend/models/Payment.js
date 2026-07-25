import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["card", "esewa", "khalti"], required: true },
    status: { type: String, enum: ["success", "failed"], default: "success" },
    transactionId: { type: String, unique: true },
  },
  { timestamps: true }
);

paymentSchema.pre("save", function (next) {
  if (!this.transactionId) {
    this.transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }
  next();
});

export default mongoose.model("Payment", paymentSchema);
