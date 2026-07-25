import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import BookingSteps from "../../components/user/BookingSteps";
import experienceService from "../../services/experienceService";
import bookingService from "../../services/bookingService";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { resolveImage } from "../../utils/imageUrl";
import "../../styles/booking.css";

const EXTRA_OPTIONS = [
  { name: "Private Pickup", price: 15 },
  { name: "Photography Add-on", price: 25 },
];

const Booking = () => {
  const { experienceId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();

  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    contactPhone: "",
    notes: "",
    date: location.state?.date || "",
    numberOfPeople: location.state?.guests || 2,
  });
  const [selectedExtras, setSelectedExtras] = useState([]);

  useEffect(() => {
    experienceService.getById(experienceId).then((res) => setExperience(res.data.data)).finally(() => setLoading(false));
  }, [experienceId]);

  if (loading) return <Layout><div className="loading-state">Loading...</div></Layout>;
  if (!experience) return <Layout><div className="empty-state">Experience not found.</div></Layout>;

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.name === extra.name) ? prev.filter((e) => e.name !== extra.name) : [...prev, extra]
    );
  };

  const extrasTotal = selectedExtras.reduce((s, e) => s + e.price, 0);
  const subtotal = experience.price * Number(form.numberOfPeople || 1);
  const total = subtotal + extrasTotal;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await bookingService.create({
        experienceId,
        date: form.date,
        numberOfPeople: Number(form.numberOfPeople),
        contactPhone: form.contactPhone,
        notes: form.notes,
        fullName: form.fullName,
        email: form.email,
        extras: selectedExtras,
      });
      navigate(`/payment/${res.data.data._id}`);
    } catch (err) {
      const msg = err.response?.data?.message || "Could not create booking.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="booking-page">
        <div className="container">
          <h1 style={{ marginBottom: 24 }}>Secure Your Journey</h1>
          <BookingSteps active="details" />

          <div className="booking-layout">
            <div className="booking-form-card">
              {error && <div className="form-error">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="booking-form-row">
                  <div className="field-group">
                    <label className="field-label">Full Name</label>
                    <input name="fullName" required value={form.fullName} onChange={handleChange} className="input-field" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Email Address</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} className="input-field" />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Phone Number</label>
                  <input name="contactPhone" value={form.contactPhone} onChange={handleChange} className="input-field" placeholder="+977 98XXXXXXXX" />
                </div>

                <div className="field-group">
                  <label className="field-label">Special Requests (Dietary, Accessibility, etc.)</label>
                  <textarea name="notes" rows={3} value={form.notes} onChange={handleChange} className="textarea-field" placeholder="Tell us how we can make your journey more comfortable..." />
                </div>

                <h3 style={{ margin: "24px 0 12px", fontSize: 18 }}>Your Booking</h3>
                <div className="booking-form-row">
                  <div className="field-group">
                    <label className="field-label">Selected Date</label>
                    <input type="date" name="date" required value={form.date} onChange={handleChange} className="input-field" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Guests</label>
                    <div className="guest-stepper">
                      <button type="button" onClick={() => setForm((f) => ({ ...f, numberOfPeople: Math.max(1, Number(f.numberOfPeople) - 1) }))}>−</button>
                      <span>{form.numberOfPeople}</span>
                      <button type="button" onClick={() => setForm((f) => ({ ...f, numberOfPeople: Number(f.numberOfPeople) + 1 }))}>+</button>
                    </div>
                  </div>
                </div>

                <h3 style={{ margin: "24px 0 4px", fontSize: 18 }}>Optional Extras</h3>
                <div className="extras-grid">
                  {EXTRA_OPTIONS.map((extra) => (
                    <div
                      key={extra.name}
                      className={`extra-tile${selectedExtras.some((e) => e.name === extra.name) ? " selected" : ""}`}
                      onClick={() => toggleExtra(extra)}
                    >
                      <p style={{ fontWeight: 600, fontSize: 14 }}>{extra.name}</p>
                      <p className="extra-tile-price">+ NPR {extra.price}</p>
                    </div>
                  ))}
                </div>

                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ marginTop: 28 }}>
                  {submitting ? "Processing..." : "Continue to Payment →"}
                </button>
              </form>
            </div>

            <div className="order-summary">
              <div className="order-summary-cover">
                <img src={experience.images?.[0] ? resolveImage(experience.images[0]) : "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=500&q=80"} alt="" />
                <div className="order-summary-cover-text">
                  <strong>{experience.title}</strong>
                  <p style={{ fontSize: 12 }}>{experience.location}</p>
                </div>
              </div>
              <div className="order-summary-body">
                <div className="order-summary-row">
                  <span>Hosted by</span>
                  <strong>{experience.guideId?.name}</strong>
                </div>
                <div className="order-summary-row">
                  <span>Experience cost ({form.numberOfPeople} guests)</span>
                  <span>NPR {subtotal.toLocaleString()}</span>
                </div>
                {selectedExtras.map((e) => (
                  <div key={e.name} className="order-summary-row">
                    <span>{e.name}</span>
                    <span>NPR {e.price}</span>
                  </div>
                ))}
                <div className="order-summary-row order-summary-total">
                  <span>Total</span>
                  <span>NPR {total.toLocaleString()}</span>
                </div>
                <p className="order-summary-impact">
                  Your booking directly supports {experience.guideId?.name} and the local community around them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
