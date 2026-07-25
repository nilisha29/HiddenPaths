import { useMemo, useState, useEffect } from "react";

/**
 * Simple client-side pagination over an already-fetched array. Used across
 * every admin/guide list page (Users, Guides, Experiences, Bookings,
 * Payments, Reviews, Journals) so the same paging UI/behavior doesn't get
 * re-implemented per page.
 *
 *   const { pageItems, page, setPage, totalPages } = usePagination(users, 10);
 */
const usePagination = (items = [], pageSize = 10) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  // If the underlying list shrinks (e.g. after a delete) and the current
  // page is now out of range, snap back to the last valid page.
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return { page, setPage, totalPages, pageItems, totalItems: items.length };
};

export default usePagination;
