import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { 
  FiEdit, 
  FiMapPin, 
  FiUser, 
  FiTool, 
  FiBarChart2, 
  FiAward,
  FiLoader
} from "react-icons/fi";
import { fetchClientProfile, updateClientProfile } from "../../../api/ClientApi";

const MainPage = () => {
  const navigate = useNavigate(); 
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // الاحتفاظ بالبيانات الأصلية المرجعة بالكامل لمنع فقدان الـ email أو الـ id أثناء الإرسال
  const [rawProfileData, setRawProfileData] = useState(null);

  // إعدادات الحالات لتحديث الملف الشخصي وتفعيل وضع التعديل
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    image: "",
    imageFile: null // لتخزين الملف الأصلي تمهيداً لرفعه إلى السيرفر
  });

  const [activeTab, setActiveTab] = useState("profile");

  // 1. جلب البيانات عند تحميل المكون
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchClientProfile();
      console.log("=== البيانات المستلمة في MainPage ===", data);
      
      if (data) {
        setRawProfileData(data); // حفظ كائن البيانات بالكامل لاستخدامه عند الحفظ
        
        // دمج الاسم الأول والاسم الأخير
        const combinedName = data.fullName || 
          `${data.firstName || ""} ${data.lastName || ""}`.trim();

        setProfile({
          name: combinedName || "أحمد منصور",
          location: data.location || "القاهرة، مصر",
          image: data.image || "https://www.bing.com/images/search?view=detailV2&ccid=bk0Zdd0t&id=5BDA293E890452077336A29C4460B47FC6628A25&thid=OIP.bk0Zdd0tjIZBGmjNFoPGxgHaHa&mediaurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F023%2F402%2F601%2Fnon_2x%2Fman-avatar-free-vector.jpg&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.6e4d1975dd2d8c86411a68cd1683c6c6%3Frik%3DJYpixn%252b0YEScog%26pid%3DImgRaw%26r%3D0&exph=980&expw=980&q=avatar+images+for+profile&form=IRPRST&ck=86974D73F28E0E16FC4B39B643269E39&selectedindex=6&itb=1&cw=1375&ch=659&ajaxhist=0&ajaxserp=0&pivotparams=insightsToken%3Dccid_AbGafkaz*cp_57EC51B9E09C3A8EFFFBB311E6C502FA*mid_9EB9C1484521F75C7A5964826DCB03D5E81D28CC*thid_OIP.AbGafkazjc!_S1pZPh0B9cQHaIm&vt=0&sim=11&iss=VSI&ajaxhist=0&ajaxserp=0",
          imageFile: null
        });
      }
      setLoading(false);
    };
    loadData();
  }, []);

  // التعامل مع اختيار الصورة الجديدة محلياً وحفظ ملف الصورة الأصلي
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfile((p) => ({ 
      ...p, 
      image: URL.createObjectURL(file), // للعرض المؤقت في الواجهة
      imageFile: file // لحفظ الملف لإرساله للسيرفر لاحقاً
    }));
  };

  // 2. إرسال البيانات المحدثة للسيرفر (PUT)
  const handleSave = async () => {
    setSaving(true);

    // تقسيم الاسم المدخل إلى اسم أول واسم أخير
    const nameParts = profile.name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // تحضير كائن البيانات المدمج لإرساله عبر الـ Api المطور بـ FormData
    const updatedData = {
      id: rawProfileData?.id || 12,
      firstName: firstName,
      lastName: lastName,
      fullName: profile.name,
      location: profile.location,
      email: rawProfileData?.email || "",
      phoneNumber: rawProfileData?.phoneNumber || "",
      imageFile: profile.imageFile // سيتم معالجته وارفاقه داخل الـ FormData في ClientApi
    };

    const success = await updateClientProfile(updatedData);
    if (success) {
      setIsEditing(false);
      // تحديث البيانات الخام لتطابق التعديل الجديد
      setRawProfileData(prev => ({
        ...prev,
        firstName: firstName,
        lastName: lastName,
        location: profile.location
      }));
    } else {
      alert("⚠️ فشل حفظ التعديلات، يرجى التحقق من المدخلات ومراجعة كونسول المتصفح.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/50">
        <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

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
                onClick={handleSave}
                disabled={saving}
                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors text-center flex items-center justify-center min-w-[70px]"
              >
                {saving ? <FiLoader className="animate-spin w-4 h-4" /> : "حفظ"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                disabled={saving}
                className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors text-center"
              >
                إلغاء
              </button>
            </div>
          )}
        </div>

        {/* Profile Info Details */}
        <div className="flex flex-col items-center justify-center text-center mt-2 sm:mt-0">
          <div className="w-24 h-24 rounded-full bg-slate-200 relative border-2 border-white shadow-md mb-4 group overflow-hidden">
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