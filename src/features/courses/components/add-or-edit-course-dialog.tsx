'use client';
import React from "react";

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Edit, Plus} from "lucide-react";

import {courseDefaultValue, CourseType} from "@/features/courses/schemas";
import {AddOrEditCoursesForm} from "@/features/courses/components/add-or-edit-courses-form";


type AddOrEditCourseDialogType = {
    form_type: "add" | "edit"
    defaultValues?: CourseType
}
export const AddOrEditCourseDialog = ({
                                          form_type,
                                          defaultValues = courseDefaultValue
                                      }: AddOrEditCourseDialogType) => {
    const [open, setOpen] = React.useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    form_type === "edit" ? (
                        <Button className="w-full">
                            <Edit/> Edit Course
                        </Button>
                    ) : (
                        <div className='flex justify-end'>
                            <Button>
                                <Plus/> Add Course
                            </Button>
                        </div>
                    )
                }
            </DialogTrigger>
            <DialogContent className="max-w-1/2">
                <DialogHeader>
                    <DialogTitle>{
                        form_type === "add" ? "Add Course" : "Edit Course"
                    }</DialogTitle>
                    <DialogDescription>
                        {
                            form_type === "add" ? "Add New Course. Click Add When You're Done" : "Edit Selected Course. Click On Edit When You're Done."
                        }
                    </DialogDescription>
                </DialogHeader>
                <AddOrEditCoursesForm form_type={form_type} defaultValues={defaultValues} closeModal={setOpen}/>
            </DialogContent>
        </Dialog>
    );
}




