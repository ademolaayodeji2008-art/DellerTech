import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection.jsx";
import api from "../api/client.js";

const initialForm = { name: "", email: "", message: "" };

const contactInfo = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: "Email Us",
    value: "Dellerindustry1@gmail.com",
    href: "mailto:Dellerindustry1@gmail.com",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.089.534 4.055 1.475 5.77L0 24l6.389-1.459A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.86 0-3.6-.5-5.1-1.37l-.366-.211-3.793.866.9-3.692-.233-.381A9.946 9.946 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
      </svg>
    ),
    label: "WhatsApp",
    value: "+2349138008234",
    href: "https://wa.me/2349138008234",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      await api.post("/contact", form);
      setStatus("sent");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 py-24">
        <AnimatedSection>
          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-brand-gold mb-4">Contact Us</p>
          <h1 className="section-heading mb-4">Let&apos;s Build Something Together.</h1>
          <p className="text-slate-400 mb-12 max-w-lg">
            Ready to start a project, enroll in our coding school, or just have a question? Reach out — we&apos;d love to hear from you.
          </p>
        </AnimatedSection>

        {/* Contact Info Cards */}
        <AnimatedSection delay={0.1}>
          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass-card p-6 flex items-center gap-5 hover:border-white/20 transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${info.bg} ${info.color} flex-shrink-0`}>
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{info.label}</p>
                  <p className="text-white font-semibold group-hover:text-slate-200 transition-colors">{info.value}</p>
                </div>
              </a>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="name">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g. John Adeyemi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">Business Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="input-field"
                placeholder="you@yourcompany.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="message">Project Details</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="input-field resize-none"
                placeholder="Tell us about your project or enquiry..."
              />
            </div>

            <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "sent" && (
              <p className="text-sm text-green-400">Message sent — we&apos;ll get back to you shortly!</p>
            )}
            {status === "error" && <p className="text-sm text-rose-400">{error}</p>}
          </form>
        </AnimatedSection>
      </section>
    </div>
  );
}
