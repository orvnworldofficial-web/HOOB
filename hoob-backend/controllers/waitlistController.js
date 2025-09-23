import Waitlist from "../models/Waitlist.js";
import { sendEmail } from "../utils/mailer.js";

// POST /waitlist
export const addToWaitlist = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const existing = await Waitlist.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already on waitlist" });

    await Waitlist.create({ email });

    // 🎉 Themed welcome email
    await sendEmail(
      email,
      "🎉 You’re In! Welcome to HOOB",
      `Welcome to HOOB; you’re now officially on our waitlist and part of our insider community. 🚀

This means:
✅ Early access to HOOB before anyone else
✅ Exclusive updates, insights & sneak peeks
✅ A front-row seat to the future of work, learning, and opportunities

We’ll keep things valuable (no spam, promise).
Until then, get ready — we’re building something game-changing.

Catch you in the next build ✨`,
      `
      <div style="font-family: Inter, sans-serif; background:#f5f0ff; padding:20px; border-radius:12px; max-width:600px; margin:auto;">
        <div style="text-align:center; padding:20px; border-radius:12px; background:linear-gradient(135deg, #8358d4 0%, #9B59B6 100%); color:#fff;">
          <h1 style="font-family:Poppins, sans-serif; font-size:24px; margin:0;">🎉 You’re In!</h1>
          <p style="margin:8px 0 0;">Welcome to <strong>HOOB</strong></p>
        </div>

        <div style="padding:20px; background:#ffffff; border-radius:12px; margin-top:15px; box-shadow:0 0 20px rgba(131,88,212,0.1);">
          <p style="font-size:16px; color:#4B5563; margin-bottom:15px;">
            You’re now officially on our waitlist and part of our insider community 🚀
          </p>

          <ul style="padding-left:20px; color:#111; line-height:1.6;">
            <li>✅ Early access to HOOB before anyone else</li>
            <li>✅ Exclusive updates, insights & sneak peeks</li>
            <li>✅ A front-row seat to the future of work, learning, and opportunities</li>
          </ul>

          <p style="margin-top:20px; color:#4B5563;">
            We’ll keep things valuable (<strong>no spam, promise</strong>).
            <br/>Until then, get ready — we’re building something game-changing.
          </p>

          <p style="margin-top:20px; font-weight:bold; color:#8358d4;">
            Catch you in the next build ✨
          </p>
        </div>
      </div>
      `
    );

    res.json({ message: "Added to waitlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
