'use server';
import {FetchOptions} from '@/lib/cache/types';
import {getCredentialHeader} from "@/lib/cookies";

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
        const { access_token , refresh_token} = await getCredentialHeader();
        const cookieHeaderParts: string[] = [];
        if (access_token) {
            cookieHeaderParts.push(`access_token=${encodeURIComponent(access_token)}`);
        }
        if (refresh_token) {
            cookieHeaderParts.push(`refresh_token=${encodeURIComponent(refresh_token)}`);
        }
        const cookieHeader = cookieHeaderParts.join('; ');

        // Log the constructed Cookie header for debugging
        // console.log('Cookie Header:', cookieHeader || 'Empty');

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // Add Cookie header if any tokens are present
        if (cookieHeader) {
            headers['Cookie'] = cookieHeader;
        }


        const response = await fetch(url, {
            cache: 'force-cache',
            next: {
                revalidate,
                tags,
            },
            headers,
        });

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);

            // Optional: Handle token refresh if 401 Unauthorized
            if (response.status === 401 && refresh_token) {
                // Implement token refresh logic here (example below)
                throw new Error('Unauthorized: Implement token refresh logic');
            }

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
// export const getFetch = async <T>(
//     path: string,
//     {
//         revalidate = undefined,
//         tags = [],
//         fallbackData = undefined,
//     }: FetchOptions = {}
// ): Promise<T> => {
//     const url = `${BASE_URL}${path}`;
//     try {
//         const { accessToken } = getCredentialHeader();
//         const response = await fetch(url, {
//             cache: 'force-cache',
//             next: {
//                 revalidate,
//                 tags,
//             },
//             headers: {
//                 ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
//                 'Content-Type': 'application/json',
//             }
//         });
//
//         if (!response.ok) {
//             console.error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);
//             throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
//         }
//
//         return await response.json();
//     } catch (error) {
//         console.error(`Failed to fetch from ${url}:`, error);
//         if (fallbackData !== undefined) {
//             return fallbackData as T;
//         }
//         throw error;
//     }
// };
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