'use client';
import React from "react";

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Edit, Plus} from "lucide-react";
import {defaultPackageValue, PackagesType} from "@/features/packages/schemas";
import {AddOrEditPackagesForm} from "@/features/packages/components/add-or-edit-packages-form";


type AddPackageDialogType = {
    form_type: "add" | "edit"
    defaultValues?: PackagesType
}
export const AddOrEditPackageDialog = ({
                                           form_type,
                                           defaultValues = defaultPackageValue
                                       }: AddPackageDialogType) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    form_type === "edit" ? (
                        <Button className="w-full">
                            <Edit/> Edit Package
                        </Button>
                    ) : (
                        <div className='flex justify-end'>
                            <Button>
                                <Plus/> Add Packages
                            </Button>
                        </div>
                    )
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {
                            form_type === "add" ? "Add Package" : "Edit Package"
                        }
                    </DialogTitle>
                    <DialogDescription>
                        {
                            form_type === "add" ? "Add New Packages. Click Add When You're Done" : "Edit Selected Package. Click On Edit When You're Done."
                        }
                    </DialogDescription>
                </DialogHeader>
                <AddOrEditPackagesForm closeModal={setOpen} form_type={form_type} defaultValues={defaultValues}/>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
