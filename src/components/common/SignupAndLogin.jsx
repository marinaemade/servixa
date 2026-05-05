import React from 'react'

const SignupAndLogin = () => {
  return (
    <div className="hidden md:flex md:w-1/2 relative bg-[#0B3D71]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="../../../public/loginImage.png"
          alt="Servixa Interior"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D71] via-transparent to-transparent"></div>
      </div>

      {/* Content — right-to-left, text aligned right */}
      <div className="relative z-10 w-full flex flex-col justify-center text-white px-10 py-16 text-right" dir="rtl">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 self-start text-sm">
          <span>الخيار الأول للخدمات المنزلية الفاخرة</span>
          <div className="bg-green-500 rounded-full p-0.5 shrink-0">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-5xl font-extrabold mb-6 leading-tight">
          مرحباً بك في <span className="text-[#1093ED]">Servixa</span>
        </h2>

        {/* Paragraph */}
        <p className="text-base text-gray-200 leading-relaxed mb-12 max-w-sm">
          نحن هنا لنجعل منزلك ملاذاً للراحة والجمال. سجل دخولك للوصول إلى أفضل المتخصصين المعتمدين في إدارة وصيانة المنازل.
        </p>

        {/* Stats card — row: text on right, avatars on left */}
        <div className="inline-flex flex-row items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 self-start">
          {/* Text (right side in RTL) */}
          <div className="text-right">
            <p className="font-extrabold text-base">+500 متخصص معتمد</p>
            <p className="text-sm text-gray-300">جاهزون لخدمتك في أي وقت</p>
          </div>
          {/* Avatars (left side in RTL) */}
          <div className="flex flex-row-reverse -space-x-3 space-x-reverse">
            <img src="https://i.pravatar.cc/100?img=11" className="w-11 h-11 rounded-full border-2 border-white" alt="expert" />
            <img src="https://i.pravatar.cc/100?img=12" className="w-11 h-11 rounded-full border-2 border-white -mr-3" alt="expert" />
            <img src="https://i.pravatar.cc/100?img=13" className="w-11 h-11 rounded-full border-2 border-white -mr-3" alt="expert" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignupAndLogin