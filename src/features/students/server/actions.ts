'use server';
import {postFetch, putFetch} from "@/lib/actions";
import {ServerValidateError} from "@tanstack/react-form/nextjs";
import {revalidateFetchData} from "@/lib/cache";
import {StudentSchema, StudentType} from "@/features/students/schemas";
import * as v from "valibot"


export const registerStudent = async (studentFormData: unknown) => {
    try {
        const validatedData = v.parse(StudentSchema, studentFormData);
        const data = await postFetch('/public/register/', validatedData) as StudentType[];
        await revalidateFetchData('registers');
        await revalidateFetchData('students');
        return {data, success: true}
    } catch (e) {
        if (e instanceof ServerValidateError) {
            return e.formState
        }

        // Handle fetch or other errors
        console.error('Error during student register:', e);
        return {success: false, error: 'An Error Occurred during student register'};
    }

};

export const editStudentInfo = async (studentFormData: StudentType) => {
    try {
        const validatedData = v.parse(StudentSchema, studentFormData);
        const data = await putFetch(`/students/${studentFormData.id}`, validatedData) as StudentType[];
        await revalidateFetchData('registers');
        await revalidateFetchData('students');
        return {data, success: true}
    } catch (e) {
        if (e instanceof ServerValidateError) {
            return e.formState
        }

        // Handle fetch or other errors
        console.error('Error during student register:', e);
        return {success: false, error: 'An Error Occurred during student register'};
    }

};