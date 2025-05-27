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

import { CourseType ,CourseSchema} from "@/features/courses/schemas";


type AddOrEditCourseDialogType = {
    form_type: "add" | "edit"
    defaultValues?: CourseType
}
export const AddOrEditCourseDialog = ({
                                           form_type,
                                           defaultValues = {
                                               id: "",
                                               title: "",
                                               category: "beginner",
                                               youtube_url: "",
                                               duration: "",
                                               students: 0,
                                               startDate: "",
                                               description: "",
                                           }
                                       }: AddOrEditCourseDialogType) => {
    const form = useAppForm({
        defaultValues: defaultValues,
        validators: {
            onChangeAsync: CourseSchema,
            onBlurAsyncDebounceMs: 600
        },
        onSubmit: ({value}) => {
            console.log(value)
        }
    })
    return (
        <Dialog>
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
            <DialogContent className="sm:max-w-[425px]">
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
                <form className="grid gap-4 py-4">
                    <form.AppField name="title">
                        {(field) => <field.TextField label="Year Price"/>}
                    </form.AppField>
                    <form.AppField name='category'>
                        {
                            (field) => (
                                <field.SelectField
                                    label="Course type"
                                    options={[
                                        {
                                            value: "beginner",
                                            label: "beginner"
                                        }
                                    ]}
                                    placeholder="Course Type"
                                />
                            )
                        }
                    </form.AppField>

                    <form.AppField name="youtube_url">
                        {(field) => <field.TextField label="Half Year Price"/>}
                    </form.AppField>
                    <form.AppField name="duration">
                        {(field) => <field.NumberField min={1} label="Monthly Price"/>}
                    </form.AppField>
                    <form.AppField name="students">
                        {(field) => <field.NumberField min={1} label="Monthly Price"/>}
                    </form.AppField>
                </form>
                {
                    form_type == "edit" ?
                        (
                            <form.AppForm>
                                <form.SubmitButton>
                                    <Button type="submit">Edit</Button>
                                </form.SubmitButton>
                            </form.AppForm>
                        ) : (
                            <form.AppForm>
                                <form.SubmitButton>
                                    <Button type="submit">Add</Button>
                                </form.SubmitButton>
                            </form.AppForm>
                        )
                }
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
