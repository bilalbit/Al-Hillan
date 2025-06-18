"use client"

import {ColumnDef} from "@tanstack/react-table"
import {cn} from "@/lib/utils";
import {DataTableColumnHeader} from "@/components/ui+/data-table-column-header";
import {RegisterType} from "@/features/register/schemas";
import {RegisterTableActions} from "@/features/register/components/register-table-actions";


export const columns: ColumnDef<RegisterType>[] = [
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
        accessorKey: "course_title",
        header: ({column}) => {
            return <DataTableColumnHeader column={column} title="Course Title"/>

        },
        cell: ({row}) => {
            const course_title: string = row.getValue("course_title");
            return (
                <div
                    className={cn(
                        `p-1 rounded-md text-xs w-max text-center`,
                        status === "inactive" && "bg-yellow-500/40",
                        status === "active" && "bg-green-500/40",
                        status === "suspended" && "bg-red-500/40",
                    )}
                >
                    {course_title}
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const register = row.original

            return (
                <RegisterTableActions register={register}/>
            );
        },
    },
];
