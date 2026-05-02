import { FiStar } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const testimonials = [
  {
    name: "أحمد منصور",
    text: "خدمة محترمة وراقية، ملتزم في المواعيد الفني كان ممتاز جداً في العمل، في كلمة فاصلة ومريحة ثابت توصياتي",
    stars: 5,
  },
  {
    name: "ريم القحطاني",
    text: "مريحة جداً مع طريق سير الشغل، موقع في الحكر وخاصة مناقشة في الله عيل، ساعدت عليهم دائماً في صيانة بيتي",
    stars: 5,
  },
  {
    name: "خالد محمود",
    text: "أفضل التطبيق بيوفر التطبيق، وصلوا على الموقع في القدس البحث عن فنيي مشاوير السعر كان مناسب جداً",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">ماذا قال عملاؤنا عنا؟</h2>
        <p className="text-gray-800 text-md mb-10 font-semibold">
          آراء حقيقية من مستخدمين اعتمدوا على Servixa لتطوير وتصليح منازلهم
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-[#C4C4C4] text-right">
              <div className="flex items-center gap-3 mb-3">
                <FaUserCircle className="text-3xl text-gray-600" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{t.name}</h4>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <FiStar key={j} className="text-amber-400 fill-amber-400 text-xs" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}