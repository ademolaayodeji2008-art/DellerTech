import { Router } from "express";
import rateLimit from "express-rate-limit";
import { createMessage, getMessages, markRead, deleteMessage } from "../controllers/contact.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many messages sent. Please try again later." },
});

router.post("/", contactLimiter, createMessage);
router.get("/", requireAuth, getMessages);
router.patch("/:id/read", requireAuth, markRead);
router.delete("/:id", requireAuth, deleteMessage);

export default router;
