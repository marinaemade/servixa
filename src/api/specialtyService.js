import api from "./api";

// ── SpecialtyController ───────────────────────────────────────────
export const getAllSpecialties = () => api.get("/Specialty");

export const getSpecialtyById = (id) => api.get(`/Specialty/${id}`);

export const createSpecialty = (dto) => api.post("/Specialty", dto);

export const updateSpecialty = (id, dto) => api.put(`/Specialty/${id}`, dto);

export const deleteSpecialty = (id) => api.delete(`/Specialty/${id}`);
