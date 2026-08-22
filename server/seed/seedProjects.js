import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Project from "../models/Project.js";

const placeholderProjects = [
  {
    title: "Nimbus Commerce",
    description:
      "A full-stack e-commerce platform with cart, checkout, and an admin dashboard for inventory management. Replace this with one of your real projects.",
    imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "",
    repoUrl: "",
    featured: true,
    order: 1,
  },
  {
    title: "Pulse Analytics Dashboard",
    description:
      "A real-time analytics dashboard visualizing user metrics with live charts and role-based access. Replace this with one of your real projects.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    techStack: ["React", "Express", "Chart.js", "WebSockets"],
    liveUrl: "",
    repoUrl: "",
    featured: true,
    order: 2,
  },
  {
    title: "Waypoint API",
    description:
      "A RESTful API service powering a logistics tracking app, with JWT auth and rate-limited public endpoints. Replace this with one of your real projects.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    techStack: ["Node.js", "Express", "MongoDB", "JWT"],
    liveUrl: "",
    repoUrl: "",
    featured: false,
    order: 3,
  },
];

async function run() {
  await connectDB();

  const count = await Project.countDocuments();
  if (count > 0) {
    console.log(`Projects collection already has ${count} document(s) — skipping seed.`);
  } else {
    await Project.insertMany(placeholderProjects);
    console.log(`Inserted ${placeholderProjects.length} placeholder projects.`);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
