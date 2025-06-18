'use client';
import React from "react";


import {useAppForm} from "@/components/form-ui";
import {StudentSchema, StudentStatusOptions, StudentType} from "@/features/students/schemas";
import {getCourseWithLabel} from "@/features/courses/server/api";
import {editStudentInfo, registerStudent} from "@/features/students/server/actions";


import {toast} from "sonner";

type AddOrEditStudentFormType = {
    form_type: "add" | "edit",
    closeModalAction: React.Dispatch<React.SetStateAction<boolean>>
    defaultValues?: StudentType
}
export const AddOrEditStudentRegisterForm = ({
                                                 form_type,
                                                 closeModalAction,
                                                 defaultValues = {
                                                     id: undefined,
                                                     first_name: "",
                                                     middle_name: "",
                                                     last_name: "",
                                                     phone_number: "",
                                                     course_id: "",
                                                     date_of_birth: undefined,
                                                     status: undefined,
                                                 },
                                             }: AddOrEditStudentFormType) => {
    const form = useAppForm({
        defaultValues: defaultValues,
        validators: {
            onBlurAsync: StudentSchema,
            onBlurAsyncDebounceMs: 1500
        },

        onSubmit: async ({value}) => {
            if (form_type == "add") {
                await registerStudent(value);
                toast("Student Added Successfully");
                closeModalAction(false)
            } else {
                await editStudentInfo(value);
                toast("Student Edited Successfully");
                closeModalAction(false)
            }

        },

    })

    const [courseValue, setCourseValue] = React.useState<{ value: string, label: string }[] | null>(null);
    React.useEffect(() => {
        async function fetchCourse() {
            const fetchedCourses = await getCourseWithLabel();
            setCourseValue(fetchedCourses);
        }

        fetchCourse()
    }, [form_type]);
    return (
        <form
            className="grid gap-4 py-4"
            onSubmit={(event) => {
                event.stopPropagation()
                event.preventDefault()
                form.handleSubmit()
            }}
        >
            <form.AppField name="id">
                {(field) => <field.HiddenInput/>}
            </form.AppField>
            <form.AppField name="first_name">
                {(field) => <field.TextField label="First Name"/>}
            </form.AppField>
            <form.AppField name="middle_name">
                {(field) => <field.TextField label="Middle Name"/>}
            </form.AppField>
            <form.AppField name="last_name">
                {(field) => <field.TextField label="Last Name"/>}
            </form.AppField>
            <form.AppField name="phone_number">
                {(field) => <field.TextField label="Phone Number"/>}
            </form.AppField>
            {
                form_type === "edit" ?
                    <form.AppField name='status'>
                        {
                            (field) => (
                                <field.SelectField
                                    label="status type"
                                    options={StudentStatusOptions}
                                    placeholder="status Type"
                                />
                            )
                        }
                    </form.AppField> : null
            }
            {
                courseValue ? (
                    <form.AppField name='course_id'>
                        {
                            (field) => (
                                <field.SelectField

                                    label="Course type"
                                    options={courseValue}
                                    placeholder="Course Type"
                                />
                            )
                        }
                    </form.AppField>
                ) : null
            }
            <form.AppField name="date_of_birth">
                {(field) => <field.DatePicker label="Date of Birth"/>}
            </form.AppField>

            <form.AppForm>
                <form.SubmitButton className="min-w-full">
                    {form_type == "edit" ? "Edit" : "Add"}
                </form.SubmitButton>
            </form.AppForm>
        </form>
    );

}