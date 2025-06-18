'use client';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {getUserInfo} from "@/lib/actions";

// Define the User type based on your API response
type User = {
    username: string,
    email: string
    first_name: string
    last_name: string
    phone_number: string
    role: string,
    is_active: true,
    id: string
}

// Define the context type
interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component
interface UserProviderProps {
    children: ReactNode;
    initialUser?: User | null;
}

export const UserProvider = ({children, initialUser}: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(initialUser ?? null);
    const [loading, setLoading] = useState<boolean>(!initialUser);

    useEffect(() => {
        // Only fetch if no initialUser is provided
        if (initialUser === undefined) {
            async function fetchUser() {
                try {
                    const userData = await getUserInfo()
                    if (userData) {
                        setUser(userData);
                    } else {
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            }

            fetchUser();
        }
    }, [initialUser]);

    return (
        <UserContext.Provider value={{user, setUser, loading}}>
            {children}
        </UserContext.Provider>
    );
}

// Custom hook to access user context
export function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
