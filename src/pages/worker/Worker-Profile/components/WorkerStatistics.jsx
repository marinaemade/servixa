import { HiChartBar, HiShieldCheck } from 'react-icons/hi';
import { IoMdStar } from 'react-icons/io';

const WorkerStatistics = ({ profile, bookings = [], loading = false }) => {
  // Compute stats from real data if passed, else show placeholders
  const avgRating = profile?.averageRating ?? profile?.rating ?? null;
  const totalBookings = bookings.length;
  const completed = bookings.filter(b => b.status === 'Completed').length;
  const completionRate = totalBookings > 0 ? Math.round((completed / totalBookings) * 100) : (profile?.completionRate ?? 0);
  const onTime = profile?.onTimeRate ?? 100;
  const rehire = profile?.rehireRate ?? 0;
  const responseRate = profile?.responseRate ?? profile?.communicationRate ?? 0;

  const bars = [
    { label: 'إكمال المشاريع', value: completionRate, color: 'bg-primary' },
    { label: 'التسليم في الموعد', value: onTime, color: 'bg-green-500' },
    { label: 'إعادة التوظيف', value: rehire, color: 'bg-gray-800' },
    { label: 'نجاح التواصل', value: responseRate, color: 'bg-red-600' },
  ];

  return (
    <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
      <div className="bg-bg-color rounded-2xl border border-border-color p-5">
        <div className="flex items-center gap-2 mb-5">
          <h3 className="text-lg font-bold text-foreground">الإحصائيات</h3>
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <HiChartBar className="w-4 h-4 text-primary" />
          </div>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="space-y-1.5">
                <div className="h-3 bg-slate-200 rounded w-2/3" />
                <div className="h-2 bg-slate-100 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Rating */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-muted-foreground">التقييم العام</span>
                <span className="flex items-center gap-2 text-sm font-semibold text-green-500">
                  <IoMdStar />
                  <span>
                    {avgRating != null ? Number(avgRating).toFixed(1) : '—'}
                    {profile?.reviewCount != null && (
                      <span className="text-gray-800 text-xs"> ({profile.reviewCount} تقييم)</span>
                    )}
                  </span>
                </span>
              </div>
              <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-green-500" style={{ width: avgRating != null ? `${(avgRating / 5) * 100}%` : '0%' }} />
              </div>
            </div>

            {/* Other bars */}
            {bars.map(({ label, value, color }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-semibold text-primary">{value}%</span>
                </div>
                <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-primary rounded-2xl p-5 flex items-center gap-3">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <HiShieldCheck className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-white text-sm">مستوى الخبرة</p>
          <p className="text-white text-lg font-bold">{profile?.experienceLevel ?? 'خبير معتمد'}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkerStatistics;
