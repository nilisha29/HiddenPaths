import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/common/Layout";
import { useAuth } from "../../context/AuthContext";
import userService from "../../services/userService";
import { resolveImage } from "../../utils/imageUrl";
import { useToast } from "../../context/ToastContext";
import "../../styles/account.css";

const Account = () => {
  const { user, refreshUser } = useAuth();
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", password: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.profileImage ? resolveImage(user.profileImage) : "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      if (form.password) formData.append("password", form.password);
      if (imageFile) formData.append("profileImage", imageFile);

      await userService.updateProfile(formData);
      await refreshUser();
      setSuccess("Profile updated successfully.");
      toast.success("Profile updated successfully.");
      setForm((f) => ({ ...f, password: "" }));
    } catch (err) {
      const msg = err.response?.data?.message || "Could not update profile.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="container page-section" style={{ maxWidth: 560 }}>
        <h1 style={{ marginBottom: 12 }}>My Account</h1>
        <div className="flex gap-2" style={{ marginBottom: 24 }}>
          <Link to="/bookings" className="btn btn-secondary btn-sm">My Bookings</Link>
          <Link to="/wishlist" className="btn btn-secondary btn-sm">My Wishlist</Link>
        </div>

        {success && <div className="form-success">{success}</div>}
        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="card account-card">
          <div className="avatar-upload">
            <button type="button" className="avatar-upload-circle" onClick={() => fileInputRef.current.click()}>
              {imagePreview ? <img src={imagePreview} alt="Profile" /> : (form.name?.[0]?.toUpperCase() || "+")}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} hidden />
            <button type="button" className="auth-inline-link" onClick={() => fileInputRef.current.click()}>
              Change photo
            </button>
          </div>

          <div className="field-group" style={{ marginTop: 24 }}>
            <label className="field-label">Full Name</label>
            <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field-group">
            <label className="field-label">Email</label>
            <input className="input-field" value={user?.email} disabled style={{ opacity: 0.6 }} />
          </div>
          <div className="field-group">
            <label className="field-label">Phone</label>
            <input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="field-group">
            <label className="field-label">New Password</label>
            <input type="password" className="input-field" placeholder="Leave blank to keep current password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>

          {user?.interests?.length > 0 && (
            <div className="field-group">
              <label className="field-label">Your interests</label>
              <div className="tag-row">
                {user.interests.map((i) => <span key={i} className="pill-tag">{i}</span>)}
              </div>
            </div>
          )}

          <button type="submit" disabled={saving} className="btn btn-primary" style={{ marginTop: 8 }}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Account;
