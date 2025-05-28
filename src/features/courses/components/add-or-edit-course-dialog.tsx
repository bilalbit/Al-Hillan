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
import * as v from "valibot";

import {CourseCategoryOptions, CourseSchema, CourseType} from "@/features/courses/schemas";


type AddOrEditCourseDialogType = {
    form_type: "add" | "edit"
    defaultValues?: CourseType
}
export const AddOrEditCourseDialog = ({
                                          form_type,
                                          defaultValues = {
                                              title: "",
                                              category: "beginner",
                                              youtube_url: "",
                                              duration: undefined,
                                              num_of_students: null,
                                              startDate: undefined,
                                              description: "",
                                          }
                                      }: AddOrEditCourseDialogType) => {
    const form = useAppForm({
        defaultValues: defaultValues,
        validators: {
            onChangeAsync: CourseSchema,
            onBlurAsyncDebounceMs: 600,
            onBlur: ({value}) => {
                console.log(value)
                console.log(v.parse(CourseSchema,value))
            }
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
                <form className="flex flex-col gap-4">
                    <form.AppField name="title">
                        {(field) => <field.TextField label="Title"/>}
                    </form.AppField>
                    <form.AppField name='category'>
                        {
                            (field) => (
                                <field.SelectField
                                    label="Course type"
                                    options={CourseCategoryOptions}
                                    placeholder="Course Type"
                                />
                            )
                        }
                    </form.AppField>

                    <form.AppField name="youtube_url">
                        {(field) => <field.TextField label="Course Intro Video"/>}
                    </form.AppField>
                    <form.AppField name="startDate">
                        {(field) => <field.DatePicker  label="Start day of The Course"/>}
                    </form.AppField>
                    <form.AppField name="duration">
                        {(field) => <field.DatePicker  label="Duration of The Course"/>}
                    </form.AppField>
                    {/*<form.AppField name="duration">*/}
                    {/*    {(field) => <field.DatePickerWithRange label="Duration of The Course"/>}*/}
                    {/*</form.AppField>*/}
                    <form.AppField name="description">
                        {(field) => <field.TextField label="Description"/>}
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
