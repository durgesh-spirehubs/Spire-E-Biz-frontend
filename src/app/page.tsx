import Attendance from "@/components/dashboard/attendance";
import LatestPurchaseOrders from "@/components/dashboard/latestPurchase";
import MainCard from "@/components/dashboard/main-card";
import { TableListing } from "@/components/dashboard/table-listing";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-2">
      <div className="flex gap-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quo
        earum nulla autem architecto provident, tenetur eius tempora nobis
        eveniet corporis! Id sapiente nihil explicabo omnis, harum eaque qui
        magnam?
      </div>
       <Attendance/>
      </div>
      <div>
        <LatestPurchaseOrders/>
      </div>

    
    </>
  );
};
Dashboard.userRole = ["Admin"];
export default Dashboard;
