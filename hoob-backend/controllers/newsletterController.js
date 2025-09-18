import { addToAudience } from "../utils/mailChimp.js";

export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const result = await addToAudience(email, {}, ["newsletter"]);
    res.status(200).json({ message: "Subscribed to newsletter", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
