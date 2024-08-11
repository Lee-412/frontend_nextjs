"use client"

import AppAppBar from "@/component/header/header.user";
import { Container, } from "@mui/material";
import { UserContext } from "@/component/userContext/userContext";
import React from "react";
import LoadingPage from "@/component/feedback/loading";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { user } = React.useContext(UserContext);
    return (

        <>

            {user && user.isLoading === true ?
                <>
                    <LoadingPage />
                </>
                :
                <>
                    <Container sx={{
                        marginBottom: "15vh",

                    }}>
                        <AppAppBar />
                    </Container>
                    <Container>
                        {children}
                    </Container>
                </>}
        </>


    )
}
