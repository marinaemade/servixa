import React, { useState } from "react";
import { UserIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import SignupAndLogin from "./../../components/common/SignupAndLogin";
import AuthNavbar from "./../../components/layout/auth-navbar/AuthNavbar";
import { useSignup } from "../../context/SignupContext";

const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{3,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

const SignUp = () => {
  const navigate = useNavigate();
  const { updateSignup } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});

  const validateField = (field, value) => {
    let error = "";
    if (field === "name") {
      if (!value.trim()) error = "الاسم مطلوب";
      else if (!nameRegex.test(value)) error = "الاسم يجب أن يكون 3 أحرف على الأقل";
    }
    if (field === "email") {
      if (!value.trim()) error = "البريد الإلكتروني مطلوب";
      else if (!emailRegex.test(value)) error = "بريد إلكتروني غير صالح";
    }
    if (field === "password") {
      if (!value) error = "كلمة المرور مطلوبة";
      else if (!passwordRegex.test(value)) error = "يجب أن تحتوي على حرف كبير وصغير ورقم ورمز";
    }
    return error;
  };

  const handleChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
    setSuccess((prev) => ({ ...prev, [field]: !error && value ? true : false }));
  };

  const submitUser = (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(userInfo).forEach((field) => {
      const error = validateField(field, userInfo[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Split the full Arabic/English name into first + last for the backend DTOs
    const parts = userInfo.name.trim().split(/\s+/);
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ") || parts[0];

    updateSignup({
      firstName,
      lastName,
      email: userInfo.email,
      password: userInfo.password,
    });

    navigate("/account-type");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <AuthNavbar />
      <div className="mt-14 flex-grow flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-[24px] sm:rounded-[40px] shadow-sm sm:shadow-2xl flex w-full max-w-6xl overflow-hidden min-h-0 sm:min-h-[750px]">
          <SignupAndLogin />

          <div className="w-full lg:w-1/2 px-5 sm:px-10 lg:px-12 py-8 sm:py-10 flex flex-col justify-center" dir="rtl">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">إنشاء حساب جديد</h1>
            <p className="text-gray-400 text-sm mb-6 sm:mb-8">
              ابدأ رحلتك معنا اليوم مع سيرفيكسا
            </p>

            <form onSubmit={submitUser} className="space-y-4 sm:space-y-5">
              <div>
                <label className="text-sm font-bold block mb-2">الاسم الكامل</label>
                <div className="relative">
                  <UserIcon className="w-5 h-5 absolute top-1/2 right-4 -translate-y-1/2 text-gray-400" />
                  <input
                    value={userInfo.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full pr-12 py-3.5 sm:py-4 rounded-2xl border bg-gray-50 text-right text-sm sm:text-base
                      ${errors.name ? "border-red-500" : success.name ? "border-green-500" : "border-gray-200"}`}
                    placeholder="أدخل اسمك الثلاثي"
                  />
                </div>
                <div className="min-h-[20px] mt-1 text-sm text-red-500">{errors.name}</div>
              </div>

              <div>
                <label className="text-sm font-bold block mb-2">البريد الإلكتروني</label>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 absolute top-1/2 right-4 -translate-y-1/2 text-gray-400" />
                  <input
                    value={userInfo.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full pr-12 py-3.5 sm:py-4 rounded-2xl border bg-gray-50 text-right text-sm sm:text-base
                      ${errors.email ? "border-red-500" : success.email ? "border-green-500" : "border-gray-200"}`}
                    placeholder="example@domain.com"
                  />
                </div>
                <div className="min-h-[20px] mt-1 text-sm text-red-500">{errors.email}</div>
              </div>

              <div>
                <label className="text-sm font-bold block mb-2">كلمة المرور</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={userInfo.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className={`w-full pr-12 py-3.5 sm:py-4 rounded-2xl border bg-gray-50 text-right text-sm sm:text-base
                      ${errors.password ? "border-red-500" : success.password ? "border-green-500" : "border-gray-200"}`}
                    placeholder="********"
                  />
                </div>
                <div className="min-h-[20px] mt-1 text-sm text-red-500">{errors.password}</div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1093ED] text-white py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-blue-600 transition-colors"
              >
                متابعة
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-[#1093ED] font-bold">
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
