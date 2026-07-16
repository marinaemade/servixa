import api from "./api";

// ── NotificationController ────────────────────────────────────────
export const getUserNotifications = (userId) =>
  api.get(`/Notification/user/${userId}`);

export const markAsRead = (notificationId) =>
  api.put(`/Notification/${notificationId}/read`);

export const markAllAsRead = (userId) =>
  api.put(`/Notification/user/${userId}/read-all`);
