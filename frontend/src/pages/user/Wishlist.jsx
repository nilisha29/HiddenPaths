import React, { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import ExperienceCard from "../../components/common/ExperienceCard";
import userService from "../../services/userService";
import { useToast } from "../../context/ToastContext";

const Wishlist = () => {
  const toast = useToast();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => userService.wishlist().then((res) => setExperiences(res.data.data)).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const handleRemove = async (id) => {
    await userService.removeFromWishlist(id);
    toast.success("Removed from wishlist.");
    load();
  };

  return (
    <Layout>
      <div className="container page-section">
        <h1 style={{ marginBottom: 8 }}>My Wishlist</h1>
        <p className="text-muted" style={{ marginBottom: 32 }}>Experiences you've saved for later.</p>

        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : experiences.length === 0 ? (
          <div className="empty-state">You haven't saved anything yet.</div>
        ) : (
          <div className="grid grid-3">
            {experiences.map((exp) => (
              <ExperienceCard key={exp._id} experience={exp} onToggleWishlist={handleRemove} isWishlisted />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
