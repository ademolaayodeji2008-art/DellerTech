import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection.jsx";
import api from "../api/client.js";

const initialForm = { name: "", email: "", message: "" };

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
    <section className="max-w-3xl mx-auto px-6 py-24">
      <AnimatedSection>
        <p className="uppercase tracking-[0.3em] text-xs font-semibold text-accent-cyan mb-4">Contact</p>
        <h1 className="section-heading mb-4">Let's build something together.</h1>
        <p className="text-slate-400 mb-12">
          Have a project in mind or just want to say hello? Fill out the form below and I'll get back to you.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="input-field"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="input-field resize-none"
              placeholder="Tell me about your project…"
            />
          </div>

          <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="text-sm text-accent-cyan">Message sent — thanks for reaching out!</p>
          )}
          {status === "error" && <p className="text-sm text-rose-400">{error}</p>}
        </form>
      </AnimatedSection>
    </section>
  );
}
