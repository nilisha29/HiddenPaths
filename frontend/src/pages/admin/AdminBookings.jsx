import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/common/DashboardLayout";
import Pagination from "../../components/common/Pagination";
import { adminNavItems } from "../../components/admin/AdminNav";
import adminService from "../../services/adminService";
import usePagination from "../../hooks/usePagination";
import { ADMIN_PAGE_SIZE } from "../../utils/constants";
import { formatCurrency } from "../../utils/format";
import { useToast } from "../../context/ToastContext";

const AdminBookings = () => {
  const toast = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editForm, setEditForm] = useState({ status: "", date: "" });

  const load = () => adminService.bookings().then((res) => setBookings(res.data.data)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const { page, setPage, totalPages, pageItems } = usePagination(bookings, ADMIN_PAGE_SIZE);

  const openEdit = (b) => {
    setEditingBooking(b);
    setEditForm({ status: b.status, date: new Date(b.date).toISOString().slice(0, 10) });
  };

  const saveEdit = async () => {
    await adminService.updateBooking(editingBooking._id, editForm);
    setEditingBooking(null);
    toast.success("Booking updated.");
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this booking?")) return;
    await adminService.deleteBooking(id);
    toast.success("Booking deleted.");
    load();
  };

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNavItems}>
      <div className="panel-header"><h1>Bookings</h1></div>

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : (
        <>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Reference</th><th>Traveler</th><th>Guide</th><th>Experience</th><th>Total</th><th>Payment</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {pageItems.map((b) => (
                <tr key={b._id}>
                  <td>{b.referenceNumber}</td>
                  <td>{b.userId?.name}</td>
                  <td>{b.guideId?.name}</td>
                  <td>{b.experienceId?.title}</td>
                  <td>{formatCurrency(b.totalPrice)}</td>
                  <td>
                    <span className={`badge badge-${b.paymentStatus === "paid" ? "success" : "pending"}`}>{b.paymentStatus}</span>
                  </td>
                  <td>
                    <span className={`badge badge-${b.status === "confirmed" || b.status === "completed" ? "success" : b.status === "cancelled" ? "cancelled" : "pending"}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-secondary btn-sm" onClick={() => openEdit(b)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(b._id)}>Delete</button>
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

      {editingBooking && (
        <div className="modal-overlay" onClick={() => setEditingBooking(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: 16 }}>Edit Booking — {editingBooking.referenceNumber}</h3>
            <div className="field-group">
              <label className="field-label">Status</label>
              <select className="select-field" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="field-group">
              <label className="field-label">Date</label>
              <input type="date" className="input-field" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} />
            </div>
            <div className="flex gap-2" style={{ marginTop: 16 }}>
              <button className="btn btn-secondary" onClick={() => setEditingBooking(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminBookings;
