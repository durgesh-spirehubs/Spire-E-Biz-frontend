import Attendance from "@/components/dashboard/attendance";
import DashboardGraph from "@/components/dashboard/dashboardgraph";
import LatestPurchaseOrders from "@/components/dashboard/latestPurchase";
const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="bg-white rounded-2xl p-6 shadow-sm mr-2 dark:bg-slate-950 dark:text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quo
        earum nulla autem architecto provident, tenetur eius tempora nobis
        eveniet corporis! Id sapiente nihil explicabo omnis, harum eaque qui
        magnam?
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
