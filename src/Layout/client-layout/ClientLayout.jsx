import React, { useState } from "react";
import { Outlet } from 'react-router-dom'
import UserTopNav from './../../components/client/UserTopNav';
import UserSideNav from './../../components/client/UserSideNav';

const ClientLayout = () => {
  const [open, setOpen] = useState(false);
  return (
     <div dir="rtl" className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navigation */}
      <UserTopNav open={open} setOpen={setOpen} />

      {/* Side Navigation */}
      <UserSideNav open={open} setOpen={setOpen} />

      {/* Page Content */}
      <main
        className="
          pt-20
          lg:mr-[200px]
          min-h-screen
          bg-[#F8FAFC]
          transition-all
          duration-300
        "
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};


export default ClientLayout