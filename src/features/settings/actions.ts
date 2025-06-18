'use server';
import {patchFetch} from "@/lib/actions";
import * as v from "valibot"
import {PasswordFormSchema, profileSchema} from "@/features/settings/schema";
import {revalidateFetchData} from "@/lib/cache";


export const changeUserProfile = async (profileInfo: unknown) => {
    try {
        const validatedData = v.parse(profileSchema, profileInfo);
        const data = await patchFetch('/users', validatedData)
        // revalidate the user context
        await revalidateFetchData('users')

        return {data, success: true}
    } catch (e) {
        // Handle fetch or other errors
        return {success: false, error: `An Error Occurred during student register ${e}`};
    }

};
export const changeUserPassword = async (profileInfo: unknown) => {
    try {
        const validatedData = v.parse(PasswordFormSchema, profileInfo);
        const data = await patchFetch('/users', validatedData)
        // revalidate the user context
        await revalidateFetchData('users')

        return {data, success: true}
    } catch (e) {
        // Handle fetch or other errors
        return {success: false, error: `An Error Occurred during student register ${e}`};
    }

};