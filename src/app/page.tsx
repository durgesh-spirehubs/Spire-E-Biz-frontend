import MainCard from "@/components/dashboard/main-card";
import { TableListing } from "@/components/dashboard/table-listing";
import React from "react";

const Dashboard = () => {
  return (
    <MainCard
      title="Dashboard"
      description="Here will go description for the pages"
    >
      <div className="flex gap-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quo
        earum nulla autem architecto provident, tenetur eius tempora nobis
        eveniet corporis! Id sapiente nihil explicabo omnis, harum eaque qui
        magnam?
      </div>
    </MainCard>
  );
};
Dashboard.userRole = ["Admin"];
export default Dashboard;
