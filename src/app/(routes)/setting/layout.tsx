"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path);
  return (
    <div className="py-5 overflow-y-auto">
      <div className="w-full flex items-center gap-5">
        <Link
          href="/setting/business-type"
          className={` py-2 px-1   ${
            isActive("/setting/business-type") &&
            " border-b-2 border-primary text-primary"
          }`}
        >
          Bussiness Type
        </Link>
        <Link
          href="/setting/faqs"
          className={` py-2 px-1   ${
            isActive("/setting/faqs") &&
            " border-b-2 border-primary text-primary"
          }`}
        >
          Faqs
        </Link>
        <Link
          href="/setting/contact-us"
          className={` py-2 px-1   ${
            isActive("/setting/contact-us") &&
            " border-b-2 border-primary text-primary"
          }`}
        >
          Contact Us
        </Link>
      </div>
      <div className="mt-2 h-[1px] w-full bg-gray-200" />
      {children}
    </div>
  );
};

export default RootLayout;
