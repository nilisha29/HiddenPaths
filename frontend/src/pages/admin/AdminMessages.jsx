import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/common/DashboardLayout";
import Pagination from "../../components/common/Pagination";
import { adminNavItems } from "../../components/admin/AdminNav";
import adminMessageService from "../../services/adminMessageService";
import usePagination from "../../hooks/usePagination";
import { ADMIN_PAGE_SIZE } from "../../utils/constants";
import { formatShortDate } from "../../utils/format";
import { useToast } from "../../context/ToastContext";

const AdminMessages = () => {
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => adminMessageService.list().then((res) => setMessages(res.data.data)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const { page, setPage, totalPages, pageItems } = usePagination(messages, ADMIN_PAGE_SIZE);

  const handleOpen = async (m) => {
    if (!m.isRead) await adminMessageService.markRead(m._id);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await adminMessageService.remove(id);
    toast.success("Message deleted.");
    load();
  };

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNavItems}>
      <div className="panel-header"><h1>Contact Messages</h1></div>

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : messages.length === 0 ? (
        <div className="empty-state">No messages yet.</div>
      ) : (
        <>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>From</th><th>Subject</th><th>Message</th><th>Received</th><th></th></tr>
              </thead>
              <tbody>
                {pageItems.map((m) => (
                  <tr key={m._id} style={{ fontWeight: m.isRead ? 400 : 700 }} onClick={() => handleOpen(m)}>
                    <td>{m.name}<br /><span className="text-muted" style={{ fontSize: 12, fontWeight: 400 }}>{m.email}</span></td>
                    <td>{m.subject}</td>
                    <td style={{ maxWidth: 320 }}>{m.message}</td>
                    <td>{formatShortDate(m.createdAt)}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); handleDelete(m._id); }}>
                        Delete
                      </button>
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

export default AdminMessages;
