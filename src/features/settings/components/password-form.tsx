'use client';
import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from '@tanstack/react-form';
import {FieldErrors} from "@/components/form-ui/field-errors";
import {PasswordFormSchema} from '../schema';
import {changeUserPassword} from "@/features/settings/actions";
import {toast} from "sonner";


const PasswordForm = () => {
    const form = useForm({
        defaultValues: {
            current_password: "",
            new_password: "",
            password_confirmation: ""
        },
        validators: {
            onChangeAsync: PasswordFormSchema,
            onChangeAsyncDebounceMs: 2000,
        },
        onSubmit: async ({value}) => {
            const {success} = await changeUserPassword(value)
            if (success) {
                toast("successfully updated username and email")
            }
        }
    })

    return (
        <form
            onSubmit={(e) => {
                e.stopPropagation()
                e.preventDefault()
                form.handleSubmit()
            }}
            className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="current_password">Current password</Label>

                <form.Field name="current_password">
                    {(field) => (
                        <>
                            <Input
                                id="current_password"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                placeholder="Current password"
                            />
                            <FieldErrors meta={field.state.meta}/>
                        </>
                    )}
                </form.Field>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="new_password">New password</Label>

                <form.Field
                    name="new_password">
                    {(field) => (
                        <>
                            <Input
                                id="new_password"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                placeholder="New password"
                            />
                            <FieldErrors meta={field.state.meta}/>
                        </>
                    )}
                </form.Field>

            </div>

            <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirm password</Label>

                <form.Field
                    name="password_confirmation"
                    validators={{
                        onChangeListenTo: ["new_password"],
                        onChangeAsync: ({value, fieldApi}) => {
                            if (value !== fieldApi.form.getFieldValue('new_password')) {
                                return 'Passwords do not match'
                            }
                            return undefined
                        },
                        onChangeAsyncDebounceMs: 2000
                    }}
                >
                    {(field) => (
                        <>
                            <Input
                                id="password_confirmation"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                placeholder="Confirm password"
                            />
                            <FieldErrors meta={field.state.meta}/>
                        </>
                    )}
                </form.Field>
            </div>

            <div className="flex items-center gap-4">
                <Button>Save password</Button>
                <Button
                type="reset"
                onClick={(event) => {
                    event.preventDefault()
                    form.reset()
                }}
            >
                Reset
            </Button>
            </div>

        </form>
    )
        ;
};

export default PasswordForm;