import Message from "../models/Message.js";
import { sendContactNotification } from "../utils/mailer.js";

export async function createMessage(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email address." });
  }

  const saved = await Message.create({ name, email, message });

  try {
    await sendContactNotification({ name, email, message });
  } catch (err) {
    console.error("[contact] Failed to send notification email:", err.message);
  }

  res.status(201).json({ message: "Thanks — your message has been sent.", id: saved._id });
}
