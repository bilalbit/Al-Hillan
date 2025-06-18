"use client";

import {Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts"

import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"

type ChartData = {
    month: string;
    total_student: number;
}
export const AppBarChart = ({chartData, chartConfig}: { chartData: ChartData[], chartConfig: ChartConfig }) => {
    return (
        <div>
            <h1 className="text-lg font-medium mb-6">Total New Students for each months</h1>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false}/>
                    <XAxis
                        dataKey="month"
                        tickLine={true}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                        tickLine={true}
                        tickMargin={10}
                        axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent/>}/>
                    <Bar dataKey="total_student" fill="var(--color-total_student)" radius={4}/> </BarChart>
            </ChartContainer>
        </div>
    );
}
