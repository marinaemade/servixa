import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 shadow-lg border-b border-gray-300"
          : "bg-[#FFFFFF52]"
      }`}
    >
      <div className="max-w-8xl mx-auto px-2 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between py-3 md:py-4">
          <div className="text-gray-800 hover:rotate-3 duration-200 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide">
            Ser<span className="text-primary">vixa</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-black text-md font-semibold">
            <Link
              to=""
              className="hover:text-blue-700 hover:font-bold hover:text-lg duration-300"
            >
              الرئيسية
            </Link>
            <Link
              to=""
              className="hover:text-blue-700 hover:font-bold hover:text-lg duration-300"
            >
              اضف طلب
            </Link>
            <Link
              to=""
              className="hover:text-blue-700 hover:font-bold hover:text-lg duration-300"
            >
              تصفح الفنيين
            </Link>
            <Link
              to=""
              className="hover:text-blue-700 hover:font-bold hover:text-lg duration-300"
            >
              كيف يعمل ؟
            </Link>
          </div>

          <div>
            <Link to="/login">
              <button className="hidden md:flex hover:scale-105 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md duration-500">
                تسجيل الدخول
              </button>
            </Link>
          </div>

          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <HiX className="text-blue-800 text-2xl font-bold" />
            ) : (
              <HiMenu className="text-blue-800 text-2xl font-bold" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm px-4 pb-4 pt-2 space-y-3 text-right">
          <a
            href="#"
            className="block text-white text-sm py-2 hover:text-sky-300"
          >
            الرئيسية
          </a>
          <a
            href="#"
            className="block text-white text-sm py-2 hover:text-sky-300"
          >
            اضف طلب
          </a>
          <a
            href="#"
            className="block text-white text-sm py-2 hover:text-sky-300"
          >
            تصفح الفنيين
          </a>
          <a
            href="#"
            className="block text-white text-sm py-2 hover:text-sky-300"
          >
            كيف يعمل ؟
          </a>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm">
            تسجيل الدخول
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
