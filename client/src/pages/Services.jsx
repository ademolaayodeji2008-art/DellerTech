import { Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection.jsx";

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 14 5-5-5-5" /><path d="M4 20v-7a4 4 0 0 1 4-4h12" />
      </svg>
    ),
    name: "Web Development",
    description: "We design and build custom websites and web applications tailored to your business goals. From landing pages to complex enterprise platforms, we deliver fast, secure, and scalable solutions that drive results.",
    features: [
      "Custom website design & development",
      "E-commerce and marketplace platforms",
      "API integrations and backend systems",
      "Performance optimization & SEO-ready builds",
    ],
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" />
      </svg>
    ),
    name: "Mobile App Development",
    description: "We build cross-platform mobile applications that deliver seamless user experiences on Android and iOS. Our apps are engineered for performance and designed to keep your users engaged.",
    features: [
      "Cross-platform apps (React Native)",
      "Intuitive UI/UX for mobile",
      "Push notifications & real-time data",
      "App store deployment support",
    ],
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
    name: "UI/UX Design",
    description: "Great products start with great design. We create user-centered interfaces that are visually compelling, easy to navigate, and built around how your customers actually think and behave.",
    features: [
      "User research & wireframing",
      "Interactive prototypes (Figma)",
      "Brand-consistent visual design",
      "Usability testing & iteration",
    ],
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 6v6l4 2" /><circle cx="19" cy="5" r="3" />
      </svg>
    ),
    name: "Web Hosting & Deployment",
    description: "Keep your website live, fast, and secure around the clock. We handle the full deployment process — from server configuration to domain management — so you can focus on your business.",
    features: [
      "Cloud server setup & configuration",
      "Domain registration & DNS management",
      "SSL certificates & security hardening",
      "Continuous deployment pipelines",
    ],
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20" /><path d="M5 20V8l7-6 7 6v12" /><path d="M9 20v-5h6v5" />
      </svg>
    ),
    name: "IT Consulting",
    description: "We help businesses make smarter technology decisions. Whether you need a technology audit, a digital transformation strategy, or guidance on the right tools to adopt, we bring clarity to complex tech challenges.",
    features: [
      "Technology audits & assessments",
      "Digital transformation strategy",
      "Software stack recommendations",
      "Project scoping & technical planning",
    ],
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
];

export default function Services() {
  return (
    <div>
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-base-900 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <AnimatedSection>
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-brand-gold mb-4">What We Offer</p>
            <h1 className="section-heading mb-5">
              Services Built for{" "}
              <span className="gradient-text">Real Business Results.</span>
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
              From concept to deployment, DellerTech delivers technology solutions that help Nigerian businesses grow, compete, and succeed.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Before & After Comparison */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="section-heading">
              See the Difference{" "}
              <span className="gradient-text">We Make</span>
            </h2>
          </div>
          <div className="ba-container">
            {/* Before panel */}
            <div className="ba-panel ba-before">
              <div className="ba-content">
                <h3 className="ba-heading">⚠️ Without DellerTech</h3>
                <ul className="ba-list">
                  <li>Slow load times</li>
                  <li>Outdated design</li>
                  <li>Poor mobile experience</li>
                  <li>Low search rankings</li>
                </ul>
              </div>
            </div>
            {/* After panel */}
            <div className="ba-panel ba-after">
              <div className="ba-content">
                <h3 className="ba-heading">🚀 With DellerTech</h3>
                <ul className="ba-list">
                  <li>Lightning-fast performance</li>
                  <li>Modern professional design</li>
                  <li>Fully responsive</li>
                  <li>SEO optimised</li>
                </ul>
              </div>
            </div>
            {/* Hover label */}
            <div className="ba-label">HOVER TO REVEAL →</div>
          </div>
        </AnimatedSection>
      </section>

      {/* Service Cards Grid */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((svc, i) => (
            <AnimatedSection key={svc.name} delay={i * 0.08}>
              <div className={`glass-card p-8 h-full border ${svc.border} hover:border-brand-blue/40 hover:shadow-glow hover:-translate-y-1 transition-all duration-300`}>
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${svc.bg} ${svc.color} mb-6`}>
                  {svc.icon}
                </div>
                <h2 className="text-white font-bold text-xl mb-3">{svc.name}</h2>
                <p className="text-slate-400 leading-relaxed mb-6">{svc.description}</p>
                <ul className="space-y-2">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-slate-300 text-sm">
                      <span className="text-brand-blue mt-0.5 flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* DellerTech Coding School — Featured */}
      <section className="bg-base-900 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <AnimatedSection>
            <div className="glass-card p-10 border border-brand-gold/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/20 rounded-full px-4 py-1.5 text-brand-gold text-xs font-semibold uppercase tracking-wider mb-6">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                  Featured Program
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                  DellerTech <span style={{color: "#F59E0B"}}>Coding School</span>
                </h2>
                <p className="text-slate-400 leading-relaxed max-w-2xl mb-8">
                  Our coding school is where ambition meets skill. We offer structured, hands-on courses designed to take you from zero to job-ready. We teach the same tools we build with every day — React, Node.js, MongoDB, and more — so you graduate with real-world experience, not just theory.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                  {[
                    { label: "HTML, CSS & JavaScript", desc: "The foundations of every website" },
                    { label: "React Development", desc: "Build modern, interactive UIs" },
                    { label: "Node.js & APIs", desc: "Server-side programming & databases" },
                    { label: "Career Mentorship", desc: "Portfolio reviews & job prep" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/[0.04] border border-brand-gold/10 rounded-xl p-4">
                      <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                      <p className="text-slate-500 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <Link to="/contact" className="btn-gold">
                  Enroll or Learn More
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <AnimatedSection>
          <h2 className="section-heading mb-4">Not sure which service you need?</h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8">
            Tell us about your project and we&apos;ll recommend the right solution for your budget and goals.
          </p>
          <Link to="/contact" className="btn-primary">Talk to Us</Link>
        </AnimatedSection>
      </section>
    </div>
  );
}
