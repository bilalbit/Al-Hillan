'use client';
import React from "react";

import {Button} from "@/components/ui/button"

import {useAppForm} from "@/components/form-ui";
import {StudentSchema, StudentStatusOptions, StudentType} from "@/features/students/schemas";

import * as v from 'valibot';
// GET COURSE NAME FROM DATABASE
type AddOrEditStudentFormType = {
    form_type: "add" | "edit"
    defaultValues?: StudentType
}
export const AddOrEditStudentForm = ({
                                           form_type,
                                           defaultValues = {
                                               id: undefined,
                                               first_name: "",
                                               middle_name: "",
                                               last_name: "",
                                               account_number: "",
                                               phone_number: "",
                                               date_of_birth: undefined,
                                               status: "active",                                           }
                                       }: AddOrEditStudentFormType) => {
    const form = useAppForm({
        defaultValues: defaultValues,
        validators: {
            onChangeAsync: StudentSchema,
            onChangeAsyncDebounceMs: 600,
            onBlur: ({value})=>{
                console.log(value)
                v.parse(StudentSchema, value);
            }

        },
        onSubmit: ({value}) => {
            console.log(value)
        },
    })
    return (
               <>
                   <form className="grid gap-4 py-4">
                       <form.AppField name="first_name">
                           {(field) => <field.TextField label="First Name"/>}
                       </form.AppField>
                       <form.AppField name="middle_name">
                           {(field) => <field.TextField label="Middle Name"/>}
                       </form.AppField>
                       <form.AppField name="last_name">
                           {(field) => <field.TextField label="Last Name"/>}
                       </form.AppField>
                       <form.AppField name="account_number">
                           {(field) => <field.TextField label="Account Number"/>}
                       </form.AppField>
                       <form.AppField name="phone_number">
                           {(field) => <field.TextField label="Phone Number"/>}
                       </form.AppField>
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
                       </form.AppField>
                       <form.AppField name="date_of_birth">
                           {(field) => <field.DateField label="Date of Birth"/>}
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
               </>
    )
}