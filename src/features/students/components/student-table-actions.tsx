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
import {StudentType} from '../schemas';
import {AddOrEditStudentForm} from "@/features/students/components/add-or-edit-student-form";

export const StudentTableActions = ({student}: { student: StudentType }) => {
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
                {/*NOT IMPLEMENTED YET*/}
                <DropdownMenuItem>
                    <Link href={`/dashboard/students/${student.id}`}>
                        View student info
                    </Link>
                </DropdownMenuItem>
                <Dialog>
                    <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={
                            event => event.preventDefault()
                        }>
                            Edit student info
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Edit Student Info</DialogTitle>
                            <DialogDescription>
                                Edit Student Information and Click on Edit Button.
                                This Action can't be Undone
                                {/*OPEN IN NEW TAB CLICK HERE BUTTON*/}

                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            {/*ADJUST THE WIDTH AND HEIGHT OF IFRAME*/}
                            <AddOrEditStudentForm form_type="edit" defaultValues={student}/>
                        </div>
                    </DialogContent>
                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
