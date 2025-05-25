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
import {useToast} from "@/hooks/use-toast";
import {Payment} from "@/app/dashboard/payments/columns";
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

export const PaymentTableActions = ({payment}: { payment: Payment }) => {
    const {toast} = useToast()
    const payment_url = payment.payment_method === "cbe" ?
        `https://apps.cbe.com.et:100/?id=${payment.transaction_id}${payment.student.account_number.slice(-8)}`
        :
        `https://transactioninfo.ethiotelecom.et/receipt/${payment.transaction_id}`;
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
                        toast({
                            title: "Transaction ID Copied Successfully",
                            description: payment.id,
                        })
                        return navigator.clipboard.writeText(payment.id)
                    }}
                >
                    Copy Transaction ID
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                {/*NOT IMPLEMENTED YET*/}
                <DropdownMenuItem>
                    <Link href={`/dashboard/students/${payment.student.id}`}>
                        View student info
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={`/dashboard/payments/${payment.id}`}>
                        View payment details
                    </Link>
                </DropdownMenuItem>
                <Dialog>
                    <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={
                            event => event.preventDefault()
                        }>
                            Verify Payment
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl min-h-screen overflow-auto">
                        <DialogHeader>
                            <DialogTitle>Verify Payment</DialogTitle>
                            <DialogDescription>
                                Verify Student Payment Detail like Date, Name and Transaction ID
                                {/*OPEN IN NEW TAB CLICK HERE BUTTON*/}

                            </DialogDescription>
                        </DialogHeader>
                        <div className="w-full min-h-fit">
                            {/*ADJUST THE WIDTH AND HEIGHT OF IFRAME*/}
                            <iframe
                                src={payment_url}
                                className="w-full min-h-full border-0"
                                allowFullScreen
                                title="Payment Receipt"
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    console.log("Cancelled")
                                }}
                            >
                                Not Paid
                            </Button>
                            <Button>Paid</Button>
                        </DialogFooter>
                    </DialogContent>                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
