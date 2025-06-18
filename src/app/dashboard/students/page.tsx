import React from 'react';
import {StudentsDataTable} from "@/features/students/components/students-data-table";
import {columns} from './columns';
import {getAllStudents} from "@/features/students/server/api";
import {formatDateToYYYYMMDD} from "@/lib/formatters";

type query = {
    register_date: string
}
const StudentsPage = async ({searchParams}: {searchParams: query}) => {
    const r_date = (await searchParams).register_date
    const register_date = r_date != undefined ? r_date : formatDateToYYYYMMDD()
    const {data} = await getAllStudents(register_date);
    return (
        <>
            <StudentsDataTable data={data} columns={columns}/>
        </>
    );
};

export default StudentsPage;