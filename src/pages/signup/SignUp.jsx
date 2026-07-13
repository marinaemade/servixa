import React, { useState } from "react";
import { UserIcon, EnvelopeIcon, EyeIcon } from "@heroicons/react/24/outline";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SignupAndLogin from './../../components/common/SignupAndLogin';
import AuthNavbar from './../../components/layout/auth-navbar/AuthNavbar';

const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});

  const validateField = (field, value) => {
    let error = "";

    const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{3,}$/;
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (field === "name") {
      if (!value.trim()) error = "الاسم مطلوب";
      else if (!nameRegex.test(value))
        error = "الاسم يجب أن يكون 3 أحرف على الأقل";
    }

    if (field === "email") {
      if (!value.trim()) error = "البريد الإلكتروني مطلوب";
      else if (!emailRegex.test(value))
        error = "بريد إلكتروني غير صالح";
    }

    if (field === "password") {
      if (!value) error = "كلمة المرور مطلوبة";
      else if (!passwordRegex.test(value))
        error = "يجب أن تحتوي على حرف كبير وصغير ورقم ورمز";
    }

    return error;
  };

  const handleChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));

    const error = validateField(field, value);

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    setSuccess((prev) => ({
      ...prev,
      [field]: !error && value ? true : false,
    }));
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

    //  Save to localStorage
  localStorage.setItem("signup_email", userInfo.email);

    console.log("VALID DATA:", userInfo);
    navigate("/account-type");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans" >
      <AuthNavbar/>
      {/* MAIN */}
      <div className="mt-14 flex-grow flex items-center justify-center p-4 ">
        <div className="bg-white rounded-[40px] shadow-2xl flex w-full max-w-6xl overflow-hidden min-h-[750px]">
          {/* RIGHT SIDE */}
          <SignupAndLogin />
          
          {/* LEFT FORM */}
          <div className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-12 py-10 flex flex-col justify-center" dir="rtl">

            <h1 className="text-3xl font-bold mb-2">إنشاء حساب جديد</h1>
            <p className="text-gray-400 text-sm mb-8">
              ابدأ رحلتك التعليمية الممتعة اليوم مع أجيال
            </p>

            <form onSubmit={submitUser} className="space-y-5">

              {/* NAME */}
              <div>
                <label className="text-sm font-bold block mb-2">الاسم الكامل</label>

                <div className="relative">
                  <UserIcon className="w-5 h-5 absolute top-1/2 right-4 -translate-y-1/2 text-gray-400" />

                  <input
                    value={userInfo.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full pr-12 py-4 rounded-2xl  border bg-gray-50 text-right
                      ${
                        errors.name
                          ? "border-red-500"
                          : success.name
                          ? "border-green-500"
                          : "border-gray-200"
                      }`}
                    placeholder="أدخل اسمك الثلاثي"
                  />
                </div>

                <div className="min-h-[20px] mt-1 text-sm text-red-500">
                  {errors.name}
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-bold block mb-2">البريد الإلكتروني</label>

                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 absolute top-1/2 right-4 -translate-y-1/2 text-gray-400" />

                  <input
                    value={userInfo.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full pr-12 py-4 rounded-2xl border bg-gray-50 text-right
                      ${
                        errors.email
                          ? "border-red-500"
                          : success.email
                          ? "border-green-500"
                          : "border-gray-200"
                      }`}
                    placeholder="example@domain.com"
                  />
                </div>

                <div className="min-h-[20px] mt-1 text-sm text-red-500">
                  {errors.email}
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-bold block mb-2">كلمة المرور</label>

                <div className="relative">
                  <EyeIcon className="w-5 h-5 absolute top-1/2 right-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type="password"
                    value={userInfo.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className={`w-full pr-12 py-4 rounded-2xl border bg-gray-50 text-right
                      ${
                        errors.password
                          ? "border-red-500"
                          : success.password
                          ? "border-green-500"
                          : "border-gray-200"
                      }`}
                    placeholder="********"
                  />
                </div>

                <div className="min-h-[20px] mt-1 text-sm text-red-500">
                  {errors.password}
                </div>
              </div>

              <button type="submit"
              className="w-full bg-[#1093ED] text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-600">
                إنشاء الحساب
              </button>
            </form>

            {/* LOGIN LINK */}
            <div className="mt-6 text-center text-sm">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-[#1093ED] font-bold">
                تسجيل الدخول
              </Link>
            </div>

            {/* DIVIDER (FIXED) */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-400 whitespace-nowrap">
                أو سجل الدخول بـ
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* SOCIAL ICONS */}
            <div className="mt-6 flex gap-4">
              <button className="flex-1 flex justify-center items-center py-3 border rounded-xl hover:bg-gray-50">
                <FaFacebookF className="text-blue-600" />
              </button>

              <button className="flex-1 flex justify-center items-center py-3 border rounded-xl hover:bg-gray-50">
                <FaGoogle className="text-red-500" />
              </button>

              <button className="flex-1 flex justify-center items-center py-3 border rounded-xl hover:bg-gray-50">
                <FaApple />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;