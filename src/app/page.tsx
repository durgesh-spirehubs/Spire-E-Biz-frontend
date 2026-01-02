import Attendance from "@/components/dashboard/attendance";
import LatestPurchaseOrders from "@/components/dashboard/latestPurchase";
import MainCard from "@/components/dashboard/main-card";
import { TableListing } from "@/components/dashboard/table-listing";
import React from "react";
// const weeklySalesData = {
//   status: "success",
//   data: {
//     sales: {
//       totalRevenue: 15400,
//       labels: [
//         "2026-01-02",
//         "2026-01-03",
//         "2026-01-04",
//         "2026-01-05",
//         "2026-01-06",
//         "2026-01-07",
//         "2026-01-08"
//       ],
//       series: [
//         {
//           name: "revenue",
//           data: [1200, 1800, 2100, 1500, 2600, 3200, 3000]
//         }
//       ]
//     }
//   }
// };
const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="bg-white rounded-2xl p-6 shadow-sm mr-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quo
        earum nulla autem architecto provident, tenetur eius tempora nobis
        eveniet corporis! Id sapiente nihil explicabo omnis, harum eaque qui
        magnam?
      </div>
       <Attendance/>
      </div>
      <div>
      </div>
      <div>
        <LatestPurchaseOrders/>
      </div>
    </>
  );
};
Dashboard.userRole = ["Admin"];
export default Dashboard;
