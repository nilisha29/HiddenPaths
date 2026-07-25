import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../components/common/DashboardLayout";
import { guideNavItems } from "../../components/guide/GuideNav";
import guideService from "../../services/guideService";
import { resolveImage } from "../../utils/imageUrl";
import { useToast } from "../../context/ToastContext";

const GuideProfileEdit = () => {
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    bio: "",
    location: "",
    languages: "",
    certifications: "",
    specialties: "",
    yearsOfExperience: 0,
  });
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    guideService.myProfile().then((res) => {
      const p = res.data.data;
      if (p) {
        setForm({
          bio: p.bio || "",
          location: p.location || "",
          languages: (p.languages || []).join(", "),
          certifications: (p.certifications || []).join(", "),
          specialties: (p.specialties || []).join(", "),
          yearsOfExperience: p.yearsOfExperience || 0,
        });
        setCoverPreview(p.coverImage ? resolveImage(p.coverImage) : "");
      }
    }).finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("bio", form.bio);
      formData.append("location", form.location);
      formData.append("languages", JSON.stringify(form.languages.split(",").map((s) => s.trim()).filter(Boolean)));
      formData.append("certifications", JSON.stringify(form.certifications.split(",").map((s) => s.trim()).filter(Boolean)));
      formData.append("specialties", JSON.stringify(form.specialties.split(",").map((s) => s.trim()).filter(Boolean)));
      formData.append("yearsOfExperience", form.yearsOfExperience);
      if (coverFile) formData.append("coverImage", coverFile);

      await guideService.updateMyProfile(formData);
      setSuccess("Profile updated successfully.");
      toast.success("Profile updated successfully.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Guide Panel" navItems={guideNavItems}>
        <div className="loading-state">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Guide Panel" navItems={guideNavItems}>
      <div className="panel-header"><h1>My Profile</h1></div>
      {success && <div className="form-success">{success}</div>}

      <form onSubmit={handleSubmit} className="card" style={{ padding: 28, maxWidth: 640 }}>
        <div className="field-group">
          <label className="field-label">Cover Image</label>
          {coverPreview && <img src={coverPreview} alt="Cover" style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 12, marginBottom: 10 }} />}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleCoverChange} />
        </div>
        <div className="field-group">
          <label className="field-label">Bio</label>
          <textarea name="bio" rows={4} value={form.bio} onChange={handleChange} className="textarea-field" />
        </div>
        <div className="field-group">
          <label className="field-label">Location</label>
          <input name="location" value={form.location} onChange={handleChange} className="input-field" />
        </div>
        <div className="field-group">
          <label className="field-label">Years of Experience</label>
          <input type="number" name="yearsOfExperience" min="0" value={form.yearsOfExperience} onChange={handleChange} className="input-field" />
        </div>
        <div className="field-group">
          <label className="field-label">Languages (comma separated)</label>
          <input name="languages" value={form.languages} onChange={handleChange} className="input-field" />
        </div>
        <div className="field-group">
          <label className="field-label">Certifications (comma separated)</label>
          <input name="certifications" value={form.certifications} onChange={handleChange} className="input-field" />
        </div>
        <div className="field-group">
          <label className="field-label">Specialties (comma separated)</label>
          <input name="specialties" value={form.specialties} onChange={handleChange} className="input-field" />
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </DashboardLayout>
  );
};

export default GuideProfileEdit;
