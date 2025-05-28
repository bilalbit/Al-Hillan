"use client"

import {ColumnDef} from "@tanstack/react-table"
import {cn} from "@/lib/utils";
import {DataTableColumnHeader} from "@/components/ui+/data-table-column-header";
import {StudentType} from "@/features/students/schemas";
import {StudentTableActions} from "@/features/students/components/student-table-actions";


export const columns: ColumnDef<StudentType>[] = [
    {
        id: "fullName",
        accessorFn: row => `${row.first_name} ${row.middle_name} ${row.last_name ? row.last_name : ""}`,
        header: ({column}) => {
            return <DataTableColumnHeader column={column} title="Full Name"/>
        },
        cell: ({row}) => (row.getValue('fullName') as string).toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        filterFn: "includesString",
        enableHiding: false
    },
    {
        accessorFn: row => `${row.phone_number}`,
        header: "Phone Number",
    },
    {
        accessorFn: row => `${row.account_number}`,
        header: "Account Number",
    },
    {
        accessorKey: "status",
        header: ({column}) => {
            return <DataTableColumnHeader column={column} title="Status"/>

        },
        cell: ({row}) => {
            const status: string = row.getValue("status");
            return (
                <div
                    className={cn(
                        `p-1 rounded-md text-xs w-max text-center`,
                        status === "inactive" && "bg-yellow-500/40",
                        status === "active" && "bg-green-500/40",
                        status === "suspended" && "bg-red-500/40",
                    )}
                >
                    {status}
                </div>
            )
        },
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
