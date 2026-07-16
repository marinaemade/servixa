import React, { useState } from 'react'
import { HiOutlineChevronDown, HiArrowLeft } from 'react-icons/hi'
import { IoCloudUploadOutline, IoClose } from 'react-icons/io5'
import { GoCheckCircleFill } from 'react-icons/go'
import { FiMapPin } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom' 
// استيراد دالة الـ API التي قمنا بإنشائها
import { createTask } from '../../api/TaskApi' 

const ServiceRequestForm = () => {
  const navigate = useNavigate()

  // الـ States الخاصة بالـ API
  const [name, setName] = useState('')
  const [avgCost, setAvgCost] = useState('')
  const [avgTime, setAvgTime] = useState('')
  const [specialtyId, setSpecialtyId] = useState('') 
  const [description, setDescription] = useState('') 

  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400'
  ])

  // التخصصات المتاحة لعرضها بشكل صديق للمستخدم بدلاً من أرقام مبهمة
  const specialtiesList = [
    { id: 1, name: 'سباكة' },
    { id: 2, name: 'نجارة' },
    { id: 3, name: 'كهرباء' },
    { id: 4, name: 'نقاشة' },
    { id: 5, name: 'تكييف' },
    { id: 6, name: 'ديكور' },
    { id: 7, name: 'نظافة' },
    { id: 8, name: 'حدادة' },
    { id: 9, name: 'أجهزة منزلية' },
  ]

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImageUrls = files.map(file => URL.createObjectURL(file))
    setImages([...images, ...newImageUrls])
  }

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !avgCost || !avgTime || !specialtyId) {
      alert('يرجى ملء جميع الحقول المطلوبة المميزة بنجمة (*)')
      return
    }

    setIsLoading(true)

    // تجهيز البيانات المطابقة تماماً لـ CreateTaskDto
    const payload = {
      name: name,
      avgCost: parseFloat(avgCost),
      avgTime: parseInt(avgTime, 10),
      specialtyId: parseInt(specialtyId, 10)
    }

    try {
      //sending data
      const success = await createTask(payload)

      if (success) {
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
          navigate('/client/projects')
        }, 2000)
      }
    } catch (error) {
      console.error('Error post task:', error)
      alert(error.message || 'فشل الاتصال بالخادم. تأكد من اتصالك بالإنترنت.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        
        {/* العنوان الرئيسي */}
        <div className="flex items-center justify-center mb-8 pb-4 border-b border-gray-100">
          <h1 className="text-2xl text-center font-bold text-blue-600">طلب خدمة جديدة</h1>
        </div>

        {/* نموذج الإدخال */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* اسم الخدمة/المهمة */}
          <div className="space-y-1.5">
            <label className="block text-right text-lg font-bold text-[#374151]">اسم الخدمة المطلوبة *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: تصليح صنبور مياه، تركيب إضاءة..."
              className="w-full px-4 py-3 bg-[#fafafa] border border-gray-300 rounded-xl text-right text-gray-800 placeholder-[#9ca3af] focus:outline-none focus:border-[#0086ff] focus:ring-1 focus:ring-[#0086ff] text-sm transition"
            />
          </div>

          {/* حقل الوصف */}
          <div className="space-y-1.5">
            <label className="block text-right text-lg font-bold text-[#374151]">الوصف</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب تفاصيل المشكلة وكل معلومة سيحتاجها الفني..."
              rows={5}
              className="w-full px-4 py-3 bg-[#fafafa] border border-gray-300 rounded-xl text-right text-gray-800 placeholder-[#9ca3af] focus:outline-none focus:border-[#0086ff] focus:ring-1 focus:ring-[#0086ff] text-sm resize-none transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* التكلفة المتوقعة */}
            <div className="space-y-1.5">
              <label className="block text-right text-lg font-bold text-[#374151]">التكلفة التقريبية *</label>
              <div className="relative">
                <input
                  type="number"
                  required
                  value={avgCost}
                  onChange={(e) => setAvgCost(e.target.value)} // تم تعديلها لتغير الحالة الصحيحة
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-[#fafafa] border border-gray-300 rounded-xl text-right text-gray-800 placeholder-[#9ca3af] focus:outline-none focus:border-[#0086ff] focus:ring-1 focus:ring-[#0086ff] text-sm transition pl-12"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">ج.م</span>
              </div>
            </div>

            {/* الوقت المتوقع بالدقائق */}
            <div className="space-y-1.5">
              <label className="block text-right text-lg font-bold text-[#374151]">الوقت المتوقع بالساعات *</label>
              <input
                type="number"
                required
                value={avgTime}
                onChange={(e) => setAvgTime(e.target.value)}
                placeholder="مثال: 2"
                className="w-full px-4 py-3 bg-[#fafafa] border border-gray-300 rounded-xl text-right text-gray-800 placeholder-[#9ca3af] focus:outline-none focus:border-[#0086ff] focus:ring-1 focus:ring-[#0086ff] text-sm transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* نوع الخدمة (Specialty ID Dropdown) */}
            <div className="space-y-1.5">
              <label className="block text-right text-lg font-bold text-[#374151]">نوع الخدمة (التخصص) *</label>
              <div className="relative">
                <select
                  required
                  value={specialtyId}
                  onChange={(e) => setSpecialtyId(e.target.value)}
                  className="w-full px-4 py-3 bg-[#fafafa] border border-gray-300 rounded-xl text-right text-gray-800 focus:outline-none focus:border-[#0086ff] focus:ring-1 focus:ring-[#0086ff] text-sm transition appearance-none cursor-pointer pl-10"
                >
                  <option value="" disabled>اختر نوع الخدمة...</option>
                  {specialtiesList.map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      {spec.name}
                    </option>
                  ))}
                </select>
                <HiOutlineChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
              </div>
            </div>

            {/* العنوان */}
            <div className="space-y-1.5">
              <label className="block text-right text-lg font-bold text-[#374151]">العنوان بالتفصيل</label>
              <div className="relative">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="شارع التسعين، التجمع الخامس"
                  className="w-full pr-10 pl-4 py-3 bg-[#fafafa] border border-gray-300 rounded-xl text-right text-gray-800 placeholder-[#9ca3af] focus:outline-none focus:border-[#0086ff] focus:ring-1 focus:ring-[#0086ff] text-sm transition"
                />
                <FiMapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* رفع وتوضيح المشكلة بالصور */}
          <div className="space-y-2">
            <label className="block text-right text-lg font-bold text-[#374151]">أرفق صوراً توضيحية للمشكلة</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* زر الرفع */}
              <label className="border-2 border-dashed border-gray-200 hover:border-blue-500 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition h-28 bg-[#fafafa] hover:bg-blue-50">
                <IoCloudUploadOutline className="w-8 h-8 text-blue-500 mb-1" />
                <span className="text-xs font-semibold text-gray-600">رفع صورة</span>
                <input type="file" multiple onChange={handleImageUpload} className="hidden" accept="image/*" />
              </label>

              {/* معاينة الصور المرفوعة */}
              {images.map((img, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden h-28 border border-gray-100">
                  <img src={img} alt="preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-90 hover:opacity-100 transition shadow"
                  >
                    <IoClose className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* زر التقديم والإرسال */}
          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-white transition flex items-center justify-center gap-2 ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>جاري الإرسال...</span>
                </>
              ) : (
                'تأكيد ونشر طلب الخدمة'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* نافذة النجاح المنبثقة (Success Modal) */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl transform scale-100 transition-all">
            <div className="flex justify-center mb-4">
              <GoCheckCircleFill className="w-16 h-16 text-emerald-500 animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">عملية ناجحة</h3>
            <p className="text-gray-600 mb-4">تم إضافة طلب خدمة بنجاح!</p>
            <p className="text-xs text-gray-400">جاري توجيهك إلى صفحة مشروعاتك...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceRequestForm