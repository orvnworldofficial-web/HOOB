import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  message: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Contact", contactSchema);
