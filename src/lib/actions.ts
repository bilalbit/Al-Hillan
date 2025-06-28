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
        console.log('Cookie Header:', cookieHeader || 'Empty');

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // Add Cookie header if any tokens are present
        if (cookieHeader) {
            headers['Cookie'] = cookieHeader;
        }
        const response = await fetch(url, {
            method: 'POST',
            headers,
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
            method: 'POST',
            body: JSON.stringify(data),
            headers
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
            method: 'PUT',
            body: JSON.stringify(data),
            headers
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
            method: 'PATCH',
            body: JSON.stringify(data),
            headers
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
            method: 'DELETE',
            headers
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
        const { access_token , refresh_token} = await getCredentialHeader();
        const cookieHeaderParts: string[] = [];
        if (access_token) {
            cookieHeaderParts.push(`access_token=${encodeURIComponent(access_token)}`);
        }
        if (refresh_token) {
            cookieHeaderParts.push(`refresh_token=${encodeURIComponent(refresh_token)}`);
        }
        const cookieHeader = cookieHeaderParts.join('; ');

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // Add Cookie header if any tokens are present
        if (cookieHeader) {
            headers['Cookie'] = cookieHeader;
        }
        const response = await fetch(`${BASE_URL}/users`, {
            method: 'GET',
            headers,
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
