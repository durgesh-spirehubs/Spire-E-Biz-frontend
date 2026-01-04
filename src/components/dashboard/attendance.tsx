"use client";
import { getTotalAttendance } from "@/api/dashboard";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
export default function Attendance() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState("weekly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPresentEmployee, setTotalPresentEmployee] = useState(0);
  const [totalEmployee, setTotalEmployee] = useState(20);
  const fetchTotalAttendance = () => {
    setIsLoading(true);
    let query = "";
    if (filterType !== "customDate") {
      query = `?type=${filterType}`;
    }
    if (filterType === "customDate") {
      query = `?type=${filterType}&startDate=${startDate}&endDate=${endDate}`;
    }
    getTotalAttendance(query)
      .then((res: any) => {
        setData(res?.data);
        setTotalPresentEmployee(res?.data?.attendance?.totalPresentEmployees)
      })
      .catch((error) => {
        toast.error(error?.message || "Failed to load attendance");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (filterType === "customDate") {
      if (!startDate || !endDate) return;
    }
    fetchTotalAttendance();
  }, [filterType,startDate,endDate]);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mr-2 dark:bg-slate-950 dark:text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Employee Status</h2>
        <div className="flex justify-between  gap-4">
          <div className="flex flex-col text-sm">
            <span className="text-gray-400 text-center mb-1 ">Filter By</span>
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2  rounded-lg px-3 py-2 text-sm  border border-gray-300 focus:outline-none  focus-visible:ring-2 focus-visible:ring-blue-500">
                  {filterType.charAt(0).toUpperCase() +
                    filterType.slice(1)}
                  <span>▼</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterType("weekly")}>
                  Weekly
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("monthly")}>
                  Monthly
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("yearly")}>
                  Yearly
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("customDate")}>
                  Custom Date
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-2">
            {filterType === "customDate" && (
              <div className="flex   mt-2  flex-col">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 outline-none dark:bg-slate-950 dark:text-white "
                />
                <span>to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 outline-none dark:bg-slate-950 dark:text-white"
                />
              </div>
            )}
          </div>
          <div>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div className="flex  flex-col md:flex-row  w-full gap-2 ">
        <div className="flex  space-x-2 bg-white py-5 rounded-lg shadow  md:w-1/2 w-1/2 flex-col p-3  dark:bg-slate-950 dark:text-white">
          <div className="flex items-center gap-2 text-gray-600 ">
            <div className="w-3 h-3 bg-blue-500 rounded-full shadow-3xl shadow-blue-500"></div>
            <span className="dark:text-white">Present</span>
          </div>
          <div className="text-2xl font-semibold text-gray-700 mt-2 dark:text-white">{totalPresentEmployee}</div>
        </div>
        <div className="flex  space-x-2 bg-white py-5 rounded-lg shadow w-full md:w-1/2 flex-col p-3  dark:bg-slate-950 dark:text-white">
          <div className="flex items-center gap-2 text-gray-600 ">
            <div className="w-3 h-3 bg-teal-400 rounded-full shadow-3xl shadow-blue-500 dark:text-white"></div>
            <span className="dark:text-white">Absent</span>
          </div>
          <div className="text-2xl font-semibold text-gray-700 mt-2 dark:text-white">{totalEmployee - totalPresentEmployee}</div>
        </div>
      </div>
    </div>
  );
}
