import Attendance from "@/components/dashboard/attendance";
import DashboardGraph from "@/components/dashboard/dashboardgraph";
import LatestPurchaseOrders from "@/components/dashboard/latestPurchase";
import StateCard from "@/components/dashboard/stateCard";
const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 w-full md:grid-cols-2 gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 dark:bg-slate-950 dark:text-white">
        <StateCard/>
        <StateCard/>
        <StateCard/>
        <StateCard/>
      </div>
       <Attendance/>
      </div>
      <div>
      </div>
      <div className="mt-2">
       <DashboardGraph></DashboardGraph> 
      </div>
      <div>
        <LatestPurchaseOrders/>
      </div>
    </>
  );
};
// Dashboard.userRole = ["Staff"];
export default Dashboard;
