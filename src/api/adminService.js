import api from "./api";

// ── AdminController ───────────────────────────────────────────────
export const getPendingWorkers = () => api.get("/Admin/pending-workers");

export const approveWorker = (workerId) =>
  api.put(`/Admin/workers/${workerId}/approve`);

export const rejectWorker = (workerId) =>
  api.put(`/Admin/workers/${workerId}/reject`);

export const blockWorker = (workerId) =>
  api.put(`/Admin/workers/${workerId}/block`);

export const getDashboardStats = () => api.get("/Admin/dashboard-stats");
