import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "./../../components/layout/auth-navbar/AuthNavbar";
import {
  ArrowLeftIcon,
  CameraIcon,
  SunIcon,
  ViewfinderCircleIcon,
  ArrowsPointingOutIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useSignup } from "../../context/SignupContext";

const Verification = () => {
  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);
  const navigate = useNavigate();
  const { data, updateSignup } = useSignup();

  const [frontImage, setFrontImage] = useState(data.nationalIdFront);
  const [backImage, setBackImage] = useState(data.nationalIdBack);
  const [error, setError] = useState("");

  const handleFileChange = (event, side) => {
    const file = event.target.files[0];
    if (!file) return;
    if (side === "front") setFrontImage(file);
    else setBackImage(file);
    setError("");
  };

  const handleNextStep = () => {
    setError("");
    if (!frontImage) return setError("الرجاء رفع صورة الوجه الأمامي لبطاقة الهوية أولاً");
    if (!backImage) return setError("الرجاء رفع صورة الوجه الخلفي لبطاقة الهوية أولاً");

    updateSignup({ nationalIdFront: frontImage, nationalIdBack: backImage });
    navigate("/email-verification");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 font-sans" dir="rtl">
      <AuthNavbar />

      <div className="w-full max-w-5xl mb-8 mt-14">
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

      <div className="bg-white rounded-[28px] sm:rounded-[45px] shadow-sm border border-gray-100 w-full max-w-5xl p-6 sm:p-10 md:p-14 relative">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            توثيق <span className="text-[#1093ED]">الهوية الشخصية</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            لبناء مجتمع آمن وموثوق، نطلب من جميع المحترفين التحقق من هويتهم. صورتك وبياناتك ستبقى سرية ولن تظهر للعملاء.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl font-bold text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
          <div className="border border-gray-200 rounded-3xl p-5 sm:p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-500">
              <SunIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-1">إضاءة جيدة</h3>
            <p className="text-xs text-gray-600">تجنب الظلال القوية أو الإضاءة الخافتة جداً</p>
          </div>
          <div className="border border-gray-200 rounded-3xl p-5 sm:p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#1093ED]">
              <ViewfinderCircleIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-1">وضوح عالي</h3>
            <p className="text-xs text-gray-600">يجب أن تكون النصوص واضحة وسهلة القراءة</p>
          </div>
          <div className="border border-gray-200 rounded-3xl p-5 sm:p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-orange-400">
              <ArrowsPointingOutIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-1">كامل البطاقة</h3>
            <p className="text-xs text-gray-600">تأكد من عدم قطع أي جزء من أطراف البطاقة</p>
          </div>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {[
            { ref: frontInputRef, side: "front", image: frontImage, label: "الوجه الأمامي لبطاقة الهوية", num: 1 },
            { ref: backInputRef, side: "back", image: backImage, label: "الوجه الخلفي لبطاقة الهوية", num: 2 },
          ].map((f) => (
            <div className="space-y-4" key={f.side}>
              <div className="flex items-center gap-2">
                <div className="bg-blue-50 text-[#1093ED] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                  {f.num}
                </div>
                <label className="font-bold text-gray-700 text-sm">{f.label}</label>
              </div>

              <input
                type="file"
                ref={f.ref}
                onChange={(e) => handleFileChange(e, f.side)}
                accept="image/*"
                className="hidden"
              />

              <div
                onClick={() => f.ref.current.click()}
                className="border-2 border-dashed border-gray-200 rounded-[28px] sm:rounded-[35px] py-10 sm:py-12 flex flex-col items-center justify-center bg-gray-50/30 hover:bg-gray-50 transition-all cursor-pointer group px-4"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#1093ED] group-hover:scale-110 transition-transform">
                  <CameraIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h4 className="font-bold text-gray-800 mb-1 text-center break-all text-sm sm:text-base">
                  {f.image ? f.image.name : "اسحب الملفات هنا أو اضغط لالتقاط الصورة"}
                </h4>
                <p className="text-xs text-gray-400">يدعم صيغ JPG, PNG (بحد أقصى 10MB لكل ملف)</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-green-600 font-bold text-sm mb-2">
            <ShieldCheckIcon className="w-5 h-5" />
            <span>بياناتك مشفرة وآمنة تماماً</span>
          </div>
          <p className="text-[11px] text-gray-400 max-w-md">
            نستخدم أعلى معايير التشفير لحماية معلوماتك الشخصية بموجب سياسة الخصوصية.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-8 sm:pt-10 mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-start">
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full sm:w-auto bg-[#1093ED] text-white px-10 py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all"
          >
            <span>استمرار</span>
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => navigate("/personal-info")}
            className="w-full sm:w-auto text-gray-400 font-bold text-base sm:text-lg hover:text-gray-600 transition-colors text-center"
          >
            رجوع
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;