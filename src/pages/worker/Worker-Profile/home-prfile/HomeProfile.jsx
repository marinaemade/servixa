import { HiUser } from "react-icons/hi";
import WorkerCover from "../components/WorkerCover";
import WorkerStatistics from "../components/WorkerStatistics";

const HomeProfile = () => {
  return (
    <div>
      <WorkerCover />
      <div className="grid grid-cols-3 gap-5 my-5 px-2 md:px-5 items-start">
        <div className="col-span-2">
          <div className="bg-gray-100 rounded-2xl border border-[#C4C4C4] p-5 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-bold text-foreground">نبذة عني</h3>
              <HiUser className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground leading-7 whitespace-pre-line">
              أنا مصمم واجهات وتجربة مستخدم (UI/UX) شغوف بخلق تجارب رقمية بسيطة
              ومنظمة. أمتلك خبرة واسعة في تصميم واجهات تطبيقات الهاتف المحمول
              وواجهات الألعاب، حيث أركز دائمًا على تحقيق التوازن المثالي بين
              الجمالية والوظيفية.أسلوبي في التصميم يعتمد على البساطة الهيكلية
              والوضوح، مما يسهل على المستخدمين التفاعل مع المنتج بسلاسة.أسعى
              دائمًا لتحويل الأفكار المعقدة إلى حلول بصرية سهلة الفهم
              والاستخدام.
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl border border-[#C4C4C4] p-6">
            <h3 className="text-lg font-bold mb-4">المهارات</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-gray-100 text-sm rounded-lg border-2 border-[#DAEFFE]">
                تركيب خلاطات
              </span>
              <span className="px-3 py-1 bg-blue-gray-100 text-sm rounded-lg border-2 border-[#DAEFFE]">
                تسليك مواسير
              </span>
            </div>
          </div>
        </div>
        <WorkerStatistics className="col-span-1" />
      </div>
    </div>
  );
};

export default HomeProfile;
