import { HiChartBar, HiShieldCheck } from "react-icons/hi";
import { IoMdStar } from "react-icons/io";

const WorkerStatistics = () => {
  return (
    <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
      <div className="bg-bg-color rounded-2xl border border-border-color p-5">
        <div className="flex items-center gap-2 mb-5">
          <h3 className="text-lg font-bold text-foreground">الإحصائيات</h3>
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <HiChartBar className="w-4 h-4 text-primary" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-muted-foreground">
                التقييم العام
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold text-green-500">
                <IoMdStar />
                <span>
                  5.0 <span className="text-gray-800 text-xs">(3 تقييمات)</span>
                </span>
              </span>
            </div>
            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm">
                إكمال المشاريع
              </span>
              <span className="text-sm font-semibold text-primary">75%</span>
            </div>
            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: "75%" }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-muted-foreground">
                التسليم في الموعد
              </span>
              <span className="text-sm font-semibold text-green-500">
                100%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-muted-foreground">
                إعادة التوظيف
              </span>
              <span className="text-sm font-semibold ">
                0%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gray-800"
                style={{ width: "0%" }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-muted-foreground">
                نجاح التواصل
              </span>
              <span className="text-sm font-semibold text-red-600">21.05%</span>
            </div>
            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-red-600"
                style={{ width: "21%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary rounded-2xl p-5 flex items-center gap-3">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <HiShieldCheck className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-white text-sm">مستوى الخبرة</p>
          <p className="text-white text-lg font-bold">خبير معتمد</p>
        </div>
      </div>
    </div>
  );
};

export default WorkerStatistics;
