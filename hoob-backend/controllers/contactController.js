import { addToAudience } from "../utils/mailChimp.js";

export const submitContact = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required" });
  }

  try {
    const result = await addToAudience(
      email,
      { FNAME: name },
      ["contact"]
    );

    // Optionally save message separately
    result.contact.message = message;
    await result.contact.save();

    res.status(200).json({ message: "Contact submitted", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
