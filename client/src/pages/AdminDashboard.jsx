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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadProjects() {
    setLoading(true);
    try {
      const { data } = await api.get("/projects");
      setProjects(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
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

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <AnimatedSection className="flex items-center justify-between mb-10">
        <div>
          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-accent-cyan mb-2">Admin</p>
          <h1 className="section-heading">Project Manager</h1>
          {email && <p className="text-sm text-slate-500 mt-1">Signed in as {email}</p>}
        </div>
        <button onClick={logout} className="btn-outline">Log Out</button>
      </AnimatedSection>

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
              <input
                name="techStack"
                value={form.techStack}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              name="description"
              required
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="input-field resize-none"
            />
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
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="text-sm text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-brand-gradient file:text-base-950 file:font-semibold file:cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Display Order</label>
              <input
                type="number"
                name="order"
                value={form.order}
                onChange={handleChange}
                className="input-field"
              />
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
              <button type="button" onClick={resetForm} className="btn-outline">
                Cancel
              </button>
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
                {project.imageUrl && (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">
                  {project.title} {project.featured && <span className="gradient-text text-xs">★ Featured</span>}
                </p>
                <p className="text-sm text-slate-500 truncate">{project.description}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => startEdit(project)} className="text-sm font-semibold text-accent-cyan hover:text-white">
                  Edit
                </button>
                <button onClick={() => handleDelete(project._id)} className="text-sm font-semibold text-rose-400 hover:text-rose-300">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
