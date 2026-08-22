import { motion } from "framer-motion";
import SkillBadge from "./SkillBadge.jsx";

export default function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="glass-card overflow-hidden flex flex-col group"
    >
      <div className="h-48 overflow-hidden bg-base-800 relative">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 text-sm">
            No image yet
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base-950/80 via-transparent to-transparent" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        {project.featured && (
          <span className="mb-2 self-start text-[11px] font-bold uppercase tracking-wider gradient-text">
            Featured
          </span>
        )}
        <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
        <p className="text-sm text-slate-400 flex-1">{project.description}</p>

        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techStack.map((tech) => (
              <SkillBadge key={tech}>{tech}</SkillBadge>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 mt-5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-accent-cyan hover:text-white transition-colors"
            >
              Live Demo →
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
