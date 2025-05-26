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

import {useAppForm} from "@/components/form-ui";
import {PackageSchema, PackagesType} from "@/features/packages/schemas";


type AddPackageDialogType = {
    form_type: "add" | "edit"
    defaultValues?: PackagesType
}
export const AddOrEditPackageDialog = ({
                                           form_type,
                                           defaultValues = {
                                               id: "",
                                               course_type: "",
                                               year_price: 1,
                                               half_year_price: 1,
                                               month_price: 1,
                                           }
                                       }: AddPackageDialogType) => {
    const form = useAppForm({
        defaultValues: defaultValues,
        validators: {
            onChangeAsync: PackageSchema,
            onBlurAsyncDebounceMs: 600
        }
    })
    return (
        <Dialog>
            <DialogTrigger asChild>
                {/*<Button variant="outline">Add Package</Button>*/}
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
                    <DialogTitle>Add Package</DialogTitle>
                    <DialogDescription>
                        Add New Packages. Click Add when you're done.
                    </DialogDescription>
                </DialogHeader>
                {/*COURSE TYPE*/}
                {/*YEAR PRICE*/}
                {/*HALF YEAR PRICE*/}
                {/*MONTH PRICE*/}
                <form className="grid gap-4 py-4">
                    {/*<div className="grid grid-cols-4 items-center gap-4">*/}
                    {/*    <Label htmlFor="name" className="text-right">*/}
                    {/*        Name*/}
                    {/*    </Label>*/}
                    {/*    <Input id="name" value="Pedro Duarte" className="col-span-3"/>*/}
                    {/*</div>*/}
                    <form.AppField name='course_type'>
                        {
                            (field) => (
                                <field.SelectField
                                    label="Course type"
                                    options={[{value: "course1", label: "Course1"}]}/>
                            )
                        }
                    </form.AppField>
                    <form.AppField name="year_price">
                        {(field) => <field.TextField type="number" min={1} label="Year Price"/>}
                    </form.AppField>
                    <form.AppField name="half_year_price">
                        {(field) => <field.TextField type="number" min={1} label="Half Year Price"/>}
                    </form.AppField>
                    <form.AppField name="month_price">
                        {(field) => <field.TextField type="number" min={1} label="Monthly Price"/>}
                    </form.AppField>
                    {/*<div className="grid grid-cols-4 items-center gap-4">*/}
                    {/*    <Label htmlFor="username" className="text-right">*/}
                    {/*        Username*/}
                    {/*    </Label>*/}
                    {/*    <Input id="username" value="@peduarte" className="col-span-3"/>*/}
                    {/*</div>*/}
                </form>
                <DialogFooter>
                    <Button type="submit">Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
