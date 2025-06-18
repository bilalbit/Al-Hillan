'use server';
import {CourseSchema} from "@/features/courses/schemas";
import {deleteFetch, postFetch, putFetch} from "@/lib/actions";
import {createServerValidate, ServerValidateError} from "@tanstack/react-form/nextjs";
import {revalidateFetchData} from "@/lib/cache";

const serverValidate = createServerValidate({
    onServerValidate: CourseSchema
})


export const addCourseAction = async (prev: unknown, formData: FormData) => {
    try {
        const validatedData = await serverValidate(formData);
        const data = await postFetch('/courses/', validatedData);
        await revalidateFetchData('courses');
        return {data, success: true}
    } catch (e) {
        if (e instanceof ServerValidateError) {
            return e.formState
        }

        // Handle fetch or other errors
        console.error('Error during login:', e);
        return {success: false, error: 'An error occurred during login'};
    }

};

export const editCourseAction = async (prev: unknown, formData: FormData) => {
    try {
        const validatedData = await serverValidate(formData);
        const data = await putFetch(`/courses/${formData.get('id')}`, validatedData);
        await revalidateFetchData('courses');
        return {data, success: true}
    } catch (e) {
        if (e instanceof ServerValidateError) {
            return e.formState
        }

        // Handle fetch or other errors
        console.error('Error during Edit Course:', e);
        return {success: false, error: 'An error occurred during edit course'};
    }

};

export const deleteCourse = async (id: string) => {
    try {
        await deleteFetch(`/courses/${id}`)
        await revalidateFetchData('courses');
        await revalidateFetchData('packages');
        return {success: true}
    } catch (e) {
        if (e instanceof ServerValidateError) {
            return e.formState
        }

        // Handle fetch or other errors
        console.error('Error during Edit Course:', e);
        return {success: false, error: 'An error occurred during edit course'};
    }


};