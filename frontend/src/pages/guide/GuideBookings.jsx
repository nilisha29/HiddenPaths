import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/common/DashboardLayout";
import Pagination from "../../components/common/Pagination";
import { guideNavItems } from "../../components/guide/GuideNav";
import guideService from "../../services/guideService";
import usePagination from "../../hooks/usePagination";
import { ADMIN_PAGE_SIZE } from "../../utils/constants";
import { formatCurrency } from "../../utils/format";
import { useToast } from "../../context/ToastContext";

const GuideBookings = () => {
  const toast = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const load = () => guideService.myBookings().then((res) => setBookings(res.data.data)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const { page, setPage, totalPages, pageItems } = usePagination(bookings, ADMIN_PAGE_SIZE);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await guideService.updateBookingStatus(id, status);
      toast.success(`Booking ${status}.`);
      load();
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <DashboardLayout title="Guide Panel" navItems={guideNavItems}>
      <div className="panel-header"><h1>Booking Requests</h1></div>

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="empty-state">No bookings yet.</div>
      ) : (
        <>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Guest</th><th>Experience</th><th>Date</th><th>Guests</th><th>Total</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {pageItems.map((b) => (
                <tr key={b._id}>
                  <td>{b.userId?.name}<br /><span className="text-muted" style={{ fontSize: 12 }}>{b.userId?.email}</span></td>
                  <td>{b.experienceId?.title}</td>
                  <td>{new Date(b.date).toLocaleDateString()}</td>
                  <td>{b.numberOfPeople}</td>
                  <td>{formatCurrency(b.totalPrice)}</td>
                  <td>
                    <span className={`badge badge-${b.status === "confirmed" || b.status === "completed" ? "success" : b.status === "cancelled" ? "cancelled" : "pending"}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    {b.status === "pending" && (
                      <div className="table-actions">
                        <button className="btn btn-primary btn-sm" disabled={updatingId === b._id} onClick={() => updateStatus(b._id, "confirmed")}>Confirm</button>
                        <button className="btn btn-danger btn-sm" disabled={updatingId === b._id} onClick={() => updateStatus(b._id, "cancelled")}>Decline</button>
                      </div>
                    )}
                    {b.status === "confirmed" && (
                      <button className="btn btn-secondary btn-sm" disabled={updatingId === b._id} onClick={() => updateStatus(b._id, "completed")}>Mark completed</button>
                    )}
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

export default GuideBookings;
