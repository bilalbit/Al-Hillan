'use server';
import {formatDateToYYYYMMDD} from "@/lib/formatters";
import {PaymentSchema, PublicRegisterSchema} from "@/features/home/schema";
import * as v from "valibot";
import {POST} from "@/lib/actions";

type PrayerTimeResponse = {
    data: {
        timings: {
            Fajr: string
            Dhuhr: string
            Asr: string
            Maghrib: string
            Isha: string
        }
    }
}
type paramType = { latitude: number | null, longitude: number | null }
export const getPrayerTime = async ({latitude, longitude}: paramType) => {
    if (!latitude || !longitude) {
        latitude = 9.0399;
        longitude = 38.6237;
    }
    const currentDate = formatDateToYYYYMMDD();
    try {
        const response = await fetch(
            `https://api.aladhan.com/v1/timings/${currentDate}?latitude=${latitude}&longitude=${longitude}`,
            {
                cache: "force-cache",
                next: {
                    revalidate: 3600 // revalidate at most every hour
                }
            }
        );

        const {data: {timings}} = await response.json() as PrayerTimeResponse;
        return timings;
    } catch (error) {
        throw new Error(`Error: Failed to fetch prayer times: ${error}`)
    }
}

export const registerStudent = async (studentForm: unknown) => {
    try {
        const validatedData = v.parse(PublicRegisterSchema, studentForm);
        await POST('/public/register', validatedData);
        return {success: true};
    } catch (error:any) {
        // Handle validation errors
        if (error instanceof v.ValiError) {
            return {
                success: false,
                error: "Validation failed",
                details: error.message,
            };
        }

        // Handle API errors (now with preserved structure)
        if (error?.status_code) {
            return {
                success: false,
                status_code: error.status_code,
                error: error.message, // Now contains the detail
                error_code: error.error_code,
            };
        }

        // Handle network/unknown errors
        console.error("Unexpected error:", error);
        return {
            success: false,
            error: error?.message || "Unknown error occurred",
        };
    }
};
export const addPayment = async (phone_number:string,paymentForm: unknown) => {
    try {
        const validatedData = v.parse(PaymentSchema, paymentForm);
        await POST(`/public/payment/${phone_number}`, validatedData);
        return {success: true};
    } catch (error: any) {
        // Handle validation errors
        if (error instanceof v.ValiError) {
            return {
                success: false,
                error: "Validation failed",
                details: error.message,
            };
        }

        // Handle API errors (now with preserved structure)
        if (error?.status_code) {
            return {
                success: false,
                status_code: error.status_code,
                error: error.message, // Now contains the detail
                error_code: error.error_code,
            };
        }

        // Handle network/unknown errors
        console.error("Unexpected error:", error);
        return {
            success: false,
            error: error?.message || "Unknown error occurred",
        };
    }
};

