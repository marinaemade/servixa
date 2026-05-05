
const WorkerCover = () => {
  return (
    <div className=" pt-8 px-2 md:px-5">
      <div className="flex flex-col border border-[#C4C4C4] rounded-xl">
        <div className="text-end pt-3 pl-3">
          <button className="btn-primary">تعديل الحساب</button>
        </div>
        <div className="self-center">
          <img src="/user.jpg" alt="user image" className="w-30 h-30 rounded-full"/>
          <h2 className="text-center text-lg font-semibold">احمد محمد</h2>
          <div className="flex gap-2 justify-evenly">
            <p className="font-light text-gray-900">سباك</p>
            <p className="font-light text-gray-900">العنوان</p>
          </div>
        </div>
        <div className="flex w-fit bg-[#E7EBEE] p-1 rounded-xl gap-6 mt-12">
          <button className="px-4 font-normal text-gray-800 text-md hover:bg-white hover:text-primary hover:text-lg duration-150 py-2 rounded-lg">الملف الشخصي</button>
          <button className="px-4 font-normal text-gray-800 text-md hover:bg-white hover:text-primary hover:text-lg duration-150 py-2 rounded-lg">التقييمات</button>
          <button className="px-4 font-normal text-gray-800 text-md hover:bg-white hover:text-primary hover:text-lg duration-150 py-2 rounded-lg">معرض الاعمال</button>
        </div>
      </div>
    </div>
  )
}

export default WorkerCover