"use client";
import { File, Shield, Upload } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

function SideNav({ closeSideBar }) {
  const menuList = [
    { id: 1, name: "Upload", icon: Upload, path: "/upload" },
    { id: 2, name: "Files", icon: File, path: "/files" },
    { id: 3, name: "Upgrade", icon: Shield, path: "/upgrade" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-full w-64 bg-white border-r">
      <div className="p-5 border-b">
        <Image src="/logo.svg" alt="Logo" width={150} height={100} />
      </div>
      <div className="flex flex-col">
        {menuList.map((item, index) => (
          <Link href={item.path} key={item.id}>
            <button
              className={`flex items-center gap-2 p-4 w-full text-left hover:bg-gray-100 ${
                activeIndex === index ? "bg-blue-50 text-sky-500" : "text-dark"
              }`}
              onClick={() => {
                setActiveIndex(index);
                closeSideBar(); // Call closeSidebar as a function
              }}
            >
              <item.icon className="w-5 h-5" />
              <h2>{item.name}</h2>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
