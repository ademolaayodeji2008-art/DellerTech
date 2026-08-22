import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";
import { streamToCloudinary } from "../middleware/upload.js";

export async function listProjects(req, res) {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  res.json(projects);
}

export async function getProject(req, res) {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found." });
  res.json(project);
}

export async function createProject(req, res) {
  const { title, description, techStack, liveUrl, repoUrl, featured, order } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  let imageUrl = "";
  let imagePublicId = "";

  if (req.file) {
    const result = await streamToCloudinary(req.file.buffer);
    imageUrl = result.secure_url;
    imagePublicId = result.public_id;
  }

  const project = await Project.create({
    title,
    description,
    imageUrl,
    imagePublicId,
    techStack: techStack ? JSON.parse(techStack) : [],
    liveUrl,
    repoUrl,
    featured: featured === "true" || featured === true,
    order: order ? Number(order) : 0,
  });

  res.status(201).json(project);
}

export async function updateProject(req, res) {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found." });

  const { title, description, techStack, liveUrl, repoUrl, featured, order } = req.body;

  if (req.file) {
    if (project.imagePublicId) {
      await cloudinary.uploader.destroy(project.imagePublicId).catch(() => {});
    }
    const result = await streamToCloudinary(req.file.buffer);
    project.imageUrl = result.secure_url;
    project.imagePublicId = result.public_id;
  }

  if (title !== undefined) project.title = title;
  if (description !== undefined) project.description = description;
  if (techStack !== undefined) project.techStack = JSON.parse(techStack);
  if (liveUrl !== undefined) project.liveUrl = liveUrl;
  if (repoUrl !== undefined) project.repoUrl = repoUrl;
  if (featured !== undefined) project.featured = featured === "true" || featured === true;
  if (order !== undefined) project.order = Number(order);

  await project.save();
  res.json(project);
}

export async function deleteProject(req, res) {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found." });

  if (project.imagePublicId) {
    await cloudinary.uploader.destroy(project.imagePublicId).catch(() => {});
  }

  await project.deleteOne();
  res.json({ message: "Project deleted." });
}
