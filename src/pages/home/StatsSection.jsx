import { FiCheckCircle, FiStar, FiUsers, FiHeadphones } from "react-icons/fi";

const stats = [
  { icon: <FiCheckCircle className="text-2xl text-sky-500" />, value: "+10,000", label: "طلب تم إنجازه" },
  { icon: <FiUsers className="text-2xl text-sky-500" />, value: "+500", label: "فني محترف وموثوق" },
  { icon: <FiHeadphones className="text-2xl text-sky-500" />, value: "24/7", label: "دعم فني متواصل" },
  { icon: <FiStar className="text-2xl text-sky-500" />, value: "+4.8/5", label: "متوسط تقييم العملاء" },
];

export default function StatsSection() {
  return (
    <section className=" py-10">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl py-6 px-4 shadow-sm border-[1px] border-[#C4C4C4] hover:shadow-md duration-150"
              >
                <div className="text-white p-2 bg-blue-600 rounded-xl flex items-center justify-center font-semibold">
                  {stat.icon}
                </div>
                <span className="text-xl font-bold text-blue-600">
                  {stat.value}
                </span>
                <span className="text-sm text-[#424654]">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
  );
}