import React, { useEffect, useState } from 'react';
import {
  FiTool,
  FiActivity,
  FiZap,
  FiClock,
  FiAlertCircle,
} from 'react-icons/fi';
import { getMyBookings } from '../../../api/clientService';

const statusMap = {
  Pending: { label: 'قيد الانتظار', bg: 'bg-amber-100 text-amber-600 border-amber-200' },
  Accepted: { label: 'مقبول', bg: 'bg-blue-50 text-blue-500 border-blue-100' },
  InProgress: { label: 'قيد التنفيذ', bg: 'bg-blue-50 text-blue-500 border-blue-100' },
  Completed: { label: 'مكتمل', bg: 'bg-green-50 text-green-600 border-green-100' },
  Cancelled: { label: 'ملغي', bg: 'bg-red-50 text-red-500 border-red-100' },
};

const getIcon = (status) => {
  if (status === 'Completed') return { icon: <FiActivity className="w-5 h-5 text-green-600" />, bg: 'bg-green-50' };
  if (status === 'Cancelled') return { icon: <FiZap className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-50' };
  return { icon: <FiTool className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50' };
};

const ClientProjects = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyBookings()
      .then((res) => {
        const data = res.data?.data ?? res.data ?? [];
        setBookings(Array.isArray(data) ? data : []);
      })
      .catch((err) => setError(err.message || 'فشل تحميل المشاريع'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-3.5 w-full" dir="rtl">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-sm animate-pulse flex gap-4">
            <div className="w-11 h-11 bg-slate-200 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-3 bg-slate-100 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center" dir="rtl">
        <FiAlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-red-500 font-bold">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold">إعادة المحاولة</button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12 font-bold" dir="rtl">
        لا توجد مشاريع بعد
      </div>
    );
  }

  return (
    <div className="space-y-3.5 w-full" dir="rtl">
      {bookings.map((booking) => {
        const st = statusMap[booking.status] ?? { label: booking.status, bg: 'bg-gray-100 text-gray-500 border-gray-200' };
        const { icon, bg } = getIcon(booking.status);
        const title = booking.taskTitle ?? booking.specialty ?? 'خدمة';
        const workerName = booking.workerName ?? '—';
        const date = booking.scheduledDate
          ? `${new Date(booking.scheduledDate).toLocaleDateString('ar-EG')} • ${new Date(booking.scheduledDate).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}`
          : '—';
        const price = booking.totalPrice ? `${booking.totalPrice} ج.م` : '—';

        return (
          <div
            key={booking.id}
            className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0 border border-slate-50 shadow-sm`}>
                {icon}
              </div>
              <div className="space-y-1.5 text-right">
                <h3 className="text-sm sm:text-base font-bold text-slate-800">{title}</h3>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1">
                    <FiClock className="w-3.5 h-3.5 text-slate-300" />
                    {date}
                  </span>
                  <span className="hidden sm:inline text-slate-200">•</span>
                  <span>
                    الفني: <span className="text-blue-500 font-bold">{workerName}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-50">
              <span className="text-base font-black text-green-600" dir="ltr">{price}</span>
              <span className={`text-[10px] sm:text-xs px-2.5 py-1 rounded-lg font-bold border ${st.bg}`}>
                {st.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClientProjects;