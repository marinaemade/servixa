import React, { useEffect, useState } from 'react';
import { HiStar } from 'react-icons/hi';
import WorkerCover from '../components/WorkerCover';
import WorkerStatistics from '../components/WorkerStatistics';
import { FaUserCircle } from 'react-icons/fa';
import { FaTools } from 'react-icons/fa';
import { MdOutlineMessage } from 'react-icons/md';
import { LuShieldCheck } from 'react-icons/lu';
import { PiBagSimple } from 'react-icons/pi';
import { FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../../../context/Context';
import { getReviewsByWorker } from '../../../../api/reviewService';

const StarRow = ({ count = 5 }) => (
  <div className="flex justify-center mt-1 gap-0.5">
    {Array(count).fill(0).map((_, i) => (
      <HiStar key={i} className="w-3.5 h-3.5 text-primary" />
    ))}
  </div>
);

// Build rating breakdown from real reviews
const buildBreakdown = (reviews = []) => {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => { const s = Math.round(r.rating ?? r.stars ?? 0); if (counts[s] !== undefined) counts[s]++; });
  const total = reviews.length || 1;
  const avg = reviews.length ? (reviews.reduce((s, r) => s + (r.rating ?? r.stars ?? 0), 0) / reviews.length).toFixed(1) : '0.0';
  return { counts, total: reviews.length, avg };
};

const Evaluations = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const workerId = user?.nameid ?? user?.sub ?? user?.id;
    if (!workerId) { setLoading(false); return; }
    getReviewsByWorker(workerId)
      .then((res) => {
        const data = res.data?.data ?? res.data ?? [];
        setReviews(Array.isArray(data) ? data : []);
      })
      .catch((err) => setError(err.message || 'فشل تحميل التقييمات'))
      .finally(() => setLoading(false));
  }, [user]);

  const { counts, total, avg } = buildBreakdown(reviews);
  const pct = (n) => total ? Math.round((counts[n] / total) * 100) : 0;

  return (
    <div>
      <WorkerCover />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 px-2 md:px-5 items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-5">

          {/* Overall Rating */}
          <div className="bg-bg-color rounded-xl border border-border-color p-6 col-span-1">
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-12 bg-slate-200 rounded w-1/2 mx-auto" />
                <div className="h-3 bg-slate-100 rounded w-1/3 mx-auto" />
                {[5,4,3,2,1].map(s => <div key={s} className="h-2 bg-slate-100 rounded" />)}
              </div>
            ) : (
              <>
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-primary">{avg}</div>
                  <StarRow />
                  <p className="text-xs text-gray-700 mt-1">بناءً على {total} مراجعة</p>
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <div key={n} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-900 w-12">{n === 1 ? 'نجمة' : n === 2 ? 'نجمتان' : `${n} نجوم`}</span>
                      <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${pct(n)}%` }} />
                      </div>
                      <span className="text-gray-900 w-12">{pct(n)}%</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Review Details */}
          <div className="bg-bg-color rounded-xl border border-border-color p-6 col-span-1">
            <h2 className="text-lg">تفاصيل التقييم</h2>
            <div className="flex mt-10 md:mt-12 justify-around">
              {[
                { Icon: FaTools, label: 'جودة العمل' },
                { Icon: MdOutlineMessage, label: 'التواصل' },
                { Icon: LuShieldCheck, label: 'الاحترافية' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center justify-center text-center">
                  <div className="bg-blue-50 rounded-full p-5">
                    <Icon className="text-primary w-8 h-8" />
                  </div>
                  <p className="mt-3 text-lg">{label}</p>
                  <StarRow />
                </div>
              ))}
            </div>
          </div>

          {/* Client Reviews */}
          <h2 className="mt-4 text-xl font-semibold">تقييمات العملاء</h2>
          {error && (
            <div className="col-span-2 flex items-center gap-2 text-red-500 text-sm font-bold">
              <FiAlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
          {loading && !error && (
            <div className="bg-bg-color rounded-xl border border-border-color p-6 col-span-1 md:col-span-2 animate-pulse space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-4 bg-slate-200 rounded" />)}
            </div>
          )}
          {!loading && !error && reviews.length === 0 && (
            <div className="bg-bg-color rounded-xl border border-border-color p-6 col-span-1 md:col-span-2 text-center text-gray-400">
              لا توجد تقييمات بعد
            </div>
          )}
          {!loading && reviews.map((review) => (
            <div key={review.id} className="bg-bg-color rounded-xl border border-border-color p-6 col-span-1 md:col-span-2">
              <div className="flex gap-2 items-center">
                <FaUserCircle className="text-3xl text-gray-400" />
                <div className="flex flex-col items-start">
                  <p className="text-gray-900 font-semibold text-sm">
                    {review.clientName ?? review.clientFullName ?? 'عميل'}
                  </p>
                  <div className="flex gap-1 items-center">
                    <PiBagSimple className="text-gray-600 w-3 h-3" />
                    <p className="text-gray-800 text-xs">العميل</p>
                  </div>
                </div>
                <div className="flex mr-auto gap-0.5">
                  {Array(5).fill(0).map((_, i) => (
                    <HiStar key={i} className={`w-4 h-4 ${i < Math.round(review.rating ?? review.stars ?? 0) ? 'text-amber-400' : 'text-gray-200'}`} />
                  ))}
                </div>
              </div>
              {review.comment && (
                <div className="mt-5">
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </div>
              )}
              {review.createdAt && (
                <p className="text-xs text-gray-400 mt-3 text-right">
                  {new Date(review.createdAt).toLocaleDateString('ar-EG')}
                </p>
              )}
            </div>
          ))}
        </div>
        <WorkerStatistics />
      </div>
    </div>
  );
};

export default Evaluations;
