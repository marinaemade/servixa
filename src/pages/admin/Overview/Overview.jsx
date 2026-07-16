import React, { useEffect, useState } from 'react';
import {
  FiUsers,
  FiBriefcase,
  FiCheckCircle,
  FiTrendingUp,
  FiAlertCircle,
  FiClock,
  FiUserCheck,
  FiUserX,
  FiSlash,
} from 'react-icons/fi';
import { getDashboardStats, getPendingWorkers, approveWorker, rejectWorker, blockWorker } from '../../../api/adminService';

const Overview = () => {
  const [stats, setStats] = useState(null);
  const [pendingWorkers, setPendingWorkers] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingWorkers, setLoadingWorkers] = useState(true);
  const [error, setError] = useState(null);
  const [actioningId, setActioningId] = useState(null);

  const fetchStats = () => {
    setLoadingStats(true);
    getDashboardStats()
      .then((res) => setStats(res.data?.data ?? res.data))
      .catch((err) => setError(err.message || 'فشل تحميل الإحصائيات'))
      .finally(() => setLoadingStats(false));
  };

  const fetchPendingWorkers = () => {
    setLoadingWorkers(true);
    getPendingWorkers()
      .then((res) => {
        const data = res.data?.data ?? res.data ?? [];
        setPendingWorkers(Array.isArray(data) ? data : []);
      })
      .catch(() => {})
      .finally(() => setLoadingWorkers(false));
  };

  useEffect(() => { fetchStats(); fetchPendingWorkers(); }, []);

  const handleAction = async (workerId, action) => {
    try {
      setActioningId(workerId);
      if (action === 'approve') await approveWorker(workerId);
      else if (action === 'reject') await rejectWorker(workerId);
      else if (action === 'block') await blockWorker(workerId);
      fetchPendingWorkers();
      fetchStats();
    } catch (err) {
      alert(err.message || 'فشل تنفيذ الإجراء');
    } finally {
      setActioningId(null);
    }
  };

  const statCards = stats ? [
    { id: 1, label: 'إجمالي المستخدمين', value: stats.totalUsers ?? stats.usersCount ?? '—', icon: <FiUsers className="w-6 h-6 text-blue-500" />, bg: 'bg-blue-50' },
    { id: 2, label: 'إجمالي الطلبات', value: stats.totalBookings ?? stats.bookingsCount ?? '—', icon: <FiBriefcase className="w-6 h-6 text-green-500" />, bg: 'bg-green-50' },
    { id: 3, label: 'الطلبات المكتملة', value: stats.completedBookings ?? '—', icon: <FiCheckCircle className="w-6 h-6 text-emerald-500" />, bg: 'bg-emerald-50' },
    { id: 4, label: 'الفنيون المعلقون', value: stats.pendingWorkers ?? pendingWorkers.length, icon: <FiClock className="w-6 h-6 text-amber-500" />, bg: 'bg-amber-50' },
  ] : [];

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden" dir="rtl">
      <h1 className="text-2xl font-black text-slate-800 mb-8">لوحة التحكم</h1>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm font-bold mb-6">
          <FiAlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loadingStats
          ? Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm animate-pulse flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-slate-200 rounded-xl" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
                <div className="h-6 bg-slate-100 rounded w-1/2" />
              </div>
            ))
          : statCards.map((card) => (
              <div key={card.id} className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col items-center shadow-sm hover:shadow-md transition-all">
                <div className={`p-3 rounded-xl ${card.bg} mb-3`}>{card.icon}</div>
                <span className="text-gray-400 text-xs font-medium mb-1 text-center">{card.label}</span>
                <span className="text-2xl font-bold text-slate-800">{card.value}</span>
              </div>
            ))
        }
      </div>

      {/* Pending Workers */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">الفنيون المعلقون للمراجعة</h2>
          <span className="bg-amber-50 text-amber-600 text-xs font-bold px-3 py-1 rounded-full border border-amber-100">
            {pendingWorkers.length} فني
          </span>
        </div>
        {loadingWorkers ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
            <span className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin inline-block" />
          </div>
        ) : pendingWorkers.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center text-gray-400">
            لا يوجد فنيون معلقون حالياً ✓
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-center border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 text-slate-700 text-xs font-bold">
                    <th className="py-4 px-4 border-l border-gray-100">الاسم</th>
                    <th className="py-4 px-4 border-l border-gray-100">البريد الإلكتروني</th>
                    <th className="py-4 px-4 border-l border-gray-100">التخصص</th>
                    <th className="py-4 px-4">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-slate-600 divide-y divide-gray-100">
                  {pendingWorkers.map((worker) => {
                    const name = worker.fullName ?? `${worker.firstName ?? ''} ${worker.lastName ?? ''}`.trim() ?? '—';
                    const isActioning = actioningId === worker.id;
                    return (
                      <tr key={worker.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="py-4 px-4 border-l border-gray-100 font-bold text-slate-700">{name}</td>
                        <td className="py-4 px-4 border-l border-gray-100 text-gray-500">{worker.email ?? '—'}</td>
                        <td className="py-4 px-4 border-l border-gray-100">{worker.specialty ?? worker.specialtyName ?? '—'}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-2 flex-wrap">
                            <button
                              onClick={() => handleAction(worker.id, 'approve')}
                              disabled={isActioning}
                              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                            >
                              <FiUserCheck className="w-3.5 h-3.5" />
                              قبول
                            </button>
                            <button
                              onClick={() => handleAction(worker.id, 'reject')}
                              disabled={isActioning}
                              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                            >
                              <FiUserX className="w-3.5 h-3.5" />
                              رفض
                            </button>
                            <button
                              onClick={() => handleAction(worker.id, 'block')}
                              disabled={isActioning}
                              className="flex items-center gap-1 bg-slate-500 hover:bg-slate-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                            >
                              <FiSlash className="w-3.5 h-3.5" />
                              حظر
                            </button>
                            {isActioning && (
                              <span className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;