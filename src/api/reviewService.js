import api from "./api";

// ── ReviewController ──────────────────────────────────────────────
export const createReview = (dto) => api.post("/Review", dto);

export const getReviewsByWorker = (workerId) =>
  api.get(`/Review/worker/${workerId}`);

export const getReviewsByBooking = (bookingId) =>
  api.get(`/Review/booking/${bookingId}`);
