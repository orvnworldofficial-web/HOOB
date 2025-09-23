import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// Remove this line: import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import waitlistRoutes from "./routes/waitlistRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import broadcastRoutes from "./routes/broadcastRoutes.js";
import adminRoutes from "./routes/admin.js";

// Remove this line: dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/waitlist", waitlistRoutes);
app.use("/contact", contactRoutes);
app.use("/send-broadcast", broadcastRoutes);
app.use("/admin", adminRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));