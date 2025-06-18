import React, {Suspense} from 'react';
// import {AppAreaChart} from "@/components/charts/app-area-chart";
import {MonthAnalytics} from "@/features/dashboard/components/month-analytics";
import {Loader} from "@/components/loader";
import {YearlyAnalytics} from "@/features/dashboard/components/yearly-analytics";
// import {CardList} from "@/layouts/card-list";
// import {TodoList} from "@/layouts/todo-list";

const HomePage = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
            <Suspense fallback={<Loader/>}>
                <MonthAnalytics/>
            </Suspense>
            {/*<div className="bg-primary-foreground p-4 rounded-lg">*/}
            {/*    <CardList title="Latest Transactions" />*/}
            {/*</div>*/}
            <Suspense fallback={<Loader/>}>
                <YearlyAnalytics/>
            </Suspense>
            {/*<div className="bg-primary-foreground p-4 rounded-lg">*/}
            {/*    <TodoList />*/}
            {/*</div>*/}
            {/*<div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">*/}
            {/*    <AppAreaChart />*/}
            {/*</div>*/}
            {/*<div className="bg-primary-foreground p-4 rounded-lg">*/}
            {/*    <CardList title="Popular Content" />*/}
            {/*</div>*/}
        </div>
    );
};

export default HomePage;