import { FiSearch } from "react-icons/fi";

const HeroSection = () => {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('heroImg.png')" }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 flex flex-col items-center gap-6">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-2xl text-center">
          بيتك في أمان.. من السباكة للدهان
        </h1>

        <p className="text-white/90 text-base sm:text-lg md:text-2xl font-semibold text-center">
          اطلب أمهر الفنيين والعمال الموثوقين في منطقتك
        </p>

        <div className="w-full max-w-2xl flex items-center bg-white rounded-lg shadow-xl overflow-hidden mt-4">
          <input
            type="text"
            placeholder="عن ماذا تبحث؟ (سباك، كهربائي...)"
            className="flex-1 py-4 px-5 text-gray-700 text-sm sm:text-base outline-none placeholder-gray-400 text-right"
          />
          <button className="bg-blue-500 hover:bg-blue-600 transition text-white flex items-center gap-2 px-6 sm:px-8 py-4 text-sm sm:text-base font-semibold shrink-0">
            بحث
            <FiSearch className="text-lg" />
          </button>
        </div>

        <button className="mt-2 w-full max-w-md border-2 border-blue-400 hover:border-white bg-[#E7F3FD] backdrop-blur-sm hover:bg-blue-500 text-blue-700 hover:text-white text-base sm:text-xl font-semibold py-3 px-8 rounded-lg duration-500">
          ابحث عن عمل
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
