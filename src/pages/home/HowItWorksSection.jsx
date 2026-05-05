import { MdOutlineAddTask, MdCompareArrows, MdCheckCircleOutline } from "react-icons/md";

const steps = [
  {
    icon: <MdOutlineAddTask className="text-3xl text-white" />,
    bg: "bg-red-500",
    title: "أضف مشكلتك",
    desc: "اشرح إلى محتاجه، ارفع صور المشكلة وحدد موقع بيتك ومواعيدك",
  },
  {
    icon: <MdCompareArrows className="text-3xl text-white" />,
    bg: "bg-blue-500",
    title: "قارن واختار براحتك",
    desc: "تصفح عروض الفنيين الموثوقين وشوف عروض الأسعار والتقييمات",
  },
  {
    icon: <MdCheckCircleOutline className="text-3xl text-white" />,
    bg: "bg-green-500",
    title: "استلم بيتك جاهز",
    desc: "نسّق موعد التنفيذ، استلم خدمتك بجودة عالية وقيّم تجربتك مع الفني",
  },
];

export default function HowItWorksSection() {
  return (
    <section className=" py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">
          عندك مهمة في <span className="text-blue-500">البيت</span> وعايز تخلصها؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm hover:shadow-md duration-150 border-[1px] border-[#C4C4C4]">
              <div className={`p-2 ${step.bg} rounded-xl flex items-center justify-center`}>
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-800 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
