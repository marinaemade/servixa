import api from "./api";

// ── BookingController ─────────────────────────────────────────────
export const getBookingById = (id) => api.get(`/Booking/${id}`);

export const getClientBookings = (clientId) =>
  api.get(`/Booking/client/${clientId}`);

export const getWorkerBookings = (workerId) =>
  api.get(`/Booking/worker/${workerId}`);

export const updateBookingStatus = (id, dto) =>
  api.put(`/Booking/${id}/status`, dto);

export const cancelBookingById = (id) => api.delete(`/Booking/${id}/cancel`);
