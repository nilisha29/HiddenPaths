import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/common/DashboardLayout";
import Pagination from "../../components/common/Pagination";
import { RatingLine } from "../../components/common/StarRating";
import { adminNavItems } from "../../components/admin/AdminNav";
import adminService from "../../services/adminService";
import usePagination from "../../hooks/usePagination";
import { ADMIN_PAGE_SIZE } from "../../utils/constants";
import { useToast } from "../../context/ToastContext";

const AdminReviews = () => {
  const toast = useToast();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => adminService.reviews().then((res) => setReviews(res.data.data)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const { page, setPage, totalPages, pageItems } = usePagination(reviews, ADMIN_PAGE_SIZE);

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this review? This will recalculate the experience's rating.")) return;
    await adminService.deleteReview(id);
    toast.success("Review removed.");
    load();
  };

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNavItems}>
      <div className="panel-header"><h1>Reviews</h1></div>

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : reviews.length === 0 ? (
        <div className="empty-state">No reviews yet.</div>
      ) : (
        <>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Traveler</th><th>Experience</th><th>Rating</th><th>Comment</th><th></th></tr>
            </thead>
            <tbody>
              {pageItems.map((r) => (
                <tr key={r._id}>
                  <td>{r.userId?.name}<br /><span className="text-muted" style={{ fontSize: 12 }}>{r.userId?.email}</span></td>
                  <td>{r.experienceId?.title}</td>
                  <td><RatingLine rating={r.rating} /></td>
                  <td style={{ maxWidth: 320 }}>{r.comment}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(r._id)}>Remove</button></td>
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

export default AdminReviews;
