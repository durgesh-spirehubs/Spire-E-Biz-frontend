import React from "react";

interface ChipProps {
  className?: string;
  label?: string;
}
function Chip({ className, label }: ChipProps) {
  return (
    <div className="mt-1">
      <span
        className={`py-1 px-2 bg-primary rounded-full text-white text-xs ${className}`}
      >
        {label}
      </span>
    </div>
  );
}

export default Chip;
