
import AppHeader from "@/component/header/header.login";
import AppAppBar from "@/component/header/header.user";
import { Box, Container, createTheme, ThemeProvider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { PaletteMode } from "@mui/material";
import { useState } from "react";
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';


export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (

        <Container>
            <AppAppBar />
            <div style={{ marginBottom: "10vh" }}></div>
            {children}
        </Container>

    )
}
