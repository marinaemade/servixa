import React, { useState } from 'react'
import { HiOutlineChevronDown, HiArrowLeft } from 'react-icons/hi'
import { IoCloudUploadOutline, IoClose } from 'react-icons/io5'
import { GoCheckCircleFill } from 'react-icons/go'
import { FiMapPin } from 'react-icons/fi' // تم استيراد أيقونة الموقع المطابقة للتصميم

const ServiceRequestForm = () => {
  // State management for form data and image previews
  const [budget, setBudget] = useState('')
  const [address, setAddress] = useState('') // State لإدخال نص العنوان
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400'
  ])

  // Image upload selection utility
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImageUrls = files.map(file => URL.createObjectURL(file))
    setImages([...images, ...newImageUrls])
  }

  // دالة وهمية لتحديد الموقع الحالي
  const handleGetCurrentLocation = () => {
    // يمكنك دمج الـ Geolocation API هنا لاحقاً
    setAddress('جاري تحديد موقعك الحالي...')
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white min-h-screen md:min-h-0 md:my-4 md:rounded-lg overflow-hidden" dir="rtl" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Header */}
      <div className="relative flex items-center justify-center py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-[#0086ff]">طلب خدمة</h1>
      </div>

      <div className="p-4 space-y-5">
        
        {/* Field 1: Title / Problem */}
        <div className="space-y-1.5">
          <label className="block text-right text-lg font-bold text-[#374151]">اية المشكلة</label>
          <input
            type="text"
            placeholder="اكتب اية المشكلة مثل تسريب مياة"
            className="w-full px-4 py-3 bg-[#fafafa] border border-gray-300 rounded-xl text-right text-gray-800 placeholder-[#9ca3af] focus:outline-none focus:border-[#0086ff] text-sm"
          />
        </div>

        {/* Field 2: Description */}
        <div className="space-y-1.5">
          <label className="block text-right text-lg font-bold text-[#374151]">الوصف</label>
          <textarea
            placeholder="اكتب تفاصيل المشكلة وكل معلومة سيحتاجها الفني..."
            rows={5}
            className="w-full px-4 py-3 bg-[#fafafa] border border-gray-300 rounded-xl text-right text-gray-800 placeholder-[#9ca3af] focus:outline-none focus:border-[#0086ff] text-sm resize-none"
          />
        </div>

        {/* New Field: Location Picker (الموقع والعنوان من الصورة المرفقة) */}
        <div className="border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm bg-white space-y-4">
          {/* العنوان مع الأيقونة */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#374151]">العنوان</h3>
            <div className="w-9 h-9 bg-blue-50/60 rounded-full flex items-center justify-center text-[#0086ff]">
              <FiMapPin className="w-5 h-5" />
            </div>
          </div>

          {/* حقل إدخال العنوان التوضيحي */}
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="مثال: الرياض، حي النرجس"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-right text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0086ff] text-sm"
          />

          {/* خريطة ثابتة توضيحية مع مؤشر السنتر */}
          <div className="w-full h-32 sm:h-40 rounded-2xl overflow-hidden relative border border-gray-100 shadow-inner">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600" 
              alt="Map placeholder" 
              className="w-full h-full object-cover opacity-60 grayscale-[30%]"
            />
            {/* مؤشر الخريطة الدائري الأزرق من التصميم */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-6 h-6 bg-[#0086ff] rounded-full border-4 border-white shadow-md flex items-center justify-center animate-pulse">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* زر تحديد العنوان الحالي */}
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            className="w-full bg-[#0086ff] hover:bg-[#0074dd] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm text-sm"
          >
            <FiMapPin className="w-4 h-4" />
            <span>تحديد العنوان الحالي</span>
          </button>
        </div>

        {/* Field 3: Budget Selection */}
        <div className="space-y-2">
          <label className="block text-lg font-bold text-gray-700">تحديد المبلغ</label>
          <div className="relative">
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-4 py-3.5 bg-[#fafafa] border border-gray-200 rounded-xl text-right text-gray-500 appearance-none focus:outline-none focus:border-[#0086ff] transition-colors cursor-pointer text-sm"
            >
              <option value="" disabled hidden>حدد الميزانية التقديرية</option>
              <option value="100-500">100 - 500 جنيه</option>
              <option value="500-1000">500 - 1000 جنيه</option>
              <option value="1000+">أكثر من 1000 جنيه</option>
            </select>
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
              <HiOutlineChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Field 4: Images Grid */}
        <div className="space-y-2">
          <label className="block text-lg font-bold text-gray-700">الصور</label>
          
          <div className="grid grid-cols-3 gap-3">
            {/* Upload Box Container */}
            <label className="relative flex flex-col items-center justify-center aspect-[4/3] border-2 border-dashed border-[#0086ff] bg-[#edf5ff] rounded-xl cursor-pointer hover:bg-[#e1eefd] transition-colors p-2 text-center">
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload} 
              />
              <IoCloudUploadOutline className="w-7 h-7 text-[#0086ff] mb-1" />
              <span className="text-xs sm:text-sm font-bold text-[#0086ff] block">اضغط لاضافة الملفات</span>
              <span className="text-[9px] text-gray-400 mt-0.5 hidden sm:block">(حد أقصى 100 MB)</span>
            </label>

            {/* Previews */}
            {images.map((src, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-gray-100">
                <img 
                  src={src} 
                  alt={`preview-${index}`} 
                  className="w-full h-full object-cover"
                />
                <button 
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <IoClose className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#0086ff] hover:bg-[#0074dd] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors mt-6 shadow-sm text-base"
        >
          <span className="font-semibold">ارسال الطلب</span>
          <HiArrowLeft className="w-5 h-5" />
        </button>

        {/* Bottom Warning Alert Panel */}
        <div className="bg-[#fff9e6] rounded-xl p-3.5 flex items-start justify-between border border-[#ffeeba] mt-4">
          <p className="text-[11px] text-[#1f2937] leading-relaxed font-medium text-right flex-1">
            يرجى التأكد من توفر رصيد في محفظتك يغطي الحد الأقصى لميزانية الخدمة (600 جنيه) لضمان جدية الطلب وحفظ حقوق الطرفين.
          </p>
          <GoCheckCircleFill className="w-4 h-4 text-gray-800 shrink-0 mr-2 mt-0.5" />
        </div>

      </div>
    </div>
  )
}

export default ServiceRequestForm