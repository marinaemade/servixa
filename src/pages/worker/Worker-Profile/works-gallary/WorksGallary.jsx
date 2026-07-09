import WorkerCover from "../components/WorkerCover";
import { Link } from "react-router-dom";

const WorksGallary = () => {
  return (
    <div>
      <WorkerCover />
      <div className="mt-8 mx-2 md:mx-5 border border-border-color rounded bg-bg-color p-5">
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">معرض الأعمال</h2>
            <h5 className="text-sm text-[#006E2F]">
              صور شغلك بتزود فرصك في القبول بنسبه 50%
            </h5>
          </div>
          <Link to="/worker-profile/add-project" className="w-full sm:w-auto block">
            <button className="w-full sm:w-auto border border-primary bg-[#E7F3FD] text-primary font-semibold py-2 px-4 rounded hover:bg-primary hover:text-white transition duration-300">
              + اضافه مشروع
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          {/* Add your project cards here */}
        </div>
      </div>
    </div>
  );
};

export default WorksGallary;
