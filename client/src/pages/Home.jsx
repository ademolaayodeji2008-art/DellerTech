import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard.jsx";
import AnimatedSection from "../components/AnimatedSection.jsx";
import api from "../api/client.js";

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 14 5-5-5-5" /><path d="M4 20v-7a4 4 0 0 1 4-4h12" />
      </svg>
    ),
    name: "Web Development",
    desc: "Custom websites and web applications built to perform, scale, and impress your customers.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" />
      </svg>
    ),
    name: "Mobile App Development",
    desc: "Native and cross-platform mobile applications that deliver seamless experiences on any device.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
    name: "UI/UX Design",
    desc: "User-centered design that turns complex ideas into intuitive, visually compelling interfaces.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 2v10l4.5 4.5" /><circle cx="19" cy="5" r="3" />
      </svg>
    ),
    name: "Web Hosting & Deployment",
    desc: "Reliable hosting, domain management, and deployment pipelines so your site stays live 24/7.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20" /><path d="M5 20V8l7-6 7 6v12" /><path d="M9 20v-5h6v5" />
      </svg>
    ),
    name: "IT Consulting",
    desc: "Strategic technology advice to help your business make smarter, faster digital decisions.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    name: "DellerTech Coding School",
    desc: "Hands-on coding education for beginners and professionals — learn to build real-world tech products.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "3+", label: "Years Experience" },
  { value: "100+", label: "Students Trained" },
];

const trustedBy = ["Anther Consulting Limited", "Oma Midas Limited", "TAXONTIME"];

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
      <section
        className="relative overflow-hidden"
        style={{backgroundImage:
            "radial-gradient(circle, rgba(37,99,235,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",}}
      >
        <div className="absolute inset-0 bg-base-950/80 pointer-events-none" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-glow-radial blur-3xl" />
        <div className="absolute top-0 -right-32 h-96 w-96 rounded-full bg-glow-radial blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 pt-28 pb-32 relative">
          <motion.p
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="uppercase tracking-[0.3em] text-xs font-semibold text-brand-gold mb-6"
          >
            DellerTech &mdash; Technology &amp; Education
          </motion.p>

          <motion.h1
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.1}}
            className="text-4xl sm:text-6xl font-extrabold text-white leading-tight max-w-3xl"
          >
            Building the Future,{" "}
            <span className="gradient-text">One Line at a Time.</span>
          </motion.h1>

          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.2}}
            className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed"
          >
            We build professional websites and web applications for businesses, and we run a
            coding school that trains the next generation of Nigerian tech talent.
          </motion.p>

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.3}}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/contact" className="btn-primary">Get a Quote</Link>
            <Link to="/services" className="btn-outline">Explore Services</Link>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-brand-gold mb-3">What We Offer</p>
            <h2 className="section-heading">Our Services</h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              From strategy to execution — we deliver end-to-end technology solutions.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <AnimatedSection key={svc.name} delay={i * 0.07}>
              <div className="service-card h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue mb-5">
                  {svc.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{svc.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-10">
            <Link to="/services" className="btn-outline">
              View All Services &rarr;
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* Why Choose DellerTech */}
      <section className="bg-base-900 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <AnimatedSection>
            <h2 className="section-heading text-center mb-14">Why Choose DellerTech?</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.1}>
                <div className="stat-card">
                  <p className="text-5xl font-extrabold text-brand-blue mb-3">{s.value}</p>
                  <p className="text-slate-300 font-medium">{s.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <AnimatedSection>
          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-brand-gold text-center mb-8">
            Trusted By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {trustedBy.map((name) => (
              <div
                key={name}
                className="px-6 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-slate-300 font-semibold text-sm hover:border-brand-gold/40 hover:text-white transition-all duration-300"
              >
                {name}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10">
              <h2 className="section-heading">Featured Work</h2>
              <Link to="/projects" className="text-sm font-semibold text-brand-blue hover:text-white transition-colors">
                See all &rarr;
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

      {/* CTA Banner */}
      <section className="bg-brand-blue/10 border-y border-brand-blue/20">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <AnimatedSection>
            <h2 className="section-heading mb-4">Ready to start your project?</h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-8">
              Let&apos;s turn your idea into a product that works. Get in touch with the DellerTech team today.
            </p>
            <Link to="/contact" className="btn-primary">
              Get In Touch
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
