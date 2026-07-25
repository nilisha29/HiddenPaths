import React from "react";
import "../../styles/pagination.css";

/**
 * Shared pagination control used across every admin/guide list page and the
 * public Explore page, so table pages with 20-30+ rows don't turn into an
 * endless scroll. Pairs with the usePagination hook.
 */
const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
        ‹
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="pagination-ellipsis">…</span>
        ) : (
          <button key={p} className={p === page ? "active" : ""} onClick={() => onPageChange(p)}>
            {p}
          </button>
        )
      )}
      <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} aria-label="Next page">
        ›
      </button>
    </div>
  );
};

export default Pagination;
