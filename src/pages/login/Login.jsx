import React, { useState } from "react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/Context";
import api from "../../api/api";
import SignupAndLogin from "../../components/common/SignupAndLogin";
import AuthNavbar from "./../../components/layout/auth-navbar/AuthNavbar";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [errorMessages, setErrorMessages] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
      setErrorMessages({ ...errorMessages, [name]: "" });
    }
  };

  const getEmailError = (email) => {
    if (!email) return "البريد الإلكتروني مطلوب";
    if (!emailRegex.test(email)) return "صيغة البريد الإلكتروني غير صحيحة";
    return "";
  };

  const getPasswordError = (password) => {
    if (!password) return "كلمة المرور مطلوبة";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const emailError = getEmailError(userInfo.email);
    const passwordError = getPasswordError(userInfo.password);

    if (emailError || passwordError) {
      setErrors({ email: !!emailError, password: !!passwordError });
      setErrorMessages({ email: emailError, password: passwordError });
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post("/Auth/login", {
        email: userInfo.email,
        password: userInfo.password,
      });

      // Backend may return the token under different keys depending on config
      const token =
        res.data?.token || res.data?.accessToken || res.data?.jwt || res.data;

      if (!token || typeof token !== "string") {
        throw new Error("لم يتم استلام رمز الدخول من الخادم");
      }

      const { ok, role } = login(token);
      if (!ok) throw new Error("رمز الدخول غير صالح");

      // Send the user straight to their own area based on the role
      const destination =
        role?.toLowerCase() === "worker"
          ? "/worker-profile"
          : role?.toLowerCase() === "admin"
          ? "/admin"
          : role?.toLowerCase() === "client"
          ? "/client"
          : "/"; // fallback if the token has no recognizable role claim
      console.log("role from login():", role, "destination:", destination);
      navigate(destination, { replace: true });
    } catch (err) {
      setErrors({ email: true, password: true });
      setErrorMessages({
        email: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        password: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
      setFormError(err.message || "تعذر تسجيل الدخول، حاول مرة أخرى");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AuthNavbar />
      <div className="mt-14 min-h-screen flex items-center justify-center bg-gray-50 p-3 sm:p-4 font-sans">
        <div className="bg-white rounded-[24px] sm:rounded-[45px] shadow-sm border border-gray-200 flex w-full max-w-6xl overflow-hidden min-h-0 sm:min-h-[700px]">
          <SignupAndLogin />

          <div className="w-full md:w-1/2 flex flex-col justify-center px-5 sm:px-8 md:px-16 py-8 sm:py-10" dir="rtl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-6 sm:mb-10">
              تسجيل الدخول
            </h1>

            {successMessage && (
              <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm text-center font-bold">
                {successMessage}
              </div>
            )}

            {formError && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm text-center font-bold">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <label className="text-[13px] font-bold text-gray-500 mr-2 block">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    placeholder="example@domain.com"
                    className={`w-full pr-12 pl-4 py-3 sm:py-4 rounded-2xl border bg-blue-50 text-right transition-all outline-none text-sm sm:text-base
                    ${errors.email ? "border-red-500 ring-1 ring-red-500 bg-red-50" : "border-gray-300 focus:border-[#1093ED] focus:ring-1 focus:ring-[#1093ED]"}`}
                  />
                </div>
                {errors.email && errorMessages.email && (
                  <p className="text-red-500 text-xs sm:text-[13px] font-medium mr-2 mt-1 flex items-center gap-1">
                    <span>⚠</span>
                    <span>{errorMessages.email}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label className="text-[13px] font-bold text-gray-500 mr-2 block">
                  كلمة المرور
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={userInfo.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pr-12 pl-4 py-3 sm:py-4 rounded-2xl border bg-blue-50 text-right transition-all outline-none text-sm sm:text-base
                    ${errors.password ? "border-red-500 ring-1 ring-red-500 bg-red-50" : "border-gray-300 focus:border-[#1093ED] focus:ring-1 focus:ring-[#1093ED]"}`}
                  />
                </div>
                {errors.password && errorMessages.password && (
                  <p className="text-red-500 text-xs sm:text-[13px] font-medium mr-2 mt-1 flex items-center gap-1">
                    <span>⚠</span>
                    <span>{errorMessages.password}</span>
                  </p>
                )}
              </div>

              <div className="pt-1 sm:pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0E8AEE] text-white py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>تسجيل الدخول</span>
                      <span className="text-xl rotate-180">‹</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-4 sm:mt-6 text-xs sm:text-sm">
              <QuestionMarkCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <span className="text-gray-400">هل نسيت كلمة السر؟</span>
              <a href="#" className="text-[#1093ED] font-bold hover:underline">اضغط هنا</a>
            </div>

            <div className="mt-6 text-center text-sm">
              ليس لديك حساب؟{" "}
              <Link to="/signup" className="text-[#1093ED] font-bold hover:underline">
                إنشاء حساب جديد
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;