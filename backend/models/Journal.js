import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    content: { type: String, required: [true, "Content is required"] },
    // Short italic pull-quote shown on preview cards (Home/Landing/Journal list)
    excerpt: { type: String, default: "" },
    image: { type: String, default: "" },
    authorName: { type: String, required: true },
    authorImage: { type: String, default: "" },
    // e.g. "Visited Lo Manthang" — shown under the author name on preview cards
    visitedLocation: { type: String, default: "" },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Journal", journalSchema);
