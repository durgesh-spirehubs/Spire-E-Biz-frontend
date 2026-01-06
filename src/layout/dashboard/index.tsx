"use client";
import {
  DashboardLayoutDiv,
  DashboardHeaderDiv,
  HeaderNavigationDiv,
  DashboardWrapperDiv,
  DashboardContentDiv,
  DashboardSidebarDiv,
} from "@/styles/dashboard";
import { Sidebar } from "./sidebar";
import DashboardHeader from "./header";
import HeaderNavigation from "./header/header-navigation";
import { navigation } from "@/config/layout-config";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import RoleGuard from "@/lib/roleGuard";
export default function DashboardLayout({ children }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  if (isMobile) {
    setSidebarOpen(false);
  }
}, [pathname]);
  return (
    <DashboardLayoutDiv className="bg-slate-100 dark:bg-slate-900 flex flex-col p-4 pt-0 pb-1">
      <DashboardHeaderDiv>
        <DashboardHeader onMenuClick={() => setSidebarOpen((p) => !p)} />
      </DashboardHeaderDiv>
      {navigation === "horizontal" && (
        <HeaderNavigationDiv>
          <HeaderNavigation />
        </HeaderNavigationDiv>
      )}
      <DashboardWrapperDiv className="flex flex-1 relative">
        {navigation === "vertical" && (
          <>
            <DashboardSidebarDiv
              className={`hidden md:block transition-all duration-300 overflow-hidden ${
                sidebarOpen ? "w-64" : "w-0"
              }`}
            >
              <Sidebar />
            </DashboardSidebarDiv>
            {sidebarOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/50 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            <div
              className={`fixed top-0 left-0 z-50 h-screen w-2/3 md:hidden
              bg-white dark:bg-slate-950
              transition-transform duration-300
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              <Sidebar />
            </div>
          </>
        )}
        <RoleGuard allowedRoles={["Admin","Staff","Customer"]}>
        <DashboardContentDiv className="flex-1 overflow-y-auto p-3">
          {children}
        </DashboardContentDiv>
         </RoleGuard>
      </DashboardWrapperDiv>
    </DashboardLayoutDiv>
  );
}
