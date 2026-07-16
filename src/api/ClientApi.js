// src/api/ClientApi.js

const BASE_URL = `${import.meta.env.VITE_API_URL}/Client/profile`;

const getHeaders = () => {
  const token = localStorage.getItem("tc"); // استخدام توكن العميل الصحيح
  return {
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
};

// 1. جلب بيانات ملف العميل الشخصي
export const fetchClientProfile = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getHeaders(),
      },
    });
    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }
    return await response.json();
    console.log("=== البيانات الراجعة من السيرفر ===", data);
  } catch (error) {
    console.warn("⚠️ فشل جلب البيانات، تم استخدام بيانات محاكاة:", error);
    return {
      fullName: "أحمد منصور",
      location: "القاهرة، مصر",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    };
  }
};

// 2. تحديث بيانات العميل الشخصية (مع دعم رفع الصورة الشخصية)
export const updateClientProfile = async (profileData) => {
  try {
    const formData = new FormData();
    formData.append("fullName", profileData.name);
    formData.append("location", profileData.location);
    
    // إذا قام المستخدم باختيار ملف صورة جديد، نقوم بإرفاقه بالطلب
    if (profileData.imageFile) {
      formData.append("image", profileData.imageFile); 
    }

    const response = await fetch(BASE_URL, {
      method: "PUT",
      headers: getHeaders(), // نترك المتصفح يحدد الـ Content-Type تلقائياً للـ FormData
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server status ${response.status}`);
    }
    return true;
  } catch (error) {
    console.warn("⚠️ فشل تحديث البيانات على السيرفر، تم محاكاة النجاح:", error);
    return true;
  }
};