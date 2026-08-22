import { useEffect, useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import AnimatedSection from "../components/AnimatedSection.jsx";
import api from "../api/client.js";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [activeTech, setActiveTech] = useState("All");

  useEffect(() => {
    api
      .get("/projects")
      .then(({ data }) => {
        setProjects(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const techs = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => p.techStack?.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeTech === "All") return projects;
    return projects.filter((p) => p.techStack?.includes(activeTech));
  }, [projects, activeTech]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <AnimatedSection>
        <p className="uppercase tracking-[0.3em] text-xs font-semibold text-accent-cyan mb-4">Portfolio</p>
        <h1 className="section-heading mb-4">Projects I've Built</h1>
        <p className="text-slate-400 max-w-xl mb-10">
          A growing collection of fullstack work — new projects are added here as I ship them.
        </p>
      </AnimatedSection>

      {techs.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {techs.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveTech(tech)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                activeTech === tech
                  ? "bg-brand-gradient text-base-950 border-transparent"
                  : "border-white/10 text-slate-400 hover:text-white hover:border-white/30"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      )}

      {status === "loading" && <p className="text-slate-500">Loading projects…</p>}
      {status === "error" && (
        <p className="text-slate-500">
          Couldn't load projects right now. Make sure the API server is running.
        </p>
      )}
      {status === "ready" && filtered.length === 0 && (
        <p className="text-slate-500">No projects yet — check back soon.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <AnimatedSection key={project._id} delay={(i % 3) * 0.1}>
            <ProjectCard project={project} />
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
