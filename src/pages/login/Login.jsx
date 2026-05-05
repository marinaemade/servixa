import React, { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/Context";
import SignupAndLogin from "../../components/common/SignupAndLogin";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

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
    if (password.length < 8) return "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    if (!/(?=.*[a-z])/.test(password)) return "يجب أن تحتوي على حرف صغير";
    if (!/(?=.*[A-Z])/.test(password)) return "يجب أن تحتوي على حرف كبير";
    if (!/(?=.*\d)/.test(password)) return "يجب أن تحتوي على رقم";
    if (!/(?=.*[@$!%*?&])/.test(password)) return "يجب أن تحتوي على رمز خاص (@$!%*?&)";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = getEmailError(userInfo.email);
    const passwordError = getPasswordError(userInfo.password);

    if (emailError || passwordError) {
      setErrors({ email: !!emailError, password: !!passwordError });
      setErrorMessages({ email: emailError, password: passwordError });
      return;
    }

    try {
      const res = await fetch("https://dummyjson.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
      if (data.accessToken) {
        const decoded = jwtDecode(data.accessToken);
        console.log(decoded);
        login(data.accessToken);
      } else {
        setErrors({ email: true, password: true });
        setErrorMessages({
          email: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
          password: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        });
      }
    } catch (err) {
      console.log(err);
      setErrors({ email: false, password: false });
      setErrorMessages({ email: "", password: "حدث خطأ، يرجى المحاولة مرة أخرى" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-3 sm:p-4 font-sans">
      <div className="bg-white rounded-[30px] sm:rounded-[45px] shadow-sm border border-gray-700 flex w-full max-w-6xl overflow-hidden min-h-[600px] sm:min-h-[700px]">

        {/* FORM SIDE */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-5 sm:px-8 md:px-16 py-8 sm:py-10" dir="rtl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-6 sm:mb-10">
            تسجيل الدخول
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* EMAIL */}
            <div className="space-y-1 sm:space-y-2">
              <label className="text-[13px] font-bold text-gray-500 mr-2 block">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <EnvelopeIcon className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  placeholder="example@domain.com"
                  className={`w-full pr-12 pl-4 py-3 sm:py-4 rounded-2xl border bg-blue-50 text-right transition-all outline-none text-sm sm:text-base
                  ${errors.email ? "border-red-500 ring-1 ring-red-500 bg-red-50" : "border-gray-600 focus:border-[#1093ED] focus:ring-1 focus:ring-[#1093ED]"}`}
                />
              </div>
              {errors.email && errorMessages.email && (
                <p className="text-red-500 text-xs sm:text-[13px] font-medium mr-2 mt-1 flex items-center gap-1">
                  <span>⚠</span>
                  <span>{errorMessages.email}</span>
                </p>
              )}
            </div>

            {/* PASSWORD */}
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
                  {showPassword
                    ? <EyeSlashIcon className="w-5 h-5" />
                    : <EyeIcon className="w-5 h-5" />
                  }
                </button>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pr-12 pl-4 py-3 sm:py-4 rounded-2xl border bg-blue-50 text-right transition-all outline-none text-sm sm:text-base
                  ${errors.password ? "border-red-500 ring-1 ring-red-500 bg-red-50" : "border-gray-600 focus:border-[#1093ED] focus:ring-1 focus:ring-[#1093ED]"}`}
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
                className="w-full bg-[#0E8AEE] text-white py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex justify-center items-center gap-2"
              >
                <span>تسجيل الدخول</span>
                <span className="text-xl rotate-180">‹</span>
              </button>
            </div>
          </form>

          {/* FORGOT PASSWORD */}
          <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-4 sm:mt-6 text-xs sm:text-sm">
            <QuestionMarkCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <span className="text-gray-400">هل نسيت كلمة السر؟</span>
            <a href="#" className="text-[#1093ED] font-bold hover:underline">اضغط هنا</a>
          </div>

          {/* SOCIAL LOGIN SECTION */}
          <div className="mt-8 sm:mt-12 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-[11px] sm:text-[12px]">
              <span className="px-3 sm:px-4 bg-white text-gray-700 font-medium">او سجل الدخول بـ</span>
            </div>
          </div>

          <div className="mt-4 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4">
            <button className="flex justify-center items-center py-3 sm:py-4 border border-gray-900 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-all">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button className="flex justify-center items-center py-3 sm:py-4 border border-gray-900 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-all">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 sm:w-6 sm:h-6" alt="Google" />
            </button>
            <button className="flex justify-center items-center py-3 sm:py-4 border border-gray-900 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-all">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-black" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05 1.79-3.72 1.79-1.61 0-2.11-1-3.83-1-1.73 0-2.31 1-3.84 1-1.57 0-2.78-1.02-3.79-2.45-2.07-2.92-2.07-7.56 0-10.48 1.03-1.46 2.52-2.38 4.14-2.38 1.28 0 2.25.72 3.12.72.82 0 2.11-.88 3.55-.88 1.5 0 2.8.62 3.65 1.84-3.14 1.85-2.63 6.13.52 7.42-.74 1.81-1.73 3.44-2.8 4.42zM12.04 4.54c-.12-1.95 1.53-3.6 3.43-3.54.12 1.95-1.55 3.6-3.43 3.54z" />
              </svg>
            </button>
          </div>
        </div>

        {/* IMAGE SIDE — hidden on mobile */}

          <SignupAndLogin />
      </div>
    </div>
  );
};

export default Login;