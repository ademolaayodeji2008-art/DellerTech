import { Router } from "express";
import rateLimit from "express-rate-limit";
import { createMessage } from "../controllers/contact.controller.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many messages sent. Please try again later." },
});

router.post("/", contactLimiter, createMessage);

export default router;
