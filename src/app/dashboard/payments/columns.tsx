"use client"

import {ColumnDef} from "@tanstack/react-table"
import {cn} from "@/lib/utils";
import {DataTableColumnHeader} from "@/components/ui+/data-table-column-header";
import {PaymentTableActions} from "@/features/payments/components/payment-table-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    amount: number
    status: "verified" | "un-verified"
    payment_method: "telebirr" | "cbe"
    transaction_id: string
    date: string
    student: {
        id: string
        first_name: string
        middle_name: string
        last_name?: string
        phone: string
        account_number: string
    }
}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "fullName",
        accessorFn: row => `${row.student.first_name} ${row.student.middle_name} ${row.student.last_name ? row.student.last_name : ""}`,
        header: ({column}) => {
            return <DataTableColumnHeader column={column} title="Full Name"/>

        },
        cell: ({row}) => (row.getValue('fullName') as string).toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        filterFn: "includesString"
    },
    {
        accessorFn: row => `${row.student.phone}`,
        header: "Phone Number",
    },
    {
        accessorFn: row => `${row.student.account_number}`,
        header: "Account Number",
    },
    {
        accessorKey: "payment_method",
        header: "Payment Method"
    },
    {
        accessorKey: 'transaction_id',
        header: "Transaction ID"
    },
    {
        accessorKey: "amount",
        header: () => (<div className="text-right pr-6">Amount</div>),
        cell: ({row}) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "ETB",
            }).format(amount)

            return <div className="text-right font-medium pr-6">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {
            const status: string = row.getValue("status");
            return (
                <div
                    className={cn(
                        `p-1 rounded-md text-xs w-max text-center`,
                        status === "pending" && "bg-yellow-500/40",
                        status === "success" && "bg-green-500/40",
                        status === "failed" && "bg-red-500/40",
                    )}
                >
                    {status}
                </div>
            )
        }
    },
    {
        accessorKey: "date",
        header: ({column}) => {
            return <DataTableColumnHeader column={column} title="Date"/>

        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const payment = row.original

            return (
                <PaymentTableActions payment={payment} />
            );
        },
    },
];
