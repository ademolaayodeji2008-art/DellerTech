import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../components/Logo.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import AnimatedSection from "../components/AnimatedSection.jsx";
import api from "../api/client.js";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api
      .get("/projects")
      .then(({ data }) => setFeatured(data.filter((p) => p.featured).slice(0, 3)))
      .catch(() => setFeatured([]));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-glow-radial blur-3xl" />
        <div className="absolute top-0 -right-32 h-96 w-96 rounded-full bg-glow-radial blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 pt-24 pb-28 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Logo size="xl" withLabel={false} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="uppercase tracking-[0.3em] text-xs font-semibold text-accent-cyan mb-4"
          >
            DellerTech &middot; Fullstack Development
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-extrabold text-white leading-tight max-w-3xl"
          >
            Building fast, reliable <span className="gradient-text">fullstack products.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg text-slate-400 max-w-xl"
          >
            I design and build end-to-end web applications — React on the front,
            Node.js and MongoDB underneath — with clean code and interfaces people enjoy using.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/projects" className="btn-primary">View My Work</Link>
            <Link to="/contact" className="btn-outline">Get In Touch</Link>
          </motion.div>
        </div>
      </section>

      {/* Featured projects */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-28">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10">
              <h2 className="section-heading">Featured Work</h2>
              <Link to="/projects" className="text-sm font-semibold text-accent-cyan hover:text-white transition-colors">
                See all →
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project, i) => (
              <AnimatedSection key={project._id} delay={i * 0.1}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
