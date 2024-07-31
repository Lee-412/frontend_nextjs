'use client'
import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Grid, Box,
    InputAdornment,
    IconButton,
    Container,
    Typography,
    Select,
    MenuItem
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { error } from 'console';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


type Severity = 'success' | 'error' | 'warning' | 'info' | undefined;

interface SnackbarState {
    open: boolean;
    message: string;
    severity: Severity;
}
const SignupBox = () => {

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/test-api').then(
            (response) => { console.log(response); }

        )

        // axios.post('http://localhost:8080/api/v1/register', {
        //     firstName: 'Fred',
        //     lastName: 'Flintstone'
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
    }, [])

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        phone: '',
        address: '',
        sex: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const router = useRouter();

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


    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar((prevState) => ({
            ...prevState,
            open: false,
            message: '',
        }));
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleShowRepeatPassword = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };
    const handleChange = (e: any) => {
        const { name, value } = e.target;

        // console.log(name, value);

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formData.username) {
            showSnackbar('username is undefind', 'warning')
            return;
        }
        if (!formData.email) {
            showSnackbar('email is undefind', 'warning')
            return;
        }
        const regx = /\S+@\S+\.\S+/;

        if (!regx.test(formData.email)) {
            showSnackbar('email is invalid', 'warning')
            console.log("check");

            return
        }

        if (!formData.password) {
            showSnackbar('passwords is undefind', 'warning')
            return;
        }
        if (formData.password.length < 6) {
            showSnackbar('Passwords must be at least 6 characters', 'warning');
            return false;
        }
        if (!formData.repeatPassword) {
            showSnackbar('repeatPassword is undefind', 'warning')
            return;
        }
        if (!formData.sex) {
            showSnackbar('gender is undefind', 'warning')
            return;
        }
        if (!formData.phone) {
            showSnackbar('phone is undefind', 'warning')
            return;
        }
        if (!formData.address) {
            showSnackbar('address is undefind', 'warning')
            return;
        }

        const phonePattern = /^[0-9]+$/;
        if (!phonePattern.test(formData.phone)) {
            showSnackbar('Phone number can only contain digits', 'warning');
            return false;
        }

        if (formData.password !== formData.repeatPassword) {
            // alert('Passwords do not match.');
            showSnackbar('Passwords do not match.', 'warning')
            return;
        }
        try {
            // Mock API call
            console.log(formData);

            axios.post('http://localhost:8080/api/v1/register', {
                formData
            }
            )
                .then(function (response) {
                    console.log(response);
                })

            showSnackbar('Registration successful', 'success')
            // router.push('/login');
            // Redirect to the sign-in page after successful registration
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };


    const handleClickSignIn = () => {
        router.push('/login')
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
                Register
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        variant="outlined"
                        autoComplete="username"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
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
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                        autoComplete="email"
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
                        value={formData.password}
                        onChange={handleChange}
                        variant="outlined"
                        autoComplete="new-password"
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
                    <TextField
                        required
                        fullWidth
                        name="repeatPassword"
                        placeholder="Repeat Password"
                        type={showRepeatPassword ? 'text' : 'password'}
                        value={formData.repeatPassword}
                        onChange={handleChange}
                        variant="outlined"
                        autoComplete="new-password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowRepeatPassword}>
                                        {showRepeatPassword ? <VisibilityOff sx={{ color: 'black' }} /> : <Visibility sx={{ color: 'black' }} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            style: { backgroundColor: 'white', borderRadius: '5px' }
                        }}
                    />
                </Grid>


                <Grid item xs={12} >
                    <Select
                        fullWidth
                        name='sex'
                        displayEmpty
                        value={formData.sex}
                        onChange={(e) => handleChange(e)}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '5px',
                        }}

                    >
                        <MenuItem value="" disabled
                        >
                            Select your gender
                        </MenuItem>
                        <MenuItem value="male" >Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>

                    </Select>
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        required
                        fullWidth
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="outlined"
                        autoComplete="phone"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon />
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
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        variant="outlined"
                        autoComplete="street-address"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HomeIcon />
                                </InputAdornment>
                            ),
                            style: { backgroundColor: 'white', borderRadius: '5px' }
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit"
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ backgroundColor: '#f5a623', color: '#ffffff', fontWeight: 'bold', textTransform: 'none' }}>
                        Sign Up
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" sx={{ color: 'black', mt: 2 }}>
                        Already have an account?
                        <Button
                            variant="text"
                            sx={{ color: '#f5a623', textTransform: 'none' }}
                            onClick={handleClickSignIn}
                        >
                            Sign In
                        </Button>
                    </Typography>
                </Grid>
            </Grid>

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose}

                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

            >
                <Alert
                    onClose={handleClose}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container >



    );
};

export default SignupBox;
