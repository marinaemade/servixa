import React, { useState, useEffect, useCallback } from 'react';
import { FiSearch, FiBriefcase, FiMapPin, FiStar, FiSliders, FiAlertCircle, FiUser } from 'react-icons/fi';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';
import { getAllSpecialties } from '../../../api/specialtyService';
import { getWorkersBySpecialty } from '../../../api/workerService';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Workers = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(searchParams.get('specialtyId') ?? '');
  const [selectedRating, setSelectedRating] = useState(0);
  const [distance, setDistance] = useState(50);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Data states
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load specialties for the filter dropdown
  useEffect(() => {
    getAllSpecialties()
      .then((res) => {
        const data = res.data?.data ?? res.data ?? [];
        setSpecialties(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
  }, []);

  // Load workers whenever specialty filter changes
  const fetchWorkers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let res;
      if (selectedSpecialtyId) {
        res = await getWorkersBySpecialty(selectedSpecialtyId);
      } else {
        // fallback: fetch all by getting a generic broad specialty id or use nearby without geolocation
        res = await getWorkersBySpecialty(0).catch(() => ({ data: { data: [] } }));
      }
      const raw = res.data?.data ?? res.data ?? [];
      setWorkers(Array.isArray(raw) ? raw : []);
    } catch (err) {
      setError(err.message || 'فشل تحميل الفنيين');
    } finally {
      setLoading(false);
    }
  }, [selectedSpecialtyId]);

  useEffect(() => { fetchWorkers(); }, [fetchWorkers]);

  // Client-side search filter
  const filtered = workers.filter((w) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      w.fullName?.toLowerCase().includes(term) ||
      w.firstName?.toLowerCase().includes(term) ||
      w.lastName?.toLowerCase().includes(term) ||
      w.specialty?.toLowerCase().includes(term)
    );
  });

  // Rating filter
  const ratingFiltered = selectedRating > 0
    ? filtered.filter((w) => Math.round(w.averageRating ?? w.rating ?? 0) >= selectedRating)
    : filtered;

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-sans" dir="rtl">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-black text-slate-800">الفنيين</h1>
          <span className="bg-blue-50 text-[#0086ff] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-blue-100">
            <HiOutlineWrenchScrewdriver className="w-3.5 h-3.5" />
            {ratingFiltered.length} فني
          </span>
        </div>
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden bg-white border border-gray-200 p-2.5 rounded-xl text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-sm font-bold"
        >
          <FiSliders className="w-4 h-4 text-[#0086ff]" />
          <span>تصفية</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

        {/* Filters Sidebar */}
        <div className={`
          bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-6 lg:block
          ${showMobileFilters ? 'block fixed inset-x-4 top-20 z-50 shadow-2xl border-blue-100' : 'hidden'}
          lg:sticky lg:top-6
        `}>
          <div className="flex items-center justify-between lg:hidden border-b pb-3 mb-2">
            <h3 className="font-bold text-slate-800">خيارات التصفية</h3>
            <button onClick={() => setShowMobileFilters(false)} className="text-xs text-red-500 font-bold">إغلاق</button>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">البحث</label>
            <div className="relative">
              <input
                type="text"
                placeholder="اسم الفني..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-right text-sm focus:outline-none focus:border-[#0086ff]"
              />
              <FiSearch className="absolute inset-y-0 right-3.5 my-auto text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Specialty */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">التخصص</label>
            <select
              value={selectedSpecialtyId}
              onChange={(e) => setSelectedSpecialtyId(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-right text-sm focus:outline-none focus:border-[#0086ff] cursor-pointer"
            >
              <option value="">الكل</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>{s.name ?? s.title}</option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">أدنى تقييم</label>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <label key={stars} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array(5).fill(0).map((_, i) => (
                      <FiStar key={i} className={`w-4 h-4 ${i < stars ? 'fill-amber-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === stars}
                    onChange={() => setSelectedRating(stars)}
                    className="w-4 h-4 rounded border-gray-300 text-[#0086ff] focus:ring-[#0086ff]"
                  />
                </label>
              ))}
              {selectedRating > 0 && (
                <button
                  onClick={() => setSelectedRating(0)}
                  className="text-xs text-red-400 hover:text-red-600 font-bold w-full text-right"
                >
                  إزالة فلتر التقييم
                </button>
              )}
            </div>
          </div>

          {/* Distance */}
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
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:col-span-3">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm animate-pulse flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full bg-slate-200" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="h-10 bg-slate-100 rounded-xl w-full" />
              </div>
            ))
          ) : error ? (
            <div className="lg:col-span-3 flex flex-col items-center justify-center gap-3 py-16 text-center">
              <FiAlertCircle className="w-10 h-10 text-red-400" />
              <p className="text-red-500 font-bold">{error}</p>
              <button onClick={fetchWorkers} className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600">
                إعادة المحاولة
              </button>
            </div>
          ) : ratingFiltered.length === 0 ? (
            <div className="lg:col-span-3 flex flex-col items-center justify-center gap-3 py-16 text-center">
              <HiOutlineWrenchScrewdriver className="w-12 h-12 text-gray-300" />
              <p className="text-gray-400 font-bold">لا يوجد فنيون مطابقون للبحث</p>
            </div>
          ) : (
            ratingFiltered.map((worker) => {
              const name = worker.fullName
                ?? `${worker.firstName ?? ''} ${worker.lastName ?? ''}`.trim()
                ?? 'فني';
              const rating = Math.round(worker.averageRating ?? worker.rating ?? 0);
              return (
                <div
                  key={worker.id}
                  className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-between text-center transition-all hover:shadow-md group"
                >
                  {/* Avatar */}
                  <div className="w-24 h-24 rounded-full bg-slate-100 relative border-2 border-white shadow-sm mb-4 flex items-center justify-center overflow-hidden">
                    {worker.profileImageUrl ? (
                      <img
                        src={worker.profileImageUrl}
                        alt={name}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => (e.target.style.display = 'none')}
                      />
                    ) : (
                      <FiUser className="w-10 h-10 text-slate-400" />
                    )}
                    {worker.isApproved && (
                      <span className="absolute bottom-1 right-1 w-5 h-5 bg-blue-500 text-white rounded-full text-[10px] flex items-center justify-center border-2 border-white font-bold shadow-sm">✓</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-1 w-full">
                    <h3 className="text-base font-black text-slate-800 break-all px-2">{name}</h3>
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-400 font-bold py-1">
                      <span className="flex items-center gap-1">
                        <FiBriefcase className="w-3.5 h-3.5 text-gray-400" />
                        {worker.specialty ?? worker.specialtyName ?? '—'}
                      </span>
                      {worker.city && (
                        <>
                          <span className="text-gray-200">•</span>
                          <span className="flex items-center gap-1">
                            <FiMapPin className="w-3.5 h-3.5 text-gray-400" />
                            {worker.city}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-0.5 text-amber-400 pt-1 pb-4">
                      {Array(5).fill(0).map((_, i) => (
                        <FiStar key={i} className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => navigate(`/client/workers/${worker.id}`)}
                    className="w-full bg-[#0086ff] hover:bg-[#0074dd] text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-sm mt-2"
                  >
                    عرض الملف الشخصي
                  </button>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};

export default Workers;