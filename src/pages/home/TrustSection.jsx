import { MdVerifiedUser, MdPayment, MdThumbUp, MdStar } from "react-icons/md";

const cards = [
  {
    icon: <MdPayment className="text-3xl text-white" />,
    bg: "bg-[#064B81]",
    title: "نظام ضمان المدفوعات",
    desc: "فلوسك في أمان، لا يتم تحويل المبلغ المرصود إلا بعد تأكيدك باستلام الخدمة بالجودة المطلوبة",
  },
  {
    icon: <MdVerifiedUser className="text-3xl text-white" />,
    bg: "bg-green-500",
    title: "محترفون موثوقون",
    desc: "كل مزود خدمة يمر بمراحل تحقق دقيقة والتحقق من الهوية الشخصية على الانضمام إلينا",
  },
  {
    icon: <MdThumbUp className="text-3xl text-white" />,
    bg: "bg-blue-500",
    title: "ضمان جودة العمل",
    desc: "في حال وجود أي مشكلة في التنفيذ، فريق الدعم يتدخل لحل النزاع وضمان تنفيذ الخدمة بأفضل صورة",
  },
  {
    icon: <MdStar className="text-3xl text-white" />,
    bg: "bg-[#DD7608]",
    title: "تقييمات شفافة",
    desc: "التقييمات لا تظهر إلا من عملاء حقيقيين قاموا بتجربة الخدمة الفعل لضمان موضوعية المراجعات",
  },
];

export default function TrustSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-500 mb-2">
          حقك محفوظ.. <span className="text-gray-900">من البداية للنهاية</span>
        </h2>
        <p className="text-gray-800 text-md mb-10">
          في Servixa صممنا نظاماً متكاملاً يحمي العميل والمحترف، نضمان تجربة عادلة وآمنة للجميع
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm border-[1px] border-[#C4C4C4]">
              <div className={`w-14 h-14 ${card.bg} rounded-xl flex items-center justify-center`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
