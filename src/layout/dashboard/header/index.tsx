"use client"
import { ToggleTheme } from "@/components/toggle-theme";
import Image from "next/image";
import Link from "next/link";
import { ProfileMenu } from "./profile";
import { Menu } from "lucide-react";
// import { LocaleToggle } from "@/components/toggle-locale";

type Props = {
  onMenuClick: () => void;
};
const DashboardHeader = ({ onMenuClick }: Props) => {
  return (
    <div className="bg-white dark:bg-slate-950 px-2 rounded-lg shadow-custom w-full h-full flex justify-between items-center">
      <div className="flex items-center ">
        <Link href="/">
          <Image
            src="/images/logo-placeholder.png"
            width={180}
            height={50}
            alt="Logo"
            className="h-auto w-11/12"
          />
        </Link>
        <button
          onClick={() => {
            console.log("Menu clicked");
            onMenuClick();
          }}
          className="rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 mr-2"
        >
          <Menu size={22} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <ToggleTheme />
        {/* <LocaleToggle /> */}
        <ProfileMenu />
      </div>
    </div>
  );
};

export default DashboardHeader;
