"use client";
import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import TopHeader from "./_components/TopHeader";

function Layout({ children }) {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="h-full md:w-64 flex-col fixed inset-y-0 z-50 md:flex hidden">
        <SideNav closeSideBar={() => setToggle(false)} />
      </div>

      {/* Mobile Sidebar */}
      {toggle && (
        <div className="h-full w-64 flex-col fixed inset-y-0 z-30 bg-white flex">
          <SideNav closeSideBar={() => setToggle(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="md:ml-64">
        <TopHeader toggle={toggle} setToggle={setToggle} />
        {children}
      </div>
    </div>
  );
}

export default Layout;
