// "use client";
// import React, { useEffect } from "react";
// import { redirect } from "next/navigation";
// import { useAuth } from "@/contexts/AuthContext";
// const RoleGuard = (Components: any) => {
//   return function RoleGuard(props: any) {
//     const { isAuthLoading, user } = useAuth();
//     const userType = user?.user_type;
//     useEffect(() => {
//       if (!isAuthLoading && userType !== "Admin") {
//         redirect("/unauthorized");
//       }
//     }, [isAuthLoading, user]);
//     if (isAuthLoading) {
//       return null;
//     }
//     return <Components {...props} />;
//   };
// };
// export default RoleGuard;
"use client";
import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Loader from "@/components/ui/loader"
export default function RoleGuard({
  children,
  allowedRoles = [],
}: {
  children: ReactNode;
  allowedRoles?: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthLoading } = useAuth();
  useEffect(() => {
    if (pathname === "/unauthorized") return;
    if (isAuthLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (
      allowedRoles.length > 0 &&
      user &&
      !allowedRoles.includes(user.user_type)
    ) {
      router.replace("/unauthorized");
    }
  }, [user, isAuthLoading, allowedRoles, router, pathname]);
  return (
    <div className="flex-1 min-h-0">
      {isAuthLoading ? (
        <div className="flex items-center justify-center h-full text-sm">
           <Loader/>
        </div>
      ) : (
        children
      )}
    </div>
  );
}


