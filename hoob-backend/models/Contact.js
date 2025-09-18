import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String },
    message: { type: String },
    tags: [{ type: String }], // e.g. ["waitlist", "newsletter", "contact"]
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
