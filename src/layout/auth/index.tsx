"use client";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";
const AuthLayout = ({ children }: any) => {
  const { isLoggedIn, user, isAuthLoading } = useAuth();
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="bg-white dark:bg-slate-950 border p-5 rounded-lg shadow-custom w-full md:w-4/5 lg:w-2/4 xl:w-2/5 flex justify-between items-center m-auto">
        {children}
      </div>
    </div>
  );
};
export default AuthLayout;
