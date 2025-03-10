"use client";
import { UserButton } from "@clerk/nextjs";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import React from "react";

function TopHeader({ toggle, setToggle }) {
  return (
    <div className="relative">
      <div className="flex p-5 border-b items-center justify-between md:justify-end">
        <AlignJustify
          className="md:hidden cursor-pointer"
          onClick={() => setToggle(!toggle)}
        />
        <Image
          src="/logo.svg"
          alt="my logo"
          width={150}
          height={100}
          className="md:hidden"
        />
        <UserButton />
      </div>
    </div>
  );
}

export default TopHeader;
