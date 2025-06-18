import React from 'react';
import {columns} from './columns';
import {formatDateToYYYYMMDD} from "@/lib/formatters";
import {getAllRegisters} from "@/features/register/server/api";
import {RegisterDataTable} from "@/features/register/components/register-data-table";

type query = {
    register_date: string
    course: string
}
const RegisterPage = async ({searchParams}: {searchParams: query}) => {
    const r_date = (await searchParams).register_date;
    const course_title = (await searchParams).course;
    const register_date = r_date != undefined ? r_date : formatDateToYYYYMMDD();
    const {data} = await getAllRegisters(register_date,course_title);
    return (
        <>
            <RegisterDataTable data={data} columns={columns}/>
        </>
    );
};

export default RegisterPage;