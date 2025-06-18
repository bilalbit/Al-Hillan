'use server';
import {PackageSchema, PackagesType} from "@/features/packages/schemas";
import {postFetch, putFetch} from "@/lib/actions";
import {createServerValidate, ServerValidateError} from "@tanstack/react-form/nextjs";
import {revalidateFetchData} from "@/lib/cache";

const serverValidate = createServerValidate({
    onServerValidate: PackageSchema
})


export const addPackagesAction = async (prev: unknown, formData: FormData) => {
    try {
        const validatedData = await serverValidate(formData);
        const data = await postFetch('/packages/', validatedData) as PackagesType[];
        await revalidateFetchData('packages');
        await revalidateFetchData('courses');
        return {data, success: true}
    } catch (e) {
        if (e instanceof ServerValidateError) {
            return e.formState
        }

        // Handle fetch or other errors
        console.error('Error during add package action:', e);
        return {success: false, error: 'An Error Occured during add package action'};
    }

};

export const editPackageAction = async (prev: unknown, formData: FormData) => {
    try {
        const validatedData = await serverValidate(formData);
        const data = await putFetch(`/packages/${formData.get('id')}`, validatedData) as PackagesType[];
        await revalidateFetchData('packages');
        return {data, success: true}
    } catch (e) {
        if (e instanceof ServerValidateError) {
            return e.formState
        }

        // Handle fetch or other errors
        console.error('Error during Edit Package:', e);
        return {success: false, error: 'An error occurred during edit Package'};
    }

};