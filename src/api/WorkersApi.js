import axios from 'axios';
const BASE_URL = `${import.meta.env.VITE_API_URL}/Worker`;

export const fetchWorkerById = async (workerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${workerId}`);
    return response.data;
  } catch (error) {
    console.error(`خطأ في جلب بيانات الفني ذو الرقم ${workerId}:`, error);
    throw error;
  }
};

export const fetchWorkersBySpecialty = async (specialtyId) => {
  try {
    const response = await axios.get(`${BASE_URL}/specialty/${specialtyId}`);
    return response.data;
  } catch (error) {
    console.error(`خطأ في جلب الفنيين للتخصص ${specialtyId}:`, error);
    throw error;
  }
};

export const fetchNearbyWorkers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/nearby`);
    return response.data;
  } catch (error) {
    console.error("خطأ في جلب الفنيين القريبين:", error);
    throw error;
  }
};

export const toggleWorkerAvailability = async (workerId) => {
  try {
    const response = await axios.put(`${BASE_URL}/${workerId}/toggle-availability`);
    return response.data;
  } catch (error) {
    console.error(`خطأ في تعديل حالة إتاحة الفني ${workerId}:`, error);
    throw error;
  }
};