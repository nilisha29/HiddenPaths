import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../../components/common/Layout";
import bookingService from "../../services/bookingService";
import experienceService from "../../services/experienceService";
import { resolveImage } from "../../utils/imageUrl";
import { generateBookingPdf } from "../../utils/generateBookingPdf";
import { useToast } from "../../context/ToastContext";
import "../../styles/confirmation.css";

const Confirmation = () => {
  const { bookingId } = useParams();
  const toast = useToast();
  const [booking, setBooking] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingService.getById(bookingId).then((res) => {
      setBooking(res.data.data);
      experienceService.list({ limit: 3 }).then((r) => setSuggestions(r.data.data));
    }).finally(() => setLoading(false));
  }, [bookingId]);

  useEffect(() => {
  const key = `booking-confirmed-${bookingId}`;

  if (!sessionStorage.getItem(key)) {
    toast.success("🎉 Your booking has been confirmed. Enjoy your experience!");
    sessionStorage.setItem(key, "true");
  }
}, [bookingId, toast]);

  if (loading) return <Layout><div className="loading-state">Loading...</div></Layout>;
  if (!booking) return <Layout><div className="empty-state">Booking not found.</div></Layout>;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${booking.referenceNumber}`;

  return (
    <Layout>
      <div className="confirmation-page">
        <div className="container text-center">
          <div className="confirmation-check">✓</div>
          <h1 style={{ marginBottom: 8 }}>You're going!</h1>
          <p className="text-muted" style={{ marginBottom: 32 }}>
            We've sent your itinerary and receipt to {booking.email}
          </p>

          <div className="confirmation-card">
            <div className="flex justify-between items-center" style={{ marginBottom: 20 }}>
              <div>
                <p className="text-muted" style={{ fontSize: 12, textTransform: "uppercase" }}>Reference Number</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--color-rust)" }}>
                  {booking.referenceNumber}
                </p>
              </div>
              <span className="badge badge-success">Confirmed</span>
            </div>

            <div className="confirmation-grid">
              <div>
                <p className="text-muted" style={{ fontSize: 12 }}>GUEST</p>
                <p style={{ fontWeight: 600 }}>{booking.fullName}</p>
              </div>
              <div>
                <p className="text-muted" style={{ fontSize: 12 }}>ARRIVAL</p>
                <p style={{ fontWeight: 600 }}>
                  {new Date(booking.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
              <div>
                <p className="text-muted" style={{ fontSize: 12 }}>DESTINATION</p>
                <p style={{ fontWeight: 600 }}>📍 {booking.experienceId?.title}</p>
              </div>
              <div>
                <img src={qrUrl} alt="Booking QR code" style={{ borderRadius: 8 }} />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2" style={{ marginTop: 28, marginBottom: 64 }}>
            <Link to="/bookings" className="btn btn-secondary">📅 View my bookings</Link>
            <button
              className="btn btn-secondary"
              onClick={() => {
                generateBookingPdf(booking);
                toast.success("Receipt downloaded.");
              }}
            >
              🖨 Save to PDF
            </button>
          </div>

          {suggestions.length > 0 && (
            <div style={{ textAlign: "left" }}>
              <h2 style={{ marginBottom: 20 }}>Extend your stay</h2>
              <div className="grid grid-3">
                {suggestions.map((s) => (
                  <Link key={s._id} to={`/explore/${s._id}`} className="card extend-stay-card">
                    <img src={s.images?.[0] ? resolveImage(s.images[0]) : "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=500&q=80"} alt="" />
                    <div className="extend-stay-overlay">
                      <strong>{s.title}</strong>
                      <span>{s.location}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Confirmation;
