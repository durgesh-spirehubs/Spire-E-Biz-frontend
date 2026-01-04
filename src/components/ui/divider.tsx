import React from "react";

interface DividerProps {
  className?: string; // Mark className as optional
}
function Divider({ className }: DividerProps) {
  return <div className={`my-2 h-[1px] w-full bg-gray-200 ${className}`} />;
}

export default Divider;
