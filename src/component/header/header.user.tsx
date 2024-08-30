'use client'

import * as React from 'react';
import { PaletteMode } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Avatar, Box, Button, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { usePathname, useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import { log } from 'console';
import { Router } from 'next/router';
import { handleLogoutRequest } from '@/utils/request';

const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer',
};
import { UserContext } from '../userContext/userContext';
import { isBuffer } from 'util';

interface AppAppBarProps {
    mode: PaletteMode;
    toggleColorMode: () => void;
}

function AppAppBar(props: any) {
    const [open, setOpen] = useState(false);
    const route = useRouter();
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const [userData, setUserData] = useState({
        token: '',
        username: '',
        email: '',
        isAuthenticate: false
    })
    const router = useRouter();

    const { user, logoutContext } = React.useContext(UserContext);
    const pathname = usePathname();

    useEffect(() => {

        if (user && user.isAuthenticate === false && pathname !== '/' && pathname !== '/login') {
            // route.push('/login');
            console.log("no data");
        }
        else {
            console.log("check user");
            setUserData({
                token: user.token,
                username: user.account.username,
                email: user.account.email,
                isAuthenticate: user.isAuthenticate
            });
        }

    }, [user]);
    // console.log(userData);

    const handleLogout = async () => {
        if (window.confirm('Bạn có muốn đăng xuất không?')) {
            const resLogout = await handleLogoutRequest();

            // console.log(resLogout);
            if (resLogout && resLogout.data.EC === '0') {
                localStorage.removeItem('jwt')

                route.push('/');
                setUserData({
                    token: '',
                    username: '',
                    email: '',
                    isAuthenticate: false
                })
                logoutContext()
            }
            else {
                alert('Đăng xuất thất bại');
            }


        };

    }

    // console.log(pathname);


    const handleClickSignUp = () => {
        route.push('/register')
    }

    const handleClickSignIn = () => {
        route.push('/login')
    }


    return (

        <AppBar
            position="fixed"
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 2,
            }}
        >
            <Container maxWidth="lg">
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
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            ml: '-18px',
                            px: 0,
                        }}
                    >
                        <img
                            src={
                                'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                            }
                            style={logoStyle}
                            alt="logo of company"
                        />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <MenuItem
                                onClick={() => {
                                    route.push('/users')
                                }}
                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography variant="body2" color="text.primary" >
                                    User
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    route.push('/')
                                }}
                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography variant="body2" color="text.primary" >
                                    Homepage
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    route.push('/role')
                                }}
                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography variant="body2" color="text.primary" >
                                    About
                                </Typography>
                            </MenuItem>

                            <MenuItem
                                onClick={() => {
                                    route.push('/profile')
                                }}
                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography variant="body2" color="text.primary" >
                                    Profile
                                </Typography>
                            </MenuItem>
                        </Box>
                    </Box>
                    <Box>
                        {
                            userData && userData.isAuthenticate === true ?
                                <>
                                    {console.log("có userDat")
                                    }
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                                            <IconButton
                                                color="secondary"
                                                aria-label="open drawer"
                                                edge="start"
                                            >
                                                <MenuIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs />
                                        <Grid item>

                                        </Grid>
                                        <Grid item>
                                            <Tooltip title="Alerts • No alerts">
                                                <IconButton color="secondary">
                                                    <NotificationsIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <IconButton color="secondary" sx={{ p: 0.5 }} onClick={handleLogout}>
                                                <LogoutIcon />
                                            </IconButton>
                                        </Grid>

                                        <Grid item>
                                            <IconButton color="secondary" sx={{ p: 0.5 }}>
                                                <Avatar src="" alt="" />
                                            </IconButton>
                                        </Grid>

                                    </Grid>

                                </> :
                                <>
                                    {console.log(" ko có userData")
                                    }
                                    <Box
                                        sx={{
                                            display: { xs: 'none', md: 'flex' },
                                            gap: 0.5,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            variant="text"
                                            size="small"
                                            onClick={handleClickSignIn}

                                        >
                                            Login
                                        </Button>
                                        <Button
                                            color="primary"
                                            variant="text"
                                            size="small"
                                            onClick={handleClickSignUp}
                                        >
                                            Signup
                                        </Button>
                                    </Box>
                                </>
                        }
                    </Box>
                    <Box sx={{ display: { sm: '', md: 'none' } }}>
                        <Button
                            variant="text"
                            color="primary"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ minWidth: '30px', p: '4px' }}
                        >
                            <MenuIcon />
                        </Button>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    );
}

export default AppAppBar;