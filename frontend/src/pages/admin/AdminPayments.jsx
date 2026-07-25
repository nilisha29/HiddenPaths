import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/common/DashboardLayout";
import Pagination from "../../components/common/Pagination";
import { adminNavItems } from "../../components/admin/AdminNav";
import adminService from "../../services/adminService";
import usePagination from "../../hooks/usePagination";
import { ADMIN_PAGE_SIZE } from "../../utils/constants";
import { formatCurrency } from "../../utils/format";
import { useToast } from "../../context/ToastContext";

const AdminPayments = () => {
  const toast = useToast();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = () => adminService.payments().then((res) => setPayments(res.data.data)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return payments;
    const q = search.toLowerCase();
    return payments.filter(
      (p) => p.transactionId?.toLowerCase().includes(q) || p.userId?.name?.toLowerCase().includes(q)
    );
  }, [payments, search]);

  const { page, setPage, totalPages, pageItems } = usePagination(filtered, ADMIN_PAGE_SIZE);

  const markRefunded = async (id) => {
    if (!window.confirm("Mark this payment as failed/refunded? This also marks the booking refunded.")) return;
    await adminService.updatePayment(id, { status: "failed" });
    toast.success("Payment marked as refunded.");
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this payment record?")) return;
    await adminService.deletePayment(id);
    toast.success("Payment record deleted.");
    load();
  };

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNavItems}>
      <div className="panel-header"><h1>Payments</h1></div>

      <div className="admin-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input placeholder="Search by transaction ID or traveler..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : payments.length === 0 ? (
        <div className="empty-state">No payments yet.</div>
      ) : (
        <>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Transaction ID</th><th>Traveler</th><th>Experience</th><th>Method</th><th>Amount</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {pageItems.map((p) => (
                <tr key={p._id}>
                  <td>{p.transactionId}</td>
                  <td>{p.userId?.name}<br /><span className="text-muted" style={{ fontSize: 12 }}>{p.userId?.email}</span></td>
                  <td>{p.bookingId?.experienceId?.title || "—"}</td>
                  <td style={{ textTransform: "capitalize" }}>{p.method}</td>
                  <td>{formatCurrency(p.amount)}</td>
                  <td>
                    <span className={`badge badge-${p.status === "success" ? "success" : "cancelled"}`}>{p.status}</span>
                  </td>
                  <td>
                    <div className="table-actions">
                      {p.status === "success" && (
                        <button className="btn btn-secondary btn-sm" onClick={() => markRefunded(p._id)}>Mark Refunded</button>
                      )}
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
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
    </DashboardLayout>
  );
};

export default AdminPayments;
