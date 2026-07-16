import React, { useState, useEffect } from 'react'
import { HiOutlineChevronDown, HiArrowLeft } from 'react-icons/hi'
import { IoCloudUploadOutline, IoClose } from 'react-icons/io5'
import { GoCheckCircleFill } from 'react-icons/go'
import { FiMapPin, FiAlertCircle } from 'react-icons/fi'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAllSpecialties } from '../../api/specialtyService'
import { getTasksBySpecialty } from '../../api/taskService'
import { bookTask } from '../../api/clientService'

const ServiceRequestForm = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const preselectedWorkerId = searchParams.get('workerId') ?? ''

  // Form data
  const [specialties, setSpecialties] = useState([])
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({
    specialtyId: '',
    taskId: '',
    workerId: preselectedWorkerId,
    notes: '',
    address: '',
    lat: '',
    lng: '',
    scheduledDate: '',
    budgetRange: '',
  })
  const [images, setImages] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Load specialties
  useEffect(() => {
    getAllSpecialties()
      .then((res) => {
        const data = res.data?.data ?? res.data ?? []
        setSpecialties(Array.isArray(data) ? data : [])
      })
      .catch(() => {})
  }, [])

  // Load tasks when specialty changes
  useEffect(() => {
    if (!form.specialtyId) { setTasks([]); return }
    getTasksBySpecialty(form.specialtyId)
      .then((res) => {
        const data = res.data?.data ?? res.data ?? []
        setTasks(Array.isArray(data) ? data : [])
      })
      .catch(() => setTasks([]))
  }, [form.specialtyId])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newUrls = files.map(f => URL.createObjectURL(f))
    setImages(prev => [...prev, ...newUrls])
  }

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) { return }
    setForm(f => ({ ...f, address: 'جاري تحديد موقعك...' }))
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm(f => ({
          ...f,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          address: `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`,
        }))
      },
      () => setForm(f => ({ ...f, address: 'تعذر تحديد الموقع' }))
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)

    if (!form.taskId || !form.workerId || !form.scheduledDate) {
      setSubmitError('يرجى ملء جميع الحقول المطلوبة (المهمة، الفني، التاريخ)')
      return
    }

    try {
      setSubmitting(true)
      await bookTask({
        workerId: Number(form.workerId),
        taskId: Number(form.taskId),
        notes: form.notes,
        address: form.address,
        lat: form.lat ? Number(form.lat) : null,
        lng: form.lng ? Number(form.lng) : null,
        scheduledDate: form.scheduledDate,
      })
      setSuccess(true)
      setTimeout(() => navigate('/client'), 2000)
    } catch (err) {
      setSubmitError(err.message || 'فشل إرسال الطلب')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white min-h-screen flex flex-col items-center justify-center gap-4" dir="rtl">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <GoCheckCircleFill className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">تم إرسال الطلب بنجاح!</h2>
        <p className="text-gray-400 text-sm">جاري تحويلك...</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white min-h-screen md:min-h-0 md:my-4 md:rounded-lg overflow-hidden" dir="rtl" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Header */}
      <div className="relative flex items-center justify-center py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-[#0086ff]">طلب خدمة</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-5">

        {submitError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm font-bold">
            <FiAlertCircle className="w-4 h-4 shrink-0" />
            {submitError}
          </div>
        )}

        {/* Specialty */}
        <div className="space-y-1.5">
          <label className="block text-right text-lg font-bold text-[#374151]">التخصص</label>
          <div className="relative">
            <select
              value={form.specialtyId}
              onChange={(e) => setForm(f => ({ ...f, specialtyId: e.target.value, taskId: '' }))}
              className="w-full px-4 py-3 bg-[#fafafa] border border-gray-300 rounded-xl text-right text-gray-800 focus:outline-none focus:border-[#0086ff] text-sm appearance-none"
            >
              <option value="">اختر التخصص</option>
              {specialties.map(s => <option key={s.id} value={s.id}>{s.name ?? s.title}</option>)}
            </select>
            <HiOutlineChevronDown className="absolute inset-y-0 left-4 my-auto w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Task */}
        <div className="space-y-1.5">
          <label className="block text-right text-lg font-bold text-[#374151]">المهمة <span className="text-red-400">*</span></label>
          <div className="relative">
            <select
              value={form.taskId}
              onChange={(e) => setForm(f => ({ ...f, taskId: e.target.value }))}
              className="w-full px-4 py-3 bg-[#fafafa] border border-gray-300 rounded-xl text-right text-gray-800 focus:outline-none focus:border-[#0086ff] text-sm appearance-none"
              required
            >
              <option value="">اختر المهمة</option>
              {tasks.map(t => <option key={t.id} value={t.id}>{t.name ?? t.title}</option>)}
            </select>
            <HiOutlineChevronDown className="absolute inset-y-0 left-4 my-auto w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Worker ID (if not preselected) */}
        {!preselectedWorkerId && (
          <div className="space-y-1.5">
            <label className="block text-right text-lg font-bold text-[#374151]">رقم الفني <span className="text-red-400">*</span></label>
            <input
              type="number"
              value={form.workerId}
              onChange={(e) => setForm(f => ({ ...f, workerId: e.target.value }))}
              placeholder="أدخل رقم الفني"
              className="w-full px-4 py-3 bg-[#fafafa] border border-gray-300 rounded-xl text-right text-gray-800 focus:outline-none focus:border-[#0086ff] text-sm"
              required
            />
          </div>
        )}

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="block text-right text-lg font-bold text-[#374151]">وصف المشكلة</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
            placeholder="اكتب تفاصيل المشكلة وكل معلومة سيحتاجها الفني..."
            rows={5}
            className="w-full px-4 py-3 bg-[#fafafa] border border-gray-300 rounded-xl text-right text-gray-800 placeholder-[#9ca3af] focus:outline-none focus:border-[#0086ff] text-sm resize-none"
          />
        </div>

        {/* Scheduled Date */}
        <div className="space-y-1.5">
          <label className="block text-right text-lg font-bold text-[#374151]">تاريخ الموعد <span className="text-red-400">*</span></label>
          <input
            type="datetime-local"
            value={form.scheduledDate}
            onChange={(e) => setForm(f => ({ ...f, scheduledDate: e.target.value }))}
            className="w-full px-4 py-3 bg-[#fafafa] border border-gray-300 rounded-xl text-right text-gray-800 focus:outline-none focus:border-[#0086ff] text-sm"
            required
          />
        </div>

        {/* Location */}
        <div className="border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm bg-white space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#374151]">العنوان</h3>
            <div className="w-9 h-9 bg-blue-50/60 rounded-full flex items-center justify-center text-[#0086ff]">
              <FiMapPin className="w-5 h-5" />
            </div>
          </div>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm(f => ({ ...f, address: e.target.value }))}
            placeholder="مثال: الرياض، حي النرجس"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-right text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0086ff] text-sm"
          />
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            className="w-full bg-[#0086ff] hover:bg-[#0074dd] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm text-sm"
          >
            <FiMapPin className="w-4 h-4" />
            <span>تحديد العنوان الحالي</span>
          </button>
        </div>

        {/* Images */}
        <div className="space-y-2">
          <label className="block text-lg font-bold text-gray-700">الصور</label>
          <div className="grid grid-cols-3 gap-3">
            <label className="relative flex flex-col items-center justify-center aspect-[4/3] border-2 border-dashed border-[#0086ff] bg-[#edf5ff] rounded-xl cursor-pointer hover:bg-[#e1eefd] transition-colors p-2 text-center">
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
              <IoCloudUploadOutline className="w-7 h-7 text-[#0086ff] mb-1" />
              <span className="text-xs sm:text-sm font-bold text-[#0086ff] block">اضغط لاضافة الملفات</span>
            </label>
            {images.map((src, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-gray-100">
                <img src={src} alt={`preview-${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <IoClose className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#0086ff] hover:bg-[#0074dd] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors mt-6 shadow-sm text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span className="font-semibold">ارسال الطلب</span>
              <HiArrowLeft className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Warning */}
        <div className="bg-[#fff9e6] rounded-xl p-3.5 flex items-start justify-between border border-[#ffeeba] mt-4">
          <p className="text-[11px] text-[#1f2937] leading-relaxed font-medium text-right flex-1">
            يرجى التأكد من توفر رصيد في محفظتك يغطي الحد الأقصى لميزانية الخدمة لضمان جدية الطلب وحفظ حقوق الطرفين.
          </p>
          <GoCheckCircleFill className="w-4 h-4 text-gray-800 shrink-0 mr-2 mt-0.5" />
        </div>

      </form>
    </div>
  )
}

export default ServiceRequestForm