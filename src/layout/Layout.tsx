"use client";
import React, { useLayoutEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { redirect, usePathname } from "next/navigation";
import DashboardLayout from "./dashboard";
import Loader from "@/components/ui/loader";
import AuthLayout from "./auth";
interface LayoutProps {
  children: ReactNode;
}
// PUBLIC ROUTE LIST
const publicRouteList = ["/login", "/register","/forgotPassword","/sendOtp"];
const useAuthRedirect = (
  isLoggedIn: boolean,
  isAuthLoading: boolean,
  pathname: string
) => {
  useLayoutEffect(() => {
    if (!isAuthLoading) {
      if (!isLoggedIn && !publicRouteList.includes(pathname)) {
        redirect("/login");
      } else if (isLoggedIn && publicRouteList.includes(pathname)) {
        redirect("/");
      }
    }
  }, [isLoggedIn, isAuthLoading, pathname]);
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn, isAuthLoading } = useAuth();
  const pathname = usePathname();
  useAuthRedirect(isLoggedIn, isAuthLoading, pathname);
  if (isAuthLoading) {
    return <Loader />;
  }
  if(isLoggedIn){
    return (
      <DashboardLayout>{children}</DashboardLayout>
  );
}
  return <AuthLayout>{children}</AuthLayout>;
};
export default Layout;
