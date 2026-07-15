import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthNavbar from './../../components/layout/auth-navbar/AuthNavbar';
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useSignup } from '../../context/SignupContext';

const PHONE_PREFIXES = ["010", "011", "012", "015"];

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { data, updateSignup } = useSignup();

  const [formData, setFormData] = useState({
    fullName: data.fullName || '',
    birthDate: data.birthDate || '',
    nationality: data.nationality || '',
    job: data.job || '',
    phone: data.phone ? data.phone.slice(3) : '' // strip prefix if returning to this step
  });
  const [gender, setGender] = useState(data.gender || 'male');
  const [selectedCode, setSelectedCode] = useState(
    data.phone ? data.phone.slice(0, 3) : "010"
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim()) return setError("الرجاء إدخال الاسم بالكامل");
    if (!formData.birthDate) return setError("الرجاء تحديد تاريخ الميلاد");
    if (!formData.nationality.trim()) return setError("الرجاء إدخال الجنسية");
    if (!formData.job.trim()) return setError("الرجاء إدخال الوظيفة");
    if (!formData.phone.trim()) return setError("الرجاء إدخال رقم الجوال");

    // Split the full name into first/last for the backend DTOs
    // (register-client / register-worker both expect firstName + lastName)
    const parts = formData.fullName.trim().split(/\s+/);
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ") || parts[0];

    updateSignup({
      fullName: formData.fullName,
      firstName,
      lastName,
      birthDate: formData.birthDate,
      nationality: formData.nationality,
      job: formData.job,
      gender,
      phone: selectedCode + formData.phone,
    });

    navigate("/verification");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 sm:py-10 px-3 sm:px-4 font-sans" dir="rtl">
      <AuthNavbar/>

      {/* Progress Bar */}
      <div className="mt-14 w-full max-w-5xl mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <span className="text-[#1093ED] font-bold text-xs sm:text-sm">الخطوة 1 من 4</span>
          <span className="text-gray-400 text-xs sm:text-sm">البيانات الشخصية</span>
        </div>
        <div className="flex gap-2 h-1.5">
          <div className="flex-1 bg-[#1093ED] rounded-full"></div>
          <div className="flex-1 bg-gray-200 rounded-full"></div>
          <div className="flex-1 bg-gray-200 rounded-full"></div>
          <div className="flex-1 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-[24px] sm:rounded-[45px] shadow-sm border border-gray-200 w-full max-w-5xl p-5 sm:p-8 md:p-14 relative">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            البيانات <span className="text-[#1093ED]">الأساسية</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-lg">
            لنبدأ بمعلوماتك الرسمية لإنشاء ملفك المهني على منصة سيرفيكسا.
          </p>
        </div>

        {/* رسالة الخطأ إن وجدت */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl font-bold text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">

          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-600">الاسم بالكامل</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="أدخل اسمك كما يظهر في بطاقة الهوية"
              className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-gray-50 border border-gray-300 rounded-2xl outline-none focus:border-[#1093ED] text-right text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">

            {/* Birth Date */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-600">
                تاريخ الميلاد
              </label>
              <div className="relative">
                <CalendarIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 sm:pr-6 py-3.5 sm:py-4 bg-gray-50 border border-gray-300 rounded-2xl outline-none focus:border-[#1093ED] text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-600">الجنس</label>
              <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-300">
                <button type="button" onClick={() => setGender('male')}
                  className={`flex-1 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-colors ${gender === 'male' ? 'bg-[#1093ED] text-white' : 'text-gray-400'}`}>
                  ذكر
                </button>
                <button type="button" onClick={() => setGender('female')}
                  className={`flex-1 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-colors ${gender === 'female' ? 'bg-[#1093ED] text-white' : 'text-gray-400'}`}>
                  أنثى
                </button>
              </div>
            </div>

            {/* Nationality */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-600 mr-2">الجنسية</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="المملكة العربية السعودية"
                className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-gray-50 border border-gray-300 rounded-2xl outline-none focus:border-[#1093ED] text-right text-sm sm:text-base"
              />
            </div>

            {/* Job */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-600 mr-2">الوظيفة</label>
              <input
                type="text"
                name="job"
                value={formData.job}
                onChange={handleChange}
                placeholder="مثال: سباك أو نجار"
                className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-gray-50 border border-gray-300 rounded-2xl outline-none focus:border-[#1093ED] text-right text-sm sm:text-base"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-600">البريد الإلكتروني</label>
              <div className="relative">
                <CheckCircleIcon className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-[#1093ED]" />
                <input
                  type="email"
                  value={data.email}
                  readOnly
                  className="w-full pr-12 pl-4 sm:pl-6 py-3.5 sm:py-4 bg-gray-50 border border-gray-300 rounded-2xl outline-none text-right text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-600">
                رقم الجوال
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Prefix Code Selection */}
                <select
                  value={selectedCode}
                  onChange={(e) => setSelectedCode(e.target.value)}
                  className="w-full sm:w-36 bg-gray-50 border border-gray-300 rounded-2xl px-3 py-3.5 sm:py-4 outline-none focus:border-[#1093ED] text-center font-bold text-sm sm:text-base"
                >
                  {PHONE_PREFIXES.map((prefix, i) => (
                    <option key={i} value={prefix}>
                      {prefix}
                    </option>
                  ))}
                </select>

                {/* Phone Input */}
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="XXXXXXX"
                  className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-gray-50 border border-gray-300 rounded-2xl outline-none focus:border-[#1093ED] text-left text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="border-t border-gray-200 pt-8 sm:pt-10 mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-start">

            <button
              type="submit"
              className="w-full sm:w-auto bg-[#1093ED] text-white px-10 py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all"
            >
              <span>استمرار</span>
              <ArrowLeftIcon className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => navigate("/account-type")}
              className="w-full sm:w-auto text-gray-400 font-bold text-base sm:text-lg hover:text-gray-600 transition-colors text-center"
            >
              رجوع
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;