"use client";

import React from "react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { TrendingUp } from "lucide-react";

interface ChartData {
  year: number;
  total_student: string;
}

interface AppPieChartProps {
  chartData: ChartData[];
}

export const AppPieChart = ({ chartData }: AppPieChartProps) => {
  // Convert total_student to number and assign fill colors
  const normalizedData = chartData.map((item) => ({
    ...item,
    total_student: parseInt(item.total_student) || 0,
    fill: `var(--color-year-${item.year})`,
  }));

  // Define chartConfig dynamically based on chartData
  const chartConfig = normalizedData.reduce((config, item, index) => {
    config[`year-${item.year}`] = {
      label: `${item.year}`,
      color: `hsl(var(--chart-${(index % 5) + 1}))`, // Cycle through chart-1 to chart-5
    };
    return config;
  }, {} as ChartConfig);

  const totalStudents = normalizedData.reduce((acc, curr) => acc + curr.total_student, 0);

  return (
    <div className="">
      <h1 className="text-lg text-center font-medium mb-6">Total Number of Students</h1>
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={normalizedData}
            dataKey="total_student"
            nameKey="year"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalStudents.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Students
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-4 flex flex-col gap-1 items-center">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total Students Over Six Years <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="mt-2 text-center px-3 leading-none text-muted-foreground">
          Showing Total Number of Students for the Last Six Years
        </div>
      </div>
    </div>
  );
};