import api from "./api";

// ── TaskController ────────────────────────────────────────────────
export const getAllTasks = () => api.get("/Task");

export const getTasksBySpecialty = (specialtyId) =>
  api.get(`/Task/specialty/${specialtyId}`);

export const getTaskById = (id) => api.get(`/Task/${id}`);

export const createTask = (dto) => api.post("/Task", dto);

export const updateTask = (id, dto) => api.put(`/Task/${id}`, dto);

export const deleteTask = (id) => api.delete(`/Task/${id}`);
