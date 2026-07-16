import React, { useEffect, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import {
  FiTool,
  FiZap,
  FiWind,
  FiCpu,
  FiScissors
} from 'react-icons/fi';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { getAllSpecialties } from '../../../api/specialtyService';
import { useNavigate } from 'react-router-dom';

// Default icon mapping by specialty name (Arabic keywords)
const getIcon = (name = '') => {
  const n = name.toLowerCase();
  if (n.includes('سباك') || n.includes('plumb')) return <FiTool className="w-6 h-6" />;
  if (n.includes('كهرب') || n.includes('electr')) return <FiZap className="w-6 h-6" />;
  if (n.includes('تكييف') || n.includes('air')) return <FiWind className="w-6 h-6" />;
  if (n.includes('نظاف') || n.includes('clean')) return <MdOutlineCleaningServices className="w-6 h-6" />;
  if (n.includes('أجهزة') || n.includes('device') || n.includes('appliance')) return <FiCpu className="w-6 h-6" />;
  return <FiScissors className="w-6 h-6" />;
};

const colorPalette = [
  'text-blue-600 bg-blue-50/60 border-blue-100',
  'text-amber-500 bg-amber-50/60 border-amber-100',
  'text-cyan-500 bg-cyan-50/60 border-cyan-100',
  'text-purple-500 bg-purple-50/60 border-purple-100',
  'text-emerald-500 bg-emerald-50/60 border-emerald-100',
  'text-slate-500 bg-slate-50/60 border-slate-100',
  'text-orange-500 bg-orange-50/60 border-orange-100',
  'text-green-500 bg-green-50/60 border-green-100',
  'text-pink-500 bg-pink-50/60 border-pink-100',
  'text-indigo-500 bg-indigo-50/60 border-indigo-100',
];

const Services = () => {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllSpecialties()
      .then((res) => {
        const data = res.data?.data ?? res.data ?? [];
        setSpecialties(Array.isArray(data) ? data : []);
      })
      .catch((err) => setError(err.message || 'فشل تحميل الخدمات'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-50/30 p-4 sm:p-6 lg:p-8 font-sans" dir="rtl">

      {/* Hero Banner */}
      <div className="w-full bg-[#0086ff] rounded-2xl p-6 sm:p-10 lg:p-12 mb-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
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
              <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=200" alt="Technician 1" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white p-1 border border-white/30 shadow-xl rotate-[6deg] overflow-hidden relative z-10">
              <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=200" alt="Technician 2" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="mb-6 flex items-center justify-between px-1">
        <h2 className="text-lg sm:text-xl font-black text-slate-800">الفئات</h2>
      </div>

      {/* Error */}
      {error && (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <FiAlertCircle className="w-10 h-10 text-red-400" />
          <p className="text-red-500 font-bold">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600">إعادة المحاولة</button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm animate-pulse min-h-[140px] flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-slate-200 rounded-xl" />
              <div className="h-4 bg-slate-200 rounded w-24" />
            </div>
          ))}
        </div>
      )}

      {/* Specialties Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {specialties.length === 0 ? (
            <div className="col-span-3 text-center text-gray-400 py-12 font-bold">لا توجد فئات متاحة</div>
          ) : (
            specialties.map((specialty, idx) => {
              const color = colorPalette[idx % colorPalette.length];
              return (
                <div
                  key={specialty.id}
                  onClick={() => navigate(`/client/workers?specialtyId=${specialty.id}`)}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center text-center gap-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-200 group relative overflow-hidden min-h-[140px]"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-200 group-hover:scale-110 ${color}`}>
                    {getIcon(specialty.name ?? specialty.title)}
                  </div>
                  <h3 className="text-base font-bold text-slate-800 transition-colors group-hover:text-[#0086ff]">
                    {specialty.name ?? specialty.title}
                  </h3>
                  {specialty.workerCount != null && (
                    <span className="text-xs text-gray-400">{specialty.workerCount} فني</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Services;