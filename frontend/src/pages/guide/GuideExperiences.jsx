import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import Pagination from "../../components/common/Pagination";
import { guideNavItems } from "../../components/guide/GuideNav";
import experienceService from "../../services/experienceService";
import { resolveImage } from "../../utils/imageUrl";
import usePagination from "../../hooks/usePagination";
import { ADMIN_PAGE_SIZE } from "../../utils/constants";
import { formatCurrency } from "../../utils/format";
import { useToast } from "../../context/ToastContext";

const statusBadge = (exp) => {
  if (!exp.isApproved && exp.status !== "archived") return <span className="badge badge-pending">Pending approval</span>;
  if (exp.status === "archived") return <span className="badge badge-cancelled">Archived</span>;
  return <span className="badge badge-success">Published</span>;
};

const GuideExperiences = () => {
  const toast = useToast();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => experienceService.mine().then((res) => setExperiences(res.data.data)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const { page, setPage, totalPages, pageItems } = usePagination(experiences, ADMIN_PAGE_SIZE);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience permanently?")) return;
    await experienceService.remove(id);
    toast.success("Experience deleted.");
    load();
  };

  return (
    <DashboardLayout title="Guide Panel" navItems={guideNavItems}>
      <div className="panel-header">
        <h1>My Experiences</h1>
        <Link to="/guide/experiences/new" className="btn btn-primary btn-sm">+ Add Experience</Link>
      </div>

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : experiences.length === 0 ? (
        <div className="empty-state">You haven't created any experiences yet.</div>
      ) : (
        <>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr><th></th><th>Title</th><th>Category</th><th>Price</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {pageItems.map((exp) => (
                <tr key={exp._id}>
                  <td>
                    <img
                      src={exp.images?.[0] ? resolveImage(exp.images[0]) : "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=100&q=60"}
                      alt=""
                      style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }}
                    />
                  </td>
                  <td>{exp.title}</td>
                  <td>{exp.category?.name}</td>
                  <td>{formatCurrency(exp.price)}</td>
                  <td>{statusBadge(exp)}</td>
                  <td>
                    <div className="table-actions">
                      <Link to={`/guide/experiences/${exp._id}/edit`} className="btn btn-secondary btn-sm">Edit</Link>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(exp._id)}>Delete</button>
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

export default GuideExperiences;
