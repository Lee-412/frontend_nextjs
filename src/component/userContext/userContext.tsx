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

    // const fetchUserContext = async () => {
    //     let response = await getUserAccount()
    //     console.log(response);
    //     if (response && response.data.EC === 0) {
    //         console.log('here');
    //         setUser(() => ({
    //             isLoading: false,
    //             isAuthenticate: true,
    //             token: response.data.DT.access_token,
    //             account: {
    //                 email: response.data.DT.email,
    //                 username: response.data.DT.username,
    //                 groupRoles: response.data.DT.role
    //             }
    //         }));
    //     }
    //     else {
    //         console.log('here');
    //         setUser({ ...defaultUser, isLoading: false })
    //     }
    // }
    const router = useRouter();

    const fetchUserContext = async () => {

        try {
            const response = await getUserAccount();
            console.log(response);

            if (response && response.data.EC === 0) {
                console.log('User authenticat');
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
                console.log('User not authenticated');
                setUser({ ...defaultUser, isLoading: false });
            }
        } catch (error: any) {
            // Xử lý lỗi và điều hướng về trang login nếu gặp lỗi
            alert('me')
            console.error('Error fetching user account:', error);
            if (error.response && error.response.status === 401) {
                // Nếu lỗi 401, điều hướng về trang login
                router.push('/login');
            } else {
                // Xử lý các lỗi khác hoặc hiển thị thông báo lỗi chung
                setUser({ ...defaultUser, isLoading: false });
            }
        }
    };
    useEffect(() => {
        const pathname = window.location.pathname;

        // Nếu là trang home ('/'), chỉ cần đặt isLoading về false và không gọi fetchUserContext
        if (pathname === '/') {
            // setUser((prevUser) => ({
            //     ...prevUser,
            //     isLoading: false
            // }));
            fetchUserContext();

        }
        // Nếu không phải là trang login hoặc home, thì gọi fetchUserContext
        else if (pathname !== '/login') {
            fetchUserContext();
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}

        </UserContext.Provider>

    );
}

export { UserContext, UserProvider }