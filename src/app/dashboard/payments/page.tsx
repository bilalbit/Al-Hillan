import React from 'react';
import {columns, Payment} from "@/app/dashboard/payments/columns";
import {PaymentDataTable} from "@/features/payments/components/payment-data-table";
const getData = async (): Promise<Payment[]> => {
    return [
        {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "cbe",
            transaction_id: "FT25139WRL0Y",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "1000524146464"
            }
        },
        {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "CEJ6E3PGT4",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "0910801610",
                account_number: "number"
            }
        },
        {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        },
        {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        },
        {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        },
        {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        }, {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        },
        {
            id: "728ed521",
            amount: 134,
            status: "un-verified",
            payment_method: "telebirr",
            transaction_id: "johndoe@gmail.com",
            date: "John Doe",
            student: {
                id: "student_id",
                first_name: "string",
                middle_name: "string",
                last_name: "string",
                phone: "string",
                account_number: "string"
            }
        },




















    ];
};
const PaymentPage = async() => {
    const data = await getData();

    return (
        <div className="">
            <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
                <h1 className="font-semibold">All Payments</h1>
            </div>
            {/*Optional EXPORT TO CSV*/}
            {/* Must OPEN TRANSACTION IN NEW TAB*/}
            <PaymentDataTable columns={columns} data={data} />
        </div>
    );
};

export default PaymentPage;