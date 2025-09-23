import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/mailer.js";
import bcrypt from "bcrypt";

// Generate JWT
const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

// POST /auth/send-code
export const sendCode = async (req, res) => {
  try {
    let { email, name, password, role } = req.body;

    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    email = email.trim();
    password = password.trim();

    let user = await User.findOne({ email });

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    if (!user) {
      user = await User.create({
        email,
        tempName: name,
        tempPassword: password, // Store temporarily, hash later in pre-save
        tempRole: role || "student",
        verificationCode,
        verificationExpires,
        verified: false,
      });
    } else {
      user.verificationCode = verificationCode;
      user.verificationExpires = verificationExpires;
      user.tempName = name;
      user.tempPassword = password;
      user.tempRole = role || "student";
      user.verified = false;
      await user.save();
    }

    await sendEmail(
      email,
      "HOOB Verification Code",
      `Your verification code is ${verificationCode}`,
      `
      <div style="font-family: Inter, sans-serif; background:#f5f0ff; padding:24px; color:#4B5563;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; padding:32px; box-shadow:0 0 20px rgba(131,88,212,0.2);">
          <h2 style="color:#8358d4; font-family:Poppins,sans-serif;">Hi ${name},</h2>
          <p style="font-size:16px;">Welcome to <strong>HOOB</strong> 🚀</p>
          <p style="margin:16px 0;">Here’s your verification code:</p>
          <div style="text-align:center; margin:20px 0;">
            <span style="display:inline-block; background:#8358d4; color:#fff; padding:12px 24px; border-radius:8px; font-size:20px; letter-spacing:4px;">
              ${verificationCode}
            </span>
          </div>
          <p>This code expires in <strong>10 minutes</strong>.</p>
          <p style="font-size:14px; color:#6b45ac;">Thanks for joining us,<br/>The HOOB Team</p>
        </div>
      </div>`
    );

    res.status(200).json({ message: "Verification code sent to email" });
  } catch (err) {
    console.error("Send code error:", err);
    res.status(500).json({ error: "Server error while sending code" });
  }
};

// POST /auth/verify-code
export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code)
      return res.status(400).json({ error: "Email and code are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.verified) return res.status(400).json({ error: "User already verified" });
    if (user.verificationCode !== code) return res.status(400).json({ error: "Invalid code" });
    if (new Date() > user.verificationExpires) return res.status(400).json({ error: "Code expired" });

    // Move temp fields to real fields
    user.name = user.tempName;
    user.password = user.tempPassword; // Let pre-save middleware hash it
    user.role = user.tempRole || "student";
    user.verified = true;

    // Clear temps
    user.verificationCode = null;
    user.verificationExpires = null;
    user.tempName = null;
    user.tempPassword = null;
    user.tempRole = null;

    await user.save();

    const token = generateToken(user);
    res.status(200).json({
      message: "Email verified & signup complete",
      token,
      user: { role: user.role, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Verify code error:", err);
    res.status(500).json({ error: "Server error during verification" });
  }
};

// POST /auth/login
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    email = email.trim();
    password = password.trim();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (!user.verified) return res.status(400).json({ error: "Email not verified" });

    const isMatch = await user.comparePassword(password);

    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = generateToken(user);
    res.status(200).json({
      token,
      user: { role: user.role, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};

// POST /auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    email = email.trim();
    const user = await User.findOne({ email });
    if (!user)
      return res.status(200).json({ message: "If the email exists, a reset code will be sent" });

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.resetCode = resetCode;
    user.resetExpires = resetExpires;
    await user.save();

    await sendEmail(
      email,
      "HOOB Password Reset Code",
      `Your password reset code is ${resetCode}`,
      `
      <div style="font-family: Inter, sans-serif; background:#f5f0ff; padding:24px; color:#4B5563;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; padding:32px; box-shadow:0 0 20px rgba(131,88,212,0.2);">
          <h2 style="color:#8358d4; font-family:Poppins,sans-serif;">Password Reset</h2>
          <p>Here’s your reset code:</p>
          <div style="text-align:center; margin:20px 0;">
            <span style="display:inline-block; background:#9B59B6; color:#fff; padding:12px 24px; border-radius:8px; font-size:20px; letter-spacing:4px;">
              ${resetCode}
            </span>
          </div>
          <p>This code expires in <strong>10 minutes</strong>.</p>
          <p style="font-size:14px; color:#6b45ac;">The HOOB Team</p>
        </div>
      </div>`
    );

    res.status(200).json({ message: "If the email exists, a reset code will be sent" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Server error during password reset" });
  }
};

// POST /auth/reset-password
export const resetPassword = async (req, res) => {
  try {
    let { email, code, password } = req.body;
    if (!email || !code || !password)
      return res.status(400).json({ error: "All fields are required" });

    email = email.trim();
    password = password.trim();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.resetCode !== code) return res.status(400).json({ error: "Invalid reset code" });
    if (new Date() > user.resetExpires) return res.status(400).json({ error: "Reset code expired" });

    user.password = password; // Let pre-save middleware hash it
    user.resetCode = null;
    user.resetExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ error: "Server error during password reset" });
  }
};

// POST /auth/verify-reset-code
export const verifyResetCode = async (req, res) => {
  try {
    let { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: "Email and code are required" });
    }

    email = email.trim();
    code = code.trim();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.resetCode !== code) {
      return res.status(400).json({ error: "Invalid reset code" });
    }

    if (new Date() > user.resetExpires) {
      return res.status(400).json({ error: "Reset code expired" });
    }

    res.status(200).json({ message: "Reset code verified successfully" });
  } catch (err) {
    console.error("Verify reset code error:", err);
    res.status(500).json({ error: "Server error during reset code verification" });
  }
};