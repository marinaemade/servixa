import React, { useEffect, useState } from 'react';
import { HiUser } from 'react-icons/hi';
import WorkerCover from '../components/WorkerCover';
import WorkerStatistics from '../components/WorkerStatistics';
import { getWorkerProfileById } from '../../../../api/workerService';
import { getWorkerBookings } from '../../../../api/bookingService';
import { useAuth } from '../../../../context/Context';
import { FiAlertCircle } from 'react-icons/fi';

const HomeProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const workerId = user?.nameid ?? user?.sub ?? user?.id;
    if (!workerId) { setLoading(false); return; }

    Promise.all([
      getWorkerProfileById(workerId),
      getWorkerBookings(workerId),
    ])
      .then(([profileRes, bookingsRes]) => {
        setProfile(profileRes.data?.data ?? profileRes.data);
        const raw = bookingsRes.data?.data ?? bookingsRes.data ?? [];
        setBookings(Array.isArray(raw) ? raw : []);
      })
      .catch((err) => setError(err.message || 'فشل تحميل البيانات'))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div>
      <WorkerCover workerProfile={profile} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 px-2 md:px-5 items-start">
        <div className="col-span-1 md:col-span-2 space-y-5">

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm font-bold bg-red-50 border border-red-200 rounded-xl p-3">
              <FiAlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          {/* Bio */}
          <div className="bg-bg-color rounded-2xl border border-border-color p-5 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-bold text-foreground">نبذة عني</h3>
              <HiUser className="w-5 h-5 text-primary" />
            </div>
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-3 bg-slate-200 rounded w-full" />
                <div className="h-3 bg-slate-200 rounded w-5/6" />
                <div className="h-3 bg-slate-100 rounded w-4/5" />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground leading-7 whitespace-pre-line">
                {profile?.bio ?? profile?.about ?? 'لم يتم إضافة نبذة بعد.'}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="bg-bg-color rounded-2xl border border-border-color p-6">
            <h3 className="text-lg font-bold mb-4">المهارات</h3>
            {loading ? (
              <div className="flex gap-2 flex-wrap animate-pulse">
                {[1,2,3].map(i => <div key={i} className="h-7 w-24 bg-slate-200 rounded-lg" />)}
              </div>
            ) : (profile?.tasks ?? profile?.skills ?? []).length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {(profile?.tasks ?? profile?.skills ?? []).map((task, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-gray-100 text-sm rounded-lg border-2 border-border-color">
                    {typeof task === 'string' ? task : (task.name ?? task.title)}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">لم يتم إضافة مهارات بعد.</p>
            )}
          </div>

          {/* Upcoming Bookings */}
          <div className="bg-bg-color rounded-2xl border border-border-color p-6">
            <h3 className="text-lg font-bold mb-4">الحجوزات القادمة</h3>
            {loading ? (
              <div className="animate-pulse space-y-3">
                {[1,2].map(i => <div key={i} className="h-12 bg-slate-200 rounded-xl" />)}
              </div>
            ) : bookings.filter(b => b.status === 'Pending' || b.status === 'Accepted').length === 0 ? (
              <p className="text-sm text-muted-foreground">لا توجد حجوزات قادمة حالياً.</p>
            ) : (
              <div className="space-y-3">
                {bookings
                  .filter(b => b.status === 'Pending' || b.status === 'Accepted')
                  .slice(0, 5)
                  .map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between border border-border-color rounded-xl p-3">
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground">{booking.taskTitle ?? 'طلب خدمة'}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.clientName ?? 'عميل'} •{' '}
                          {booking.scheduledDate
                            ? new Date(booking.scheduledDate).toLocaleDateString('ar-EG')
                            : '—'}
                        </p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-lg font-bold ${
                        booking.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-blue-50 text-blue-500'
                      }`}>
                        {booking.status === 'Pending' ? 'معلق' : 'مقبول'}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>

        </div>
        <WorkerStatistics profile={profile} bookings={bookings} loading={loading} />
      </div>
    </div>
  );
};

export default HomeProfile;
