import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/common/DashboardLayout";
import Pagination from "../../components/common/Pagination";
import { adminNavItems } from "../../components/admin/AdminNav";
import journalService from "../../services/journalService";
import usePagination from "../../hooks/usePagination";
import { ADMIN_PAGE_SIZE } from "../../utils/constants";
import { useToast } from "../../context/ToastContext";

const emptyForm = {
  title: "",
  content: "",
  excerpt: "",
  authorName: "HiddenPaths Team",
  visitedLocation: "",
};

const AdminJournals = () => {
  const toast = useToast();
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => journalService.list({ limit: 100 }).then((res) => setJournals(res.data.data)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const { page, setPage, totalPages, pageItems } = usePagination(journals, ADMIN_PAGE_SIZE);

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (imageFile) formData.append("image", imageFile);
    await journalService.create(formData);
    setForm(emptyForm);
    setImageFile(null);
    setShowForm(false);
    toast.success("Journal post published.");
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await journalService.remove(id);
    toast.success("Journal post deleted.");
    load();
  };

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNavItems}>
      <div className="panel-header">
        <h1>Journal Posts</h1>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "+ New Post"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="card" style={{ padding: 24, marginBottom: 24 }}>
          <div className="field-group">
            <label className="field-label">Title</label>
            <input className="input-field" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="field-group">
            <label className="field-label">Content</label>
            <textarea className="textarea-field" rows={5} required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          </div>
          <div className="field-group">
            <label className="field-label">Excerpt (short italic quote for preview cards)</label>
            <textarea className="textarea-field" rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          </div>
          <div className="booking-form-row">
            <div className="field-group">
              <label className="field-label">Author Name</label>
              <input className="input-field" value={form.authorName} onChange={(e) => setForm({ ...form, authorName: e.target.value })} />
            </div>
            <div className="field-group">
              <label className="field-label">Visited Location</label>
              <input className="input-field" placeholder="e.g. Visited Lo Manthang" value={form.visitedLocation} onChange={(e) => setForm({ ...form, visitedLocation: e.target.value })} />
            </div>
          </div>
          <div className="field-group">
            <label className="field-label">Cover Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
          </div>
          <button className="btn btn-primary">Publish</button>
        </form>
      )}

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : (
        <>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead><tr><th>Title</th><th>Author</th><th>Published</th><th></th></tr></thead>
              <tbody>
                {pageItems.map((j) => (
                  <tr key={j._id}>
                    <td>{j.title}</td>
                    <td>{j.authorName}</td>
                    <td>{j.isPublished ? "Yes" : "No"}</td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(j._id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminJournals;
