import AnimatedSection from "../components/AnimatedSection.jsx";
import SkillBadge from "../components/SkillBadge.jsx";

const toolkit = {
  Frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  Backend: ["Node.js", "Express", "REST APIs", "JWT Auth"],
  Database: ["MongoDB", "Mongoose", "Redis"],
  Tooling: ["Git / GitHub", "Docker", "Vite", "Figma"],
};

export default function About() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <AnimatedSection>
        <p className="uppercase tracking-[0.3em] text-xs font-semibold text-accent-cyan mb-4">About</p>
        <h1 className="section-heading mb-10">The Engineer Behind DellerTech</h1>
      </AnimatedSection>

      <div className="grid lg:grid-cols-2 gap-12">
        <AnimatedSection delay={0.1}>
          <div className="space-y-5 text-slate-400 leading-relaxed">
            <p>
              I'm a fullstack developer building complete web products — from database schema
              to the last pixel of the interface. I care about the bridge between solid
              engineering and an experience that feels effortless to use.
            </p>
            <p>
              My stack of choice is React on the frontend paired with Node.js and MongoDB on
              the backend, which lets me move quickly from idea to a working, production-ready
              product without losing sight of code quality.
            </p>
            <p>
              Every project on this site is real work — shipped, iterated on, and continually
              expanded as I keep building.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="glass-card p-8">
            <h2 className="text-lg font-bold text-white mb-6">My Toolkit</h2>
            <div className="space-y-6">
              {Object.entries(toolkit).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <SkillBadge key={item}>{item}</SkillBadge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
