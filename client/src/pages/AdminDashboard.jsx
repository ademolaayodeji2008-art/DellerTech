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

function StatusBadge({ status }) {
  const s = status || "new";
  const styles = {
    new: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
    read: "bg-slate-500/20 text-slate-400 border border-slate-500/30",
    replied: "bg-green-500/20 text-green-400 border border-green-500/30",
  };
  return (
    <span className={`rounded-full text-xs px-2 py-0.5 font-semibold ${styles[s] || styles.new}`}>
      {s.charAt(0).toUpperCase() + s.slice(1)}
    </span>
  );
}

function CategoryBadge({ category }) {
  const c = category || "general";
  const styles = {
    general: "bg-brand-blue/20 text-brand-blue border border-brand-blue/30",
    project: "bg-brand-gold/20 text-brand-gold border border-brand-gold/30",
    school: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  };
  return (
    <span className={`rounded-full text-xs px-2 py-0.5 font-semibold ${styles[c] || styles.general}`}>
      {c.charAt(0).toUpperCase() + c.slice(1)}
    </span>
  );
}

export default function AdminDashboard() {
  const { logout, email } = useAuth();
  const [tab, setTab] = useState("overview");

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
  const [noteValues, setNoteValues] = useState({});

  // ── Stats state ─────────────────────────────────────────────────
  const [msgStats, setMsgStats] = useState({
    total: 0,
    newCount: 0,
    readCount: 0,
    repliedCount: 0,
    byCategory: { general: 0, project: 0, school: 0 },
  });
  const [projStats, setProjStats] = useState({ total: 0, featured: 0, recent: [] });

  // ── Filter state ────────────────────────────────────────────────
  const [msgFilter, setMsgFilter] = useState({ category: "all", status: "all" });

  // ── Settings / password state ───────────────────────────────────
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwStatus, setPwStatus] = useState("idle");
  const [pwError, setPwError] = useState("");

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
      const notes = {};
      data.forEach((m) => { notes[m._id] = m.adminNote || ""; });
      setNoteValues(notes);
    } catch {
      setMessages([]);
    } finally {
      setMsgsLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
    loadMessages();
    api.get("/contact/stats").then(({ data }) => setMsgStats(data)).catch(() => {});
    api.get("/projects/stats").then(({ data }) => setProjStats(data)).catch(() => {});
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

  async function handleMessageFieldChange(id, field, value) {
    try {
      const { data } = await api.patch(`/contact/${id}`, { [field]: value });
      setMessages((prev) => prev.map((m) => m._id === id ? data : m));
      if (field === "status" || field === "category") {
        // refresh stats
        api.get("/contact/stats").then(({ data: s }) => setMsgStats(s)).catch(() => {});
      }
    } catch {
      // silent — the select/textarea will revert on next render
    }
  }

  async function handleNoteBlur(id) {
    const noteValue = noteValues[id] || "";
    try {
      const { data } = await api.patch(`/contact/${id}`, { adminNote: noteValue });
      setMessages((prev) => prev.map((m) => m._id === id ? data : m));
    } catch {
      // silent
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPwError("");
    if (pwForm.next !== pwForm.confirm) {
      setPwError("New passwords do not match.");
      return;
    }
    if (pwForm.next.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    setPwStatus("saving");
    try {
      await api.post("/auth/change-password", {
        currentPassword: pwForm.current,
        newPassword: pwForm.next,
      });
      setPwStatus("success");
      setPwForm({ current: "", next: "", confirm: "" });
      setPwError("");
    } catch (err) {
      setPwStatus("error");
      setPwError(err.response?.data?.message || "Failed to update password.");
    }
  }

  const filteredMessages = messages.filter((m) => {
    const catMatch = msgFilter.category === "all" || m.category === msgFilter.category;
    const statMatch = msgFilter.status === "all" || (m.status || "new") === msgFilter.status;
    return catMatch && statMatch;
  });

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
          onClick={() => setTab("overview")}
          className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${tab === "overview" ? "bg-brand-blue text-white" : "text-slate-400 hover:text-white"}`}
        >
          Overview
        </button>
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
          {msgStats.newCount > 0 && (
            <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {msgStats.newCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab("settings")}
          className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${tab === "settings" ? "bg-brand-blue text-white" : "text-slate-400 hover:text-white"}`}
        >
          Settings
        </button>
      </div>

      {/* ── Overview Tab ── */}
      {tab === "overview" && (
        <AnimatedSection>
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {/* Total Projects */}
            <div className="glass-card p-5 border-l-4 border-brand-blue">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Total Projects</p>
                  <p className="text-3xl font-bold text-white">{projects.length}</p>
                </div>
                <svg className="w-6 h-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>

            {/* Total Messages */}
            <div className="glass-card p-5 border-l-4 border-slate-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Total Messages</p>
                  <p className="text-3xl font-bold text-white">{msgStats.total}</p>
                </div>
                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2z" />
                </svg>
              </div>
            </div>

            {/* Unread */}
            <div className="glass-card p-5 border-l-4 border-rose-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Unread</p>
                  <p className="text-3xl font-bold text-white">{msgStats.newCount}</p>
                </div>
                <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>

            {/* Replied */}
            <div className="glass-card p-5 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Replied</p>
                  <p className="text-3xl font-bold text-white">{msgStats.repliedCount}</p>
                </div>
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Recent Messages */}
          <h2 className="text-lg font-bold text-white mb-4">Recent Messages</h2>
          <div className="space-y-3 mb-10">
            {messages.slice(0, 5).map((msg) => (
              <div key={msg._id} className="glass-card p-4 flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{msg.name}</p>
                  <p className="text-xs text-slate-400 truncate max-w-xs">{msg.message}</p>
                </div>
                <p className="text-xs text-slate-500 shrink-0">{new Date(msg.createdAt).toLocaleDateString()}</p>
                <StatusBadge status={msg.status} />
              </div>
            ))}
            {messages.length === 0 && <p className="text-slate-500 text-sm">No messages yet.</p>}
          </div>

          {/* Recent Projects */}
          <h2 className="text-lg font-bold text-white mb-4">Recent Projects</h2>
          <div className="space-y-3 mb-6">
            {projStats.recent.map((item) => (
              <div key={item._id} className="glass-card p-4 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white text-sm">{item.title}</span>
                  {item.featured && (
                    <span className="text-xs text-brand-gold ml-2">★ Featured</span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
            {projStats.recent.length === 0 && <p className="text-slate-500 text-sm">No projects yet.</p>}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-4 mt-6 flex-wrap">
            <button onClick={() => setTab("projects")} className="btn-primary">Add Project</button>
            <button onClick={() => setTab("messages")} className="btn-outline">View Messages</button>
          </div>
        </AnimatedSection>
      )}

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
            Client Messages {!msgsLoading && `(${filteredMessages.length})`}
          </h2>

          {/* Filter bar */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              {["all", "general", "project", "school"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setMsgFilter((f) => ({ ...f, category: cat }))}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    msgFilter.category === cat ? "bg-brand-blue text-white" : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "new", "read", "replied"].map((st) => (
                <button
                  key={st}
                  onClick={() => setMsgFilter((f) => ({ ...f, status: st }))}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    msgFilter.status === st ? "bg-brand-blue text-white" : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {msgsLoading && <p className="text-slate-500">Loading…</p>}
          {!msgsLoading && filteredMessages.length === 0 && (
            <p className="text-slate-500">No messages match this filter.</p>
          )}

          <div className="space-y-4">
            {filteredMessages.map((msg) => (
              <div key={msg._id} className="glass-card p-6 mb-4">
                {/* Header row */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-bold text-white">{msg.name}</p>
                    <p className="text-sm text-brand-blue">{msg.email}</p>
                    <p className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CategoryBadge category={msg.category} />
                    <StatusBadge status={msg.status} />
                  </div>
                </div>

                {/* Message body */}
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

                {/* Expanded controls */}
                {expanded === msg._id && (
                  <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Admin Note</label>
                      <textarea
                        rows={2}
                        className="input-field mt-1 text-sm resize-none w-full"
                        placeholder="Add a note..."
                        value={noteValues[msg._id] ?? ""}
                        onChange={(e) =>
                          setNoteValues((prev) => ({ ...prev, [msg._id]: e.target.value }))
                        }
                        onBlur={() => handleNoteBlur(msg._id)}
                      />
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Status</label>
                        <select
                          className="input-field text-sm mt-1"
                          value={msg.status || "new"}
                          onChange={(e) => handleMessageFieldChange(msg._id, "status", e.target.value)}
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Category</label>
                        <select
                          className="input-field text-sm mt-1"
                          value={msg.category || "general"}
                          onChange={(e) => handleMessageFieldChange(msg._id, "category", e.target.value)}
                        >
                          <option value="general">General</option>
                          <option value="project">Project</option>
                          <option value="school">School</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-4 mt-4 flex-wrap">
                  {!msg.read && (
                    <button
                      onClick={() => handleMarkRead(msg._id)}
                      className="text-sm font-semibold text-brand-blue hover:text-white transition-colors"
                    >
                      Mark read
                    </button>
                  )}
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm font-semibold text-brand-gold hover:text-white transition-colors"
                  >
                    Reply
                  </a>
                  <button
                    onClick={() => handleDeleteMessage(msg._id)}
                    className="text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* ── Settings Tab ── */}
      {tab === "settings" && (
        <AnimatedSection>
          {/* QR Code section */}
          <div className="glass-card p-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-2">Your QR Code</h2>
            <p className="text-sm text-slate-400 mb-5">
              Share this QR code on your business card, social media, or printed materials.
              When scanned, it opens your digital business card.
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-3 rounded-xl inline-block">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fdellertech.com.ng%2Fcard&bgcolor=ffffff&color=000000&margin=2"
                  alt="QR Code — dellertech.com.ng/card"
                  width={200}
                  height={200}
                  className="block"
                />
              </div>
              <p className="text-xs text-slate-500 text-center">
                Encodes: https://dellertech.com.ng/card
              </p>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch(
                      "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https%3A%2F%2Fdellertech.com.ng%2Fcard&bgcolor=ffffff&color=000000&margin=2"
                    );
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "dellertech-qrcode.png";
                    a.click();
                    URL.revokeObjectURL(url);
                  } catch {
                    alert("Download failed. Right-click the QR code image and choose Save Image.");
                  }
                }}
                className="btn-primary"
              >
                Download QR Code
              </button>
            </div>
          </div>

          {/* Site Info card */}
          <div className="glass-card p-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">Site Information</h2>
            <dl>
              <div className="flex justify-between py-2 border-b border-white/5">
                <dt className="text-sm text-slate-400">Company</dt>
                <dd className="text-sm text-white">DellerTech</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <dt className="text-sm text-slate-400">Admin email</dt>
                <dd className="text-sm text-white">{email}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <dt className="text-sm text-slate-400">WhatsApp</dt>
                <dd className="text-sm text-white">+2349138008234</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <dt className="text-sm text-slate-400">Live site</dt>
                <dd className="text-sm text-white">
                  <a
                    href="https://dellertech.com.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue hover:underline"
                  >
                    https://dellertech.com.ng
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Change Password card */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-bold text-white mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                <input
                  type="password"
                  className="input-field"
                  value={pwForm.current}
                  onChange={(e) => setPwForm((f) => ({ ...f, current: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                <input
                  type="password"
                  className="input-field"
                  value={pwForm.next}
                  onChange={(e) => setPwForm((f) => ({ ...f, next: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="input-field"
                  value={pwForm.confirm}
                  onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={pwStatus === "saving"}
                className="btn-primary mt-2 disabled:opacity-60"
              >
                {pwStatus === "saving" ? "Saving…" : "Update Password"}
              </button>
              {pwStatus === "success" && (
                <p className="text-sm text-green-400 mt-3">Password updated successfully!</p>
              )}
              {pwError && <p className="text-sm text-rose-400 mt-3">{pwError}</p>}
            </form>
          </div>
        </AnimatedSection>
      )}
    </section>
  );
}
