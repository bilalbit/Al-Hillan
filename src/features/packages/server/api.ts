import {getFetch} from "@/lib/cache";
import {filterQueryType} from "@/lib/cache/types";
import {PackagesType} from "@/features/packages/schemas";

type getAllPackagesType = {
    total: number
    data: (PackagesType & {id: string,course_title:string})[]
}

export const getAllPackages = async (query?: filterQueryType) => {
    const defaultLimit = 3;
    const offset =query?.page
    ? (Number(query.page) - 1) * Number(query?.limit || defaultLimit)
    : 0;
    return await getFetch(`/packages/?limit=${query?.limit || 3}&offset=${offset}&order_by=${query?.order_by || "created_at"}`, {
        tags: ["packages"],
        revalidate: false
    }) as getAllPackagesType
}