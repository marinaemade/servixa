import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  {
    q: "كيف أضمن جودة الخدمة المقدمة؟",
    a: "نحن نقوم بتصفية الموثوقين، ومحتاج دائماً مراجعة تقييمات ومسابقة أعمال، كل فني من اختيارنا خضع إلى نظام تقييم صارم، وتحقيق ونعاون من الاداء وكفاءة على عدم تأهيل عن البرنامج",
  },
  {
    q: "هل يجب عليّ الدفع مسبقاً؟",
    a: "لا، نظام الدفع يعمل بنظام الضمان. لا يتم تحويل المبلغ إلا بعد تأكيدك بالرضا عن الخدمة المقدمة.",
  },
  {
    q: "ماذا أفعل إذا تأخر الفني عن الموعد؟",
    a: "يمكنك التواصل مع فريق الدعم مباشرة وسنتدخل لحل المشكلة فوراً وضمان حقوقك.",
  },
  {
    q: "كيف يمكنني الانضمام كفني في Servixa؟",
    a: "يمكنك التسجيل كفني من خلال صفحة التسجيل وإرفاق المستندات المطلوبة وسيتم مراجعة طلبك خلال 48 ساعة.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          <span className="text-blue-500">أسئلة شائعة</span>.. كل ما تود معرفته
        </h2>
        <p className="text-gray-700 text-sm mb-10">
          جمعنا لك أكثر الأسئلة التي تشغل بالك لتجد إجاباتك بسرعة
        </p>
        <div className="space-y-3 text-right">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl border border-[#c4c4c4] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-100 transition"
              >
                <span>{faq.q}</span>
                {openIndex === i ? (
                  <FiChevronUp className="text-blue-500 text-lg shrink-0" />
                ) : (
                  <FiChevronDown className="text-gray-600 text-lg shrink-0" />
                )}
              </button>
              <div
                className={`px-5 text-sm text-gray-700 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? "max-h-40 pb-4" : "max-h-0"
                }`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
