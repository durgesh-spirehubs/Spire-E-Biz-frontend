"use client"
import { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { getPendingSalesOrder } from "@/api/dashboard"
import { ProjectStaticsChart } from "../charts/project-statistics-chart"
export default function DashboardGraph() {
  const [filterType, setFilterType] = useState("week")
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()

  const fetchPendingOrder = () => {
    setIsLoading(true)
    let query = ""
    if (filterType !== "customDate") {
      query = `?type=${filterType}`
    }
    if (filterType === "customDate" && startDate && endDate) {
      query = `?type=${filterType}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
    }
    getPendingSalesOrder(query)
      .then((res: any) => {
        const sales = res?.data?.sales

        const chartData = sales.labels.map(
          (label: string, index: number) => ({
            date: label,
            pendingSalesOrder: sales.series[0].data[index],
          })
        )
        setData(chartData)
      })
      .finally(() => setIsLoading(false))
  }
  useEffect(() => {
    if (filterType === "customDate") {
      if (!startDate || !endDate) return
    }
    fetchPendingOrder()
  }, [filterType, startDate, endDate])
  return (
    <Card className="w-full rounded-md">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Pending Order Statistics</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="monthly">Month</SelectItem>
              <SelectItem value="yearly">Year</SelectItem>
              <SelectItem value="customDate">Custom Date</SelectItem>
            </SelectContent>
          </Select>
          {filterType === "customDate" && (
            <>
            <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[160px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? startDate.toDateString() : "Start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[160px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? endDate.toDateString() : "End date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) =>
                      startDate ? date < startDate : false
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!isLoading && <ProjectStaticsChart data={data} />}
      </CardContent>
    </Card>
  )
}
