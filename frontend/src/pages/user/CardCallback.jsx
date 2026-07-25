import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Layout from "../../components/common/Layout";
import paymentService from "../../services/paymentService";
import "../../styles/confirmation.css";

const CardCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying | failed | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const cancelled = searchParams.get("status") === "cancelled";
    const sessionId = searchParams.get("session_id");
    const bookingId = searchParams.get("bookingId");

    if (cancelled || !sessionId || !bookingId) {
      setStatus("failed");
      return;
    }

    paymentService
      .verifyCard(sessionId, bookingId)
      .then((res) => {
        navigate(`/confirmation/${res.data.data.booking._id}`, { replace: true });
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data?.message || "We couldn't verify this card payment.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="container page-section text-center" style={{ maxWidth: 480 }}>
        {status === "verifying" && <div className="loading-state">Confirming your payment...</div>}
        {(status === "failed" || status === "error") && (
          <>
            <div className="confirmation-check" style={{ background: "var(--color-error-bg)", color: "var(--color-rust)" }}>
              ✕
            </div>
            <h1 style={{ marginBottom: 8 }}>Payment not completed</h1>
            <p className="text-muted" style={{ marginBottom: 24 }}>
              {message || "The card payment was cancelled or did not complete."}
            </p>
            <Link to="/bookings" className="btn btn-primary">Go to My Bookings</Link>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CardCallback;
