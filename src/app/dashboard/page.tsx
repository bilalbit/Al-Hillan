import React from 'react';
import {AppBarChart} from "@/components/charts/app-bar-chart";
// import {AppAreaChart} from "@/components/charts/app-area-chart";
import {AppPieChart} from "@/components/charts/app-pie-chart";
// import {CardList} from "@/layouts/card-list";
// import {TodoList} from "@/layouts/todo-list";

const HomePage = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
            <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
                <AppBarChart />
            </div>
            {/*<div className="bg-primary-foreground p-4 rounded-lg">*/}
            {/*    <CardList title="Latest Transactions" />*/}
            {/*</div>*/}
            <div className="bg-primary-foreground rounded-lg flex justify-center items-center">
                <AppPieChart />
            </div>
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