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

export const DeletePackageDialog = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button className='w-fit absolute top-2 right-2 hover:bg-destructive duration-200'>
                    <Trash2/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                        This will permanently delete the package
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" variant="destructive">
                            Delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>

        </Dialog>

    );
};
