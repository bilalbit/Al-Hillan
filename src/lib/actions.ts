'use server';
import {getCredentialHeader} from "@/lib/cookies";

const BASE_URL = process.env.NEXT_PRIVATE_API_URL
const BASE_AUTH_URL = process.env.NEXT_PRIVATE_AUTH_URL


type FetchOptions = {
    headers?: Record<string, string>;
    fallbackData?: unknown;
}
export const POST = async <T>(
    path: string,
    data: unknown,
    {fallbackData = undefined}: FetchOptions = {}
): Promise<T> => {
    const url = `${BASE_URL}${path}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            // Create custom error that preserves the structure
            const apiError = new Error(errorData.detail) as Error & {
                status_code: number;
                error_code: string;
            };
            apiError.status_code = errorData.status_code;
            apiError.error_code = errorData.error_code;
            throw apiError;
        }

        return await response.json() as T;

    } catch (error) {
        if (fallbackData !== undefined) {
            return fallbackData as T;
        }
        throw error;
    }
};
export const postFetch = async <T>(
    path: string,
    data: unknown,
    {fallbackData = undefined}: FetchOptions = {}
): Promise<T> => {
    const url = `${BASE_URL}${path}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Cookie': await getCredentialHeader(),
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to post to ${url}:`, error);
        if (fallbackData !== undefined) {
            return fallbackData as T;
        }
        throw error;
    }
};

export const putFetch = async <T>(
    path: string,
    data: unknown,
    {fallbackData = undefined}: FetchOptions = {}
): Promise<T> => {
    const url = `${BASE_URL}${path}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Cookie': await getCredentialHeader(),
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to put to ${url}:`, error);
        if (fallbackData !== undefined) {
            return fallbackData as T;
        }
        throw error;
    }
};
export const patchFetch = async <T>(
    path: string,
    data: unknown,
    {fallbackData = undefined}: FetchOptions = {}
): Promise<T> => {
    const url = `${BASE_URL}${path}`;
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Cookie': await getCredentialHeader(),
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to put to ${url}:`, error);
        if (fallbackData !== undefined) {
            return fallbackData as T;
        }
        throw error;
    }
};
export const deleteFetch = async <T>(
    path: string,
    {fallbackData = undefined}: FetchOptions = {}
): Promise<T> => {
    const url = `${BASE_URL}${path}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Cookie': await getCredentialHeader(),
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        // Handle cases where DELETE returns no content (204)
        if (response.status === 204) {
            return {} as T;
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to delete from ${url}:`, error);
        if (fallbackData !== undefined) {
            return fallbackData as T;
        }
        throw error;
    }
};

export const authFetch = async () => {
    try {
        const response = await fetch(`${BASE_AUTH_URL}/auth/verify-token`, {
            method: 'GET',
            headers: {
                'Cookie': await getCredentialHeader(),
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to post to authenticate:`, error);

        throw error;
    }
};


export const getUserInfo = async () => {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'Cookie': await getCredentialHeader(),
                'Content-Type': 'application/json',
            },
            cache: 'force-cache',
            next: {
                tags: ["users"]
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to post to authenticate:`, error);

        throw error;
    }
}
