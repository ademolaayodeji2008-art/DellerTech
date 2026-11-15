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

export async function getMessages(req, res) {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
}

export async function markRead(req, res) {
  const msg = await Message.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  if (!msg) return res.status(404).json({ message: "Message not found." });
  res.json(msg);
}

export async function deleteMessage(req, res) {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted." });
}
