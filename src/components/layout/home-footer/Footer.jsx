import { CardFooter } from "@material-tailwind/react";
import { FaGlobe, FaFacebookF, FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoShieldCheck } from "react-icons/go";

export default function Footer() {
  return (
    <CardFooter className="bg-[#1a3a5c] text-white font-['Cairo']">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="text-right">
            <h2 className="text-3xl font-bold mb-4">Servixa</h2>
            <p className="text-sm text-gray-300 leading-7">
              أول منصة عمل حر في المنطقة متخصصة في الخدمات المنزلية، تجمع بين أصحاب البيوت وأمهر الفنيين في مكان واحد لضمان الجودة والأمان.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="p-2 rounded-full border border-gray-400 flex items-center justify-center text-white hover:bg-black transition">
                <FaXTwitter className="text-lg font-semibold" />
              </a>
              <a href="#" className="p-2 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:bg-white/10 transition">
                <FaWhatsapp className="text-lg font-semibold text-green-600" />
              </a>
              <a href="#" className="p-2 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:bg-blue-500 transition">
                <FaFacebookF className="text-lg font-semibold" />
              </a>
              <a href="#" className="p-2 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:bg-white/10 transition">
                <FaGlobe className="text-lg font-semibold" />
              </a>
            </div>
          </div>

          <div className="text-right">
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition">عن Servixa</a></li>
              <li><a href="#" className="hover:text-white transition">كيف يعمل الموقع؟</a></li>
              <li><a href="#" className="hover:text-white transition">التصنيفات (الخدمات)</a></li>
              <li><a href="#" className="hover:text-white transition">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:text-white transition">انضم كمزود خدمة</a></li>
            </ul>
          </div>

          <div className="text-right">
            <h3 className="text-lg font-bold mb-6">Support & Legal</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition">مركز المساعدة</a></li>
              <li><a href="#" className="hover:text-white transition">شروط الاستخدام</a></li>
              <li><a href="#" className="hover:text-white transition">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-white transition">ضمان حقوقك</a></li>
              <li><a href="#" className="hover:text-white transition">تواصل معنا</a></li>
            </ul>
          </div>

          <div className="text-right">
            <h3 className="text-lg font-bold mb-4">خليك على اطلاع</h3>
            <p className="text-sm text-gray-300 mb-6">اشترك ليصلك أحدث العروض والنصائح لمنزلك</p>

            <div className="flex items-center bg-[#0f2d4a] rounded-full overflow-hidden mb-4">
              <button className="bg-[#2563eb] hover:bg-[#1d4ed8] transition p-3 rounded-full m-1 flex-shrink-0">
                <FaArrowLeft className="text-white" size={18} />
              </button>
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="bg-transparent text-white text-sm placeholder-gray-400 px-4 py-3 w-full outline-none text-right"
              />
            </div>

            <div className="bg-[#2563eb] rounded-2xl px-5 py-4 flex items-center gap-3 justify-end">
              <div className="text-right">
                <p className="font-bold text-sm">خدمة مضمونة</p>
                <p className="text-xs text-blue-200">نحن نضمن جودة كل خدمة</p>
              </div>
              <div className="bg-white/20 rounded-xl p-2">
                <GoShieldCheck size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-400 order-2 sm:order-1">
            جميع الحقوق محفوظة لشركة Servixa 2026 ©. صنع بكل حب لخدمة بيوتنا.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400 order-1 sm:order-2">
            <FaGlobe size={14} />
            <span>العربية</span>
          </div>
        </div>
      </div>
    </CardFooter>
  );
}