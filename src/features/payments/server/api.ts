import {getFetch, revalidateFetchData} from "@/lib/cache";
import {Payment} from "@/features/payments/schemas";
import { patchFetch } from "@/lib/actions";

type returnType = {
    total_count: number
    month_total_count: number
    data: Payment[]
}
export const getAllPayments = async (payment_date: string) => {
    return await getFetch(`/payment/?payment_date=${payment_date}`, {
        tags: ["payments"],
        revalidate: false
    }) as returnType
}
// payment/633986d0-cae5-4b37-a78e-74469620be89?payment_status=un-verified

export const verifyPayments = async (payment_id: string,status: "verified" | "un-verified" | "failed") => {
    const payment = await patchFetch(`/payment/${payment_id}?payment_status=${status}`, {
        tags: ["payments"],
        revalidate: false
    }) as returnType;
    await revalidateFetchData('payments');
    return payment
}