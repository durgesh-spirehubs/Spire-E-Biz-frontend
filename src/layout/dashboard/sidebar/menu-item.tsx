import {
  FaMicroscope,
  FaUserDoctor,
  FaUser,
  FaCube,
  FaRegCalendarDays,
} from "react-icons/fa6";
import { MdSpaceDashboard, MdAddBusiness } from "react-icons/md";
import { PiUsersFourFill } from "react-icons/pi";
import { FaCalendarCheck, FaMoneyBillTrendUp } from "react-icons/fa6";
import { AiOutlineTransaction } from "react-icons/ai";

export const menuItem = {
  id: "main-menu",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      icon: <MdSpaceDashboard size={18} />,
      url: "/",
      role: ["Admin", "Doctor"],
    },
    // {
    //   id: "doctors",
    //   title: "Doctors",
    //   type: "item",
    //   icon: <FaUserDoctor size={18} />,
    //   url: "/doctors",
    //   role: ["Admin"],
    // },

    {
      id: "customers",
      title: "Customers",
      type: "item",
      icon: <FaUser size={18} />,
      url: "/customers",
      role: ["Admin"],
    },
    {
      id: "packages",
      title: "Packages",
      type: "item",
      icon: <FaCube size={18} />,
      url: "/packages",
      role: ["Admin"],
    },
    {
      id: "subscriptions",
      title: "Subscriptions",
      type: "item",
      icon: <FaRegCalendarDays size={18} />,
      url: "/subscriptions",
      role: ["Admin"],
    },
    {
      id: "transactions",
      title: "Transactions",
      type: "item",
      icon: <FaMoneyBillTrendUp size={18} />,
      url: "/transactions",
      role: ["Admin"],
    },
    // {
    //   id: "patients",
    //   title: "Patients",
    //   type: "item",
    //   icon: <PiUsersFourFill size={18} />,
    //   url: "/patients",
    //   role: ["Admin", "Doctor"],
    // },
    // {
    //   id: "appointment-label",
    //   title: "Appointment",
    //   type: "label",
    //   role: ["Admin", "Doctor"],
    // },
    // {
    //   id: "appointment",
    //   title: "Appointment List",
    //   type: "collapse",
    //   icon: <FaCalendarCheck size={18} />,
    //   url: "/appointment",
    //   role: ["Admin", "Doctor"],
    //   children: [
    //     {
    //       id: "approved-appointment",
    //       title: "Approved Appointment",
    //       type: "item",
    //       icon: <FaCalendarCheck size={18} />,
    //       url: "/appointment",
    //       role: ["Admin", "Doctor"],
    //     },
    //     {
    //       id: "appointment-status",
    //       title: "Status",
    //       type: "label",
    //       role: ["Admin", "Doctor"],
    //     },
    //     {
    //       id: "cancelled-appointment",
    //       title: "Cancelled Appointment",
    //       type: "item",
    //       icon: <FaCalendarCheck size={18} />,
    //       url: "/appointment",
    //       role: ["Admin", "Doctor"],
    //     },
    //   ],
    // },
    // {
    //   id: "appointmentt",
    //   title: "Appointmentt List",
    //   type: "collapse",
    //   icon: <FaCalendarCheck size={18} />,
    //   url: "/appointmentt",
    //   role: ["Admin", "Doctor"],
    //   children: [
    //     {
    //       id: "approved-appointmentt",
    //       title: "Approved Appointmentt",
    //       type: "item",
    //       icon: <FaCalendarCheck size={18} />,
    //       url: "/appointmentt",
    //       role: ["Admin", "Doctor"],
    //     },
    //     {
    //       id: "cancelled-appointmentt",
    //       title: "Cancelled Appointmentt",
    //       type: "item",
    //       icon: <FaCalendarCheck size={18} />,
    //       url: "/appointmentt",
    //       role: ["Admin", "Doctor"],
    //     },
    //   ],
    // },
    // {
    //   id: "therapist",
    //   title: "Therapist",
    //   type: "item",
    //   icon: <FaMicroscope size={18} />,
    //   url: "/therapist",
    //   role: ["Admin"],
    // },
  ],
};
