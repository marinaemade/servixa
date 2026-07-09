import React from 'react';
import { 
  FiTool, 
  FiZap, 
  FiWind, 
//   FiPaintbrush, 
  FiCpu, 
//   FiHammer, 
  FiScissors 
} from 'react-icons/fi';
import { MdOutlineCleaningServices } from 'react-icons/md';

const Services = () => {
  const categories = [
    { id: 1, title: 'سباكة', icon: <FiTool className="w-6 h-6" />, color: 'text-blue-600 bg-blue-50/60 border-blue-100' },
    { id: 2, title: 'كهرباء', icon: <FiZap className="w-6 h-6" />, color: 'text-amber-500 bg-amber-50/60 border-amber-100' },
    { id: 3, title: 'تكييف', icon: <FiWind className="w-6 h-6" />, color: 'text-cyan-500 bg-cyan-50/60 border-cyan-100' },
    { id: 4, title: 'نقاشة', icon: <FiScissors className="w-6 h-6" />, color: 'text-purple-500 bg-purple-50/60 border-purple-100' },
    { id: 5, title: 'أجهزة منزلية', icon: <FiCpu className="w-6 h-6" />, color: 'text-emerald-500 bg-emerald-50/60 border-emerald-100' },
    { id: 6, title: 'حدادة', icon: <FiScissors className="w-6 h-6" />, color: 'text-slate-500 bg-slate-50/60 border-slate-100' },
    { id: 7, title: 'نجارة', icon: <FiScissors className="w-6 h-6 rotate-90" />, color: 'text-orange-500 bg-orange-50/60 border-orange-100' },
    { id: 8, title: 'نظافة', icon: <MdOutlineCleaningServices className="w-6 h-6" />, color: 'text-green-500 bg-green-50/60 border-green-100' },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50/30 p-4 sm:p-6 lg:p-8 font-sans" dir="rtl">
      
      <div className="w-full bg-[#0086ff] rounded-2xl p-6 sm:p-10 lg:p-12 mb-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        
        {/* النصوص التوضيحية */}
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

      {/* العنوان الجانبي للفئات */}
      <div className="mb-6 flex items-center justify-between px-1">
        <h2 className="text-lg sm:text-xl font-black text-slate-800">الفئات</h2>
      </div>

      {/* 2. شبكة عرض الفئات (Grid Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center text-center gap-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-200 group relative overflow-hidden min-h-[140px]"
          >
            {/* الأيقونة الدائرية داخل الكارت */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-200 group-hover:scale-110 ${category.color}`}>
              {category.icon}
            </div>
            
            {/* اسم الفئة */}
            <h3 className="text-base font-bold text-slate-800 transition-colors group-hover:text-[#0086ff]">
              {category.title}
            </h3>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Services;