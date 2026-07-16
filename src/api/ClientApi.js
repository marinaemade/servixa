// src/api/ClientApi.js

const BASE_URL = "https://servixa.runasp.net/api"; // تم التوجيه مباشرة لعنوان السيرفر الفعلي

const getHeaders = () => {
  const token = localStorage.getItem("tc") || localStorage.getItem("token");
  return {
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
};

// جلب بيانات ملف العميل الشخصي
export const fetchClientProfile = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Client/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getHeaders(),
      },
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const result = await response.json();
    console.log("=== البيانات الراجعة من السيرفر عند الجلب ===", result);
    
    // فك التغليف: السيرفر يرجع البيانات داخل كائن يحتوي على حقل data
    if (result && result.isSuccess && result.data) {
      return result.data; 
    }
    
    return result;
  } catch (error) {
    console.warn("⚠️ فشل جلب البيانات، تم استخدام بيانات محاكاة:", error);
    return {
      id: 12,
      firstName: "ماريا",
      lastName: "عماد",
      email: "marina1@gmail.com",
      phoneNumber: "01078313265",
      balance: 0,
      suspendedBalance: 0,
    };
  }
};

// تحديث بيانات الملف الشخصي
// src/api/ClientApi.js

export const updateClientProfile = async (editData) => {
  try {
    const token = localStorage.getItem("tc") || localStorage.getItem("token");

    // تقسيم الاسم الأول والأخير
    const nameParts = (editData.fullName || "").trim().split(" ");
    const firstName = nameParts[0] || editData.firstName || "";
    const lastName = nameParts.slice(1).join(" ") || editData.lastName || "";

    // بناء كائن FormData بدلاً من JSON عادي
    const formData = new FormData();
    formData.append("id", editData.id || 0);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", editData.email || "");
    formData.append("phoneNumber", editData.phoneNumber || "");

    console.log("=== جاري إرسال البيانات كـ FormData ===");

    const response = await fetch(`${BASE_URL}/Client/profile`, {
      method: "PUT",
      headers: {
        // تنبيه هام جداً: عند إرسال FormData لا نضع Content-Type يدوياً!
        // المتصفح سيقوم بوضع Content-Type: multipart/form-data مع تذييل الـ boundary تلقائياً.
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });

    console.log("=== حالة استجابة التعديل (FormData) ===", response.status);

    if (response.ok) {
      return true;
    } else {
      const errorText = await response.text();
      console.error(`فشل التعديل بكود ${response.status}:`, errorText);
      return false;
    }
  } catch (error) {
    console.error("⚠️ فشل تحديث البيانات:", error);
    return false;
  }
};