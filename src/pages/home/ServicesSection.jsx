import {
  MdPlumbing,
  MdElectricalServices,
  MdAcUnit,
  MdCarpenter,
  MdCleaningServices,
  MdConstruction,
  MdDevices,
  MdFormatPaint,
} from "react-icons/md";

const services = [
  { icon: <MdPlumbing className="text-3xl text-[#001AAF]" />, label: "سباكة" },
  { icon: <MdElectricalServices className="text-3xl text-[#CA8A04]" />, label: "كهرباء" },
  { icon: <MdAcUnit className="text-3xl text-[#0891B2]" />, label: "تكييف" },
  { icon: <MdCarpenter className="text-3xl text-[#C2410C]" />, label: "نجارة" },
  { icon: <MdFormatPaint className="text-3xl text-[#9333EA]" />, label: "نقاشة" },
  { icon: <MdDevices className="text-3xl text-[#059669]" />, label: "أجهزة منزلية" },
  { icon: <MdConstruction className="text-3xl text-[#334155]" />, label: "حدادة" },
  { icon: <MdCleaningServices className="text-3xl text-[#16A34A]" />, label: "نظافة" },
];

export default function ServicesSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 text-center py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          كل اللي تحتاجه..<span className="text-blue-500">في مكان واحد</span>
        </h2>
        <p className="text-gray-500 text-sm mb-10">تصفح أكثر من 20 فئة خدمية تغطي كل احتياجات منزلك</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 flex flex-col items-center gap-3 shadow-sm hover:scale-[1.02] hover:shadow-md transition cursor-pointer border-[1px] border-[#C4C4C4]"
            >
              <div className="p-2 rounded-xl flex items-center justify-center">
                {s.icon}
              </div>
              <span className="text-sm font-semibold text-gray-700">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}