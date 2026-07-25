import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/common/Layout";
import BookingSteps from "../../components/user/BookingSteps";
import PaymentMethodIcon from "../../components/common/PaymentMethodIcon";
import bookingService from "../../services/bookingService";
import paymentService from "../../services/paymentService";
import { useToast } from "../../context/ToastContext";
import { resolveImage } from "../../utils/imageUrl";
import "../../styles/booking.css";

const METHODS = [
  { key: "card", label: "Card" },
  { key: "esewa", label: "eSewa" },
  { key: "khalti", label: "Khalti" },
];

const Payment = () => {
  const { bookingId } = useParams();
  const toast = useToast();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState("card");
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    bookingService.getById(bookingId).then((res) => setBooking(res.data.data)).finally(() => setLoading(false));
  }, [bookingId]);

  if (loading) return <Layout><div className="loading-state">Loading...</div></Layout>;
  if (!booking) return <Layout><div className="empty-state">Booking not found.</div></Layout>;

  // All three methods redirect to each provider's own hosted checkout page
  // (Stripe / eSewa / Khalti) — nothing sensitive is collected on our page.
  const handlePay = async (e) => {
    e.preventDefault();
    setError("");
    setPaying(true);
    try {
      if (method === "card") {
        const res = await paymentService.initiateCard(bookingId);
        window.location.href = res.data.data.url;
        return;
      }

      if (method === "esewa") {
        const res = await paymentService.initiateEsewa(bookingId);
        const { formAction, fields } = res.data.data;
        const form = document.createElement("form");
        form.method = "POST";
        form.action = formAction;
        Object.entries(fields).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });
        document.body.appendChild(form);
        form.submit();
        return;
      }

      if (method === "khalti") {
        const res = await paymentService.initiateKhalti(bookingId);
        window.location.href = res.data.data.payment_url;
        return;
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Payment failed. Please try again.";
      setError(msg);
      toast.error(msg);
      setPaying(false);
    }
  };

  return (
    <Layout>
      <div className="booking-page">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 8 }}>
            <BookingSteps active="payment" />
          </div>

          <div className="booking-layout">
            <div className="booking-form-card">
              <h2 style={{ marginBottom: 20 }}>🔒 Secure Payment</h2>
              {error && <div className="form-error">{error}</div>}

              <p className="field-label" style={{ marginBottom: 12 }}>Payment Method</p>
              <div className="payment-methods">
                {METHODS.map((m) => (
                  <div
                    key={m.key}
                    className={`payment-method-tile${method === m.key ? " selected" : ""}`}
                    onClick={() => setMethod(m.key)}
                  >
                    <PaymentMethodIcon method={m.key} />
                    <p>{m.label}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handlePay}>
                <div className="trust-badges">
                  <div className="trust-badge">
                    <span>🔒</span> 256-bit SSL encryption
                  </div>
                  <div className="trust-badge">
                    <span>🛡️</span> PCI-DSS compliant processors
                  </div>
                  <div className="trust-badge">
                    <span>↩️</span> Full refund if host cancels
                  </div>
                </div>

                <button type="submit" disabled={paying} className="btn btn-primary btn-block">
                  {paying ? "Redirecting..." : `Confirm and Pay NPR ${booking.totalPrice?.toLocaleString()}`}
                </button>
              </form>
            </div>

            <div className="order-summary">
              <div className="order-summary-cover">
                <img
                  src={
                    booking.experienceId?.images?.[0]
                      ? resolveImage(booking.experienceId.images[0])
                      : "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=500&q=80"
                  }
                  alt=""
                />
                <div className="order-summary-cover-text">
                  <span style={{ fontSize: 11, textTransform: "uppercase" }}>Selected Experience</span>
                  <p style={{ fontWeight: 600 }}>{booking.experienceId?.title}</p>
                </div>
              </div>
              <div className="order-summary-body">
                <div className="order-summary-row">
                  <span>Guests</span>
                  <span>{booking.numberOfPeople}</span>
                </div>
                <div className="order-summary-row order-summary-total">
                  <span>Total Amount</span>
                  <span>NPR {booking.totalPrice?.toLocaleString()}</span>
                </div>
                <p className="text-muted" style={{ fontSize: 12, marginTop: 8 }}>
                  Includes all local permits and community impact fee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
