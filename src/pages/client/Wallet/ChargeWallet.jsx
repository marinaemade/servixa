import React, { useState } from "react";
import { 
  FiX, 
  FiPlusCircle, 
  FiDownload, 
  FiCreditCard, 
  FiBriefcase, 
  FiHome, 
  FiArrowLeft 
} from "react-icons/fi";

const ChargeWallet = () => {
  // State management to replicate toggle buttons and selections exactly as in "سحب ارباح.png"
  const [activeTab, setActiveTab] = useState("charge"); // "charge" or "withdraw"
  const [method, setMethod] = useState("bank"); // "bank", "wallet", or "card"
  const [amount, setAmount] = useState("1,000");

  return (
    <div className="w-full min-h-screen bg-slate-100/70 p-4 sm:p-8 flex items-center justify-center font-sans overflow-x-hidden" dir="rtl">
      
      {/* Main Modal Container modeled directly from "سحب ارباح.png" */}
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 shadow-xl relative border border-gray-100 transition-all">
        
        {/* Close Button Top Left */}
        <button className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-slate-50">
          <FiX className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-600 mb-8 mt-2 sm:mt-0">
          طلب شحن/ سحب رصيد
        </h2>

        {/* 1. Toggle Tabs: شحن رصيد / سحب رصيد */}
        <div className="bg-slate-100/80 p-1.5 rounded-xl flex items-center gap-1 w-full mb-8">
          <button
            onClick={() => setActiveTab("charge")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
              activeTab === "charge"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FiPlusCircle className={`w-4 h-4 ${activeTab === "charge" ? "text-blue-500" : "text-gray-400"}`} />
            <span>شحن رصيد</span>
          </button>
          
          <button
            onClick={() => setActiveTab("withdraw")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
              activeTab === "withdraw"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FiDownload className={`w-4 h-4 ${activeTab === "withdraw" ? "text-blue-500" : "text-gray-400"}`} />
            <span>سحب رصيد</span>
          </button>
        </div>

        {/* Amount Entry Area Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs sm:text-sm font-bold text-gray-400">تحديد المبلغ</label>
          </div>
          
          {/* Custom Input Wrapper holding the "سحب الكل" button layout */}
          <div className="bg-slate-50 border border-gray-200/80 rounded-xl p-3 flex items-center justify-between gap-4">
            <button className="bg-white border border-blue-200 hover:border-blue-400 text-blue-500 text-xs sm:text-sm font-bold py-2 px-4 sm:px-5 rounded-lg transition-colors whitespace-nowrap shadow-sm">
              سحب الكل
            </button>
            <input 
              type="text" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-right text-xl sm:text-2xl font-bold text-slate-700 w-full focus:outline-none placeholder-gray-300"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Ledger Calculations Info Subtext */}
        <div className="flex flex-wrap justify-between items-center gap-2 text-xs sm:text-sm mb-8 font-medium px-1">
          <div className="text-blue-600 font-bold">
            الصافي: <span dir="ltr">980 ر.س</span>
          </div>
          <div className="text-gray-400 flex items-center gap-1.5 flex-wrap justify-end">
            <span>المبلغ: <span className="text-slate-700 font-bold" dir="ltr">1,000 ر.س</span></span>
            <span className="text-gray-200">|</span>
            <span>الرسوم: <span className="text-red-500 font-bold" dir="ltr">20 ر.س</span></span>
          </div>
        </div>

        {/* 2. Method Selection Grid Cards */}
        <div className="mb-10">
          <label className="block text-xs sm:text-sm font-bold text-gray-400 mb-3">طريقة الشحن</label>
          <div className="grid grid-cols-3 gap-3">
            
            {/* Bank Transfer Option */}
            <button 
              onClick={() => setMethod("bank")}
              className={`border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                method === "bank" 
                  ? "border-blue-500 bg-blue-50/40 ring-1 ring-blue-500 text-blue-600" 
                  : "border-gray-200 hover:border-gray-300 text-gray-500 bg-white"
              }`}
            >
              <FiHome className={`w-5 h-5 sm:w-6 sm:h-6 ${method === "bank" ? "text-blue-500" : "text-gray-400"}`} />
              <span className="text-xs sm:text-sm font-bold whitespace-nowrap">تحويل بنكي</span>
            </button>

            {/* Wallet Option */}
            <button 
              onClick={() => setMethod("wallet")}
              className={`border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                method === "wallet" 
                  ? "border-blue-500 bg-blue-50/40 ring-1 ring-blue-500 text-blue-600" 
                  : "border-gray-200 hover:border-gray-300 text-gray-500 bg-white"
              }`}
            >
              <FiBriefcase className={`w-5 h-5 sm:w-6 sm:h-6 ${method === "wallet" ? "text-blue-500" : "text-gray-400"}`} />
              <span className="text-xs sm:text-sm font-bold whitespace-nowrap">محفظة</span>
            </button>

            {/* Card Option */}
            <button 
              onClick={() => setMethod("card")}
              className={`border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                method === "card" 
                  ? "border-blue-500 bg-blue-50/40 ring-1 ring-blue-500 text-blue-600" 
                  : "border-gray-200 hover:border-gray-300 text-gray-500 bg-white"
              }`}
            >
              <FiCreditCard className={`w-5 h-5 sm:w-6 sm:h-6 ${method === "card" ? "text-blue-500" : "text-gray-400"}`} />
              <span className="text-xs sm:text-sm font-bold whitespace-nowrap">بطاقة</span>
            </button>

          </div>
        </div>

        {/* 3. Main Call-to-action Action Submit Button */}
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-md transition-colors mb-5">
          <span>التالي</span>
          <FiArrowLeft className="w-4 h-4" />
        </button>

        {/* Informative Help/Processing Subtext Message Footer */}
        <p className="text-[10px] sm:text-xs text-gray-400 text-center leading-relaxed max-w-md mx-auto">
          يتم معالجة الطلبات خلال 24-48 ساعة ستصلك رسالة نصية فور إتمام التحويل.
        </p>

      </div>
    </div>
  );
};

export default ChargeWallet;