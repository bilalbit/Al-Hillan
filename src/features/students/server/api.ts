import {getFetch} from "@/lib/cache";
import {StudentType} from "@/features/students/schemas";

type returnType = {
    total_count: number
    month_total_count: number
    data: StudentType[]
}

export const getAllStudents = async (register_date:string) => {
    return await getFetch(`/students/?register_date=${register_date}`, {
        tags: ["students"],
        revalidate: false
    }) as returnType
}