import { ToggleTheme } from "@/components/toggle-theme";
import Image from "next/image";
import Link from "next/link";
import { ProfileMenu } from "./profile";
// import { LocaleToggle } from "@/components/toggle-locale";

const DashboardHeader = () => {
  return (
    <div className="bg-white dark:bg-slate-950 px-2 rounded-lg shadow-custom w-full h-full flex justify-between items-center">
      <div className="logo">
        <Link href="/">
          <Image
            src="/images/logo-placeholder.png"
            width={180}
            height={50}
            alt="Logo"
            className="h-auto w-11/12"
          />
        </Link>
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
