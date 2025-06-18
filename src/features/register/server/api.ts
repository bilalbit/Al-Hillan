import {getFetch} from "@/lib/cache";
import {RegisterType} from "@/features/register/schemas";

type returnType = {
    total_count: number
    month_total_count: number
    data: RegisterType[]
}

export const getAllRegisters = async (register_date: string, course_title: string) => {
    return await getFetch(`/register/?register_date=${register_date}&course_title=${course_title != undefined ? course_title : ""}`, {
        tags: ["registers"],
        revalidate: false
    }) as returnType
}