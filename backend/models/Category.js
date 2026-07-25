import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Category name is required"], unique: true, trim: true },
    icon: { type: String, default: "" },
    slug: { type: String, unique: true, lowercase: true },
  },
  { timestamps: true }
);

categorySchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = this.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  next();
});

export default mongoose.model("Category", categorySchema);
