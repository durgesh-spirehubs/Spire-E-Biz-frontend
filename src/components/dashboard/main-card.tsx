"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface MainCardProp {
  title?: string;
  description?: string;
  action?: any;
  options?: any;
  children: any;
}

const MainCard = ({
  title,
  description,
  action,
  options,
  children,
}: MainCardProp) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="h-full flex flex-col pt-3 overflow-y-auto">
      <div className="flex justify-between items-center pb-3">
        <div className="flex gap-3 items-center">
          {pathname !== "/" && (
            <Button size="icon" variant="outline" onClick={() => router.back()}>
              <ArrowLeft strokeWidth={1.5} />
            </Button>
          )}
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold leading-snug">{title}</h2>
            <p className="text-[13px] text-muted-foreground leading-snug">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">{action}</div>
      </div>
      {options}
      <div className="overflow-y-auto">{children}</div>
    </div>
  );
};

export default MainCard;
