import api from "./api";

// ── Client Profile ───────────────────────────────────────────────
export const getMyProfile = () => api.get("/Client/profile");

export const updateMyProfile = (formData) =>
  api.put("/Client/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ── Discover Workers ─────────────────────────────────────────────
export const getNearbyWorkers = (lat, lng, radiusInKm = 10) =>
  api.get("/Client/workers/nearby", { params: { lat, lng, radiusInKm } });

export const getWorkersBySpecialty = (specialtyId) =>
  api.get(`/Client/workers/specialty/${specialtyId}`);

export const getWorkerProfile = (workerId) =>
  api.get(`/Client/workers/${workerId}`);

// ── Bookings ─────────────────────────────────────────────────────
export const bookTask = (dto) => api.post("/Client/bookings", dto);

export const getMyBookings = () => api.get("/Client/bookings");

export const getBookingDetails = (bookingId) =>
  api.get(`/Client/bookings/${bookingId}`);

export const cancelBooking = (bookingId) =>
  api.delete(`/Client/bookings/${bookingId}/cancel`);

// ── Reviews ──────────────────────────────────────────────────────
export const leaveReview = (dto) => api.post("/Client/reviews", dto);

export const getMyReviews = () => api.get("/Client/reviews");
