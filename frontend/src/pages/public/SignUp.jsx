import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import "../../styles/auth.css";

const SignUp = () => {
  const { registerAndGetToken } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    isGuide: false,
    bio: "",
    location: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("password", form.password);
      formData.append("isGuide", form.isGuide);
      if (form.isGuide) {
        formData.append("bio", form.bio);
        formData.append("location", form.location);
      }
      if (imageFile) formData.append("profileImage", imageFile);

      const data = await registerAndGetToken(formData);

      // Temporarily hold the session token so the Welcome/onboarding screen
      // can save interests, then the user explicitly logs in afterwards.
      localStorage.setItem("hiddenpaths_token", data.token);

      toast.success("Account created! Let's pick your interests.");
      navigate("/welcome", { state: { name: data.name } });
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
      <div className="auth-visual auth-visual-dark">
        <div className="auth-visual-overlay" />
        <div className="auth-visual-content">
          <Link to="/" className="auth-brand auth-brand-light">HiddenPaths</Link>
          <blockquote className="auth-quote">
            "The true journey of discovery consists not in seeking new
            landscapes, but in having new eyes."
          </blockquote>
          <p className="auth-quote-author">— Handcrafted in the Himalayas</p>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-panel-inner">
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Start your journey into the unseen Nepal.</p>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field-group avatar-upload-group">
              <label className="field-label">Profile photo (optional)</label>
              <div className="avatar-upload">
                <button
                  type="button"
                  className="avatar-upload-circle"
                  onClick={() => fileInputRef.current.click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <span>{form.name ? form.name[0].toUpperCase() : "+"}</span>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageChange}
                  hidden
                />
                <div>
                  <button type="button" className="auth-inline-link" onClick={() => fileInputRef.current.click()}>
                    {imagePreview ? "Change photo" : "Upload photo"}
                  </button>
                  <p className="avatar-upload-hint">Shown on your profile and in the navbar. Skip if you'd rather not.</p>
                </div>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Full Name</label>
              <input type="text" name="name" required value={form.name} onChange={handleChange} className="input-field" placeholder="Tenzing Norgay" />
            </div>

            <div className="field-group">
              <label className="field-label">Email Address</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange} className="input-field" placeholder="traveler@hiddenpaths.com" />
            </div>

            <div className="field-group">
              <label className="field-label">Phone</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="98XXXXXXXX" />
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <input type="password" name="password" required minLength={6} value={form.password} onChange={handleChange} className="input-field" placeholder="Minimum 8 characters" />
              <p className="field-hint">Minimum 6 characters.</p>
            </div>

            <label className="guide-toggle">
              <input type="checkbox" name="isGuide" checked={form.isGuide} onChange={handleChange} />
              <span>I want to host experiences as a local guide</span>
            </label>

            {form.isGuide && (
              <div className="guide-extra-fields">
                <div className="field-group">
                  <label className="field-label">Location</label>
                  <input type="text" name="location" value={form.location} onChange={handleChange} className="input-field" placeholder="e.g. Pokhara, Nepal" />
                </div>
                <div className="field-group">
                  <label className="field-label">Short bio</label>
                  <textarea name="bio" rows={3} value={form.bio} onChange={handleChange} className="textarea-field" placeholder="Tell travelers about yourself..." />
                </div>
                <p className="field-hint">
                  Your guide account will be reviewed by our team before you can publish experiences.
                </p>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary btn-block" style={{ marginTop: 8 }}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account? <Link to="/login" className="auth-inline-link">Login here</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignUp;
