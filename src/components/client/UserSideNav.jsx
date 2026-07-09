import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiCreditCard,
  FiTool,
  FiUser,
  FiFolder,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import { MdHomeRepairService } from "react-icons/md";
import {useAuth} from './../../context/Context';

const UserSideNav = ({ open, setOpen }) => {
  const links = [
    {
      name: "الرئيسية",
      path: "/client",
      icon: <FiGrid size={20} />,
      end: true,
    },
    {
      name: "الملف الشخصي",
      path: "/client/main-page",
      icon: <FiUser size={20} />,
    },
    {
      name: "المشاريع",
      path: "/client/projects",
      icon: <FiFolder size={20} />,
    },
    {
      name: "المحفظة",
      path: "/client/wallet",
      icon: <FiCreditCard size={20} />,
    },
    {
      name: "الفنيين",
      path: "/client/services",
      icon: <FiTool size={20} />,
    },
    {
      name: "طلب خدمة",
      path: "/client/request-service",
      icon: <MdHomeRepairService  size={20} />,
    },
  ];
  const navigate = useNavigate();

  const { logout } = useAuth();
  const handleLogout = () => {
    logout();         // Clear auth state and localStorage
    setOpen(false);   // Close sidebar
    navigate("/");    // Go to Home
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        dir="rtl"
        className={`
          fixed
          top-0
          right-0
          h-screen
          w-[200px]
          bg-white
          border-l
          border-gray-200
          flex
          flex-col
          justify-between
          z-50
          transition-transform
          duration-300

          ${
            open
              ? "translate-x-0"
              : "translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Top */}
        <div>
          {/* Logo */}
          <div className="h-20 flex items-center justify-center border-b border-gray-200">
            <h1 className="text-[34px] font-extrabold leading-none">
              <span className="text-black">Ser</span>
              <span className="text-[#2F80ED]">vixa</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="mt-2 flex flex-col gap-2 px-2">
            {links.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `
                  flex
                  flex-row
                  items-center
                  justify-between
                  px-4
                  py-3
                  rounded-l-xl
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-[#EAF4FF] text-[#2F80ED] border-r-4 border-[#2F80ED] font-semibold"
                      : "text-gray-500 hover:bg-gray-50"
                  }
                `
                }
              >
                <span className="text-[15px]">{item.name}</span>

                <span>{item.icon}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-200 p-5">
          <button 
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              justify-between
              text-gray-400
              hover:text-red-500
              transition-colors
            "
          >
            <span className="text-[15px]">تسجيل خروج</span>

            <FiLogOut className="text-red-500 text-xl" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default UserSideNav;