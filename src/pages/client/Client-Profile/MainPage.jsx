import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { 
  FiEdit, 
  FiMapPin, 
  FiUser, 
  FiTool, 
  FiBarChart2, 
  FiAward
} from "react-icons/fi";

const MainPage = () => {
  const navigate = useNavigate(); 
  
  // إعدادات الحالات لتحديث الملف الشخصي وتفعيل وضع التعديل
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "أحمد منصور",
    location: "العنوان",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
  });

  const [activeTab, setActiveTab] = useState("profile");

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfile((p) => ({ ...p, image: URL.createObjectURL(file) }));
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-3 sm:p-6 lg:p-8 font-sans overflow-x-hidden" dir="rtl">
      
      {/* 1. Profile Header Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 shadow-sm mb-6 relative">
        
        {/* أزرار التحكم: تعديل الحساب أو أزرار حفظ وإلغاء */}
        <div className="flex justify-start sm:absolute sm:top-6 sm:left-6 mb-6 sm:mb-0 w-full sm:w-auto">
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <FiEdit className="w-3.5 h-3.5" />
              <span>تعديل الحساب</span>
            </button>
          ) : (
            <div className="flex gap-2 w-full sm:w-auto justify-start">
              <button
                onClick={() => {
                  // TODO: call API here if needed
                  setIsEditing(false);
                }}
                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors text-center"
              >
                حفظ
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors text-center"
              >
                إلغاء
              </button>
            </div>
          )}
        </div>

        {/* Profile Info Details */}
        <div className="flex flex-col items-center justify-center text-center mt-2 sm:mt-0">
          <div className="w-24 h-24 rounded-full bg-slate-200 relative border-2 border-white shadow-md mb-4 group">
            <div className="absolute inset-0 bg-slate-400 rounded-full flex items-center justify-center text-white text-3xl">
              <FiUser />
            </div>
            <img 
              src={profile.image} 
              alt={profile.name} 
              className="w-full h-full object-cover rounded-full relative z-10"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {/* Verified Badge */}
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center border-2 border-white z-20">✓</span>
            
            {/* مدخل رفع الصورة يظهر فقط في وضع التعديل */}
            {isEditing && (
              <label className="absolute inset-0 bg-black/50 rounded-full z-30 flex items-center justify-center text-white text-[10px] cursor-pointer font-bold opacity-100 transition-opacity">
                <span>تغيير</span>
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              </label>
            )}
          </div>

          {/* الاسم: نص عادي أو حقل إدخال متجاوب */}
          {isEditing ? (
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="text-center border border-blue-300 rounded-lg px-3 py-1 font-bold text-xl mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 w-full max-w-[280px]"
            />
          ) : (
            <h1 className="text-xl font-bold text-slate-800 mb-2 break-all px-4">{profile.name}</h1>
          )}
          
          {/* الموقع: نص عادي أو حقل إدخال متجاوب */}
          <div className="flex items-center gap-1 text-xs text-gray-400 font-medium justify-center w-full">
            <FiMapPin className="w-3.5 h-3.5 shrink-0" />
            {isEditing ? (
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="text-center border border-blue-300 rounded-md px-2 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 w-full max-w-[180px]"
              />
            ) : (
              <span className="break-all px-2">{profile.location}</span>
            )}
          </div>
        </div>

        {/* Header Segment Navigation Tabs */}
        <div className="flex justify-center sm:justify-end mt-8 border-t border-gray-100 pt-4 -mx-5 sm:-mx-8 px-5 sm:px-8">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 w-full sm:w-auto">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`flex-1 sm:flex-none py-2 px-5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === "profile" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiUser className="w-3.5 h-3.5" />
              <span>الملف الشخصي</span>
            </button>
            <button 
              onClick={() => {
                setActiveTab("projects");
                navigate("/client/projects");
              }}
              className={`flex-1 sm:flex-none py-2 px-5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === "projects" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiTool className="w-3.5 h-3.5" />
              <span>المشاريع</span>
            </button>
          </div>
        </div>

      </div>

      {/* 2. Main Content Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Right Side: Statistics Sidebar Column */}
        <div className="space-y-4 order-2 lg:order-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm sm:text-base font-bold text-slate-800">الإحصائيات</h3>
              <div className="p-1.5 bg-blue-50 rounded-lg text-blue-500">
                <FiBarChart2 className="w-4 h-4" />
              </div>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <span className="text-blue-600">75%</span>
                <span className="text-gray-400">إكمال المشاريع</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: "75%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <span className="text-blue-600">0%</span>
                <span className="text-gray-400">إعادة التوظيف</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: "0%" }} />
              </div>
            </div>
          </div>

          <div className="bg-blue-600 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-5 text-white flex items-center justify-between shadow-md">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <FiAward className="w-5 h-5" />
            </div>
            <div className="text-left flex-1 pl-4">
              <span className="text-[10px] text-blue-100 block tracking-wider uppercase mb-0.5">الشارة</span>
              <h4 className="text-base font-bold">عميل مميز</h4>
            </div>
          </div>
        </div>

        {/* Left Side: About Me Bio Content Container Card */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 mb-5 border-b border-gray-50 pb-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                <FiUser className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">نبذة عني</h2>
            </div>

            <div className="text-xs sm:text-sm text-gray-500 leading-relaxed text-justify space-y-4 font-medium">
              <p>
                أنا مصمم واجهات وتجربة مستخدم (UI/UX) شغوف بخلق تجارب رقمية بسيطة ومنظمة. أمتلك خبرة واسعة في تصميم واجهات تطبيقات الهاتف المحمول وواجهات الألعاب، حيث أركز دائماً على تحقيق التوازن المثالي بين الجمالية والوظيفية.
              </p>
              <p>
                أسلوبي في التصميم يعتمد على البساطة الهيكلية والوضوح، مما يسهل على المستخدمين التفاعل مع المنتج بسلاسة.
              </p>
              <p>
                أسعى دائماً لتحويل الأفكار المعقدة إلى حلول بصرية سهلة الفهم والاستخدام.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default MainPage;