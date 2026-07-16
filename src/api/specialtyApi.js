const BASE_URL = `${import.meta.env.VITE_API_URL}/Specialty`;

// دالة مساعدة للـ Headers مع التوكن تلقائياً
const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

// 1. جلب كل التخصصات (GET /api/Specialty)
export const fetchSpecialties = async () => {
  const response = await fetch(BASE_URL, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) throw new Error("فشل جلب قائمة التخصصات");
  return response.json();
};

// 2. جلب تخصص معين بالـ ID (GET /api/Specialty/{id})
export const fetchSpecialtyById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) throw new Error(`فشل جلب التخصص رقم ${id}`);
  return response.json();
};

// 3. إضافة تخصص جديد - للـ Admin (POST /api/Specialty)
export const createSpecialty = async (specialtyData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(specialtyData),
  });

  if (!response.ok) throw new Error("فشلت عملية إضافة التخصص");
  return response.json();
};

// يمكنكِ إضافة الـ PUT والـ DELETE هنا بنفس النمط لاحقاً...