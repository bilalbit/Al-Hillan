'use server';
import {Get} from "@/lib/cache";
import {CourseType} from "@/features/courses/schemas";
import {filterQueryType} from "@/lib/cache/types";

type getAllCoursesType = {
    total: number
    data: (Omit<CourseType, "id"> & {id:string})[]
}
export const getCoursePackages = async (course_id:string ) => {
    return await Get(`/public/packages/${course_id}`, {
        tags: ["packages"],
        revalidate: false
    }) as {
        id:string
  month_price: string
  year_price: string
  half_year_price: string
}
}

export const getCourses = async (query?: filterQueryType) => {
    const defaultLimit = 3;
    const offset = query?.page
        ? (Number(query.page) - 1) * Number(query.limit || defaultLimit)
        : 0;
    return await Get(`/public/courses/?limit=${query?.limit || 3}&offset=${offset}&order_by=created_at&is_available=true`, {
        tags: ["courses"],
        revalidate: false
    }) as getAllCoursesType
}
export const getAllCourses = async () => {
    return await Get(`/public/courses/?order_by=created_at&is_available=true`, {
        tags: ["courses"],
        revalidate: false
    }) as getAllCoursesType
}

type courseDropDownType = {
    label: string
    value: string
    // package_id: string
}

export const getCourseWithLabel = async () => {
    return await Get(`/public/courses/package`, {
        tags: ["courses"],
        revalidate: 20000
    }) as courseDropDownType[]
}
export const getCourseWithoutPackage = async () => {
    return await Get(`/courses/`, {
        tags: ["courses"],
        revalidate: false
    }) as courseDropDownType[]
}