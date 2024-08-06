'use client'
import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Grid,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox,
    Container,
    Typography,

} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SnackbarModal, { Severity, SnackbarState } from '../feedback/snackbar';



const SinginBox = () => {


    useEffect(() => {

        const userDataString = sessionStorage.getItem('userData');
        console.log(userDataString);

        if (userDataString) {
            // route.push('/');
            // console.log("người dùng đã đăng nhập");
            router.push('/')
        }
    }, []);

    const [formDataLogin, setFormData] = useState({
        user: '',
        password: '',
    });

    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: undefined
    });

    const showSnackbar = (message: string, severity: Severity) => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formDataLogin,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {

            console.log(formDataLogin);

            const loginInput = formDataLogin.user;

            if (!loginInput) {
                showSnackbar('Incorrect account or password', 'warning');

                return
            }
            if (!formDataLogin.password) {
                showSnackbar('Incorrect account or password', 'warning');
                return
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/login`, {
                userLogin: formDataLogin.user,
                password: formDataLogin.password,
            })
            console.log(response);
            if (response.data.EC === "0") {
                showSnackbar(`${response.data.EM}`, 'success')

                console.log(response.data.DT);
                const user = response.data.DT;
                // set session data

                sessionStorage.setItem('userData', JSON.stringify({
                    token: 'form.jwt',
                    userID: user.id,
                    email: user.email,
                    username: user.username,
                    phone: user.phone,
                    address: user.address,
                    groupId: user.groupId,
                    authen: 'Admin'
                }));
                router.push('/');

            }
            else {
                if (response.data.EC === "-1") {
                    showSnackbar(`${response.data.EM}`, 'warning')

                }
                else {
                    showSnackbar(`${response.data.EM}`, 'error')
                }


            }

        } catch (error) {
            console.error('Error during login:', error);
            showSnackbar('Something wrong in server', 'error')
        }
    };

    const handleClickSingup = () => {
        router.push('/register')
    }

    return (
        <Container
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 3,
                backgroundColor: '#EAEAEA',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center",
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '400px',
                mt: 5
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black', mb: 3 }}>
                Login
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="user"
                        placeholder="Email or Phone number"
                        value={formDataLogin.user}
                        onChange={handleChange}
                        variant="outlined"
                        autoComplete="current-email"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                            style: { backgroundColor: 'white', borderRadius: '5px' }
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={formDataLogin.password}
                        onChange={handleChange}
                        variant="outlined"
                        autoComplete="current-password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword}>
                                        {showPassword ? <VisibilityOff sx={{ color: 'black' }} /> : <Visibility sx={{ color: 'black' }} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            style: { backgroundColor: 'white', borderRadius: '5px' }
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox sx={{ color: 'black' }} />}
                        label={<span style={{ color: 'black' }}>Remember me</span>}
                    />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="space-between">
                    <Button variant="text" sx={{ color: 'black', textTransform: 'none' }}>
                        Forgot password?
                    </Button>
                    <Button type="submit"
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ backgroundColor: '#f5a623', color: '#ffffff', fontWeight: 'bold', textTransform: 'none' }}>
                        Sign In
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" sx={{ color: 'black', mt: 2 }}>
                        Not registered yet?
                        <Button variant="text"
                            onClick={handleClickSingup}
                            sx={{ color: '#f5a623', textTransform: 'none' }}>Create an Account</Button>

                    </Typography>
                </Grid>
            </Grid>

            <SnackbarModal
                snackbar={snackbar}
                setSnackbar={setSnackbar}
            />
        </Container>
    );
};

export default SinginBox;
