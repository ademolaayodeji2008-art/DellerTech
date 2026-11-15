import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, changePassword } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Try again later." },
});

router.post("/login", loginLimiter, login);
router.post("/change-password", requireAuth, changePassword);

export default router;
