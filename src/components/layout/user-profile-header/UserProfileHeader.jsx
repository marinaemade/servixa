import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const UserProfileHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div
        className={`flex items-center justify-start px-3 md:px-6 w-full fixed left-0 right-0 top-0 z-50 py-2 md:py-4 gap-5 md:gap-10 border-b border-[#D9D9D9] transition-all duration-300
        ${isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-white"}`}
      >
        <h3 className="font-extrabold text-2xl md:text-3xl">
          Ser<span className="text-primary">vixa</span>
        </h3>

        <div className="flex gap-2 items-center">
          <FaUserCircle className="text-3xl" />
          <div className="flex flex-col items-center">
            <p className="text-gray-800 font-light text-xs">صباح الخير</p>
            <p className="text-gray-900 font-semibold text-sm">محمد صابر</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
