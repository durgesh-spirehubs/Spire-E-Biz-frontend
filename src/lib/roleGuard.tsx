"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const RoleGuard = (Components: any) => {
  return function RoleGuard(props: any) {
    const { isAuthLoading, user } = useAuth();
    const userType = user?.userTpe;
    useEffect(() => {
      if (!isAuthLoading && userType) {
        redirect("/");
      }
    }, [isAuthLoading, user]);

    if (isAuthLoading) {
      return null;
    }
    return <Components {...props} />;
  };
};

export default RoleGuard;
