import React from "react";
import { FiBell, FiMenu } from "react-icons/fi";

const UserTopNav = ({ open, setOpen }) => {
  return (
    <header
      dir="rtl"
      className="
        fixed
        top-0
        left-0
        right-0
        lg:right-[200px]
        h-20
        bg-white
        border-b
        border-gray-200
        z-40
      "
    >
      <div className="h-full flex items-center justify-between px-5 lg:px-8">

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Logo */}
          {/* <h1 className="text-[34px] font-extrabold leading-none select-none">
            <span className="text-black">Ser</span>
            <span className="text-[#2F80ED]">vixa</span>
          </h1> */}

          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(true)}
            className="
              lg:hidden
              w-12
              h-12
              rounded-xl
              border
              border-gray-200
              flex
              items-center
              justify-center
              shadow-sm
              hover:bg-gray-50
              transition
            "
          >
            <FiMenu className="text-3xl text-gray-800" />
          </button>
        </div>

        {/* Left Side */}
        <div className="flex items-center gap-5">

          {/* Notification */}
          <button className="relative w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition">
            <FiBell className="text-xl" />

            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">
              1
            </span>
          </button>

          {/* User */}
          <div className="hidden sm:flex items-center gap-3">

            <div className="text-right leading-tight">
              <p className="text-[11px] text-gray-400">
                صباح الخير
              </p>
            </div>

            <img
              src="https://api.dicebear.com/9.x/notionists-neutral/svg?seed=User"
              alt="User"
              className="w-11 h-11 rounded-full object-cover"
            />

          </div>
        </div>

      </div>
    </header>
  );
};

export default UserTopNav;