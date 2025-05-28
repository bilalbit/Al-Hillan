import React from 'react';
import {StudentsDataTable} from "@/features/students/components/students-data-table";
import {columns} from './columns';
import {StudentType} from "@/features/students/schemas";

const mockStudents = () => {
    return [
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",
            first_name: "Abebe",
            middle_name: "Kebede",
            last_name: "Woldemariam",
            account_number: "1234567890123",
            phone_number: "912345678",
            date_of_birth: new Date("1998-05-15"),
            status: "active"
        },
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",

            first_name: "Selam",
            middle_name: "Tesfaye",
            account_number: "2345678901234",
            phone_number: "912345678",

            status: "inactive",
            date_of_birth: new Date("1998-05-15"),

        },
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",

            first_name: "Tewodros",
            middle_name: "Alemu",
            last_name: "Gebre",
            account_number: "3456789012345",
            phone_number: "712345678",
            status: "suspended",
            date_of_birth: new Date("1998-05-15"),

        },
        {
            first_name: "Meron",
            middle_name: "Girma",
            account_number: "4567890123456",
            phone_number: "912345678",

            date_of_birth: new Date("2000-03-22"),
            status: "active"
        },
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",

            first_name: "Yonas",
            middle_name: "Tadesse",
            last_name: "Desta",
            account_number: "5678901234567",
            phone_number: "923456789",
            status: "inactive",

        },
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",

            first_name: "Hana",
            middle_name: "Worku",
            account_number: "6789012345678",
            phone_number: "912345678",
            status: "active"
        },
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",

            first_name: "Dawit",
            middle_name: "Bekele",
            last_name: "Alemayehu",
            account_number: "7890123456789",
            phone_number: "734567890",
            date_of_birth: new Date("1995-11-10"),
            status: "suspended"
        },
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",

            first_name: "Eyerusalem",
            middle_name: "Mekonnen",
            account_number: "8901234567890",
            phone_number: "912345678",

            status: "active"
        },
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",

            first_name: "Bereket",
            middle_name: "Asfaw",
            last_name: "Belay",
            account_number: "9012345678901",
            phone_number: "945678901",
            status: "inactive"
        },
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",

            first_name: "Tsehay",
            middle_name: "Hailu",
            account_number: "0123456789012",
            date_of_birth: new Date("2002-07-19"),
            phone_number: "912345678",

            status: "active"
        },
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",

            first_name: "Samuel",
            middle_name: "Yohannes",
            last_name: "Mengistu",
            account_number: "1234567890124",
            phone_number: "756789012",
            status: "suspended"
        },
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",

            first_name: "Lidya",
            middle_name: "Getachew",
            account_number: "2345678901235",
            phone_number: "912345678",

            status: "active"
        },
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",

            first_name: "Mesfin",
            middle_name: "Lemma",
            last_name: "Abera",
            account_number: "3456789012346",
            phone_number: "967890123",
            date_of_birth: new Date("1997-02-28"),
            status: "inactive"
        },
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",

            first_name: "Rahel",
            middle_name: "Fikadu",
            account_number: "4567890123457",
            phone_number: "912345678",
            status: "active"
        },
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",

            first_name: "Elias",
            middle_name: "Negash",
            last_name: "Teshome",
            account_number: "5678901234568",
            phone_number: "978901234",
            status: "suspended"
        },
        {
            id: "0d854f16-bad4-46ff-a406-62ce89774900",
            first_name: "Zewditu",
            middle_name: "Tilahun",
            account_number: "6789012345679",
            date_of_birth: new Date("2001-09-05"),
            phone_number: "912345678",
            status: "active"
        }
    ] as StudentType[]
};
const StudentsPage = () => {
    const data = mockStudents();
    return (
        <>
            <StudentsDataTable data={data} columns={columns}/>
        </>
    );
};

export default StudentsPage;