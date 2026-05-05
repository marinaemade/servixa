import React, { useState, useRef } from 'react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const EmailVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 font-sans" dir="rtl">
      
      {/* Progress Bar Container */}
      <div className="w-full max-w-5xl mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[#1093ED] font-bold text-sm">الخطوة 3 من 4</span>
          <span className="text-gray-400 text-sm">التحقق من البريد الإلكتروني</span>
        </div>
        <div className="flex gap-2 h-1.5">
          <div className="flex-1 bg-[#1093ED] rounded-full"></div>
          <div className="flex-1 bg-[#1093ED] rounded-full"></div>
          <div className="flex-1 bg-[#1093ED] rounded-full"></div>
          <div className="flex-1 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[45px] shadow-sm border border-gray-100 w-full max-w-5xl p-8 md:p-20 relative flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            تحقق من <span className="text-[#1093ED]">بريدك الالكتروني</span>
          </h1>
          <p className="text-gray-400 text-base mb-2">لقد أرسلنا رمز التحقق المكون من 4 أرقام إلى</p>
          <p className="text-[#1093ED] font-medium" dir="ltr">ahmed***@example.com</p>
        </div>

        {/* OTP Input Group */}
        <div className="flex gap-3 md:gap-5 mb-8" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-14 h-16 md:w-20 md:h-24 text-2xl md:text-3xl font-bold text-center rounded-2xl border-2 transition-all outline-none
                ${digit ? 'border-[#1093ED] bg-blue-50 text-gray-800' : 'border-gray-100 bg-gray-50/30 text-gray-400'}`}
            />
          ))}
        </div>

        {/* Resend Link */}
        <div className="text-sm mb-12">
          <span className="text-gray-400">لم تستلم الرمز؟ </span>
          <button className="text-[#1093ED] font-bold hover:underline">إعادة الإرسال</button>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-4">
          <Link to={"/ScopeOfWork"}>
            <button className="w-full bg-[#1093ED] text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all">
              <span>تأكيد وإتمام التسجيل</span>
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
          </Link>
          
          <button className="w-full py-4 rounded-2xl font-bold text-lg border border-[#1093ED] text-[#1093ED] bg-blue-50/50 hover:bg-blue-50 transition-all">
            تغيير البريد الإلكتروني
          </button>
        </div>

      </div>
    </div>
  );
};

export default EmailVerification;