'use client';
import React from 'react';
import {SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {useAppForm} from "@/components/form-ui";
import * as v from "valibot";

const ROLES = ["admin", "user"] as const;
const RoleMethodSchema = v.union(
    ROLES.map((role) => v.literal(role)),
    'Role must be either "admin" or "user"'
);
const RoleMethods = ROLES.map((value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
}));
const formSchema = v.object({
    username: v.pipe(
        v.string("Username must be a string"),
        v.minLength(3, "Username must be at least 3 characters long")
    ),
    email: v.pipe(
        v.string("Email must be a string"),
        v.email("Please enter a valid email address")
    ),
    phone: v.pipe(
        v.string("Phone number must be a string"),
        v.regex(/^\d{9}$/, "Phone number must be exactly 10 digits")
    ),
    location: v.pipe(
        v.string("Location must be a string"),
        v.minLength(3, "Username must be at least 3 characters long")
    ),
    role: RoleMethodSchema
});
export type formType = v.InferInput<typeof formSchema>
export const EditUser = ({defaultFormData}: { defaultFormData: formType }) => {
    const form = useAppForm({
        defaultValues: defaultFormData,
        validators: {
            onChangeAsync: formSchema,
            onChangeAsyncDebounceMs: 500
        },
        onSubmit: ({value}) => {
            console.log(value)
        }
    })
    return (

        <SheetContent>
            <SheetHeader>
                <SheetTitle className="text-lg">Are you absolutely sure?</SheetTitle>
                <SheetDescription className="mt-8">
                    <form className="text-white space-y-6" onSubmit={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        form.handleSubmit()
                    }}>
                            <form.AppField
                                name="username">
                                {(field) => <field.TextField label="Username"/>}
                            </form.AppField>
                            <form.AppField
                                name="email">
                                {(field) => <field.TextField label="Email"/>}
                            </form.AppField>
                            <form.AppField
                                name="phone">
                                {(field) => <field.TextField label="Phone Number"/>}
                            </form.AppField>

                            <form.AppField
                                name="location">
                                {(field) => <field.TextField label="Loaction"/>}
                            </form.AppField>
                            <form.AppField name="role">
                                {(field) => (
                                    <field.SelectField
                                        label="Role"
                                        options={RoleMethods}
                                        className="text-white"
                                    />
                                )}
                            </form.AppField>
                            <form.AppForm>
                                <form.SubmitButton
                                    className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300">Register
                                </form.SubmitButton>
                            </form.AppForm>
                    </form>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    );
};