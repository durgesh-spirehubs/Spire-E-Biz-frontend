"use client"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts"
export function ProjectStaticsChart({data}:{data:any[]}){
    return(
        <ResponsiveContainer className="w-full" height={280}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="date"/>
                <YAxis domain={[0,1]}/>
                <Tooltip/>
                <Line
                  type="monotone"
                  dataKey="pendingSalesOrder"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={false}
                 />              
            </LineChart>
        </ResponsiveContainer>
    )
}