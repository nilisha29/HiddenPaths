import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/common/DashboardLayout";
import Pagination from "../../components/common/Pagination";
import { RatingLine } from "../../components/common/StarRating";
import { guideNavItems } from "../../components/guide/GuideNav";
import guideService from "../../services/guideService";
import reviewService from "../../services/reviewService";
import { resolveImage } from "../../utils/imageUrl";
import usePagination from "../../hooks/usePagination";
import { ADMIN_PAGE_SIZE } from "../../utils/constants";
import { useToast } from "../../context/ToastContext";

const GuideReviews = () => {
  const toast = useToast();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [savingId, setSavingId] = useState(null);

  const load = () =>
    guideService.myReviews().then((res) => setReviews(res.data.data)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const { page, setPage, totalPages, pageItems } = usePagination(reviews, ADMIN_PAGE_SIZE);

  const handleReply = async (id) => {
    const reply = replyDrafts[id];
    if (!reply) return;
    setSavingId(id);
    try {
      await reviewService.reply(id, reply);
      toast.success("Reply posted.");
      load();
    } finally {
      setSavingId(null);
    }
  };

  return (
    <DashboardLayout title="Guide Panel" navItems={guideNavItems}>
      <div className="panel-header"><h1>Reviews Received</h1></div>

      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : reviews.length === 0 ? (
        <div className="empty-state">No reviews yet on your experiences.</div>
      ) : (
        <>
        <div>
          {pageItems.map((r) => (
            <div key={r._id} className="guide-review-card">
              <div className="guide-review-card-header">
                <div className="flex items-center gap-2">
                  <span className="host-avatar" style={{ width: 36, height: 36, fontSize: 14 }}>
                    {r.userId?.profileImage ? (
                      <img src={resolveImage(r.userId.profileImage)} alt="" />
                    ) : (
                      r.userId?.name?.[0]
                    )}
                  </span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{r.userId?.name}</p>
                    <RatingLine rating={r.rating} />
                  </div>
                </div>
                <span className="guide-review-experience">{r.experienceId?.title}</span>
              </div>
              <p className="text-muted">{r.comment}</p>

              {r.guideReply ? (
                <div className="review-reply">
                  <strong>Your reply:</strong> {r.guideReply}
                </div>
              ) : (
                <div className="guide-review-reply-form">
                  <input
                    className="input-field"
                    placeholder="Write a reply..."
                    value={replyDrafts[r._id] || ""}
                    onChange={(e) => setReplyDrafts({ ...replyDrafts, [r._id]: e.target.value })}
                  />
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={savingId === r._id}
                    onClick={() => handleReply(r._id)}
                  >
                    {savingId === r._id ? "Saving..." : "Reply"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </DashboardLayout>
  );
};

export default GuideReviews;
