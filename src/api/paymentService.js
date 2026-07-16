import api from "./api";

// ── PaymentController ─────────────────────────────────────────────
export const createPayment = (dto) => api.post("/Payment", dto);

export const getPaymentByBooking = (bookingId) =>
  api.get(`/Payment/booking/${bookingId}`);

export const updatePaymentStatus = (paymentId, status) =>
  api.put(`/Payment/${paymentId}/status`, status);
