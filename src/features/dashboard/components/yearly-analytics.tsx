import React from 'react';

import {AppPieChart} from '@/components/charts/app-pie-chart';
import {getFetch} from "@/lib/cache";
type returnType = {
        year: number
        total_student: string
    }

export const YearlyAnalytics = async () => {
   const data = await getFetch('/register/analytics/year') as returnType []
    return (
        <div className="bg-primary-foreground rounded-lg flex justify-center items-center">
            <AppPieChart chartData={data}/>
        </div>
    );
};
