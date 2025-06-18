'use client';
import React from 'react';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import {deleteCourse} from "@/features/courses/server/actions";

type DeleteDialogType = {
    name: string;
    label: string;
    id: string
}

export const DeleteDialog = ({name,label,id}:DeleteDialogType) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='w-fit absolute z-10 top-2 right-2 bg-red-700 hover:bg-destructive duration-200'>
                    <Trash2/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {name} {label} ?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                        This will permanently delete the {label}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" variant="destructive" onClick={()=>deleteCourse(id)}>
                            Delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>

        </Dialog>

    );
};
