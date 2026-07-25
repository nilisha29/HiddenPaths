import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/common/DashboardLayout";
import { adminNavItems } from "../../components/admin/AdminNav";
import adminService from "../../services/adminService";
import { useToast } from "../../context/ToastContext";

const AdminSettings = () => {
  const toast = useToast();
  const [form, setForm] = useState({
    platformName: "",
    supportEmail: "",
    commissionRate: 0,
    bookingCancellationWindowHours: 48,
    maintenanceMode: false,
    announcement: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    adminService.getSettings().then((res) => setForm(res.data.data)).finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    try {
      await adminService.updateSettings(form);
      setSuccess("Settings saved.");
      toast.success("Settings saved.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Admin Panel" navItems={adminNavItems}>
        <div className="loading-state">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNavItems}>
      <div className="panel-header"><h1>Platform Settings</h1></div>
      {success && <div className="form-success">{success}</div>}

      <form onSubmit={handleSubmit} className="card settings-form" style={{ padding: 28 }}>
        <div className="field-group">
          <label className="field-label">Platform Name</label>
          <input name="platformName" value={form.platformName} onChange={handleChange} className="input-field" />
        </div>
        <div className="field-group">
          <label className="field-label">Support Email</label>
          <input type="email" name="supportEmail" value={form.supportEmail} onChange={handleChange} className="input-field" />
        </div>
        <div className="booking-form-row">
          <div className="field-group">
            <label className="field-label">Commission Rate (%)</label>
            <input type="number" name="commissionRate" min="0" max="100" value={form.commissionRate} onChange={handleChange} className="input-field" />
          </div>
          <div className="field-group">
            <label className="field-label">Cancellation Window (hours)</label>
            <input type="number" name="bookingCancellationWindowHours" min="0" value={form.bookingCancellationWindowHours} onChange={handleChange} className="input-field" />
          </div>
        </div>
        <div className="field-group">
          <label className="field-label">Site-wide Announcement</label>
          <textarea name="announcement" rows={3} value={form.announcement} onChange={handleChange} className="textarea-field" placeholder="Optional banner message shown to all users" />
        </div>
        <label className="guide-toggle">
          <input type="checkbox" name="maintenanceMode" checked={form.maintenanceMode} onChange={handleChange} />
          <span>Maintenance mode (for future use)</span>
        </label>

        <button type="submit" disabled={saving} className="btn btn-primary" style={{ marginTop: 16 }}>
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </DashboardLayout>
  );
};

export default AdminSettings;
