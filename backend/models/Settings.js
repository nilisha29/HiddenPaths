import mongoose from "mongoose";

// Singleton document holding platform-wide configuration, editable by admin.
const settingsSchema = new mongoose.Schema(
  {
    platformName: { type: String, default: "HiddenPaths" },
    supportEmail: { type: String, default: "support@hiddenpaths.com" },
    commissionRate: { type: Number, default: 10 }, // percent
    bookingCancellationWindowHours: { type: Number, default: 48 },
    maintenanceMode: { type: Boolean, default: false },
    announcement: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
