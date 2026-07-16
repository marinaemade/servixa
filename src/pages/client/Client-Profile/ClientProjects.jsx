import React, { useState, useEffect } from "react";
import { 
  FiTool, 
  FiActivity, 
  FiZap, 
  FiClock, 
  FiTrash2, 
  FiEdit3, 
  FiX, 
  FiLoader 
} from "react-icons/fi";
import { fetchMyTasks, deleteTask, updateTask } from "../../../api/TaskApi";

const ClientProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // حالات نافذة التعديل المنبثقة (Edit Modal)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", avgCost: "", avgTime: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. جلب المشاريع عند تحميل الصفحة
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetchMyTasks();
        
        // التحقق من شكل البيانات القادمة من الـ API أو الـ Mock Data
        const tasksArray = Array.isArray(response) ? response : (response?.data || []);
        setProjects(tasksArray);
      } catch (err) {
        setError("فشل جلب قائمة المشاريع الخاصة بك.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // 2. معالجة عملية الحذف (Delete)
  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من رغبتك في حذف هذا الطلب نهائياً؟")) {
      const success = await deleteTask(id);
      if (success) {
        // تحديث الواجهة مباشرة بإزالة الكارد المحذوف
        setProjects((prev) => prev.filter((project) => project.id !== id));
      } else {
        alert("فشلت عملية الحذف، يرجى المحاولة لاحقاً.");
      }
    }
  };

  // 3. فتح نافذة التعديل وملء البيانات القديمة
  const openEditModal = (project) => {
    setSelectedProject(project);
    setEditForm({
      name: project.name,
      avgCost: project.avgCost,
      avgTime: project.avgTime
    });
    setIsEditModalOpen(true);
  };

  // 4. إرسال طلب التعديل (Edit Submit)
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await updateTask(selectedProject.id, editForm);
    
    if (success) {
      // تحديث البيانات محلياً في القائمة بدون الحاجة لإعادة جلبها من السيرفر
      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProject.id ? { ...p, ...editForm } : p
        )
      );
      setIsEditModalOpen(false);
      setSelectedProject(null);
    } else {
      alert("حدث خطأ أثناء تعديل الطلب.");
    }
    setIsSubmitting(false);
  };

  // دالة مساعدة لتحديد الأيقونة ولونها بناءً على التخصص (SpecialtyId)
  const getSpecialtyDetails = (specialtyId) => {
    switch (specialtyId) {
      case 1:
        return {
          icon: <FiTool className="w-5 h-5 text-blue-600" />,
          iconBg: "bg-blue-50"
        };
      case 2:
        return {
          icon: <FiZap className="w-5 h-5 text-amber-500" />,
          iconBg: "bg-amber-50"
        };
      default:
        return {
          icon: <FiActivity className="w-5 h-5 text-green-600" />,
          iconBg: "bg-green-50"
        };
    }
  };

  // دالة مساعدة لتنسيق حالة الطلب (Status) باللغة العربية والألوان المناسبة
  const getStatusDetails = (status) => {
    switch (status) {
      case "Pending":
      case "قيد الانتظار":
        return {
          text: "قيد الانتظار",
          classes: "bg-amber-50 text-amber-600 border-amber-100"
        };
      case "In Progress":
      case "قيد التنفيذ":
        return {
          text: "قيد التنفيذ",
          classes: "bg-blue-50 text-blue-500 border-blue-100"
        };
      case "Completed":
      case "مكتمل":
        return {
          text: "مكتمل",
          classes: "bg-green-50 text-green-600 border-green-100"
        };
      case "Cancelled":
      case "ملغي":
        return {
          text: "ملغي",
          classes: "bg-red-50 text-red-500 border-red-100"
        };
      default:
        return {
          text: "مفتوح",
          classes: "bg-slate-50 text-slate-500 border-slate-100"
        };
    }
  };

  // حالة التحميل (Loading Spinner)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <FiLoader className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium">جاري تحميل مشاريعك...</p>
      </div>
    );
  }

  // حالة الخطأ أو عدم وجود مشاريع
  if (error && projects.length === 0) {
    return (
      <div className="text-center py-10 bg-red-50 rounded-2xl p-6 border border-red-100">
        <p className="text-red-600 font-bold">{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-8">
        <p className="text-gray-500 text-lg font-bold">لا يوجد لديك أي طلبات خدمات حالياً.</p>
        <p className="text-gray-400 text-sm mt-1">ابدأ بطلب خدمة جديدة لتظهر هنا!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5 w-full" dir="rtl">
      {projects.map((project) => {
        const spec = getSpecialtyDetails(project.specialtyId);
        const stat = getStatusDetails(project.status);

        return (
          <div 
            key={project.id} 
            className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md text-right"
          >
            {/* تفاصيل المشروع والرموز والأيقونات */}
            <div className="flex items-start gap-4 flex-1">
              <div className={`w-11 h-11 rounded-xl ${spec.iconBg} flex items-center justify-center shrink-0 border border-slate-50 shadow-sm`}>
                {spec.icon}
              </div>
              <div className="space-y-1.5 text-right flex-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-800">{project.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-1">{project.description || "لا يوجد وصف إضافي"}</p>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1">
                    <FiClock className="w-3.5 h-3.5 text-slate-300" />
                    {project.avgTime} {project.avgTime > 10 ? "ساعة" : "ساعات"} تقريباً
                  </span>
                  <span className="hidden sm:inline text-slate-200">•</span>
                  <span>
                    الفني: <a href="#" className="text-blue-500 font-bold hover:underline">جاري البحث عن فني...</a>
                  </span>
                </div>
              </div>
            </div>

            {/* القيمة المالية، وسم الحالة، وأزرار التحكم */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-50">
              <div className="flex items-center gap-3">
                {/* زر التعديل */}
                <button 
                  onClick={() => openEditModal(project)}
                  className="p-1.5 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors"
                  title="تعديل الطلب"
                >
                  <FiEdit3 className="w-4 h-4" />
                </button>
                {/* زر الحذف */}
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                  title="حذف الطلب"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end gap-2">
                <span className="text-base font-black text-green-600" dir="ltr">
                  +{project.avgCost} ج.م
                </span>
                <span className={`text-[10px] sm:text-xs px-2.5 py-1 rounded-lg font-bold border ${stat.classes}`}>
                  {stat.text}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* نافذة التعديل المنبثقة (Edit Modal) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
            {/* الهيدر */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg">تعديل تفاصيل الطلب</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* النموذج */}
            <form onSubmit={handleEditSubmit} className="p-5 space-y-4 text-right">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700">اسم الخدمة المطلوبة *</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">التكلفة المتوقعة (ج.م) *</label>
                  <input
                    type="number"
                    required
                    value={editForm.avgCost}
                    onChange={(e) => setEditForm({ ...editForm, avgCost: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">الوقت المتوقع (بالساعة) *</label>
                  <input
                    type="number"
                    required
                    value={editForm.avgTime}
                    onChange={(e) => setEditForm({ ...editForm, avgTime: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-sm"
                  />
                </div>
              </div>

              {/* أزرار الحفظ والإلغاء */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-blue-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <FiLoader className="w-4 h-4 animate-spin" /> : "حفظ التغييرات"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-xl text-sm transition-all border border-slate-200"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientProjects;