import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import AnimatedSection from "../components/AnimatedSection.jsx";
import api from "../api/client.js";

const emptyForm = {
  title: "",
  description: "",
  techStack: "",
  liveUrl: "",
  repoUrl: "",
  featured: false,
  order: 0,
};

export default function AdminDashboard() {
  const { logout, email } = useAuth();
  const [tab, setTab] = useState("projects");

  // ── Projects state ──────────────────────────────────────────────
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ── Messages state ──────────────────────────────────────────────
  const [messages, setMessages] = useState([]);
  const [msgsLoading, setMsgsLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  async function loadProjects() {
    setLoading(true);
    try {
      const { data } = await api.get("/projects");
      setProjects(data);
    } finally {
      setLoading(false);
    }
  }

  async function loadMessages() {
    setMsgsLoading(true);
    try {
      const { data } = await api.get("/contact");
      setMessages(data);
    } catch {
      setMessages([]);
    } finally {
      setMsgsLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
    loadMessages();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function startEdit(project) {
    setEditingId(project._id);
    setForm({
      title: project.title,
      description: project.description,
      techStack: (project.techStack || []).join(", "),
      liveUrl: project.liveUrl || "",
      repoUrl: project.repoUrl || "",
      featured: project.featured,
      order: project.order,
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("description", form.description);
    payload.append(
      "techStack",
      JSON.stringify(
        form.techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      )
    );
    payload.append("liveUrl", form.liveUrl);
    payload.append("repoUrl", form.repoUrl);
    payload.append("featured", form.featured);
    payload.append("order", form.order);
    if (imageFile) payload.append("image", imageFile);

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/projects", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      resetForm();
      await loadProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await api.delete(`/projects/${id}`);
    if (editingId === id) resetForm();
    await loadProjects();
  }

  async function handleMarkRead(id) {
    await api.patch(`/contact/${id}/read`);
    setMessages((prev) => prev.map((m) => m._id === id ? { ...m, read: true } : m));
  }

  async function handleDeleteMessage(id) {
    if (!confirm("Delete this message?")) return;
    await api.delete(`/contact/${id}`);
    setMessages((prev) => prev.filter((m) => m._id !== id));
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <AnimatedSection className="flex items-center justify-between mb-10">
        <div>
          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-brand-gold mb-2">Admin</p>
          <h1 className="section-heading">Dashboard</h1>
          {email && <p className="text-sm text-slate-500 mt-1">Signed in as {email}</p>}
        </div>
        <button onClick={logout} className="btn-outline">Log Out</button>
      </AnimatedSection>

      {/* Tabs */}
      <div className="flex gap-2 mb-10 border-b border-white/10 pb-0">
        <button
          onClick={() => setTab("projects")}
          className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${tab === "projects" ? "bg-brand-blue text-white" : "text-slate-400 hover:text-white"}`}
        >
          Projects
        </button>
        <button
          onClick={() => setTab("messages")}
          className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${tab === "messages" ? "bg-brand-blue text-white" : "text-slate-400 hover:text-white"}`}
        >
          Messages
          {unreadCount > 0 && (
            <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </button>
      </div>

      {/* ── Projects Tab ── */}
      {tab === "projects" && (
        <>
          <AnimatedSection delay={0.1} className="glass-card p-8 mb-12">
            <h2 className="text-lg font-bold text-white mb-6">
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                  <input name="title" required value={form.title} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Tech Stack (comma separated)</label>
                  <input name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" className="input-field" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea name="description" required rows={3} value={form.description} onChange={handleChange} className="input-field resize-none" />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Live URL</label>
                  <input name="liveUrl" value={form.liveUrl} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Repo URL</label>
                  <input name="repoUrl" value={form.repoUrl} onChange={handleChange} className="input-field" />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-5 items-end">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="text-sm text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-brand-blue file:text-white file:font-semibold file:cursor-pointer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Display Order</label>
                  <input type="number" name="order" value={form.order} onChange={handleChange} className="input-field" />
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-300 pb-3">
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                  Featured on homepage
                </label>
              </div>

              {error && <p className="text-sm text-rose-400">{error}</p>}

              <div className="flex gap-4">
                <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                  {saving ? "Saving…" : editingId ? "Update Project" : "Add Project"}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="btn-outline">Cancel</button>
                )}
              </div>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="text-lg font-bold text-white mb-6">
              Existing Projects {!loading && `(${projects.length})`}
            </h2>
            {loading && <p className="text-slate-500">Loading…</p>}
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project._id} className="glass-card p-5 flex items-center gap-5">
                  <div className="h-16 w-16 rounded-lg bg-base-800 overflow-hidden shrink-0">
                    {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">
                      {project.title} {project.featured && <span className="text-brand-gold text-xs">★ Featured</span>}
                    </p>
                    <p className="text-sm text-slate-500 truncate">{project.description}</p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button onClick={() => startEdit(project)} className="text-sm font-semibold text-brand-blue hover:text-white">Edit</button>
                    <button onClick={() => handleDelete(project._id)} className="text-sm font-semibold text-rose-400 hover:text-rose-300">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </>
      )}

      {/* ── Messages Tab ── */}
      {tab === "messages" && (
        <AnimatedSection>
          <h2 className="text-lg font-bold text-white mb-6">
            Client Messages {!msgsLoading && `(${messages.length})`}
          </h2>
          {msgsLoading && <p className="text-slate-500">Loading…</p>}
          {!msgsLoading && messages.length === 0 && (
            <p className="text-slate-500">No messages yet.</p>
          )}
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`glass-card p-6 border transition-all duration-300 ${msg.read ? "border-white/10" : "border-brand-blue/40 bg-brand-blue/5"}`}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <p className="font-bold text-white">{msg.name}</p>
                      {!msg.read && (
                        <span className="text-xs bg-brand-blue text-white px-2 py-0.5 rounded-full font-semibold">New</span>
                      )}
                      <p className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleString()}</p>
                    </div>
                    <p className="text-sm text-brand-blue mb-2">{msg.email}</p>
                    <p className={`text-slate-300 text-sm leading-relaxed whitespace-pre-wrap ${expanded === msg._id ? "" : "line-clamp-2"}`}>
                      {msg.message}
                    </p>
                    {msg.message.length > 120 && (
                      <button
                        onClick={() => setExpanded(expanded === msg._id ? null : msg._id)}
                        className="text-xs text-brand-blue hover:text-white mt-1 transition-colors"
                      >
                        {expanded === msg._id ? "Show less" : "Read more"}
                      </button>
                    )}
                  </div>
                  <div className="flex gap-3 shrink-0">
                    {!msg.read && (
                      <button onClick={() => handleMarkRead(msg._id)} className="text-sm font-semibold text-brand-blue hover:text-white transition-colors">
                        Mark read
                      </button>
                    )}
                    <a href={`mailto:${msg.email}`} className="text-sm font-semibold text-brand-gold hover:text-white transition-colors">
                      Reply
                    </a>
                    <button onClick={() => handleDeleteMessage(msg._id)} className="text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      )}
    </section>
  );
}
