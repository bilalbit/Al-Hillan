'use server';
// import {createServerValidate, ServerValidateError} from "@tanstack/react-form/nextjs";
// import {LoginSchema, LoginType} from "@/features/login/schemas";
import {LoginSchema} from "@/features/login/schemas";
import {clearSession, forwardCookies} from "@/lib/cookies";
import {redirect} from "next/navigation";
import * as v from "valibot"
// const serverValidate = createServerValidate({
//     onServerValidate: LoginSchema
// })
export const logInAction = async (formData: unknown) => {
    try {
        // const validatedData = await serverValidate(formData) as LoginType
        const validatedData = v.parse(LoginSchema,formData)
        const response = await fetch(`${process.env.NEXT_PRIVATE_AUTH_URL}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: validatedData.username,
                password: validatedData.password,
            }).toString()
        })
        if (response.status != 200) {
            throw new Error("incorrect username or password")
        }
        await forwardCookies(response);
    } catch (e) {

        // Handle fetch or other errors
        console.error('Error during login:', e);
        return {success: false, error: 'An error occurred during login'};
    }

    redirect('/dashboard');
}

export const logOut = async () => {
    await clearSession();
    redirect('/login')
}
