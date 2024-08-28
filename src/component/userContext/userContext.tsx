'use client'
import React, { createContext, useEffect, useState } from "react";
import { getUserAccount } from '@/utils/request';
import { useParams, usePathname, useRouter } from "next/navigation";
const UserContext = createContext<any>(null);

export interface ContextData {
    isAuthenticate: boolean;
    token: string;
    account: {
        email: string,
        username: string,
        groupRoles: any
    }
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname(); // Get the current pathname


    const [user, setUser] = useState({
        isLoading: true,
        isAuthenticate: false,
        token: '',
        account: {}
    });

    const defaultUser = {
        isLoading: true,
        isAuthenticate: false,
        token: '',
        account: {}
    }

    const loginContext = (userData: ContextData) => {
        setUser({ ...userData, isLoading: false })
    };

    const logoutContext = () => {

        setUser(() => ({
            isLoading: false,
            isAuthenticate: false,
            token: '',
            account: {}
        }));
    };

    const router = useRouter();


    const fetchUserContext = async () => {
        console.log('Fetching user data...');
        try {
            const response = await getUserAccount();
            console.log(response);

            if (response && response.data.EC === 0) {
                console.log('User authenticated');
                setUser({
                    isLoading: false,
                    isAuthenticate: true,
                    token: response.data.DT.access_token,
                    account: {
                        email: response.data.DT.email,
                        username: response.data.DT.username,
                        groupRoles: response.data.DT.role
                    }
                });
            } else {
                console.log('User not authenticated ');
                setUser(() => ({
                    isLoading: false,
                    isAuthenticate: false,
                    token: '',
                    account: {}
                }));
                console.log(user);

            }
        } catch (error) {
            console.error('Error fetching user account:', error);
            setUser(() => ({
                isLoading: false,
                isAuthenticate: false,
                token: '',
                account: {}
            }));
        }
        console.log('User state after fetching:', user); // Check state here
    };


    useEffect(() => {

        console.log(pathname);

        if (pathname === '/') {
            console.log('hit here');
            fetchUserContext();

        }
        else if (pathname !== '/login') {
            fetchUserContext();
        }
        else {
            setUser(() => ({
                isLoading: false,
                isAuthenticate: false,
                token: '',
                account: {}
            }));
        }
    }, [pathname]);

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}

        </UserContext.Provider>

    );
}

export { UserContext, UserProvider }