import Waitlist from "../models/Waitlist.js";
import { sendEmail } from "../utils/mailer.js";

// POST /send-broadcast
export const sendBroadcast = async (req, res) => {
  try {
    const { password, subject, message } = req.body;
    if (password !== process.env.ADMIN_BROADCAST_PASSWORD)
      return res.status(401).json({ error: "Unauthorized" });

    const emails = await Waitlist.find().select("email -_id");
    const recipients = emails.map(e => e.email);

    for (let email of recipients) {
      await sendEmail(email, subject, message, `<p>${message}</p>`);
    }

    res.json({ message: `Broadcast sent to ${recipients.length} users` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
