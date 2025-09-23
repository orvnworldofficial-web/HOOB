import User from "../models/User.js";
import { sendEmail } from "../utils/mailer.js";

// POST /admin/create
// Only accessible by admin users
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const admin = await User.create({ name, email, password, role: "admin", verified: true });

    await sendEmail(
      email,
      "HOOB Admin Account Created",
      "You have been added as an admin on HOOB",
      `<p>Your admin account is ready. Email: ${email}</p>`
    );

    res.status(201).json({ message: "Admin created successfully", admin: { name, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
