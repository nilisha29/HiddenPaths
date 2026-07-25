import api from "./api";

const paymentService = {
  getById: (id) => api.get(`/payments/${id}`),

  // Card — real Stripe Checkout sandbox (hosted checkout)
  initiateCard: (bookingId) => api.post("/payments/card/initiate", { bookingId }),
  verifyCard: (sessionId, bookingId) => api.post("/payments/card/verify", { sessionId, bookingId }),

  // eSewa sandbox (v2 form-redirect)
  initiateEsewa: (bookingId) => api.post("/payments/esewa/initiate", { bookingId }),
  verifyEsewa: (data) => api.post("/payments/esewa/verify", { data }),

  // Khalti sandbox (ePayment API v2 hosted checkout)
  initiateKhalti: (bookingId) => api.post("/payments/khalti/initiate", { bookingId }),
  verifyKhalti: (pidx, bookingId) => api.post("/payments/khalti/verify", { pidx, bookingId }),
};

export default paymentService;
