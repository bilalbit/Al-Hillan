import React from 'react';
import {AppBarChart} from "@/components/charts/app-bar-chart";
import {ChartConfig} from "@/components/ui/chart";
import {getFetch} from "@/lib/cache";

const chartConfig = {
     total_student: {
        label: "Total Students",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;
type returnType =  {
    month: string
    total_student: number
  }
export const MonthAnalytics = async () => {
    const data = await getFetch('/register/analytics/month') as returnType[]
    return (
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
            <AppBarChart chartData={data} chartConfig={chartConfig}/>
        </div>
    );
};
