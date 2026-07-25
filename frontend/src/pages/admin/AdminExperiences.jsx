import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import Pagination from "../../components/common/Pagination";
import { adminNavItems } from "../../components/admin/AdminNav";
import adminService from "../../services/adminService";
import usePagination from "../../hooks/usePagination";
import { ADMIN_PAGE_SIZE } from "../../utils/constants";
import { formatCurrency } from "../../utils/format";
import { useToast } from "../../context/ToastContext";

const AdminExperiences = () => {
  const toast = useToast();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = () => adminService.experiences().then((res) => setExperiences(res.data.data)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return experiences;
    const q = search.toLowerCase();
    return experiences.filter(
      (e) => e.title.toLowerCase().includes(q) || e.guideId?.name?.toLowerCase().includes(q)
    );
  }, [experiences, search]);

  const { page, setPage, totalPages, pageItems } = usePagination(filtered, ADMIN_PAGE_SIZE);

  const approve = async (id) => { await adminService.approveExperience(id); toast.success("Experience approved."); load(); };
  const remove = async (id) => { await adminService.removeExperience(id); toast.success("Experience removed."); load(); };
  const feature = async (id) => { await adminService.featureExperience(id); toast.success("Featured status updated."); load(); };
  const destroy = async (id) => {
    if (!window.confirm("Permanently delete this experience? This cannot be undone.")) return;
    await adminService.deleteExperience(id);
    toast.success("Experience deleted.");
    load();
  };

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNavItems}>
      <div className="panel-header">
        <h1>Experiences</h1>
        <Link to="/admin/experiences/new" className="btn btn-primary btn-sm">+ Add Experience</Link>
      </div>

      <div className="admin-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input placeholder="Search by title or guide..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : (
        <>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>Title</th><th>Guide</th><th>Category</th><th>Price</th><th>Status</th><th>Featured</th><th></th></tr>
              </thead>
              <tbody>
                {pageItems.map((exp) => (
                  <tr key={exp._id}>
                    <td><Link to={`/explore/${exp._id}`} target="_blank" className="auth-inline-link">{exp.title}</Link></td>
                    <td>{exp.guideId?.name}</td>
                    <td>{exp.category?.name}</td>
                    <td>{formatCurrency(exp.price)}</td>
                    <td>
                      <span className={`badge badge-${exp.isApproved ? "success" : exp.status === "archived" ? "cancelled" : "pending"}`}>
                        {exp.isApproved ? "Approved" : exp.status === "archived" ? "Removed" : "Pending"}
                      </span>
                    </td>
                    <td>{exp.isFeatured ? "★" : "—"}</td>
                    <td>
                      <div className="table-actions">
                        {!exp.isApproved && <button className="btn btn-primary btn-sm" onClick={() => approve(exp._id)}>Approve</button>}
                        <Link to={`/admin/experiences/${exp._id}/edit`} className="btn btn-secondary btn-sm">Edit</Link>
                        <button className="btn btn-secondary btn-sm" onClick={() => feature(exp._id)}>
                          {exp.isFeatured ? "Unfeature" : "Feature"}
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => remove(exp._id)}>Remove</button>
                        <button className="btn btn-danger btn-sm" onClick={() => destroy(exp._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pageItems.length === 0 && (
                  <tr><td colSpan={7} className="empty-state">No experiences match your search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminExperiences;
