import React from "react";
import { 
  FiLock, 
  FiChevronLeft, 
  FiChevronRight,
  FiCreditCard,
  FiTrendingUp,
  FiClock,
  FiArrowUpRight,
  FiDownload,
  FiChevronDown
} from "react-icons/fi";

const Wallet = () => {
  // Stat Card Data matching "المحفظة.png"
  const stats = [
    { id: 1, title: "الرصيد المتاح", value: "١٢,٤٥٠", unit: "ريال", icon: <FiCreditCard className="w-6 h-6 text-blue-500" />, bgIcon: "bg-blue-50" },
    { id: 2, title: "مصروفات الشهر الحالي", value: "١٢,٤٥٠", unit: "ريال", icon: <FiTrendingUp className="w-6 h-6 text-green-500" />, bgIcon: "bg-green-50" },
    { id: 3, title: "إجمالي المصروفات", value: "١٢,٤٥٠", unit: "ريال", icon: <FiClock className="w-6 h-6 text-amber-500" />, bgIcon: "bg-amber-50" },
    { id: 4, title: "المستحقات المعلقة", value: "١٢,٤٥٠", unit: "ريال", icon: <FiLock className="w-6 h-6 text-red-500" />, bgIcon: "bg-red-50" },
  ];

  // Financial Transactions Data matching "المحفظة.png"
  const financialHistory = [
    { id: 1, date: "12 مايو 2026", time: "09:30 PM", desc: "اصلاح شبكة مواسير في مبني تجاري", type: "- مصروف", typeColor: "text-red-500", price: "500 ج.م", priceColor: "text-red-500", status: "مكتمل", statusColor: "bg-green-50 text-green-600" },
    { id: 2, date: "12 مايو 2026", time: "09:30 PM", desc: "سحب ارباح عن طريق paypal", type: "↑ استرداد رصيد", typeColor: "text-blue-500", price: "500 ج.م", priceColor: "text-blue-600", status: "قيد المعالجة", statusColor: "bg-slate-100 text-slate-500" },
    { id: 3, date: "12 مايو 2026", time: "09:30 PM", desc: "اصلاح شبكة مواسير في مبني تجاري", type: "+ اضافة رصيد", typeColor: "text-green-600", price: "500 ج.م", priceColor: "text-green-600", status: "فشل", statusColor: "bg-red-50 text-red-500" },
    { id: 4, date: "12 مايو 2026", time: "09:30 PM", desc: "اصلاح شبكة مواسير في مبني تجاري", type: "- مصروف", typeColor: "text-red-500", price: "500 ج.م", priceColor: "text-red-500", status: "مكتمل", statusColor: "bg-green-50 text-green-600" },
    { id: 5, date: "12 مايو 2026", time: "09:30 PM", desc: "اصلاح شبكة مواسير في مبني تجاري", type: "- مصروف", typeColor: "text-red-500", price: "500 ج.م", priceColor: "text-red-500", status: "مكتمل", statusColor: "bg-green-50 text-green-600" },
  ];

  // Chart Visualization Mock Data
  const chartBars = [
    { label: "يونيو", value: 100, height: "h-[100px]" },
    { label: "مايو", value: 200, height: "h-[200px]" },
    { label: "أبريل", value: 140, height: "h-[140px]" },
    { label: "مارس", value: 170, height: "h-[170px]" },
    { label: "فبراير", value: 50, height: "h-[50px]" },
    { label: "يناير", value: 25, height: "h-[25px]" },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-3 sm:p-6 lg:p-8 font-sans overflow-x-hidden" dir="rtl">
      
      {/* 1. Statistics Cards Section */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white border border-gray-100 rounded-xl p-3 sm:p-5 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all">
            <div className={`p-2.5 sm:p-3 rounded-xl ${stat.bgIcon} mb-2 sm:mb-3`}>
              {stat.icon}
            </div>
            <span className="text-gray-400 text-xs sm:text-sm font-medium mb-1 text-center">{stat.title}</span>
            <div className="flex items-baseline gap-0.5 sm:gap-1 flex-wrap justify-center">
              <span className="text-lg sm:text-2xl font-bold text-slate-800">{stat.value}</span>
              {stat.unit && <span className="text-[10px] sm:text-xs text-gray-400 font-medium">{stat.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Overview Chart & Action Box Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Expenses Overview Chart Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800">نظرة عامة على المصروفات</h3>
              <p className="text-xs text-gray-400 mt-0.5">تحليل الأداء المالي لآخر 6 أشهر</p>
            </div>
            <button className="flex items-center gap-1 text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-500 bg-white hover:bg-gray-50">
              <span>آخر 6 أشهر</span>
              <FiChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bar Chart Graphics Container */}
          <div className="relative flex items-end justify-between pt-6 border-b border-gray-100 px-2 sm:px-4 h-[240px]">
            {/* Y-Axis Indicator Guidelines */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none text-[10px] text-gray-400">
              <div className="border-b border-gray-50 w-full pb-1">200</div>
              <div className="border-b border-gray-50 w-full pb-1">150</div>
              <div className="border-b border-gray-50 w-full pb-1">100</div>
              <div className="border-b border-gray-50 w-full pb-1">50</div>
              <div className="w-full text-transparent">0</div>
            </div>

            {/* Render Bars */}
            {chartBars.map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-2 z-10 w-1/6">
                <div className={`w-8 sm:w-12 bg-blue-500 rounded-t-md transition-all duration-500 ${bar.height} hover:bg-blue-600`} />
                <span className="text-xs text-gray-400 whitespace-nowrap mt-1">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Balance Deposit Action Card */}
        <div className="bg-blue-900 bg-gradient-to-b from-blue-950 to-blue-900 rounded-2xl p-5 sm:p-6 text-white flex flex-col justify-between shadow-md">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3">شحن رصيد</h3>
            <p className="text-xs text-blue-200/90 leading-relaxed text-justify">
              يمكنك شحن رصيدك مباشرة من حسابك البنكي أو عبر المحافظ الإلكترونية المعتمدة. تستغرق العملية من 24 إلى 48 ساعة عمل.
            </p>
          </div>

          {/* Registered Bank Account Info Box */}
          <div className="bg-white/10 border border-white/5 rounded-xl p-3.5 my-5 flex items-center justify-between text-right">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
              <FiCreditCard className="w-4 h-4" />
            </div>
            <div className="flex-1 mr-3 min-w-0">
              <h4 className="text-xs font-bold truncate">الحساب البنكي الرئيسي</h4>
              <p className="text-[11px] text-blue-200/80 tracking-widest mt-0.5" dir="ltr">**** **** **** 4590</p>
            </div>
          </div>

          {/* Call-to-action Action Button */}
          <button className="w-full bg-white text-blue-600 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-blue-50 transition-colors duration-200">
            <span>شحن / سحب رصيد</span>
            <FiArrowUpRight className="w-4 h-4 transform rotate-90" />
          </button>
        </div>

      </div>

      {/* 3. Financial Transactions Ledger Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">سجل العمليات المالية</h2>
          <button className="self-start sm:self-auto bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-sm hover:bg-blue-600 transition-colors">
            <FiDownload className="w-3.5 h-3.5" />
            <span>تصدير البيانات</span>
          </button>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="w-full overflow-x-auto [-webkit-overflow-scrolling:touch]">
            <table className="w-full text-center border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 text-slate-700 text-xs font-bold">
                  <th className="py-3.5 sm:py-4 px-4 border-l border-gray-100 w-[18%]">التاريخ</th>
                  <th className="py-3.5 sm:py-4 px-4 border-l border-gray-100 w-[35%]">الوصف</th>
                  <th className="py-3.5 sm:py-4 px-4 border-l border-gray-100 w-[17%]">نوع المعاملة</th>
                  <th className="py-3.5 sm:py-4 px-4 border-l border-gray-100 w-[15%]">المبلغ</th>
                  <th className="py-3.5 sm:py-4 px-4 w-[15%]">الحالة</th>
                </tr>
              </thead>
              <tbody className="text-[11px] sm:text-xs text-slate-600 divide-y divide-gray-100">
                {financialHistory.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-3.5 sm:py-4 px-4 border-l border-gray-100">
                      <div className="font-bold text-slate-700 mb-0.5">{row.time}</div>
                      <div className="text-gray-400 text-[10px] sm:text-[11px]">{row.date}</div>
                    </td>
                    <td className="py-3.5 sm:py-4 px-4 border-l border-gray-100 text-right font-medium text-slate-700 px-6">
                      {row.desc}
                    </td>
                    <td className={`py-3.5 sm:py-4 px-4 border-l border-gray-100 font-bold ${row.typeColor}`}>
                      {row.type}
                    </td>
                    <td className={`py-3.5 sm:py-4 px-4 border-l border-gray-100 font-bold ${row.priceColor}`}>{row.price}</td>
                    <td className="py-3.5 sm:py-4 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-md font-medium text-[10px] sm:text-[11px] ${row.statusColor}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
          <div className="bg-slate-50/50 border-t border-gray-100 py-3 sm:py-4 flex justify-center items-center gap-1.5">
            <button className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 transition-colors">
              <FiChevronRight className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md bg-blue-500 text-white font-bold text-xs shadow-sm">
              1
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs transition-colors">
              2
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs transition-colors">
              3
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 transition-colors">
              <FiChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Wallet;