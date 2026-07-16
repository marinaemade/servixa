import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiTool, 
  FiZap, 
  FiWind, 
  FiCpu, 
  FiScissors, 
  FiActivity, 
  FiHome, 
  FiTrash2, 
  FiSettings,
  FiDroplet
} from 'react-icons/fi';
import { MdOutlineCleaningServices, MdConstruction } from 'react-icons/md';
import { fetchSpecialties } from '../../../api/specialtyApi'; 

const Services = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // مصفوفة ألوان لتوزيعها عشوائياً أو بالتتابع
  const vibrantColors = [
    'text-blue-600 bg-blue-50/60 border-blue-100',
    'text-amber-500 bg-amber-50/60 border-amber-100',
    'text-cyan-500 bg-cyan-50/60 border-cyan-100',
    'text-purple-500 bg-purple-50/60 border-purple-100',
    'text-emerald-500 bg-emerald-50/60 border-emerald-100',
    'text-orange-500 bg-orange-50/60 border-orange-100',
    'text-green-500 bg-green-50/60 border-green-100',
    'text-rose-500 bg-rose-50/60 border-rose-100',
    'text-indigo-500 bg-indigo-50/60 border-indigo-100',
    'text-teal-500 bg-teal-50/60 border-teal-100'
  ];

  // دالة ذكية لتحليل اسم التخصص وإرجاع الأيقونة واللون الأنسب له تلقائياً
  const getRelatableStyle = (name, index) => {
    const lowercaseName = name.toLowerCase();

    // 1. تحديد الأيقونة المناسبة بناءً على الكلمات المفتاحية في الاسم
    let icon = <FiActivity className="w-6 h-6" />; // أيقونة افتراضية ذكية

    if (lowercaseName.includes('plumb') || lowercaseName.includes('water') || lowercaseName.includes('سباك') || lowercaseName.includes('مياه')) {
      icon = <FiDroplet className="w-6 h-6" />;
    } else if (lowercaseName.includes('electr') || lowercaseName.includes('power') || lowercaseName.includes('كهربا')) {
      icon = <FiZap className="w-6 h-6" />;
    } else if (lowercaseName.includes('air') || lowercaseName.includes('cool') || lowercaseName.includes('wind') || lowercaseName.includes('تكييف') || lowercaseName.includes('تبريد')) {
      icon = <FiWind className="w-6 h-6" />;
    } else if (lowercaseName.includes('paint') || lowercaseName.includes('decor') || lowercaseName.includes('نقاش') || lowercaseName.includes('دهان')) {
      icon = <FiScissors className="w-6 h-6" />; 
    } else if (lowercaseName.includes('appliance') || lowercaseName.includes('tech') || lowercaseName.includes('device') || lowercaseName.includes('أجهز')) {
      icon = <FiCpu className="w-6 h-6" />;
    } else if (lowercaseName.includes('carpentr') || lowercaseName.includes('wood') || lowercaseName.includes('نجار')) {
      icon = <FiHome className="w-6 h-6" />;
    } else if (lowercaseName.includes('clean') || lowercaseName.includes('wash') || lowercaseName.includes('نظاف')) {
      icon = <MdOutlineCleaningServices className="w-6 h-6" />;
    } else if (lowercaseName.includes('blacksmith') || lowercaseName.includes('iron') || lowercaseName.includes('حداد')) {
      icon = <MdConstruction className="w-6 h-6" />;
    } else if (lowercaseName.includes('tool') || lowercaseName.includes('fix') || lowercaseName.includes('صيان')) {
      icon = <FiTool className="w-6 h-6" />;
    } else {
      // إذا لم يطابق أي كلمة مفتاحية، نختار أيقونة إعدادات عامة كشكل جمالي
      icon = <FiSettings className="w-6 h-6" />;
    }

    // 2. اختيار لون من القائمة الملونة بالتناوب بناءً على الـ index لضمان عدم تكرار الألوان المتجاورة
    const color = vibrantColors[index % vibrantColors.length];

    return { icon, color };
  };

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetchSpecialties();
        
        if (response && response.isSuccess && Array.isArray(response.data)) {
          const formattedData = response.data.map((item, index) => {
            const style = getRelatableStyle(item.name, index);
            return {
              id: item.id,
              title: item.name,
              icon: style.icon,
              color: style.color
            };
          });
          setCategories(formattedData);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("خطأ في تحميل الخدمات:", error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  const handleCategoryClick = (categoryId, categoryTitle) => {
    // توجيه المستخدم إلى صفحة الفنيين مع تمرير التخصص المختار في الـ state
    navigate('/client/workers', { state: { selectedProfession: categoryTitle } });
    console.log(`تم اختيار تخصص: ${categoryTitle} ذو الرقم: ${categoryId}`);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/30 p-4 sm:p-6 lg:p-8 font-sans" dir="rtl">
      
      <div className="w-full bg-[#0086ff] rounded-2xl p-6 sm:p-10 lg:p-12 mb-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="text-right space-y-3 z-10 max-w-xl">
          <span className="text-white/90 text-2xl sm:text-3xl lg:text-4xl font-black tracking-wide block">Servixa</span>
          <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
            كل خدمات الصيانة.. بضغطة زر واحدة
          </h1>
          <p className="text-blue-50/80 text-xs sm:text-sm font-medium leading-relaxed">
            اختر المحترف الأنسب لمشكلتك من بين مئات الفنيين الموثقين في منطقتك. نضمن لك الجودة والسرعة في كل عملية صيانة.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-center shrink-0 w-full md:w-auto mt-4 md:mt-0">
          <div className="flex -space-x-6 space-x-reverse">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white/10 backdrop-blur-sm p-1 border border-white/20 shadow-lg rotate-[-6deg] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=200" 
                alt="Technician 1" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white p-1 border border-white/30 shadow-xl rotate-[6deg] overflow-hidden relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=200" 
                alt="Technician 2" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between px-1">
        <h2 className="text-lg sm:text-xl font-black text-slate-800">الفئات</h2>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <svg className="animate-spin h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-sm font-medium text-gray-500">جاري تحميل الخدمات الفعّالة...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => handleCategoryClick(category.id, category.title)}
              className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center text-center gap-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-200 group relative overflow-hidden min-h-[140px]"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-200 group-hover:scale-110 ${category.color}`}>
                {category.icon}
              </div>
              
              <h3 className="text-base font-bold text-slate-800 transition-colors group-hover:text-[#0086ff]">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Services;