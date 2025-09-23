import { sendEmail } from "../utils/mailer.js";
import Contact from "../models/Contact.js";

// POST /contact
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!email || !message) return res.status(400).json({ error: "Email and message are required" });

    await Contact.create({ name, email, message });

    await sendEmail(
      process.env.EMAIL_USER,
      `New Contact Message from ${name || "Anonymous"}`,
      message,
      `<p>${message}</p><p>From: ${name || "Anonymous"} (${email})</p>`
    );

    res.json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
