import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Plus} from "lucide-react";
import React from "react";

export const AddPackageDialog = ()=> {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {/*<Button variant="outline">Add Package</Button>*/}
                <div className='flex justify-end'>
                    <Button>
                        <Plus /> Add Packages
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Package</DialogTitle>
                    <DialogDescription>
                        Add New Packages. Click Add when you're done.
                    </DialogDescription>
                </DialogHeader>
                {/*COURSE TYPE*/}
                {/*YEAR PRICE*/}
                {/*HALF YEAR PRICE*/}
                {/*MONTH PRICE*/}
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
