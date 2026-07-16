import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiClock, 
  FiBriefcase, 
  FiCheckCircle, 
  FiLock, 
  FiMapPin, 
  FiCalendar, 
  FiChevronLeft, 
  FiChevronRight,
  FiUser,
  FiCreditCard,
  FiDollarSign,
  FiEdit3,
  FiArrowUpRight
} from "react-icons/fi";
import { fetchClientProfile, updateClientProfile } from "../../../api/ClientApi";

const ClientProfile = () => {
  const navigate = useNavigate();
  
  // State لتخزين بيانات العميل القادمة من الـ API
  const [profile, setProfile] = useState({
    fullName: "",
    phoneNumber: "",
    balance: 0,
    suspendedBalance: 0,
  });

  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ fullName: "", phoneNumber: "" });

  // 1. جلب البيانات من السيرفر عند تحميل المكون
  useEffect(() => {
    const loadProfileData = async () => {
      setLoading(true);
      const data = await fetchClientProfile();
      if (data) {
        setProfile(data);
        setEditForm({ fullName: data.fullName || "", phoneNumber: data.phoneNumber || "" });
      }
      setLoading(false);
    };
    loadProfileData();
  }, []);

  // 2. معالجة تعديل البيانات وإرسالها للسيرفر (PUT)
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const success = await updateClientProfile(editForm);
    if (success) {
      setProfile((prev) => ({
        ...prev,
        fullName: editForm.fullName,
        phoneNumber: editForm.phoneNumber,
      }));
      setIsEditModalOpen(false);
    }
  };

  // ديناميكية كروت الإحصائيات بناءً على بيانات الـ API الفردية
  // ديناميكية كروت الإحصائيات مع حماية ضد الـ undefined والـ null
  const stats = [
    { 
      id: 1, 
      title: "إجمالي الرصيد", 
      value: (profile.balance ?? 0).toLocaleString("ar-EG"), // 💡 حماية مضافة باستخدام ??
      unit: "ج.م", 
      icon: <FiCreditCard className="w-6 h-6 text-blue-500" />, 
      bgIcon: "bg-blue-50" 
    },
    { 
      id: 2, 
      title: "الرصيد المعلق", 
      value: (profile.suspendedBalance ?? 0).toLocaleString("ar-EG"), // 💡 حماية مضافة باستخدام ??
      unit: "ج.م", 
      icon: <FiLock className="w-6 h-6 text-red-500" />, 
      bgIcon: "bg-red-50" 
    },
    { id: 3, title: "الطلبات النشطة", value: "٤", unit: "", icon: <FiBriefcase className="w-6 h-6 text-green-500" />, bgIcon: "bg-green-50" },
    { id: 4, title: "العروض المعلقة", value: "٥", unit: "", icon: <FiClock className="w-6 h-6 text-orange-500" />, bgIcon: "bg-orange-50" },
  ];

  // Active Tasks Data (مؤقتة حتى ربطها بالكامل بـ Task API لاحقاً)
  const activeTasks = [
    {
      id: 1,
      status: "قيد الانتظار",
      statusColor: "bg-amber-100 text-amber-600",
      name: "سامي احمد",
      role: "سباك",
      rating: "5.0",
      title: "تصليح تسريب في حوض المطبخ",
      desc: "نواجه مشكلة في تسريب مياه أسفل حوض المطبخ، نحتاج إلى فني سباكة متمكن لفحص المواسير وتغيير القطع التالفة في أسرع وقت ممكن.",
      price: "200-300 ج.م",
      date: "12 مايو",
      distance: "3.5 كم منك",
      actionText: "إلغاء",
      actionColor: "bg-gray-100 text-gray-500 hover:bg-gray-200"
    },
    {
      id: 2,
      status: "قيد التنفيذ",
      statusColor: "bg-blue-50 text-blue-500",
      name: "سامي احمد",
      role: "سباك",
      rating: "5.0",
      title: "تصليح تسريب في حوض المطبخ",
      desc: "نواجه مشكلة في تسريب مياه أسفل حوض المطبخ، نحتاج إلى فني سباكة متمكن لفحص المواسير وتغيير القطع التالفة في أسرع وقت ممكن.",
      price: "200-300 ج.م",
      date: "12 مايو",
      distance: "3.5 كم منك",
      actionText: "تم انجاز العمل",
      actionColor: "bg-blue-500 text-white hover:bg-blue-600",
      hasCheckIcon: true
    }
  ];

  // Order History Data
  const orderHistory = [
    { id: 1, date: "12 مايو 2026", time: "09:30 PM", service: "سباكة", expert: "سامي احمد", price: "500 ج.م", priceColor: "text-green-600", status: "مكتمل", statusColor: "bg-green-50 text-green-600" },
    { id: 2, date: "12 مايو 2026", time: "09:30 PM", service: "تنظيف", expert: "سامي احمد", price: "500 ج.م", priceColor: "text-blue-600", status: "قيد التنفيذ", statusColor: "bg-blue-50 text-blue-500" },
    { id: 3, date: "12 مايو 2026", time: "09:30 PM", service: "دهان", expert: "سامي احمد", price: "500 ج.م", priceColor: "text-red-500", status: "ملغي", statusColor: "bg-red-50 text-red-500" },
    { id: 4, date: "12 مايو 2026", time: "09:30 PM", service: "تنظيف", expert: "سامي احمد", price: "500 ج.م", priceColor: "text-green-600", status: "مكتمل", statusColor: "bg-green-50 text-green-600" },
    { id: 5, date: "12 مايو 2026", time: "09:30 PM", service: "تنظيف", expert: "سامي احمد", price: "500 ج.م", priceColor: "text-green-600", status: "مكتمل", statusColor: "bg-green-50 text-green-600" },
  ];

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
              <h1 className="text-xl font-bold text-slate-800">{profile.fullName || "اسم المستخدم"}</h1>
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="text-gray-400 hover:text-blue-600 transition-colors"
                title="تعديل الملف الشخصي"
              >
                <FiEdit3 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-1">{profile.phoneNumber || "بدون رقم هاتف"}</p>
          </div>
        </div>

        {/* زر الشحن وسحب الرصيد المتوافق بالكامل */}
        <div className="w-full sm:w-auto">
          <button 
            onClick={() => navigate("/charge-wallet")}
            className="w-full sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-100 transition-colors duration-200"
          >
            <span>شحن / سحب رصيد</span>
            <FiArrowUpRight className="w-4 h-4 transform rotate-90" />
          </button>
        </div>
      </div>

      {/* 1. Statistics Cards Section */}
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

      {/* 2. Active Tasks Section */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-5">المهام النشطة</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {activeTasks.map((task) => (
            <div key={task.id} className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
              
              {/* Card Header */}
              <div className="flex justify-between items-start gap-2 mb-4">
                <span className={`text-[11px] sm:text-xs px-2.5 py-1 rounded-md font-medium shrink-0 ${task.statusColor}`}>
                  {task.status}
                </span>
                
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="text-right">
                    <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{task.name}</h4>
                    <div className="flex items-center justify-end gap-1 text-[11px] sm:text-xs text-gray-400 mt-0.5 whitespace-nowrap">
                      <span className="text-amber-400">★</span>
                      <span>{task.rating}</span>
                      <span className="mx-0.5 sm:mx-1">•</span>
                      <span>{task.role}</span>
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-blue-500 text-white rounded-full text-[9px] mr-1">✓</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 h-10 sm:h-12 rounded-full bg-slate-200 overflow-hidden relative border border-gray-100 shrink-0">
                    <div className="absolute inset-0 bg-slate-400 flex items-center justify-center text-white text-lg">
                      <FiUser />
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120" 
                      alt={task.name} 
                      className="w-full h-full object-cover relative z-10"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="mb-4 sm:mb-5">
                <h3 className="text-sm sm:text-base font-bold text-blue-600 mb-1.5 sm:mb-2">{task.title}</h3>
                <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed text-justify">{task.desc}</p>
              </div>

              {/* Card Specs */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4 text-center">
                <div className="border border-gray-100 bg-slate-50/50 rounded-xl p-1.5 sm:p-2 min-w-0">
                  <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-gray-400 mb-1">
                    <FiDollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span className="truncate">السعر</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700 block truncate">{task.price}</span>
                </div>
                <div className="border border-gray-100 bg-slate-50/50 rounded-xl p-1.5 sm:p-2 min-w-0">
                  <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-gray-400 mb-1">
                    <FiCalendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span className="truncate">الموعد</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700 block truncate">{task.date}</span>
                </div>
                <div className="border border-gray-100 bg-slate-50/50 rounded-xl p-1.5 sm:p-2 min-w-0">
                  <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-gray-400 mb-1">
                    <FiMapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span className="truncate">المسافة</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700 block truncate">{task.distance}</span>
                </div>
              </div>

              {/* Card Footer Button */}
              <button className={`w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors duration-200 ${task.actionColor}`}>
                {task.hasCheckIcon && <FiCheckCircle className="w-4 h-4" />}
                {task.actionText}
              </button>

            </div>
          ))}
        </div>
      </div>

      {/* 3. Order History Section */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-5">سجل الطلبات</h2>
        
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="w-full overflow-x-auto [-webkit-overflow-scrolling:touch]">
            <table className="w-full text-center border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 text-slate-700 text-xs font-bold">
                  <th className="py-3.5 sm:py-4 px-4 border-l border-gray-100">التاريخ</th>
                  <th className="py-3.5 sm:py-4 px-4 border-l border-gray-100">فئة الخدمة</th>
                  <th className="py-3.5 sm:py-4 px-4 border-l border-gray-100">الفني</th>
                  <th className="py-3.5 sm:py-4 px-4 border-l border-gray-100">المبلغ</th>
                  <th className="py-3.5 sm:py-4 px-4">الحالة</th>
                </tr>
              </thead>
              <tbody className="text-[11px] sm:text-xs text-slate-600 divide-y divide-gray-100">
                {orderHistory.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-3.5 sm:py-4 px-4 border-l border-gray-100">
                      <div className="font-bold text-slate-700 mb-0.5">{row.time}</div>
                      <div className="text-gray-400 text-[10px] sm:text-[11px]">{row.date}</div>
                    </td>
                    <td className="py-3.5 sm:py-4 px-4 border-l border-gray-100 font-medium text-slate-700">{row.service}</td>
                    <td className="py-3.5 sm:py-4 px-4 border-l border-gray-100">
                      <a href="#" className="text-blue-500 hover:underline font-medium">{row.expert}</a>
                    </td>
                    <td className={`py-3.5 sm:py-4 px-4 border-l border-gray-100 font-bold ${row.priceColor}`}>{row.price}</td>
                    <td className="py-3.5 sm:py-4 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-md font-medium text-[10px] sm:text-[11px] ${row.statusColor}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-slate-50/50 border-t border-gray-100 py-3 sm:py-4 flex justify-center items-center gap-1.5">
            <button className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 transition-colors">
              <FiChevronRight className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md bg-blue-500 text-white font-bold text-xs shadow-sm">
              1
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs transition-colors">
              2
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs transition-colors">
              3
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 transition-colors">
              <FiChevronLeft className="w-4 h-4" />
            </button>
          </div>
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
                  type="tel" 
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