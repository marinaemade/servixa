import { HiStar } from "react-icons/hi";
import WorkerCover from "../components/WorkerCover";
import WorkerStatistics from "../components/WorkerStatistics";
import { FaTools, FaUserCircle } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { LuShieldCheck } from "react-icons/lu";
import { PiBagSimple, PiBagSimpleLight } from "react-icons/pi";

const Evaluations = () => {
  return (
    <div>
      <WorkerCover />
      <div className="grid grid-cols-3 gap-5 my-5 px-2 md:px-5 items-start">
        <div className="grid grid-cols-2 col-span-2 gap-5">

          <div className="bg-gray-100 rounded-xl border border-[#C4C4C4] p-6 col-span-1">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-primary">4.8</div>
              <div className="flex justify-center mt-1 gap-0.5">
                <HiStar className="w-3.5 h-3.5 text-primary" />
                <HiStar className="w-3.5 h-3.5 text-primary" />
                <HiStar className="w-3.5 h-3.5 text-primary" />
                <HiStar className="w-3.5 h-3.5 text-primary" />
                <HiStar className="w-3.5 h-3.5 text-primary" />
              </div>
              <p className="text-xs text-gray-700 mt-1">بناءً على 128 مراجعة</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-900 w-12">5 نجوم</span>
                <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
                <span className="text-gray-900 w-12">85%</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-900 w-12">4 نجوم</span>
                <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "10%" }}
                  />
                </div>
                <span className="text-gray-900 w-12">10%</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-900 w-12">3 نجوم</span>
                <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "3%" }}
                  />
                </div>
                <span className="text-gray-900 w-12">3%</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-900 w-12">نجمتان</span>
                <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "1%" }}
                  />
                </div>
                <span className="text-gray-900 w-12">1%</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-900 w-12">نجمة</span>
                <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "1%" }}
                  />
                </div>
                <span className="text-gray-900 w-12">1%</span>
              </div>
            </div>
          </div>
          {/* reviews details */}
          <div className="bg-gray-100 rounded-xl border border-[#C4C4C4] p-6 col-span-1">
            <h2 className="text-lg">تفاصيل التقييم</h2>
            <div className="flex mt-10 md:mt-12 justify-around ">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="bg-blue-50 rounded-full p-5">
                  <FaTools className="text-primary w-8 h-8" />
                </div>
                <p className="mt-3 text-lg">جوده العمل</p>
                <div className="flex justify-center mt-1 gap-0.5">
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <div className="bg-blue-50 rounded-full p-5">
                  <MdOutlineMessage className="text-primary w-8 h-8" />
                </div>
                <p className="mt-3 text-lg">جوده العمل</p>
                <div className="flex justify-center mt-1 gap-0.5">
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <div className="bg-blue-50 rounded-full p-5">
                  <LuShieldCheck className="text-primary w-8 h-8" />
                </div>
                <p className="mt-3 text-lg">جوده العمل</p>
                <div className="flex justify-center mt-1 gap-0.5">
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
            </div>
          </div>
          {/* Clients reviews */}
          <h2 className="mt-4 text-xl font-semibold">تقييمات العملاء</h2>
          <div className="bg-gray-100 rounded-xl border border-[#C4C4C4] p-6 col-span-2">
            <div className="flex gap-2 items-center">
              <FaUserCircle className="text-3xl" />
              <div className="flex flex-col items-start">
                <p className="text-gray-900 font-semibold text-sm">محمد صابر</p>
                <div className="flex gap-1">
                  <span>
                    <PiBagSimple />
                  </span>
                  <p className="text-gray-800 text-xs">العميل</p>
                </div>
              </div>
            </div>

            <div className="flex justify-around items-center mt-5">
              <div className="flex flex-col items-center">
                <p className="text-lg">جوده العمل</p>
                <div className="flex justify-center mt-1 gap-0.5">
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg">التواصل</p>
                <div className="flex justify-center mt-1 gap-0.5">
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg">الاحترافيه</p>
                <div className="flex justify-center mt-1 gap-0.5">
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                  <HiStar className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-gray-700"> أنا مصمم واجهات وتجربة مستخدم (UI/UX) شغوف بخلق تجارب رقمية بسيطة
              ومنظمة. أمتلك خبرة واسعة في تصميم واجهات تطبيقات الهاتف المحمول
              وواجهات الألعاب، حيث أركز دائمًا على تحقيق التوازن المثالي بين
              الجمالية والوظيفية.أسلوبي في التصميم يعتمد على البساطة</p>
            </div>
          </div>
        </div>
        <WorkerStatistics className="col-span-1" />
      </div>
    </div>
  );
};

export default Evaluations;
