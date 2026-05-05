import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthNavbar from './../../components/layout/auth-navbar/AuthNavbar';
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const emptyRegion = () => ({ governorate: "", city: "", range: "" });

const ScopeOfWork = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([emptyRegion()]);

  const handleChange = (index, field, value) => {
    setRegions((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  const addRegion = () => setRegions((prev) => [...prev, emptyRegion()]);

  const removeRegion = (index) =>
    setRegions((prev) => prev.filter((_, i) => i !== index));

  const inputClass =
    "w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#1093ED] focus:ring-1 focus:ring-[#1093ED] text-gray-700 placeholder-gray-400 transition-all text-sm";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 font-sans" dir="rtl">
      <AuthNavbar/>
      {/* Progress Bar — Step 4 of 4 */}
      <div className=" mt-14 w-full max-w-5xl mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[#1093ED] font-bold text-sm">الخطوة 4 من 4</span>
          <span className="text-gray-400 text-sm">تحديد نطاق العمل</span>
        </div>
        <div className="flex gap-2 h-1.5">
          <div className="flex-1 bg-[#1093ED] rounded-full"></div>
          <div className="flex-1 bg-[#1093ED] rounded-full"></div>
          <div className="flex-1 bg-[#1093ED] rounded-full"></div>
          <div className="flex-1 bg-[#1093ED] rounded-full"></div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[45px] shadow-sm border border-gray-100 w-full max-w-5xl p-8 md:p-14 relative">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            نطاق <span className="text-[#1093ED]">العمل</span>
          </h1>
          <p className="text-gray-700 text-lg font-bold">أين يمكنك تقديم خدماتك؟</p>
        </div>

        {/* Regions */}
        <div className="space-y-6 mb-6">
          {regions.map((region, index) => (
            <div key={index} className="relative">

              {/* Remove button — only show for extra regions */}
              {index > 0 && (
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => removeRegion(index)}
                    className="flex items-center gap-1 text-red-400 hover:text-red-600 text-xs font-bold transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>حذف المنطقة</span>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Governorate */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-600 mr-2">المحافظة</label>
                  <input
                    value={region.governorate}
                    onChange={(e) => handleChange(index, "governorate", e.target.value)}
                    className={inputClass}
                    placeholder="أدخل المحافظة"
                  />
                </div>

                {/* City / District */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-600 mr-2">المدينة/الحي</label>
                  <input
                    value={region.city}
                    onChange={(e) => handleChange(index, "city", e.target.value)}
                    className={inputClass}
                    placeholder="أدخل المدينة أو الحي"
                  />
                </div>

                {/* Work Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-600 mr-2">نطاق العمل</label>
                  <input
                    value={region.range}
                    onChange={(e) => handleChange(index, "range", e.target.value)}
                    className={inputClass}
                    placeholder="مثال: 10 كم"
                  />
                  <p className="text-[10px] text-gray-400 mr-2 leading-relaxed">
                    كم تبعد المسافة القصوى التي يمكنك السفر إليها لتقديم الخدمة؟
                  </p>
                </div>

              </div>

              {/* Divider between regions */}
              {index < regions.length - 1 && (
                <div className="mt-6 border-t border-dashed border-gray-200"></div>
              )}
            </div>
          ))}
        </div>

        {/* Add Region */}
        <div className="flex justify-start mb-16">
          <button
            onClick={addRegion}
            className="flex items-center gap-2 text-[#1093ED] font-bold hover:opacity-80 transition-opacity"
          >
            <PlusCircleIcon className="w-6 h-6" />
            <span>إضافة منطقة أخرى</span>
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/LastStep")}
            className="bg-[#1093ED] text-white px-16 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all"
          >
            <span>حفظ ومتابعة</span>
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ScopeOfWork;