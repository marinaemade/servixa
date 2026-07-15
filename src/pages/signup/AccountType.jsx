import React, { useState } from "react";
import { UserIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import AuthNavbar from "./../../components/layout/auth-navbar/AuthNavbar";
import { useSignup } from "../../context/SignupContext";

const AccountType = () => {
  const { data, updateSignup } = useSignup();
  const [role, setRole] = useState(data.role);
  const navigate = useNavigate();

  const handleSelect = (selectedRole) => {
    setRole(selectedRole);
    updateSignup({ role: selectedRole });
    navigate("/personal-info");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans" dir="rtl">
      <AuthNavbar />
      <div className="text-center mb-8 sm:mb-12 mt-16 sm:mt-0">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 mb-3 sm:mb-4">اختر نوع الحساب</h1>
        <p className="text-gray-600 text-sm sm:text-lg">ابدأ رحلتك معنا واختر مستوى جديد من الخدمات المنزلية</p>
      </div>

      <div className="flex flex-col md:flex-row gap-5 sm:gap-8 w-full max-w-4xl">
        <div
          onClick={() => handleSelect("provider")}
          className={`flex-1 bg-white border-2 rounded-[28px] sm:rounded-[35px] p-6 sm:p-10 flex flex-col items-center text-center cursor-pointer transition-all duration-300 shadow-sm
            ${role === "provider" ? "border-[#1093ED] shadow-blue-100 shadow-lg" : "border-gray-100 hover:border-blue-200"}`}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1093ED] rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-md shadow-blue-200">
            <WrenchScrewdriverIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">محترف صيانة</h2>
          <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">أريد تقديم خدماتي وزيادة دخلي</p>
          <button
            className={`w-full py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-colors
            ${role === "provider" ? "bg-[#1093ED] text-white" : "bg-transparent border border-gray-200 text-gray-400 hover:bg-gray-50"}`}
          >
            انضم كمحترف
          </button>
        </div>

        <div
          onClick={() => handleSelect("customer")}
          className={`flex-1 bg-white border-2 rounded-[28px] sm:rounded-[35px] p-6 sm:p-10 flex flex-col items-center text-center cursor-pointer transition-all duration-300 shadow-sm
            ${role === "customer" ? "border-[#1093ED] shadow-blue-100 shadow-lg" : "border-gray-100 hover:border-blue-200"}`}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
            <UserIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#1093ED]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">طالب خدمة</h2>
          <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">أبحث عن فني موثوق لمنزلي</p>
          <button
            className={`w-full py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-colors
            ${role === "customer" ? "bg-[#1093ED] text-white" : "bg-[#F0F8FF] border border-[#D0E9FB] text-[#1093ED] hover:bg-blue-100"}`}
          >
            انضم كعميل
          </button>
        </div>
      </div>

      <div className="mt-8 sm:mt-12 text-gray-500 font-medium text-sm sm:text-base text-center">
        هل لديك حساب بالفعل؟{" "}
        <Link to="/login" className="text-[#1093ED] font-bold hover:underline">
          تسجيل الدخول
        </Link>
      </div>
    </div>
  );
};

export default AccountType;
