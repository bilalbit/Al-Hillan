'use client';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreVertical} from "lucide-react";
import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Payment} from '../schemas';
import {toast} from "sonner";
import {verifyPayments} from "@/features/payments/server/api";

export const PaymentTableActions = ({payment}: { payment: Payment }) => {
    const payment_url = payment.payment_method === "cbe" ?
        `https://apps.cbe.com.et:100/?id=${payment.tin_number}${payment.account_number.slice(-8)}`
        : payment.payment_method === "telebirr" ?
            `https://transactioninfo.ethiotelecom.et/receipt/${payment.tin_number}` :
            `https://cbepay1.cbe.com.et/aureceipt?TID=${payment.tin_number}=${payment.phone_number}`;
    const [open, setOpen] = React.useState(false);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => {
                        toast(`${payment.tin_number} copied`)
                        return navigator.clipboard.writeText(payment.tin_number)
                    }}
                >
                    Copy Transaction ID
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                {/*NOT IMPLEMENTED YET*/}
                <DropdownMenuItem>
                    <Link href={`/dashboard/students/${payment.student_id}`}>
                        View student info
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={payment_url} target='_blank'>
                        View payment details
                    </Link>
                </DropdownMenuItem>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={
                            event => event.preventDefault()
                        }>
                            Verify Payment
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="min-w-4/5 min-h-screen flex flex-col justify-between bg-muted">
                        <DialogHeader>
                            <DialogTitle>Verify Payment</DialogTitle>
                            <DialogDescription>
                                Verify Student Payment Detail like Date, Name ,Transaction ID and Price
                            </DialogDescription>
                        </DialogHeader>
                        <div className="relative min-w-4/5 min-h-full grow">
                            {/*ADJUST THE WIDTH AND HEIGHT OF IFRAME*/}
                            <iframe
                                src={payment_url}
                                className="absolute min-w-full h-full border-0"
                                title="Payment Receipt"
                            />
                        </div>
                        <DialogFooter className="h-fit">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setOpen(false)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="bg-yellow-600"
                                onClick={async () => {
                                    await verifyPayments(payment.payment_id, "failed")
                                    setOpen(false)
                                    toast(`Failed Transaction`)
                                }
                                }
                            >
                                Failed
                            </Button>
                            <Button
                                className="bg-red-600"
                                onClick={async () => {
                                    await verifyPayments(payment.payment_id, "un-verified")
                                    setOpen(false)
                                    toast(`not paid Transaction`);
                                }}
                            >
                                Not Paid
                            </Button>
                            <Button
                                className="bg-emerald-600"
                                onClick={async () => {
                                    await verifyPayments(payment.payment_id, "verified")
                                    setOpen(false)
                                    toast(`Paid Transaction`)
                                }}
                            >Paid
                            </Button>
                            <div
                                className="group relative flex justify-center items-center text-zinc-600 text-sm font-bold"
                            >
                                <div
                                    className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%] -translate-y-[300%] duration-500 group-hover:delay-500 skew-y-[20deg] group-hover:skew-y-0 shadow-md"
                                >
                                    <div className="bg-lime-200 flex items-center gap-1 p-2 rounded-md">
                                        <svg
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            height="20px"
                                            width="20px"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="stroke-zinc-600"
                                        >
                                            <circle stroke-linejoin="round" r="9" cy="12" cx="12"></circle>
                                            <path
                                                stroke-linejoin="round"
                                                d="M12 3C12 3 8.5 6 8.5 12C8.5 18 12 21 12 21"
                                            ></path>
                                            <path
                                                stroke-linejoin="round"
                                                d="M12 3C12 3 15.5 6 15.5 12C15.5 18 12 21 12 21"
                                            ></path>
                                            <path stroke-linejoin="round" d="M3 12H21"></path>
                                            <path stroke-linejoin="round" d="M19.5 7.5H4.5"></path>
                                            <g filter="url(#filter0_d_15_556)">
                                                <path stroke-linejoin="round" d="M19.5 16.5H4.5"></path>
                                            </g>
                                            <defs>
                                                <filter
                                                    color-interpolation-filters="sRGB"
                                                    filterUnits="userSpaceOnUse"
                                                    height="3"
                                                    width="17"
                                                    y="16"
                                                    x="3.5"
                                                    id="filter0_d_15_556"
                                                >
                                                    <feFlood result="BackgroundImageFix" flood-opacity="0"></feFlood>
                                                    <feColorMatrix
                                                        result="hardAlpha"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                        type="matrix"
                                                        in="SourceAlpha"
                                                    ></feColorMatrix>
                                                    <feOffset dy="1"></feOffset>
                                                    <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                                                    <feColorMatrix
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                                                        type="matrix"
                                                    ></feColorMatrix>
                                                    <feBlend
                                                        result="effect1_dropShadow_15_556"
                                                        in2="BackgroundImageFix"
                                                        mode="normal"
                                                    ></feBlend>
                                                    <feBlend
                                                        result="shape"
                                                        in2="effect1_dropShadow_15_556"
                                                        in="SourceGraphic"
                                                        mode="normal"
                                                    ></feBlend>
                                                </filter>
                                            </defs>
                                        </svg>
                                        <span>Open In New Tab</span>
                                    </div>
                                    <div
                                        className="shadow-md bg-lime-200 absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1"
                                    ></div>
                                    <div
                                        className="rounded-md bg-white group-hover:opacity-0 group-hover:scale-[115%] group-hover:delay-700 duration-500 w-full h-full absolute top-0 left-0"
                                    >
                                        <div
                                            className="border-b border-r border-white bg-white absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1"
                                        ></div>
                                    </div>
                                </div>

                                <div
                                    className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-lime-200 to-yellow-200 p-3 rounded-full cursor-pointer duration-300"
                                >
                                    <svg
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        height="20px"
                                        width="20px"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="fill-zinc-600"
                                    >
                                        <path
                                            stroke-linejoin="round"
                                            stroke-linecap="round"
                                            d="M15.4306 7.70172C7.55045 7.99826 3.43929 15.232 2.17021 19.3956C2.07701 19.7014 2.31139 20 2.63107 20C2.82491 20 3.0008 19.8828 3.08334 19.7074C6.04179 13.4211 12.7066 12.3152 15.514 12.5639C15.7583 12.5856 15.9333 12.7956 15.9333 13.0409V15.1247C15.9333 15.5667 16.4648 15.7913 16.7818 15.4833L20.6976 11.6784C20.8723 11.5087 20.8993 11.2378 20.7615 11.037L16.8456 5.32965C16.5677 4.92457 15.9333 5.12126 15.9333 5.61253V7.19231C15.9333 7.46845 15.7065 7.69133 15.4306 7.70172Z"
                                        ></path>
                                    </svg
                                    >
                                    <Link href={payment_url} target='_blank'>
                                        <span className="text-[0px] group-hover:text-sm text-blue-400 duration-300"
                                        >Detail</span>
                                    </Link>
                                </div>
                            </div>

                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
