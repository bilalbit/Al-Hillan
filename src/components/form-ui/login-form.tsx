'use client';
import {cn} from "@/lib/utils"
import React from "react";
import {useAppForm} from "@/components/form-ui/index";
import {LoginSchema, LoginType} from "@/features/login/schemas";

export const LoginForm = ({
                              className,
                          }: React.ComponentPropsWithoutRef<"form">)=> {
    const form = useAppForm({
        defaultValues: {
            username: "",
            password: "",
        } as LoginType,
        validators: {
            onChangeAsync: LoginSchema,
            onChangeAsyncDebounceMs: 600
        },
        onSubmit: ({value})=>{
            console.log(value)
        }
    })

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await form.handleSubmit();
            }}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your username and password below to login to your Dashboard
                </p>
            </div>

            <div className="grid gap-6">
                {/*<div className="grid gap-2">*/}
                {/*    <Label htmlFor="username">UserName</Label>*/}
                {/*    <Input id="username" type="username" placeholder="admin1234" required/>*/}
                {/*</div>*/}
                <form.AppField name="username">
                    {
                        (field)=>(
                            <field.TextField
                                label="Username"
                                placeholder="admin1234"
                            />
                        )
                    }
                </form.AppField>
                {/*<div className="grid gap-2">*/}
                {/*    <div className="flex items-center">*/}
                {/*        <Label htmlFor="password">Password</Label>*/}
                {/*    </div>*/}
                {/*    <Input id="password" type="password" placeholder="admin1234" required/>*/}
                {/*</div>*/}
                <form.AppField name="password">
                    {
                        (field)=>(
                            <field.TextField
                                label="Password"
                                placeholder="admin1234"
                            />
                        )
                    }
                </form.AppField>
                {/*<Button type="submit" className="w-full">*/}
                {/*    Login*/}
                {/*</Button>*/}
                <form.AppForm>
                    <form.SubmitButton className="w-full">
                        Login
                    </form.SubmitButton>
                </form.AppForm>
            </div>
        </form>
    );
}
