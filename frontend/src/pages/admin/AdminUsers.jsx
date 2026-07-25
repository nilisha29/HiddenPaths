import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/common/DashboardLayout";
import Pagination from "../../components/common/Pagination";
import { adminNavItems } from "../../components/admin/AdminNav";
import adminService from "../../services/adminService";
import usePagination from "../../hooks/usePagination";
import { ADMIN_PAGE_SIZE } from "../../utils/constants";
import { useToast } from "../../context/ToastContext";

const emptyForm = { name: "", email: "", phone: "", password: "" };

const AdminUsers = () => {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [addError, setAddError] = useState("");

  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", phone: "" });

  const [viewingUser, setViewingUser] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const load = () => adminService.users().then((res) => setUsers(res.data.data)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [users, search]);

  const { page, setPage, totalPages, pageItems } = usePagination(filteredUsers, ADMIN_PAGE_SIZE);

  const stats = useMemo(() => {
    const now = new Date();
    const thisMonth = users.filter((u) => {
      const d = new Date(u.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    return {
      total: users.length,
      active: users.filter((u) => !u.isBlocked).length,
      blocked: users.filter((u) => u.isBlocked).length,
      thisMonth,
    };
  }, [users]);

  const toggleBlock = async (id) => {
    await adminService.toggleBlockUser(id);
    toast.success("User status updated.");
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    await adminService.deleteUser(id);
    toast.success("User deleted.");
    load();
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setAddError("");
    try {
      await adminService.createUser(addForm);
      setAddForm(emptyForm);
      setShowAddForm(false);
      toast.success("User created.");
      load();
    } catch (err) {
      const msg = err.response?.data?.message || "Could not create user.";
      setAddError(msg);
      toast.error(msg);
    }
  };

  const openEdit = (u) => {
    setEditingUser(u);
    setEditForm({ name: u.name, phone: u.phone || "" });
  };

  const saveEdit = async () => {
    await adminService.updateUser(editingUser._id, editForm);
    setEditingUser(null);
    toast.success("User updated.");
    load();
  };

  const openView = async (id) => {
    setViewLoading(true);
    setViewingUser({});
    const res = await adminService.getUserById(id);
    setViewingUser(res.data.data);
    setViewLoading(false);
  };

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNavItems}>
      <div className="panel-header">
        <h1>Users</h1>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm((v) => !v)}>
          {showAddForm ? "Cancel" : "+ Add User"}
        </button>
      </div>

      <div className="stat-tile-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-tile">
          <p className="stat-tile-label">Total Users</p>
          <p className="stat-tile-value">{stats.total}</p>
        </div>
        <div className="stat-tile">
          <p className="stat-tile-label">Active</p>
          <p className="stat-tile-value" style={{ color: "var(--color-success-text)" }}>{stats.active}</p>
        </div>
        <div className="stat-tile">
          <p className="stat-tile-label">Blocked</p>
          <p className="stat-tile-value accent">{stats.blocked}</p>
        </div>
        <div className="stat-tile">
          <p className="stat-tile-label">New This Month</p>
          <p className="stat-tile-value">{stats.thisMonth}</p>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="card" style={{ padding: 24, marginBottom: 24 }}>
          {addError && <div className="form-error">{addError}</div>}
          <div className="booking-form-row">
            <div className="field-group">
              <label className="field-label">Name</label>
              <input className="input-field" required value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} />
            </div>
            <div className="field-group">
              <label className="field-label">Email</label>
              <input type="email" className="input-field" required value={addForm.email} onChange={(e) => setAddForm({ ...addForm, email: e.target.value })} />
            </div>
          </div>
          <div className="booking-form-row">
            <div className="field-group">
              <label className="field-label">Phone</label>
              <input className="input-field" value={addForm.phone} onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })} />
            </div>
            <div className="field-group">
              <label className="field-label">Password</label>
              <input type="password" className="input-field" required minLength={6} value={addForm.password} onChange={(e) => setAddForm({ ...addForm, password: e.target.value })} />
            </div>
          </div>
          <button className="btn btn-primary">Create User</button>
        </form>
      )}

      <div className="admin-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          placeholder="Search users by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : (
        <>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Phone</th><th>Interests</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {pageItems.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <div className="table-user-cell">
                        <span className="table-avatar">{u.name?.[0]?.toUpperCase()}</span>
                        <span>{u.name}</span>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>{u.phone || "—"}</td>
                    <td>{u.interests?.join(", ") || "—"}</td>
                    <td>
                      <span className={`badge badge-${u.isBlocked ? "cancelled" : "success"}`}>
                        {u.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-secondary btn-sm" onClick={() => openView(u._id)}>View</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(u)}>Edit</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => toggleBlock(u._id)}>
                          {u.isBlocked ? "Unblock" : "Block"}
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pageItems.length === 0 && (
                  <tr><td colSpan={6} className="empty-state">No users match your search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      {editingUser && (
        <div className="modal-overlay" onClick={() => setEditingUser(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: 16 }}>Edit User</h3>
            <div className="field-group">
              <label className="field-label">Name</label>
              <input className="input-field" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
            </div>
            <div className="field-group">
              <label className="field-label">Phone</label>
              <input className="input-field" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
            </div>
            <div className="flex gap-2" style={{ marginTop: 16 }}>
              <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}

      {viewingUser && (
        <div className="modal-overlay" onClick={() => setViewingUser(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            {viewLoading || !viewingUser.user ? (
              <div className="loading-state">Loading...</div>
            ) : (
              <>
                <h3 style={{ marginBottom: 16 }}>{viewingUser.user.name}</h3>
                <div className="detail-modal-section">
                  <p className="detail-modal-label">Email</p>
                  <p className="detail-modal-value">{viewingUser.user.email}</p>
                </div>
                <div className="detail-modal-section">
                  <p className="detail-modal-label">Phone</p>
                  <p className="detail-modal-value">{viewingUser.user.phone || "—"}</p>
                </div>
                <div className="detail-modal-section">
                  <p className="detail-modal-label">Interests</p>
                  <p className="detail-modal-value">{viewingUser.user.interests?.join(", ") || "—"}</p>
                </div>
                <div className="detail-modal-section">
                  <p className="detail-modal-label">Bookings ({viewingUser.bookings?.length || 0})</p>
                  {viewingUser.bookings?.length > 0 ? (
                    <ul style={{ fontSize: 14 }}>
                      {viewingUser.bookings.map((b) => (
                        <li key={b._id} style={{ marginBottom: 4 }}>
                          {b.experienceId?.title} — <span className="text-muted">{b.status}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No bookings yet.</p>
                  )}
                </div>
                <button className="btn btn-secondary" onClick={() => setViewingUser(null)}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminUsers;
