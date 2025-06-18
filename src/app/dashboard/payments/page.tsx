import React from 'react';
import {columns} from "@/app/dashboard/payments/columns";
import {PaymentDataTable} from "@/features/payments/components/payment-data-table";
import {getAllPayments} from "@/features/payments/server/api";
import {formatDateToYYYYMMDD} from "@/lib/formatters";

type query = {
    payment_date: string
    course: string
}
const PaymentPage = async ({searchParams}: { searchParams: query }) => {
    const p_date = (await searchParams).payment_date
    const payment_date = p_date != undefined ? p_date : formatDateToYYYYMMDD()

    const {data} = await getAllPayments(payment_date);

    return (
        <div className="">
            <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
                <h1 className="font-semibold">All Payments</h1>
            </div>
            {/*Optional EXPORT TO CSV*/}
            {/* Must OPEN TRANSACTION IN NEW TAB*/}
            <PaymentDataTable columns={columns} data={data}/>
        </div>
    );
};

export default PaymentPage;