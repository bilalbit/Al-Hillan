'use server';
import {FetchOptions} from '@/lib/cache/types';
import {headers} from 'next/headers';

const BASE_URL = process.env.NEXT_PRIVATE_API_URL;
export const getFetch = async <T>(
    path: string,
    {
        revalidate = undefined,
        tags = [],
        fallbackData = undefined,
    }: FetchOptions = {}
): Promise<T> => {
    const url = `${BASE_URL}${path}`;
    try {
        const response = await fetch(url, {
            cache: 'force-cache',
            next: {
                revalidate,
                tags,
            },
            headers: await headers()
        });

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);
            throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch from ${url}:`, error);
        if (fallbackData !== undefined) {
            return fallbackData as T;
        }
        throw error;
    }
};
export const Get = async <T>(
    path: string,
    {
        revalidate = undefined,
        tags = [],
        fallbackData = undefined,
    }: FetchOptions = {}
): Promise<T> => {
    const url = `${BASE_URL}${path}`;
    try {
        const response = await fetch(url, {
            cache: 'force-cache',
            next: {
                revalidate,
                tags,
            },
        });

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);
            throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch from ${url}:`, error);
        if (fallbackData !== undefined) {
            return fallbackData as T;
        }
        throw error;
    }
};