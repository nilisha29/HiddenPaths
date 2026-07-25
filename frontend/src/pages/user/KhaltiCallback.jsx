import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Layout from "../../components/common/Layout";
import paymentService from "../../services/paymentService";
import "../../styles/confirmation.css";

const KhaltiCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const pidx = searchParams.get("pidx");
    const bookingId = searchParams.get("purchase_order_id");
    const khaltiStatus = searchParams.get("status");

    if (!pidx || !bookingId || khaltiStatus === "User canceled" || khaltiStatus === "Expired") {
      setStatus("failed");
      return;
    }

    paymentService
      .verifyKhalti(pidx, bookingId)
      .then((res) => {
        navigate(`/confirmation/${res.data.data.booking._id}`, { replace: true });
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data?.message || "We couldn't verify this Khalti payment.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="container page-section text-center" style={{ maxWidth: 480 }}>
        {status === "verifying" && <div className="loading-state">Confirming your Khalti payment...</div>}
        {(status === "failed" || status === "error") && (
          <>
            <div className="confirmation-check" style={{ background: "var(--color-error-bg)", color: "var(--color-rust)" }}>
              ✕
            </div>
            <h1 style={{ marginBottom: 8 }}>Payment not completed</h1>
            <p className="text-muted" style={{ marginBottom: 24 }}>
              {message || "The Khalti payment was cancelled or did not complete."}
            </p>
            <Link to="/bookings" className="btn btn-primary">Go to My Bookings</Link>
          </>
        )}
      </div>
    </Layout>
  );
};

export default KhaltiCallback;
