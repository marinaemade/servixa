import React, { useState } from "react";
import { 
  FiTool, 
  FiActivity, 
  FiZap, 
  FiClock 
} from "react-icons/fi";

const ClientProjects = () => {
  const [activeTab, setActiveTab] = useState("projects");

  const projects = [
    {
      id: 1,
      title: "سباكة",
      date: "12 مايو 2024 • 09:30 مساءً",
      expert: "سامي أحمد",
      amount: "+500 ج.م",
      amountColor: "text-green-600",
      status: "قيد التنفيذ",
      statusBg: "bg-blue-50 text-blue-500 border-blue-100",
      icon: <FiTool className="w-5 h-5 text-blue-600" />,
      iconBg: "bg-blue-50"
    },
    {
      id: 2,
      title: "تنظيف",
      date: "12 مايو 2024 • 09:30 مساءً",
      expert: "سامي أحمد",
      amount: "+500 ج.م",
      amountColor: "text-green-600",
      status: "مكتمل",
      statusBg: "bg-green-50 text-green-600 border-green-100",
      icon: <FiActivity className="w-5 h-5 text-green-600" />,
      iconBg: "bg-green-50"
    },
    {
      id: 3,
      title: "كهرباء",
      date: "12 مايو 2024 • 09:30 مساءً",
      expert: "سامي أحمد",
      amount: "+500 ج.م",
      amountColor: "text-red-500",
      status: "ملغي",
      statusBg: "bg-red-50 text-red-500 border-red-100",
      icon: <FiZap className="w-5 h-5 text-amber-500" />,
      iconBg: "bg-amber-50"
    }
  ];

  return (
    <div className="space-y-3.5 w-full" dir="rtl">
      {projects.map((project) => (
        <div 
          key={project.id} 
          className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md"
        >
          {/* تفاصيل المشروع والرموز والأيقونات */}
          <div className="flex items-start gap-4 flex-1">
            <div className={`w-11 h-11 rounded-xl ${project.iconBg} flex items-center justify-center shrink-0 border border-slate-50 shadow-sm`}>
              {project.icon}
            </div>
            <div className="space-y-1.5 text-right">
              <h3 className="text-sm sm:text-base font-bold text-slate-800">{project.title}</h3>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-gray-400 font-medium">
                <span className="flex items-center gap-1">
                  <FiClock className="w-3.5 h-3.5 text-slate-300" />
                  {project.date}
                </span>
                <span className="hidden sm:inline text-slate-200">•</span>
                <span>
                  الفني: <a href="#" className="text-blue-500 font-bold hover:underline">{project.expert}</a>
                </span>
              </div>
            </div>
          </div>

          {/* القيمة المالية ووسم الحالة */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-50">
            <span className={`text-base font-black ${project.amountColor}`} dir="ltr">
              {project.amount}
            </span>
            <span className={`text-[10px] sm:text-xs px-2.5 py-1 rounded-lg font-bold border ${project.statusBg}`}>
              {project.status}
            </span>
          </div>

        </div>
      ))}
    </div>
  );
};

export default ClientProjects;