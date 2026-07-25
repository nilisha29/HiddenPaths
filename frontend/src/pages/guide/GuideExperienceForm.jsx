import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import ImageUploader from "../../components/common/ImageUploader";
import MapView from "../../components/common/MapView";
import { guideNavItems } from "../../components/guide/GuideNav";
import experienceService from "../../services/experienceService";
import categoryService from "../../services/categoryService";
import { resolveImage } from "../../utils/imageUrl";
import { useToast } from "../../context/ToastContext";

const emptyForm = {
  title: "",
  description: "",
  price: "",
  location: "",
  meetingPoint: "",
  category: "",
  duration: "",
  durationDays: 1,
  groupSize: 4,
  availableSeats: 10,
  highlights: "",
  included: "",
  excluded: "",
  cancellationPolicy: "",
  latitude: 27.7172,
  longitude: 85.324,
};

const GuideExperienceForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    categoryService.list().then((res) => setCategories(res.data.data));
    if (isEdit) {
      experienceService.getById(id).then((res) => {
        const exp = res.data.data;
        setForm({
          title: exp.title,
          description: exp.description,
          price: exp.price,
          location: exp.location,
          meetingPoint: exp.meetingPoint || "",
          category: exp.category?._id || "",
          duration: exp.duration || "",
          durationDays: exp.durationDays || 1,
          groupSize: exp.groupSize || 4,
          availableSeats: exp.availableSeats || 10,
          highlights: (exp.highlights || []).join(", "),
          included: (exp.included || []).join(", "),
          excluded: (exp.excluded || []).join(", "),
          cancellationPolicy: exp.cancellationPolicy || "",
          latitude: exp.latitude ?? 27.7172,
          longitude: exp.longitude ?? 85.324,
        });
        setExistingImages((exp.images || []).map((img) => resolveImage(img)));
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleMapPick = (lat, lng) => {
    setForm((f) => ({ ...f, latitude: lat.toFixed(6), longitude: lng.toFixed(6) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      images.forEach((file) => formData.append("images", file));

      if (isEdit) {
        await experienceService.update(id, formData);
      } else {
        await experienceService.create(formData);
      }
      toast.success(isEdit ? "Experience updated." : "Experience submitted for approval.");
      navigate("/guide/experiences");
    } catch (err) {
      const msg = err.response?.data?.message || "Could not save experience.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="Guide Panel" navItems={guideNavItems}>
      <div className="panel-header">
        <h1>{isEdit ? "Edit Experience" : "Add Experience"}</h1>
      </div>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="card" style={{ padding: 28, maxWidth: 720 }}>
        <div className="field-group">
          <label className="field-label">Title</label>
          <input name="title" required value={form.title} onChange={handleChange} className="input-field" />
        </div>

        <div className="field-group">
          <label className="field-label">Description</label>
          <textarea name="description" required rows={4} value={form.description} onChange={handleChange} className="textarea-field" />
        </div>

        <div className="booking-form-row">
          <div className="field-group">
            <label className="field-label">Category</label>
            <select name="category" required value={form.category} onChange={handleChange} className="select-field">
              <option value="">Select category</option>
              {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className="field-group">
            <label className="field-label">Price (NPR)</label>
            <input type="number" name="price" required min="0" value={form.price} onChange={handleChange} className="input-field" />
          </div>
        </div>

        <div className="booking-form-row">
          <div className="field-group">
            <label className="field-label">Location</label>
            <input name="location" required value={form.location} onChange={handleChange} className="input-field" placeholder="e.g. Pokhara, Nepal" />
          </div>
          <div className="field-group">
            <label className="field-label">Meeting Point</label>
            <input name="meetingPoint" value={form.meetingPoint} onChange={handleChange} className="input-field" />
          </div>
        </div>

        <div className="booking-form-row">
          <div className="field-group">
            <label className="field-label">Duration (label)</label>
            <input name="duration" value={form.duration} onChange={handleChange} className="input-field" placeholder="e.g. 3 days" />
          </div>
          <div className="field-group">
            <label className="field-label">Duration (days)</label>
            <input type="number" name="durationDays" min="1" value={form.durationDays} onChange={handleChange} className="input-field" />
          </div>
        </div>

        <div className="booking-form-row">
          <div className="field-group">
            <label className="field-label">Max Group Size</label>
            <input type="number" name="groupSize" min="1" value={form.groupSize} onChange={handleChange} className="input-field" />
          </div>
          <div className="field-group">
            <label className="field-label">Available Seats</label>
            <input type="number" name="availableSeats" min="0" value={form.availableSeats} onChange={handleChange} className="input-field" />
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">Highlights (comma separated)</label>
          <input name="highlights" value={form.highlights} onChange={handleChange} className="input-field" />
        </div>
        <div className="field-group">
          <label className="field-label">Included (comma separated)</label>
          <input name="included" value={form.included} onChange={handleChange} className="input-field" />
        </div>
        <div className="field-group">
          <label className="field-label">Excluded (comma separated)</label>
          <input name="excluded" value={form.excluded} onChange={handleChange} className="input-field" />
        </div>
        <div className="field-group">
          <label className="field-label">Cancellation Policy</label>
          <textarea name="cancellationPolicy" rows={2} value={form.cancellationPolicy} onChange={handleChange} className="textarea-field" />
        </div>

        <div className="field-group">
          <label className="field-label">Meeting point on the map</label>
          <MapView
            latitude={Number(form.latitude)}
            longitude={Number(form.longitude)}
            label={form.meetingPoint || form.location}
            height={220}
            onPick={handleMapPick}
          />
          <p className="map-picker-hint">Click anywhere on the map (or drag the pin) to set the exact location.</p>
          <div className="booking-form-row" style={{ marginTop: 10 }}>
            <div className="field-group" style={{ marginBottom: 0 }}>
              <label className="field-label">Latitude</label>
              <input type="number" step="any" name="latitude" value={form.latitude} onChange={handleChange} className="input-field" />
            </div>
            <div className="field-group" style={{ marginBottom: 0 }}>
              <label className="field-label">Longitude</label>
              <input type="number" step="any" name="longitude" value={form.longitude} onChange={handleChange} className="input-field" />
            </div>
          </div>
        </div>

        <div className="field-group" style={{ marginTop: 20 }}>
          <label className="field-label">Photos</label>
          <ImageUploader existingImages={existingImages} files={images} onChange={setImages} maxFiles={5} />
        </div>

        <p className="field-hint" style={{ margin: "16px 0" }}>
          {isEdit ? "Editing requires re-approval from an admin before it goes live again." : "New experiences require admin approval before they appear on Explore."}
        </p>

        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Submit for Approval"}
        </button>
      </form>
    </DashboardLayout>
  );
};

export default GuideExperienceForm;
