import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/common/Layout";
import journalService from "../../services/journalService";
import { resolveImage } from "../../utils/imageUrl";

const Journal = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    journalService.list({ limit: 20 }).then((res) => setJournals(res.data.data)).finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="container page-section">
        <h1 style={{ marginBottom: 8 }}>The Journal</h1>
        <p className="text-muted" style={{ marginBottom: 40 }}>
          Stories from the hidden paths of Nepal, told by travelers and hosts.
        </p>

        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : journals.length === 0 ? (
          <div className="empty-state">No journal entries yet.</div>
        ) : (
          <div className="grid grid-3">
            {journals.map((j) => (
              <Link key={j._id} to={`/journal/${j._id}`} className="card" style={{ display: "block" }}>
                {j.image && (
                  <img src={resolveImage(j.image)} alt={j.title} style={{ height: 180, width: "100%", objectFit: "cover" }} />
                )}
                <div style={{ padding: 20 }}>
                  <p className="text-muted" style={{ fontSize: 13 }}>{j.authorName}</p>
                  <h3 style={{ margin: "8px 0" }}>{j.title}</h3>
                  <p className="text-muted" style={{ fontSize: 14 }}>{j.content?.slice(0, 120)}...</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Journal;
