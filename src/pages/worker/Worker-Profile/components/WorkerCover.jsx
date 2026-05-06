import { HiBriefcase, HiCheckBadge, HiMapPin } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

const WorkerCover = () => {
  return (
    <div className=" pt-8 px-2 md:px-5">
      <div className="bg-gray-100 flex flex-col border border-[#C4C4C4] rounded-xl">
        <div className="text-end pt-3 pl-3">
          <button className="btn-primary">تعديل الحساب</button>
        </div>
        <div className="self-center">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-card shadow-lg">
                <img
                  src="/user.jpg"
                  alt="أحمد منصور"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-1 right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                <HiCheckBadge className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-lg font-bold text-foreground mt-3">
              أحمد منصور
            </h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <HiBriefcase className="w-4 h-4" />
                سبّاك
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <HiMapPin className="w-4 h-4" />
                العنوان
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-fit bg-[#E7EBEE] p-1 rounded-xl gap-6 mt-12">
          <NavLink
            to="/worker-profile"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg duration-150 text-md font-normal ${
                isActive
                  ? "bg-white text-primary text-lg"
                  : "text-gray-800 hover:bg-white hover:text-primary"
              }`
            }
          >
            الملف الشخصي
          </NavLink>
          <NavLink
            to="/worker-profile/reviews"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg duration-150 text-md font-normal ${
                isActive
                  ? "bg-white text-primary text-lg"
                  : "text-gray-800 hover:bg-white hover:text-primary"
              }`
            }
          >
            التقييمات
          </NavLink>
          <NavLink
            to="/worker-profile/portfolio"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg duration-150 text-md font-normal ${
                isActive
                  ? "bg-white text-primary text-lg"
                  : "text-gray-800 hover:bg-white hover:text-primary"
              }`
            }
          >
            معرض الاعمال
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WorkerCover;
