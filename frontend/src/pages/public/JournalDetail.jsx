import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/common/Layout";
import journalService from "../../services/journalService";
import { resolveImage } from "../../utils/imageUrl";

const JournalDetail = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    journalService.getById(id).then((res) => setJournal(res.data.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Layout><div className="loading-state">Loading...</div></Layout>;
  if (!journal) return <Layout><div className="empty-state">Post not found.</div></Layout>;

  return (
    <Layout>
      <div className="container page-section" style={{ maxWidth: 720 }}>
        {journal.image && (
          <img src={resolveImage(journal.image)} alt={journal.title} style={{ width: "100%", borderRadius: 20, marginBottom: 32 }} />
        )}
        <p className="text-muted" style={{ marginBottom: 8 }}>{journal.authorName}</p>
        <h1 style={{ marginBottom: 24 }}>{journal.title}</h1>
        <p className="detail-description">{journal.content}</p>
      </div>
    </Layout>
  );
};

export default JournalDetail;
