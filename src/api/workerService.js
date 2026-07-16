import api from "./api";

// ── WorkerController ──────────────────────────────────────────────
export const getWorkerProfileById = (workerId) =>
  api.get(`/Worker/${workerId}`);

export const getWorkersBySpecialty = (specialtyId) =>
  api.get(`/Worker/specialty/${specialtyId}`);

export const getNearbyWorkers = (lat, lng, radiusInKm) =>
  api.get("/Worker/nearby", { params: { lat, lng, radiusInKm } });

export const addWorkerTask = (workerId, dto) =>
  api.post(`/Worker/${workerId}/tasks`, dto);

export const removeWorkerTask = (workerId, taskId) =>
  api.delete(`/Worker/${workerId}/tasks/${taskId}`);

export const toggleAvailability = (workerId) =>
  api.put(`/Worker/${workerId}/toggle-availability`);
