import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/common/DashboardLayout";
import Pagination from "../../components/common/Pagination";
import { adminNavItems } from "../../components/admin/AdminNav";
import adminService from "../../services/adminService";
import usePagination from "../../hooks/usePagination";
import { ADMIN_PAGE_SIZE } from "../../utils/constants";
import { useToast } from "../../context/ToastContext";

const emptyAddForm = { name: "", email: "", phone: "", password: "", location: "", bio: "" };

const AdminGuides = () => {
  const toast = useToast();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(emptyAddForm);
  const [addError, setAddError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ bio: "", isVerified: false });

  const [viewingGuide, setViewingGuide] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const load = () => adminService.guides().then((res) => setGuides(res.data.data)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const { page, setPage, totalPages, pageItems } = usePagination(guides, ADMIN_PAGE_SIZE);

  const updateStatus = async (id, status) => {
    await adminService.updateGuideStatus(id, status);
    toast.success(`Guide ${status}.`);
    load();
  };

  const saveProfile = async (id) => {
    await adminService.updateGuideProfile(id, editForm);
    setEditingId(null);
    toast.success("Guide profile updated.");
    load();
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setAddError("");
    try {
      await adminService.createGuide(addForm);
      setAddForm(emptyAddForm);
      setShowAddForm(false);
      toast.success("Guide created.");
      load();
    } catch (err) {
      const msg = err.response?.data?.message || "Could not create guide.";
      setAddError(msg);
      toast.error(msg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this guide account permanently? Their experiences will remain but unassigned.")) return;
    await adminService.deleteGuide(id);
    toast.success("Guide deleted.");
    load();
  };

  const openView = async (id) => {
    setViewLoading(true);
    setViewingGuide({});
    const res = await adminService.getGuideById(id);
    setViewingGuide(res.data.data);
    setViewLoading(false);
  };

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNavItems}>
      <div className="panel-header">
        <h1>Guides</h1>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm((v) => !v)}>
          {showAddForm ? "Cancel" : "+ Add Guide"}
        </button>
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
          <div className="field-group">
            <label className="field-label">Location</label>
            <input className="input-field" value={addForm.location} onChange={(e) => setAddForm({ ...addForm, location: e.target.value })} />
          </div>
          <div className="field-group">
            <label className="field-label">Bio</label>
            <textarea className="textarea-field" rows={2} value={addForm.bio} onChange={(e) => setAddForm({ ...addForm, bio: e.target.value })} />
          </div>
          <p className="field-hint" style={{ marginBottom: 12 }}>Guides added here are pre-approved and can publish experiences immediately.</p>
          <button className="btn btn-primary">Create Guide</button>
        </form>
      )}

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : (
        <>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {pageItems.map((g) => (
                <tr key={g._id}>
                  <td>{g.name}</td>
                  <td>{g.email}</td>
                  <td>
                    <span className={`badge badge-${g.guideStatus === "approved" ? "success" : g.guideStatus === "rejected" ? "cancelled" : "pending"}`}>
                      {g.guideStatus}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      {g.guideStatus !== "approved" && (
                        <button className="btn btn-primary btn-sm" onClick={() => updateStatus(g._id, "approved")}>Approve</button>
                      )}
                      {g.guideStatus !== "rejected" && (
                        <button className="btn btn-danger btn-sm" onClick={() => updateStatus(g._id, "rejected")}>Reject</button>
                      )}
                      <button className="btn btn-secondary btn-sm" onClick={() => openView(g._id)}>View</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => { setEditingId(g._id); setEditForm({ bio: "", isVerified: true }); }}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(g._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      {editingId && (
        <div className="modal-overlay" onClick={() => setEditingId(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: 16 }}>Edit Guide Profile</h3>
            <div className="field-group">
              <label className="field-label">Bio override (optional)</label>
              <textarea className="textarea-field" rows={3} value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} />
            </div>
            <label className="guide-toggle">
              <input type="checkbox" checked={editForm.isVerified} onChange={(e) => setEditForm({ ...editForm, isVerified: e.target.checked })} />
              <span>Mark as verified host</span>
            </label>
            <div className="flex gap-2" style={{ marginTop: 16 }}>
              <button className="btn btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => saveProfile(editingId)}>Save</button>
            </div>
          </div>
        </div>
      )}

      {viewingGuide && (
        <div className="modal-overlay" onClick={() => setViewingGuide(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            {viewLoading || !viewingGuide.guide ? (
              <div className="loading-state">Loading...</div>
            ) : (
              <>
                <h3 style={{ marginBottom: 16 }}>{viewingGuide.guide.name}</h3>
                <div className="detail-modal-section">
                  <p className="detail-modal-label">Email</p>
                  <p className="detail-modal-value">{viewingGuide.guide.email}</p>
                </div>
                <div className="detail-modal-section">
                  <p className="detail-modal-label">Bio</p>
                  <p className="detail-modal-value">{viewingGuide.profile?.bio || "—"}</p>
                </div>
                <div className="detail-modal-section">
                  <p className="detail-modal-label">Location</p>
                  <p className="detail-modal-value">{viewingGuide.profile?.location || "—"}</p>
                </div>
                <div className="detail-modal-section">
                  <p className="detail-modal-label">Experiences ({viewingGuide.experiences?.length || 0})</p>
                  <p className="detail-modal-value">
                    {viewingGuide.experiences?.map((e) => e.title).join(", ") || "None yet"}
                  </p>
                </div>
                <div className="detail-modal-section">
                  <p className="detail-modal-label">Total Bookings</p>
                  <p className="detail-modal-value">{viewingGuide.bookings?.length || 0}</p>
                </div>
                <button className="btn btn-secondary" onClick={() => setViewingGuide(null)}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminGuides;
