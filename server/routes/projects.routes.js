import { Router } from "express";
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.get("/", listProjects);
router.get("/:id", getProject);

router.post("/", requireAuth, upload.single("image"), createProject);
router.put("/:id", requireAuth, upload.single("image"), updateProject);
router.delete("/:id", requireAuth, deleteProject);

export default router;
