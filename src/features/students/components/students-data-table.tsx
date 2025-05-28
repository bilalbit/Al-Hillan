"use client"

import React from "react";

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {DataTablePagination} from "@/components/ui+/table-pagination";
import {DataTableViewOptions} from "@/components/ui+/data-table-view-options";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {exportTableToCSV} from "@/lib/export";
import {Download, Plus} from "lucide-react";
import {ReloadIcon} from "@/components/ui+/reload-icon";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import GDialog from "@/components/custome-component/g-dialog";
import {AddOrEditStudentForm} from "@/features/students/components/add-or-edit-student-form";


type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export const StudentsDataTable = <TData, TValue>({
                                                     columns,
                                                     data,
                                                 }: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection
        },
    })

    return (
        <div className="rounded-md border space-y-6">
            <div className="w-full flex justify-between px-4">
                <div className="flex items-center py-4 gap-2">
                    <Input
                        placeholder="Search Students"
                        value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("fullName")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="secondary">
                                Search By
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Name</DropdownMenuItem>
                            <DropdownMenuItem>Phone Number</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <ReloadIcon/>
                </div>
                <div className="flex justify-between items-center gap-2">
                    {/*<Button variant="outline" size="sm">*/}
                    {/*    <Plus/>*/}
                    {/*    Add Student*/}
                    {/*</Button>*/}
                    <GDialog triggerChild={
                        <Button variant="outline" size="sm">
                            <Plus/>
                            Add Student
                        </Button>
                    }>
                        <AddOrEditStudentForm form_type="add"/>
                    </GDialog>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            exportTableToCSV(table, {
                                // Students/DAY/MONTH/DATE
                                filename: `Students/`,
                                excludeColumns: ["select", "actions"],
                            })
                        }
                    >
                        <Download/>
                        Export
                    </Button>
                    <DataTableViewOptions table={table}/>
                </div>
            </div>

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <DataTablePagination table={table}/>

        </div>
    )
}
