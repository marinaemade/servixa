import { FiUploadCloud } from "react-icons/fi";
import { FaRegWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const AddProject = () => {
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    images: [],
  });

  const handleProjectDetailsSubmit = () => {
    console.log("Project Details:", projectDetails);
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 sm:p-6">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl px-8 sm:px-5">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b-2 border-border-color py-2 bg-white/80 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-[#191C1D]">إضافة مشروع</h2>
          <Link to="/worker-profile/portfolio">
            <FaRegWindowClose className="text-2xl hover:text-primary" />
          </Link>
        </div>

        <div className="my-6">
          <div>
            <label
              htmlFor="project-title"
              className="mb-2 block text-md font-semibold text-[#191C1D] sm:text-base"
            >
              عنوان المشروع
            </label>
            <input
              id="project-title"
              value={projectDetails.title}
              onChange={(e) =>
                setProjectDetails({ ...projectDetails, title: e.target.value })
              }
              placeholder="اكتب عنوان للمشروع"
              className="w-full rounded-xl border border-[#C4C4C4] bg-[#F9FAFA] text-gray-900 placeholder:text-gray-500 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="project-description"
              className="mb-2 block text-md font-semibold text-[#191C1D] sm:text-base"
            >
              الوصف
            </label>
            <textarea
              id="project-description"
              value={projectDetails.description}
              onChange={(e) =>
                setProjectDetails({ ...projectDetails, description: e.target.value })
              }
              rows={6}
              placeholder="اكتب ماذا فعلت في المشروع"
              className="w-full resize-none rounded-xl border border-[#C4C4C4] bg-[#F9FAFA] text-gray-900 placeholder:text-gray-500 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-md font-semibold text-[#191C1D] sm:text-base">
              الصور
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              <label
                htmlFor="project-images"
                className="cursor-pointer flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/60 px-2 text-center transition hover:bg-blue-50"
              >
                <FiUploadCloud className="text-blue-500 text-3xl" />
                <span className="text-xs font-semibold text-blue-600 sm:text-sm">
                  اضغط لاضافة الصور
                </span>
                <span className="text-[10px] text-blue-400 sm:text-xs">
                  PDF, JPG (حد أقصى 5 MB)
                </span>
              </label>
              <input type="file" id="project-images" className="hidden" />
            </div>
          </div>
        </div>

        <div className="border-t-2 border-border-color px-5 py-5 sm:px-8">
          <Link to="/worker-profile/portfolio">
            <button 
            onClick={handleProjectDetailsSubmit}
            className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:text-base">
              إضافة المشروع
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
