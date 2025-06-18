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
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {AddOrEditStudentRegisterForm} from "@/features/register/components/add-or-edit-student-register-form";
import {ScrollArea} from "@/components/ui/scroll-area";
import Link from 'next/link';
import {StudentType} from '../schemas';

export const StudentTableActions = ({student}: { student: StudentType }) => {
        const [open, setOpen] = React.useState(false)
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
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <Link href={`/dashboard/students/${student.id}`}>
                        View student info
                    </Link>
                </DropdownMenuItem>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <DropdownMenuItem onSelect={
                            event => event.preventDefault()
                        }>
                            Edit student info
                        </DropdownMenuItem>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Edit Student Info</SheetTitle>
                            <SheetDescription>
                                Edit Student Information and Click on Edit Button.
                                This Action can&apos;t be undone.
                            </SheetDescription>
                        </SheetHeader>
                        <ScrollArea className="p-2 min-w-full h-[calc(100vh-100px)]">
                            <AddOrEditStudentRegisterForm closeModalAction={setOpen} form_type="edit" defaultValues={student}/>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};