import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  ArrowRightIcon, 
  ArrowLeftIcon, 
  CameraIcon,
  SunIcon,
  ViewfinderCircleIcon,
  ArrowsPointingOutIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const Verification = () => {
  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);
  const navigate = useNavigate();

  // State to store the selected files
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleFileChange = (event, side) => {
    const file = event.target.files[0];
    if (file) {
      if (side === 'front') setFrontImage(file);
      else setBackImage(file);
      console.log(`${side} file selected:`, file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 font-sans" dir="rtl">
      
      {/* Progress Bar Container */}
      <div className="w-full max-w-5xl mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[#1093ED] font-bold text-sm">الخطوة 2 من 4</span>
          <span className="text-gray-400 text-sm">توثيق الهوية</span>
        </div>
        <div className="flex gap-2 h-1.5">
          <div className="flex-1 bg-[#1093ED] rounded-full"></div>
          <div className="flex-1 bg-[#1093ED] rounded-full"></div>
          <div className="flex-1 bg-gray-200 rounded-full"></div>
          <div className="flex-1 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[45px] shadow-sm border border-gray-100 w-full max-w-5xl p-8 md:p-14 relative">

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            توثيق <span className="text-[#1093ED]">الهوية الشخصية</span>
          </h1>
          <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
            لبناء مجتمع آمن وموثوق، نطلب من جميع المحترفين التحقق من هويتهم. صورتك وبياناتك ستبقى سرية ولن تظهر للعملاء.
          </p>
        </div>

        {/* Instructions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-gray-500 rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-500">
              <SunIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-1">إضاءة جيدة</h3>
            <p className="text-xs text-gray-600">تجنب الظلال القوية أو الإضاءة الخافتة جداً</p>
          </div>

          <div className="border border-gray-500 rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#1093ED]">
              <ViewfinderCircleIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-1">وضوح عالي</h3>
            <p className="text-xs text-gray-600">يجب أن تكون النصوص واضحة وسهلة القراءة</p>
          </div>

          <div className="border border-gray-500 rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-orange6400">
              <ArrowsPointingOutIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-1">كامل البطاقة</h3>
            <p className="text-xs text-gray-600">تأكد من عدم قطع أي جزء من أطراف البطاقة</p>
          </div>
        </div>

        {/* Upload Areas */}
        <div className="space-y-10">
          {/* Front Face Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 text-[#1093ED] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <label className="font-bold text-gray-700 text-sm">الوجه الأمامي لبطاقة الهوية</label>
            </div>

            {/* 3. Hidden File Input */}
            <input 
              type="file" 
              ref={frontInputRef}
              onChange={(e) => handleFileChange(e, 'front')}
              accept="image/*,.pdf"
              className="hidden" 
            />

            {/* 4. Clickable UI Area */}
            <div 
              onClick={() => frontInputRef.current.click()}
              className="border-2 border-dashed border-gray-200 rounded-[35px] py-12 flex flex-col items-center justify-center bg-gray-50/30 hover:bg-gray-50 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#1093ED] group-hover:scale-110 transition-transform">
                <CameraIcon className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-800 mb-1">
                {frontImage ? frontImage.name : "اسحب الملفات هنا أو اضغط لالتقاط الصورة"}
              </h4>
              <p className="text-xs text-gray-400">يدعم صيغ PDF, JPG, PNG (بحد أقصى 10MB لكل ملف)</p>
            </div>
          </div>

          {/* Back Face Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 text-[#1093ED] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <label className="font-bold text-gray-700 text-sm">الوجه الخلفي لبطاقة الهوية</label>
            </div>

            <input 
              type="file" 
              ref={backInputRef}
              onChange={(e) => handleFileChange(e, 'back')}
              accept="image/*,.pdf"
              className="hidden" 
            />

            <div 
              onClick={() => backInputRef.current.click()}
              className="border-2 border-dashed border-gray-200 rounded-[35px] py-12 flex flex-col items-center justify-center bg-gray-50/30 hover:bg-gray-50 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#1093ED] group-hover:scale-110 transition-transform">
                <CameraIcon className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-800 mb-1">
                {backImage ? backImage.name : "اسحب الملفات هنا أو اضغط لالتقاط الصورة"}
              </h4>
              <p className="text-xs text-gray-400">يدعم صيغ PDF, JPG, PNG (بحد أقصى 10MB لكل ملف)</p>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-green-600 font-bold text-sm mb-2">
            <ShieldCheckIcon className="w-5 h-5" />
            <span>بياناتك مشفرة وآمنة تماماً</span>
          </div>
          <p className="text-[11px] text-gray-400 max-w-md">
            نحن نستخدم أعلى معايير التشفير (AES-256) لحماية معلوماتك الشخصية بموجب سياسة الخصوصية.
          </p>
        </div>

        {/* Buttons  */}
        <div className="border-t border-gray-500 pt-10 mt-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-start">
          
          <button
            type="button"
            onClick={() => navigate("/EmailVerification")}
            className="w-full sm:w-auto bg-[#1093ED] text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all"
          >
            <span>استمرار</span>
            <ArrowLeftIcon className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/personal-info")}
            className="w-full sm:w-auto text-gray-400 font-bold text-lg hover:text-gray-600 transition-colors text-center"
          >
            رجوع
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;