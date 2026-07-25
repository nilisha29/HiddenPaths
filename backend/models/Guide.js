import mongoose from "mongoose";

const guideProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    bio: { type: String, default: "", maxlength: 1000 },
    location: { type: String, default: "" },
    languages: [{ type: String }],
    certifications: [{ type: String }],
    specialties: [{ type: String }],
    yearsOfExperience: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: "Experience" }],
    coverImage: { type: String, default: "" },
    responseTime: { type: String, default: "Responds within a day" },
    isVerified: { type: Boolean, default: false },
    socialLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      website: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Guide", guideProfileSchema);
