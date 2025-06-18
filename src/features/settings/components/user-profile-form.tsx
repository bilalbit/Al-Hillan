'use client';
import React from 'react';
import {FieldErrors} from "@/components/form-ui/field-errors";
import {useForm} from "@tanstack/react-form";
import {profileSchema} from "@/features/settings/schema";
import {changeUserProfile} from "@/features/settings/actions";
import {toast} from "sonner";
import {useUser} from "@/components/user-context";

const UserProfileForm = () => {
      const { user } = useUser();
    const form = useForm({
        defaultValues: {
            username: user?.username,
            email: user?.email
        },
        validators: {
            onChangeAsync: profileSchema,
            onChangeAsyncDebounceMs: 2000
        },
        onSubmit: async ({value}) => {
            const {success} = await changeUserProfile(value);
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
                <label
                    className="text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                    htmlFor="username">
                    Username
                </label>
                <form.Field name="username">
                    {(field) => (
                        <>
                            <input
                                className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-1 block w-full"
                                id="username"
                                placeholder="Username"
                                value={field.state.value}
                                onChange={e => field.handleChange(e.target.value)}

                            />
                            <FieldErrors meta={field.state.meta}/>
                        </>
                    )}
                </form.Field>
            </div>
            <div className="grid gap-2">
                <label
                    className="text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                    htmlFor="email">
                    Email address
                </label>
                <form.Field name="email">
                    {(field) => (
                        <>
                            <input
                                className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-1 block w-full"
                                id="email"
                                placeholder="Email address"
                                type="email"
                                value={field.state.value}
                                onChange={(e) => (field.handleChange(e.target.value))}
                            />
                            <FieldErrors meta={field.state.meta}/>
                        </>
                    )}
                </form.Field>
            </div>
            <div className="flex items-center gap-4">
                <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3">Save
                </button>
            </div>
        </form>
    );
};

export default UserProfileForm;