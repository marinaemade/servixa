import React, { useContext, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { EnvelopeIcon, EyeIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Context from '../../context/Context';

const Login = () => {
  const [userInfo , setUserInfo] = useState({
    email:"",
    password:"",
  })

  const {logged,isLogged} = useContext(Context)

  const submitLogin = async () => {
  try {
    const req = await fetch("https://dummyjson.com/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    const data = await req.json();
    const userData = jwtDecode(data.accessToken);

    console.log(userData);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans" dir="rtl">
      {/* Navbar */}
      <nav className="w-full py-4 px-10 flex justify-between items-center">
        <div className="text-3xl font-extrabold flex items-center">
          <span className="text-black">Ser</span>
          <span className="text-[#1093ED]">vixa</span>
        </div>
        <button className="bg-[#1093ED] text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors">
          إنشاء حساب جديد
        </button>
      </nav>

      {/* Main Container */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-[50px] shadow-sm border border-gray-100 flex max-w-7xl w-full overflow-hidden min-h-[720px]">
          
          {/* Right Side: Login Form */}
          <div className="w-full lg:w-1/2 p-16 flex flex-col justify-center">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-extrabold text-gray-800">تسجيل الدخول</h1>
            </div>

            <form className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 mr-1">البريد الإلكتروني</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                    <EnvelopeIcon className="h-5 w-5" />
                  </span>
                  <input 
                    type="email" 
                    placeholder="example@domain.com" 
                    className="w-full pr-12 pl-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-right placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 mr-1">كلمة المرور</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                    <EyeIcon className="h-5 w-5" />
                  </span>
                  <input 
                    type="password" 
                    placeholder="********" 
                    className="w-full pr-12 pl-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-right placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="w-full border-t border-gray-100 pt-2"></div>

              {/* Login Button */}
              <button className="w-full bg-[#1093ED] text-white py-4 rounded-2xl font-extrabold text-lg flex justify-center items-center gap-3 hover:bg-blue-600 transition-all shadow-md shadow-blue-100">
                <span>تسجيل الدخول</span>
                <span className="text-xl rotate-180">›</span>
              </button>
            </form>

            {/* Forgot Password */}
            <div className="mt-6 flex justify-center items-center gap-1 text-sm">
              <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
              <span className="text-gray-500">هل نسيت كلمة السر؟</span>
              <a href="#" className="text-[#1093ED] font-bold hover:underline">اضغط هنا</a>
            </div>

            {/* Social Divider */}
            <div className="mt-12 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white text-gray-400 font-medium">أو سجل الدخول بـ</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="mt-8 flex gap-4">
              <button className="flex-1 flex justify-center py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                <svg className="w-6 h-6 text-blue-600 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </button>
              <button className="flex-1 flex justify-center py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c3.11 0 5.71-1.03 7.62-2.78l-3.57-2.77c-.98.66-2.23 1.06-4.05 1.06-3.11 0-5.75-2.1-6.69-4.92H1.63v2.85C3.53 20.24 7.46 23 12 23z"/><path fill="#FBBC05" d="M5.31 13.59c-.24-.71-.38-1.46-.38-2.24s.14-1.53.38-2.24V6.26H1.63C.59 8.35 0 10.66 0 13s.59 4.65 1.63 6.74l3.68-2.85c-.24-.7-.38-1.46-.38-2.24z"/><path fill="#EA4335" d="M12 4.84c1.67 0 3.17.58 4.35 1.71l3.23-3.23C17.59 1.38 15.02 0 12 0 7.46 0 3.53 2.76 1.63 6.26l3.68 2.85c.94-2.82 3.58-4.92 6.69-4.92z"/>
                </svg>
              </button>
              <button className="flex-1 flex justify-center py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05 1.79-3.72 1.79-1.61 0-2.11-1-3.83-1-1.73 0-2.31 1-3.84 1-1.57 0-2.78-1.02-3.79-2.45-2.07-2.92-2.07-7.56 0-10.48 1.03-1.46 2.52-2.38 4.14-2.38 1.28 0 2.25.72 3.12.72.82 0 2.11-.88 3.55-.88 1.5 0 2.8.62 3.65 1.84-3.14 1.85-2.63 6.13.52 7.42-.74 1.81-1.73 3.44-2.8 4.42zM12.04 4.54c-.12-1.95 1.53-3.6 3.43-3.54.12 1.95-1.55 3.6-3.43 3.54z"/></svg>
              </button>
            </div>
          </div>

          {/* Left Side: Image Panel */}
          <div className="hidden lg:flex lg:w-1/2 relative bg-[#0B3D71]">
            <div className="absolute inset-0 opacity-60">
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80" 
                alt="Servixa Interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D71] via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center justify-center text-white p-16 text-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 flex items-center gap-2 mb-8 text-sm">
                <span>الخيار الأول للخدمات المنزلية الفاخرة</span>
                <div className="bg-green-500 rounded-full p-0.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>

              <h2 className="text-6xl font-extrabold mb-7 leading-tight">
                مرحباً بك في <span className="text-[#1093ED]">Servixa</span>
              </h2>
              
              <p className="text-lg text-gray-200 leading-relaxed max-w-lg mx-auto mb-14">
                نحن هنا لنجعل منزلك ملاذاً للراحة والجمال. سجل دخولك للوصول إلى أفضل المتخصصين المعتمدين في إدارة وصيانة المنازل.
              </p>

              <div className="flex items-center gap-5 bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10">
                <div className="flex -space-x-3.5 space-x-reverse">
                  <img src="https://i.pravatar.cc/100?img=11" className="w-12 h-12 rounded-full border-2 border-white" alt="expert" />
                  <img src="https://i.pravatar.cc/100?img=12" className="w-12 h-12 rounded-full border-2 border-white" alt="expert" />
                  <img src="https://i.pravatar.cc/100?img=13" className="w-12 h-12 rounded-full border-2 border-white" alt="expert" />
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-lg">+500 متخصص معتمد</p>
                  <p className="text-sm text-gray-300">جاهزون لخدمتك في أي وقت</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;