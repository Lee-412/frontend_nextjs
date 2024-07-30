'use client';
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Avatar, Box, Button, Grid, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { usePathname, useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

const AppHeader = () => {
    const route = useRouter();
    const [language, setLanguage] = useState("Vietnamese");
    const [openManual, setOpenManual] = useState(false);
    const [checkLogin, setCheckLogin] = React.useState('signIn');
    const pathname = usePathname()

    useEffect(() => {
        console.log(pathname);
        setCheckLogin(pathname)
    }, [pathname])

    const handleClickSignUp = () => {

        route.push('/signup')
        setCheckLogin('/signup')
    }

    const handleClickSignIn = () => {
        setCheckLogin('/signin')

        route.push('/signin')
    }
    console.log(checkLogin);

    return (
        <AppBar
            position="sticky" elevation={3}
            sx={{
                backgroundColor: 'white',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '3vw',
                marginTop: "3vh",
                marginBottom: "3vh"
            }}
        >
            <Toolbar
                variant="regular"
                sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0,
                    borderRadius: '999px',
                    bgcolor:
                        theme.palette.mode === 'light'
                            ? 'rgba(255, 255, 255, 0.4)'
                            : 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(24px)',
                    maxHeight: 40,
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow:
                        theme.palette.mode === 'light'
                            ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                            : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                })}
            >
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <Link href="/" passHref>
                            <IconButton color="secondary" aria-label="home">
                                <img src="/path-to-your-logo.png" alt="Logo" style={{ height: 30 }} />
                            </IconButton>
                        </Link>
                    </Grid>
                    <Grid item sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div">
                            MyApp
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            {checkLogin === '/signup'
                                ?
                                <>
                                    <Button
                                        color="primary"
                                        variant="text"
                                        size="small"
                                        onClick={handleClickSignIn}

                                    >
                                        Sign in
                                    </Button>
                                </>
                                :
                                <>
                                    <Button
                                        color="primary"
                                        variant="text"
                                        size="small"
                                        onClick={handleClickSignUp}
                                    >
                                        Sign up
                                    </Button>
                                </>
                            }
                            <Button
                                color="primary"
                                variant="outlined"
                                size="small"
                                onClick={() => setOpenManual(true)}
                            >
                                Hướng dẫn sử dụng
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppHeader;