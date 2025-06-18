"use server"
import {revalidateTag} from "next/cache";
import {tagsType} from "@/lib/cache/types";

export const revalidateFetchData = async (tags: tagsType) => {
    try {
        revalidateTag(tags);
    } catch (error) {
        console.error('Revalidation error:', error);
        throw error;
    }
};

export const clearFullCache = async () => revalidateTag("*")
