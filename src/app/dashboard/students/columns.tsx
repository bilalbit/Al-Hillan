"use client"

import {ColumnDef} from "@tanstack/react-table"
import {cn} from "@/lib/utils";
import {DataTableColumnHeader} from "@/components/ui+/data-table-column-header";
import {PaymentTableActions} from "@/features/payments/components/payment-table-actions";
import {StudentTableActions} from "@/features/students/components/students-data-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = {
    id: string
    first_name: string
    middle_name: string
    last_name?: string
    phone: string
    account_number: string
    date_of_birth: string
    status: "active" | "inactive" | "suspended"
}

export const columns: ColumnDef<Student>[] = [
    {
        id: "fullName",
        accessorFn: row => `${row.first_name} ${row.middle_name} ${row.last_name ? row.last_name : ""}`,
        header: ({column}) => {
            return <DataTableColumnHeader column={column} title="Full Name"/>

        },
        cell: ({row}) => (row.getValue('fullName') as string).toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        filterFn: "includesString"
    },
    {
        accessorFn: row => `${row.phone}`,
        header: "Phone Number",
    },
    {
        accessorFn: row => `${row.account_number}`,
        header: "Account Number",
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
        accessorKey: "date_of_birth",
        header: ({column}) => {
            return <DataTableColumnHeader column={column} title="Date"/>

        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const student = row.original

            return (
                <StudentTableActions student={student}/>
            );
        },
    },
];
