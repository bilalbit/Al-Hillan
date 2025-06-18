'use server';
import {cookies, headers} from 'next/headers';
import type {NextRequest} from 'next/server';

// Interface for a parsed cookie object
type CookieObject = {
    name: string;
    value: string;
    path?: string;
    expires?: string;
    secure?: boolean | string;
    httponly?: boolean | string;
    samesite?: string;
}

// Parse an array of Set-Cookie strings into an array of cookie objects
const parseSetCookie = (cookieStrings: string[]): CookieObject[] => {
    return cookieStrings.map((cookieString: string) => {
        try {
            const [nameValue, ...attributes] = cookieString.split('; ').map((str: string) => str.trim());
            if (!nameValue.includes('=')) {
                throw new Error(`Invalid cookie string: ${cookieString}`);
            }
            const [name, value] = nameValue.split('=');
            const attrs = attributes.reduce((acc: Record<string, string | boolean>, attr: string) => {
                const [key, val] = attr.split('=');
                acc[key.toLowerCase()] = val || true; // Handle flags like HttpOnly
                return acc;
            }, {});

            return {name, value, ...attrs};
        } catch (error) {
            console.error(`Error parsing cookie: ${cookieString}`, error);
            return null; // Skip invalid cookies
        }
    }).filter((cookie): cookie is CookieObject => cookie !== null); // Type guard to filter out null
}

// Forward cookies from the response to the client's browser
export const forwardCookies = async (response: Response): Promise<void> => {
    try {
        const cookieStrings: string[] = response.headers.getSetCookie();
        const cookieStore = await cookies();
        const parsedCookies: CookieObject[] = parseSetCookie(cookieStrings);
        for (const {name, value, path, expires, secure, httponly, samesite} of parsedCookies) {
            cookieStore.set({
                name,
                value,
                path: path || '/',
                expires: expires ? new Date(expires) : undefined,
                secure: secure === true || secure === 'true',
                httpOnly: httponly === true || httponly === 'true',
                sameSite: samesite ? samesite.toLowerCase() as 'lax' | 'strict' | 'none' : undefined,
            });
        }
    } catch (error) {
        console.error('Error forwarding cookies:', error);
    }
};

export const getAllCookies = async () => {
    const cookieStore = await cookies()
    return cookieStore.getAll();
};

export const clearSession = async () => {
    const cookieStore = await cookies()
    cookieStore.getAll().forEach((cookie) => {
        cookieStore.delete(cookie.name);
    });
};

export const getCredentialHeader = async () => {
    return (await headers()).get('cookie') || '';
};

export const getCookiesHeader = async (request: NextRequest) => {
    // Get the 'cookie' header from the request
    const cookieHeader = request.headers.get('cookie');

    // If no cookies are present, return an empty array
    if (!cookieHeader) {
        return [];
    }
    // Split the cookie header into individual cookies and parse them
    return cookieHeader.split(';').map((cookie) => {
        const [name, value] = cookie.trim().split('=');
        return {name, value};
    });


};


export const verifySession = async () => {

}