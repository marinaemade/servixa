import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AuthNavbar from './../../components/layout/auth-navbar/AuthNavbar';
import { 
  ArrowLeftIcon, 
  CalendarIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

const PersonalInfo = () => {
  const [gender, setGender] = useState('male');
  const [countries, setCountries] = useState([]);
  const [selectedCode, setSelectedCode] = useState("+966");

  const emailFromStorage = localStorage.getItem("signup_email") || "";
  const navigate = useNavigate();

 useEffect(() => {
  fetch("https://restcountries.com/v3.1/all?fields=name,idd,flag")
    .then((res) => res.json())
    .then((data) => {
      const codes = data
        .filter((c) => c.idd?.root)
        .map((c) => ({
          name: c.name.common,
          flag: c.flag,
          code: c.idd.root + (c.idd.suffixes?.[0] || ""),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setCountries(codes);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 font-sans" dir="rtl">
      <AuthNavbar/>
      {/* Progress Bar */}
      <div className="w-full max-w-5xl mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[#1093ED] font-bold text-sm">الخطوة 1 من 4</span>
          <span className="text-gray-400 text-sm">البيانات الشخصية</span>
        </div>
        <div className="flex gap-2 h-1.5">
          <div className="flex-1 bg-[#1093ED] rounded-full"></div>
          <div className="flex-1 bg-gray-200 rounded-full"></div>
          <div className="flex-1 bg-gray-200 rounded-full"></div>
          <div className="flex-1 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-[45px] shadow-sm border border-gray-500 w-full max-w-5xl p-8 md:p-14 relative">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            البيانات <span className="text-[#1093ED]">الأساسية</span>
          </h1>
          <p className="text-gray-400 text-lg">
            لنبدأ بمعلوماتك الرسمية لإنشاء ملفك المهني على منصة أجيال.
          </p>
        </div>

        <form className="space-y-8">
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-600">الاسم بالكامل</label>
            <input 
              type="text" 
              placeholder="أدخل اسمك كما يظهر في بطاقة الهوية" 
              className="w-full px-6 py-4 bg-gray-50 border border-gray-500 rounded-2xl outline-none focus:border-[#1093ED] text-right"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Birth Date */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-600">
                تاريخ الميلاد
              </label>
              <div className="relative">
                <CalendarIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-500 rounded-2xl outline-none focus:border-[#1093ED]"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-600">الجنس</label>
              <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-500">
                <button type="button" onClick={() => setGender('male')}
                  className={`flex-1 py-3 rounded-xl font-bold ${gender === 'male' ? 'bg-[#1093ED] text-white' : 'text-gray-400'}`}>
                  ذكر
                </button>
                <button type="button" onClick={() => setGender('female')}
                  className={`flex-1 py-3 rounded-xl font-bold ${gender === 'female' ? 'bg-[#1093ED] text-white' : 'text-gray-400'}`}>
                  أنثى
                </button>
              </div>
            </div>

            {/* Nationality */}
            <div className="space-y-2"> 
              <label className="block text-sm font-bold text-gray-600 mr-2">الجنسية</label> 
              <input type="text" placeholder="المملكة العربية السعودية" className="w-full px-6 py-4 bg-gray-50 border border-gray-500 rounded-2xl outline-none focus:border-[#1093ED] text-right" />
            </div>
            
            {/* Job */} 
            <div className="space-y-2"> 
              <label className="block text-sm font-bold text-gray-600 mr-2">الوظيفة</label> 
              <input type="text" placeholder="مثال: سباك أو نجار" className="w-full px-6 py-4 bg-gray-50 border border-gray-500 rounded-2xl outline-none focus:border-[#1093ED] text-right" /> 
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-600">البريد الإلكتروني</label>
              <div className="relative">
                <CheckCircleIcon className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-[#1093ED]" />
                <input
                  type="email"
                  value={emailFromStorage}
                  readOnly
                  className="w-full pr-12 pl-6 py-4 bg-gray-50 border border-gray-500 rounded-2xl outline-none"
                />
              </div>
            </div>

            {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-600">
                  رقم الجوال
                </label>

                <div className="flex flex-col sm:flex-row gap-3">

                  {/* Country Code */}
                  <select
                    value={selectedCode}
                    onChange={(e) => setSelectedCode(e.target.value)}
                    className="w-full sm:w-36 bg-gray-50 border border-gray-300 rounded-2xl px-3 py-4 outline-none focus:border-[#1093ED]"
                  >
                    {countries.length === 0 ? (
                      <option>Loading...</option>
                    ) : (
                      countries.map((c, i) => (
                        <option key={i} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))
                    )}
                  </select>

                  {/* Phone Input */}
                  <input
                    type="tel"
                    placeholder="5XXXXXXXX"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-300 rounded-2xl outline-none focus:border-[#1093ED] text-left"
                  />
                </div>
              </div>
          </div>

          {/* Buttons  */}
          <div className="border-t border-gray-500 pt-10 mt-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-start">
            
            <button
              type="button"
              onClick={() => navigate("/verification")}
              className="w-full sm:w-auto bg-[#1093ED] text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all"
            >
              <span>استمرار</span>
              <ArrowLeftIcon className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => navigate("/account-type")}
              className="w-full sm:w-auto text-gray-400 font-bold text-lg hover:text-gray-600 transition-colors text-center"
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