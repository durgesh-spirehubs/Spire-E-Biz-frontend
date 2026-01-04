"use client";
import { Icon } from "@iconify/react";

const Iconify = ({ icon, ...props }: any) => {
  return <Icon icon={icon} {...props} />;
};

export default Iconify;
