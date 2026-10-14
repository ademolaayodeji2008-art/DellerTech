import AnimatedSection from "../components/AnimatedSection.jsx";
import SkillBadge from "../components/SkillBadge.jsx";

const toolkit = {
  Frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  Backend: ["Node.js", "Express", "REST APIs", "JWT Auth"],
  Database: ["MongoDB", "Mongoose", "Redis"],
  Tooling: ["Git / GitHub", "Docker", "Vite", "Figma"],
};

const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
    title: "Innovation",
    desc: "We stay ahead of the curve, adopting modern technologies to deliver future-ready solutions.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
    title: "Quality",
    desc: "Every product we ship is tested, refined, and built to the highest professional standards.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    title: "Education",
    desc: "We invest in people. Our coding school empowers the next generation of Nigerian tech professionals.",
  },
];

export default function About() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 py-24">
        <AnimatedSection>
          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-brand-gold mb-4">About Us</p>
          <h1 className="section-heading mb-6">Built in Nigeria, <span className="gradient-text">Built for the World.</span></h1>
        </AnimatedSection>

        {/* Mission / Story */}
        <div className="grid lg:grid-cols-2 gap-12 mt-10">
          <AnimatedSection delay={0.1}>
            <div className="space-y-5 text-slate-400 leading-relaxed">
              <p>
                DellerTech is a Nigerian technology company with a dual mission: we build professional digital products for businesses, and we run a hands-on coding school that trains the next generation of tech talent.
              </p>
              <p>
                We believe technology should be accessible — both as a service for businesses that need it, and as a skill for individuals who want to build with it. That&apos;s why every product we deliver and every student we train is a step toward a stronger Nigerian tech ecosystem.
              </p>
              <p>
                From small businesses getting their first website to growing companies needing scalable web platforms, we bring the same level of craftsmanship and commitment to every project.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="glass-card p-8">
              <h2 className="text-lg font-bold text-white mb-6">Our Tech Stack</h2>
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

      {/* What We Do */}
      <section className="bg-base-900 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <AnimatedSection>
            <h2 className="section-heading text-center mb-14">What We Do</h2>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="glass-card p-8 h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 14 5-5-5-5" /><path d="M4 20v-7a4 4 0 0 1 4-4h12" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-3">Web &amp; Tech Services</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  We design and develop modern websites, web applications, and mobile apps for businesses across Nigeria. Our end-to-end service covers everything from UI design to backend infrastructure, hosting, and deployment.
                </p>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li className="flex items-center gap-2"><span className="text-brand-blue">&#10003;</span> Web &amp; Mobile Development</li>
                  <li className="flex items-center gap-2"><span className="text-brand-blue">&#10003;</span> UI/UX Design</li>
                  <li className="flex items-center gap-2"><span className="text-brand-blue">&#10003;</span> Hosting &amp; Deployment</li>
                  <li className="flex items-center gap-2"><span className="text-brand-blue">&#10003;</span> IT Consulting</li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="glass-card p-8 h-full border-brand-gold/20">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-gold/10 text-brand-gold mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-3">DellerTech Coding School</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Our coding school offers structured, practical courses for beginners and intermediate learners who want to build real-world products. We teach the same stack we build with — so graduates are job-ready from day one.
                </p>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li className="flex items-center gap-2"><span className="text-brand-gold">&#10003;</span> HTML, CSS &amp; JavaScript</li>
                  <li className="flex items-center gap-2"><span className="text-brand-gold">&#10003;</span> React &amp; Node.js</li>
                  <li className="flex items-center gap-2"><span className="text-brand-gold">&#10003;</span> Project-based learning</li>
                  <li className="flex items-center gap-2"><span className="text-brand-gold">&#10003;</span> Career mentorship</li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <AnimatedSection>
          <h2 className="section-heading text-center mb-14">Our Values</h2>
        </AnimatedSection>
        <div className="grid sm:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.1}>
              <div className="glass-card p-8 text-center h-full">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-blue/10 text-brand-blue mb-5 mx-auto">
                  {v.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="bg-base-900 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <AnimatedSection>
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-brand-gold mb-4 text-center">Meet the Founder</p>
            <h2 className="section-heading text-center mb-14">The Person Behind DellerTech</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="glass-card p-8 lg:p-12 max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
                {/* Photo */}
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 lg:w-52 lg:h-52 rounded-2xl overflow-hidden border-2 border-brand-blue/40 shadow-lg shadow-brand-blue/10">
                    <img
                      src="/owner.jpeg"
                      alt="Ademola Ayodeji Fredrick — Founder of DellerTech"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Bio */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-white mb-1">Ademola Ayodeji Fredrick</h3>
                  <p className="text-brand-blue font-semibold text-sm uppercase tracking-wider mb-5">Founder &amp; Lead Developer</p>
                  <div className="space-y-4 text-slate-400 leading-relaxed">
                    <p>
                      Ademola is a fullstack developer with 2+ years of hands-on experience designing and building modern web products. With a passion for clean code and great user experiences, he has delivered projects for businesses across multiple industries in Nigeria.
                    </p>
                    <p>
                      His belief that technology should be both accessible and transformative led him to found DellerTech — a company that not only builds digital products for clients, but also runs a coding school to grow the next generation of Nigerian developers.
                    </p>
                    <p>
                      When he&apos;s not writing code, he&apos;s teaching it.
                    </p>
                  </div>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                    {["React", "Node.js", "MongoDB", "Fullstack Development", "Tech Education"].map((badge) => (
                      <span key={badge} className="px-3 py-1 rounded-full text-xs font-semibold border border-brand-blue/30 text-brand-blue bg-brand-blue/5">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
