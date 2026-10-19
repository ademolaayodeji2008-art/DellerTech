import { useEffect, useState, useRef } from "react";
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

  // ── Canvas refs ──────────────────────────────────────────────────────────────
  const particleCanvasRef = useRef(null);
  const matrixCanvasRef = useRef(null);
  const heroSectionRef = useRef(null);

  // 1 — Particle Network
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    const section = heroSectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    let rafId;
    const PARTICLE_COUNT = 60;
    const MAX_DIST = 120;

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5),
      vy: (Math.random() - 0.5),
      r: 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // move + bounce
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37,99,235,0.9)";
        ctx.fill();
      }
      // lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // 2 — Matrix Rain
  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    const section = heroSectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    let rafId;
    const W = 220;
    const CHAR_SIZE = 14;
    const CHARS = "01{}[]<>/=;.(";
    const cols = Math.floor(W / CHAR_SIZE);

    const resize = () => {
      canvas.width = W;
      canvas.height = section.offsetHeight;
    };
    resize();

    const drops = Array.from({ length: cols }, () => Math.random() * -100);

    const draw = () => {
      const H = canvas.height;
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#22c55e";
      ctx.font = `${CHAR_SIZE}px monospace`;
      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * CHAR_SIZE, drops[i] * CHAR_SIZE);
        drops[i]++;
        if (drops[i] * CHAR_SIZE > H && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    api
      .get("/projects")
      .then(({ data }) => setFeatured(data.filter((p) => p.featured).slice(0, 3)))
      .catch(() => setFeatured([]));
  }, []);

  // Terminal typing state
  const PHRASES = [
    'Building next-gen web products...',
    'Training the next generation of developers...',
    'Delivering results for Nigerian businesses...',
  ];
  const [termText, setTermText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIdx];
    const speed = isDeleting ? 40 : 70;
    const timer = setTimeout(() => {
      if (!isDeleting && termText === current) {
        // Pause then start deleting
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && termText === '') {
        setIsDeleting(false);
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
      } else {
        setTermText(isDeleting ? current.slice(0, termText.length - 1) : current.slice(0, termText.length + 1));
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [termText, phraseIdx, isDeleting]);

  return (
    <div>
      {/* Hero */}
      <section
        ref={heroSectionRef}
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(37,99,235,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        {/* 1 — Particle Network canvas */}
        <canvas
          ref={particleCanvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* 2 — Matrix Rain canvas */}
        <canvas
          ref={matrixCanvasRef}
          className="matrix-canvas"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "220px",
            height: "100%",
            zIndex: 0,
            opacity: 0.75,
            pointerEvents: "none",
          }}
        />

        {/* 4 — Floating Code Snippets */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {[
            { text: "const app = express();",     top: "8%",  left: "3%",  duration: "7s",  delay: "0s"   },
            { text: "useState([])",                top: "15%", left: "72%", duration: "9s",  delay: "1.5s" },
            { text: "db.connect(MONGO_URI)",       top: "35%", left: "80%", duration: "11s", delay: "0.8s" },
            { text: '<Route path="/api" />',       top: "55%", left: "5%",  duration: "8s",  delay: "2.2s" },
            { text: "npm run build ✓",             top: "72%", left: "60%", duration: "13s", delay: "0.3s" },
            { text: "res.json({ status: 'ok' })",  top: "80%", left: "18%", duration: "10s", delay: "3s"   },
            { text: "import React from 'react'",   top: "25%", left: "55%", duration: "6s",  delay: "1s"   },
            { text: "git push origin main",        top: "88%", left: "42%", duration: "14s", delay: "2s"   },
          ].map(({ text, top, left, duration, delay }) => (
            <span
              key={text}
              className="floating-code"
              style={{
                position: "absolute",
                top,
                left,
                background: "rgba(13,17,23,0.85)",
                fontFamily: "'Courier New', monospace",
                fontSize: "11px",
                border: "1px solid rgba(37,99,235,0.7)",
                borderRadius: "8px",
                padding: "8px 12px",
                color: "#e2e8f0",
                opacity: 0.9,
                pointerEvents: "none",
                whiteSpace: "nowrap",
                "--dur": duration,
                animationDelay: delay,
              }}
            >
              {text}
            </span>
          ))}
        </div>

        {/* 5 — Scan Line overlay */}
        <div
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            zIndex: 1,
          }}
        />

        {/* Content — sits above all effects */}
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-32 relative" style={{ zIndex: 2 }}>
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
            className="text-4xl sm:text-6xl font-extrabold text-white leading-tight max-w-3xl glitch-text"
          >
            Building the Future,{" "}
            <span className="gradient-text">One Line at a Time.</span>
          </motion.h1>

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.2}}
            className="mt-6"
          >
            <div
              style={{background: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '8px',
                padding: '14px 20px',
                display: 'inline-flex',
                alignItems: 'center',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '0.95rem',
                maxWidth: '100%',
                overflow: 'hidden',}}
            >
              <span style={{color: '#3fb950', marginRight: '10px', fontWeight: 'bold', flexShrink: 0}}>$</span>
              <span style={{color: '#c9d1d9', whiteSpace: 'nowrap', overflow: 'hidden', minWidth: 0}}>
                {termText}
              </span>
              <span className="terminal-cursor" />
            </div>
          </motion.div>

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
