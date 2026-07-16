import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiClock, 
  FiBriefcase, 
  FiCheckCircle, 
  FiLock, 
  FiUser,
  FiCreditCard,
  FiEdit3,
  FiArrowUpRight,
  FiAlertCircle,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiDollarSign
} from "react-icons/fi";
import { fetchClientProfile, updateClientProfile } from "../../../api/ClientApi";
import { fetchMyTasks, deleteTask } from "../../../api/TaskApi"; 

const statusMap = {
  Pending: { label: "قيد الانتظار", color: "bg-amber-100 text-amber-600" },
  Accepted: { label: "مقبول", color: "bg-blue-50 text-blue-500" },
  "In Progress": { label: "قيد التنفيذ", color: "bg-blue-50 text-blue-500" },
  InProgress: { label: "قيد التنفيذ", color: "bg-blue-50 text-blue-500" },
  Completed: { label: "مكتمل", color: "bg-green-50 text-green-600" },
  Cancelled: { label: "ملغي", color: "bg-red-50 text-red-500" },
};

const PAGE_SIZE = 5;

const ClientProfile = () => {
  const navigate = useNavigate();
  
  // الاحتفاظ بكافة بيانات الملف الشخصي الراجعة من السيرفر
  const [profile, setProfile] = useState({
    id: null,
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    balance: 0,
    suspendedBalance: 0,
  });
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ id: null, fullName: "", phoneNumber: "", email: "" });
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  // جلب البيانات عند تحميل الصفحة لأول مرة
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileData, tasksData] = await Promise.all([
          fetchClientProfile(),
          fetchMyTasks().catch(() => []), // منع تعطل الصفحة كاملة في حال فشل جلب الطلبات
        ]);

        if (profileData) {
          // دمج الاسم الأول والأخير لعرضه في خانة الاسم الكامل بالواجهة
          const combinedName = profileData.fullName || 
            `${profileData.firstName || ""} ${profileData.lastName || ""}`.trim();

          const mappedProfile = {
            ...profileData,
            fullName: combinedName || "اسم المستخدم"
          };

          setProfile(mappedProfile);
          setEditForm({ 
            id: profileData.id,
            fullName: combinedName, 
            phoneNumber: profileData.phoneNumber || "",
            email: profileData.email || ""
          });
        }

        setTasks(Array.isArray(tasksData) ? tasksData : []);
      } catch (err) {
        setError(err.message || "فشل تحميل البيانات من الخادم");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // تعديل البيانات الشخصية
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // إرسال البيانات مضافاً إليها الـ id والـ email لمنع مشاكل الـ validation بالسيرفر
    const success = await updateClientProfile(editForm);
    if (success) {
      setProfile((prev) => ({
        ...prev,
        fullName: editForm.fullName,
        phoneNumber: editForm.phoneNumber,
      }));
      setIsEditModalOpen(false);
    } else {
      alert("⚠️ حدث خطأ أثناء تعديل البيانات الشخصية، يرجى مراجعة الكونسول.");
    }
  };

  // حذف الطلب
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("هل أنت متأكد من رغبتك في حذف/إلغاء هذا الطلب؟")) return;
    try {
      setDeletingId(taskId);
      const success = await deleteTask(taskId);
      if (success) {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
      }
    } catch (err) {
      alert(err.message || "فشل حذف الطلب");
    } finally {
      setDeletingId(null);
    }
  };

  const activeTasks = tasks.filter(
    (t) => t.status !== "Completed" && t.status !== "Cancelled"
  );

  const totalPages = Math.max(1, Math.ceil(tasks.length / PAGE_SIZE));
  const pagedHistory = tasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = [
    { 
      id: 1, 
      title: "إجمالي الرصيد", 
      value: (profile.balance ?? 0).toLocaleString("ar-EG"), 
      unit: "ج.م", 
      icon: <FiCreditCard className="w-6 h-6 text-blue-500" />, 
      bgIcon: "bg-blue-50" 
    },
    { 
      id: 2, 
      title: "الرصيد المعلق", 
      value: (profile.suspendedBalance ?? 0).toLocaleString("ar-EG"), 
      unit: "ج.م", 
      icon: <FiLock className="w-6 h-6 text-red-500" />, 
      bgIcon: "bg-red-50" 
    },
    { 
      id: 3, 
      title: "الطلبات النشطة", 
      value: activeTasks.length, 
      unit: "", 
      icon: <FiBriefcase className="w-6 h-6 text-green-500" />, 
      bgIcon: "bg-green-50" 
    },
    { 
      id: 4, 
      title: "إجمالي الطلبات", 
      value: tasks.length, 
      unit: "", 
      icon: <FiClock className="w-6 h-6 text-orange-500" />, 
      bgIcon: "bg-orange-50" 
    },
  ];

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/50" dir="rtl">
        <div className="flex flex-col items-center gap-3">
          <span className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/50" dir="rtl">
        <div className="flex flex-col items-center gap-3 text-center max-w-sm">
          <FiAlertCircle className="w-12 h-12 text-red-400" />
          <p className="text-red-500 font-bold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-3 sm:p-6 lg:p-8 font-sans overflow-x-hidden" dir="rtl">
      
      {/* قسم ترويسة العميل (Header Profile) */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
            <FiUser />
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-800">{profile.fullName}</h1>
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="text-gray-400 hover:text-blue-600 transition-colors"
                title="تعديل الملف الشخصي"
              >
                <FiEdit3 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-1">{profile.phoneNumber || "لا يوجد رقم هاتف مسجل"}</p>
          </div>
        </div>

        {/* زر الشحن وسحب الرصيد */}
        <div className="w-full sm:w-auto">
          <button 
            onClick={() => navigate("/client/charge-wallet")}
            className="w-full sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-100 transition-colors duration-200"
          >
            <span>شحن / سحب رصيد</span>
            <FiArrowUpRight className="w-4 h-4 transform rotate-90" />
          </button>
        </div>
      </div>

      {/* 1. Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white border border-gray-100 rounded-xl p-3 sm:p-5 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all">
            <div className={`p-2.5 sm:p-3 rounded-xl ${stat.bgIcon} mb-2 sm:mb-3`}>
              {stat.icon}
            </div>
            <span className="text-gray-400 text-xs sm:text-sm font-medium mb-1 text-center">{stat.title}</span>
            <div className="flex items-baseline gap-0.5 sm:gap-1 flex-wrap justify-center">
              <span className="text-lg sm:text-2xl font-bold text-slate-800">{stat.value}</span>
              {stat.unit && <span className="text-[10px] sm:text-xs text-gray-400 font-medium">{stat.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Active Tasks */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-5">المهام والمشاريع النشطة</h2>

        {activeTasks.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center text-gray-400 shadow-sm">
            لا توجد مهام نشطة حالياً
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {activeTasks.map((task) => {
              const st = statusMap[task.status] ?? { label: task.status, color: "bg-gray-100 text-gray-600" };
              const isPending = task.status === "Pending" || !task.status;
              const isInProgress = task.status === "In Progress" || task.status === "InProgress" || task.status === "Accepted";
              
              return (
                <div key={task.id} className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <span className={`text-[11px] sm:text-xs px-2.5 py-1 rounded-md font-medium shrink-0 ${st.color}`}>
                      {st.label}
                    </span>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 font-medium">رقم المهمة: #{task.id}</span>
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-5">
                    <h3 className="text-sm sm:text-base font-bold text-blue-600 mb-1.5 sm:mb-2">
                      {task.name ?? "مهمة غير مسماة"}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                      {task.description ?? "لا يوجد وصف لهذه المهمة."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-4 text-center">
                    <div className="border border-gray-100 bg-slate-50/50 rounded-xl p-1.5 sm:p-2">
                      <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-gray-400 mb-1">
                        <FiDollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                        <span>متوسط التكلفة</span>
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-slate-700 block truncate">
                        {task.avgCost ? `${task.avgCost} ج.م` : "—"}
                      </span>
                    </div>
                    <div className="border border-gray-100 bg-slate-50/50 rounded-xl p-1.5 sm:p-2">
                      <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-gray-400 mb-1">
                        <FiClock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                        <span>الوقت المتوقع</span>
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-slate-700 block truncate">
                        {task.avgTime ? `${task.avgTime} ساعة` : "—"}
                      </span>
                    </div>
                  </div>

                  {isPending && (
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      disabled={deletingId === task.id}
                      className="w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                    >
                      {deletingId === task.id ? (
                        <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <FiTrash2 className="w-3.5 h-3.5" />
                          <span>إلغاء وحذف الطلب</span>
                        </>
                      )}
                    </button>
                  )}
                  {isInProgress && (
                    <div className="w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 bg-blue-500 text-white">
                      <FiCheckCircle className="w-4 h-4" />
                      قيد التنفيذ
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Tasks History Table */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-5">سجل كافة الطلبات</h2>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 text-slate-700 text-xs font-bold">
                  <th className="py-3.5 sm:py-4 px-4 border-l border-gray-100">رقم الطلب</th>
                  <th className="py-3.5 sm:py-4 px-4 border-l border-gray-100">عنوان الخدمة</th>
                  <th className="py-3.5 sm:py-4 px-4 border-l border-gray-100">الوقت المتوقع</th>
                  <th className="py-3.5 sm:py-4 px-4 border-l border-gray-100">التكلفة</th>
                  <th className="py-3.5 sm:py-4 px-4">الحالة</th>
                </tr>
              </thead>
              <tbody className="text-[11px] sm:text-xs text-slate-600 divide-y divide-gray-100">
                {pagedHistory.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-gray-400">لا توجد سجلات بعد</td>
                  </tr>
                ) : (
                  pagedHistory.map((row) => {
                    const st = statusMap[row.status] ?? { label: row.status || "قيد الانتظار", color: "bg-amber-100 text-amber-600" };
                    return (
                      <tr key={row.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-3.5 sm:py-4 px-4 border-l border-gray-100 font-bold text-slate-500">
                          #{row.id}
                        </td>
                        <td className="py-3.5 sm:py-4 px-4 border-l border-gray-100 font-medium text-slate-700 text-right pr-6">
                          {row.name ?? "—"}
                        </td>
                        <td className="py-3.5 sm:py-4 px-4 border-l border-gray-100 font-medium text-slate-700">
                          {row.avgTime ? `${row.avgTime} ساعة` : "—"}
                        </td>
                        <td className="py-3.5 sm:py-4 px-4 border-l border-gray-100 font-bold text-slate-700">
                          {row.avgCost ? `${row.avgCost} ج.م` : "—"}
                        </td>
                        <td className="py-3.5 sm:py-4 px-4">
                          <span className={`inline-block px-2.5 py-1 rounded-md font-medium text-[10px] sm:text-[11px] ${st.color}`}>
                            {st.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-slate-50/50 border-t border-gray-100 py-3 sm:py-4 flex justify-center items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold transition-colors ${
                    p === page
                      ? "bg-blue-500 text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* نافذة تعديل بيانات العميل (Edit Profile Modal) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 text-right">تعديل الملف الشخصي</h3>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="text-right">
                <label className="text-xs font-bold text-gray-500 block mb-1.5">الاسم الكامل</label>
                <input 
                  type="text" 
                  value={editForm.fullName} 
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  required
                />
              </div>

              <div className="text-right">
                <label className="text-xs font-bold text-gray-500 block mb-1.5">رقم الهاتف</label>
                <input 
                  type="text" 
                  value={editForm.phoneNumber} 
                  onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm font-bold transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-100 transition-colors"
                >
                  حفظ التعديلات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClientProfile;