'use client'
import React, { createContext, useState } from "react";

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
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({
        isAuthenticate: false,
        token: '',
        account: {}
    });

    // Login updates the user data with a name parameter
    const loginContext = (userData: ContextData) => {
        setUser(userData)
    };

    // Logout updates the user data to default
    const logoutContext = (user: ContextData) => {
        setUser(() => ({
            isAuthenticate: false,
            token: '',
            account: {}
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider }