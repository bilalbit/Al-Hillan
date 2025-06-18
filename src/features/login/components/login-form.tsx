'use client';
import React from "react";
import {cn} from "@/lib/utils"
import {useAppForm} from "@/components/form-ui";
import {LoginSchema, LoginType} from "@/features/login/schemas";
import {logInAction} from "@/features/login/actions";
import {toast} from "sonner";

export const LoginForm = ({
                              className,
                          }: React.ComponentPropsWithoutRef<"form">) => {
    // const [state, action] = React.useActionState(logInAction, initialFormState)
    const form = useAppForm({
        defaultValues: {
            username: "",
            password: "",
        } as LoginType,
        validators: {
            onChangeAsync: LoginSchema,
            onChangeAsyncDebounceMs: 1500
        },
        // transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
        onSubmit: async ({value}) => {
            const {success} = await logInAction(value);
            if (!success) {
                toast('Incorrect Username or Password');
            }
        }

    })

    return (
        <form
            // action={action as never}
            className={cn("flex flex-col gap-6", className)}
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your username and password below to login to your Dashboard
                </p>
            </div>

            <div className="grid gap-6">

                <form.AppField name="username">
                    {
                        (field) => (
                            <field.TextField
                                label="Username"
                                placeholder="username"
                            />
                        )
                    }
                </form.AppField>

                <form.AppField name="password">
                    {
                        (field) => (
                            <field.TextField
                                label="Password"
                                placeholder="password"
                                type="password"
                            />
                        )
                    }
                </form.AppField>

                <form.AppForm>
                    <form.SubmitButton className="w-full">
                        Login
                    </form.SubmitButton>
                </form.AppForm>
            </div>
        </form>
    );
}
