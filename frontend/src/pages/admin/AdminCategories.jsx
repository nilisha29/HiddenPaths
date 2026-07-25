import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/common/DashboardLayout";
import { adminNavItems } from "../../components/admin/AdminNav";
import categoryService from "../../services/categoryService";
import { useToast } from "../../context/ToastContext";

const AdminCategories = () => {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", icon: "" });
  const [error, setError] = useState("");

  const load = () => categoryService.list().then((res) => setCategories(res.data.data)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await categoryService.create(form);
      setForm({ name: "", icon: "" });
      toast.success("Category added.");
      load();
    } catch (err) {
      const msg = err.response?.data?.message || "Could not create category.";
      setError(msg);
      toast.error(msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      await categoryService.remove(id);
      toast.success("Category deleted.");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete category.");
    }
  };

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNavItems}>
      <div className="panel-header"><h1>Categories</h1></div>

      <form onSubmit={handleCreate} className="card" style={{ padding: 20, marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-end" }}>
        {error && <div className="form-error" style={{ flexBasis: "100%" }}>{error}</div>}
        <div className="field-group" style={{ marginBottom: 0, flex: 1 }}>
          <label className="field-label">Name</label>
          <input className="input-field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="field-group" style={{ marginBottom: 0, flex: 1 }}>
          <label className="field-label">Icon (emoji or keyword)</label>
          <input className="input-field" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
        </div>
        <button className="btn btn-primary">Add Category</button>
      </form>

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : (
        <div className="data-table-wrap">
          <table className="data-table">
            <thead><tr><th>Name</th><th>Icon</th><th></th></tr></thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.icon}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(c._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminCategories;
