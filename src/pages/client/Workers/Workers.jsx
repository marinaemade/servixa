import React, { useState } from 'react';
import { FiSearch, FiBriefcase, FiMapPin, FiStar, FiSliders } from 'react-icons/fi';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';

const Workers = () => {
  // الحالات الخاصة بالفلترة (التحكم بالواجهة)
  const [searchTerm, setSearchTerm] = useState('');
  const [profession, setProfession] = useState('الكل');
  const [selectedRating, setSelectedRating] = useState(5);
  const [distance, setDistance] = useState(50);
  const [isAvailable, setIsAvailable] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // مصفوفة الفنيين للمحاكاة بناءً على الصورة
  const workersData = Array(6).fill({
    id: 1,
    name: 'خالد عبد الرحمن',
    profession: 'سباك',
    location: 'العنوان',
    rating: 5,
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
  });

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-sans" dir="rtl">
      
      {/* العنوان العلوي مع شارة العدد */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-black text-slate-800">الفنيين</h1>
          <span className="bg-blue-50 text-[#0086ff] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-blue-100">
            <HiOutlineWrenchScrewdriver className="w-3.5 h-3.5" />
            24 فني
          </span>
        </div>

        {/* زر الفلترة للشاشات الصغيرة فقط */}
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden bg-white border border-gray-200 p-2.5 rounded-xl text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-sm font-bold"
        >
          <FiSliders className="w-4 h-4 text-[#0086ff]" />
          <span>تصفية</span>
        </button>
      </div>

      {/* الهيكل الرئيسي المقسم إلى جزأين */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* 1. لوحة الفلترة والتصفية الجانبية (شاشات كبيرة + منبثقة للصغيرة) */}
        <div className={`
          bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-6 lg:block
          ${showMobileFilters ? 'block fixed inset-x-4 top-20 z-50 shadow-2xl border-blue-100 animate-in fade-in zoom-in-95' : 'hidden'}
          lg:sticky lg:top-6
        `}>
          <div className="flex items-center justify-between lg:hidden border-b pb-3 mb-2">
            <h3 className="font-bold text-slate-800">خيارات التصفية</h3>
            <button onClick={() => setShowMobileFilters(false)} className="text-xs text-red-500 font-bold">إغلاق</button>
          </div>

          {/* البحث */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">البحث</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="البحث"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-right text-sm focus:outline-none focus:border-[#0086ff]"
              />
              <FiSearch className="absolute inset-y-0 right-3.5 my-auto text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* المهنة */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">المهنة</label>
            <select 
              value={profession} 
              onChange={(e) => setProfession(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-right text-sm focus:outline-none focus:border-[#0086ff] cursor-pointer"
            >
              <option value="الكل">الكل</option>
              <option value="سباك">سباك</option>
              <option value="كهربائي">كهربائي</option>
              <option value="نجار">نجار</option>
            </select>
          </div>

          {/* التقييم */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">التقييم</label>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <label key={stars} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array(5).fill(0).map((_, i) => (
                      <FiStar key={i} className={`w-4 h-4 ${i < stars ? 'fill-amber-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={selectedRating === stars}
                    onChange={() => setSelectedRating(stars)}
                    className="w-4 h-4 rounded border-gray-300 text-[#0086ff] focus:ring-[#0086ff]" 
                  />
                </label>
              ))}
            </div>
          </div>

          {/* المسافة */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold">
              <span className="text-slate-700 flex items-center gap-1">
                <FiMapPin className="w-3.5 h-3.5 text-gray-400" /> المسافة
              </span>
              <span className="bg-blue-50 text-[#0086ff] px-2 py-0.5 rounded text-xs">{distance} كم</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="100" 
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0086ff]" 
            />
          </div>

          {/* متاح الآن */}
          <label className="flex items-center justify-between pt-2 cursor-pointer border-t border-gray-50">
            <span className="text-sm font-bold text-slate-700">متاح الآن</span>
            <input 
              type="checkbox" 
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#0086ff] focus:ring-[#0086ff]" 
            />
          </label>
        </div>

        {/* 2. شبكة عرض كروت الفنيين (Grid Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:col-span-3">
          {workersData.map((worker, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-between text-center transition-all hover:shadow-md group"
            >
              {/* الصورة والتوثيق */}
              <div className="w-24 h-24 rounded-full bg-slate-100 relative border-2 border-white shadow-sm mb-4">
                <img 
                  src={worker.image} 
                  alt={worker.name} 
                  className="w-full h-full object-cover rounded-full"
                />
                {worker.isVerified && (
                  <span className="absolute bottom-1 right-1 w-5 h-5 bg-blue-500 text-white rounded-full text-[10px] flex items-center justify-center border-2 border-white font-bold shadow-sm">✓</span>
                )}
              </div>

              {/* الاسم والمعلومات الأساسية */}
              <div className="space-y-1 w-full">
                <h3 className="text-base font-black text-slate-800 break-all px-2">{worker.name}</h3>
                
                <div className="flex items-center justify-center gap-4 text-xs text-gray-400 font-bold py-1">
                  <span className="flex items-center gap-1">
                    <FiBriefcase className="w-3.5 h-3.5 text-gray-400" />
                    {worker.profession}
                  </span>
                  <span className="text-gray-200">•</span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-3.5 h-3.5 text-gray-400" />
                    {worker.location}
                  </span>
                </div>

                {/* النجوم والتقييم */}
                <div className="flex items-center justify-center gap-0.5 text-amber-400 pt-1 pb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* زر عرض الملف الشخصي */}
              <button className="w-full bg-[#0086ff] hover:bg-[#0074dd] text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-sm mt-2">
                عرض الملف الشخصي
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Workers;