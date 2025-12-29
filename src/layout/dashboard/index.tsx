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
import { navigation } from "@/config/layout-config";
import HeaderNavigation from "./header/header-navigation";

export default function DashboardLayout({ children }: any) {
  return (
    <DashboardLayoutDiv className="dashboard-layout bg-slate-100 dark:bg-slate-900 flex flex-col p-4 pt-0 pb-1">
      <DashboardHeaderDiv className="dashboard-header">
        <DashboardHeader />
      </DashboardHeaderDiv>
      {navigation === "horizontal" && (
        <HeaderNavigationDiv>
          <HeaderNavigation />
        </HeaderNavigationDiv>
      )}
      <DashboardWrapperDiv className="dashboard-wrapper flex gap-5">
        {navigation === "vertical" && (
          <DashboardSidebarDiv>
            <Sidebar />
          </DashboardSidebarDiv>
        )}
        <DashboardContentDiv className="h-full w-full pb-3 pt-2 pl-2 overflow-y-auto no-scrollbar">
          {children}
        </DashboardContentDiv>
      </DashboardWrapperDiv>
    </DashboardLayoutDiv>
  );
}
