'use client'
import React, { useState } from 'react';
import {
    TextField, Button, Grid, Box,
    InputAdornment,
    IconButton,
    Container,
    Typography
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const SignupBox = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        phone: '',
        address: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (formData.password !== formData.repeatPassword) {
            alert('Passwords do not match.');
            return;
        }
        try {
            // Mock API call
            alert('Registration successful');
            router.push('/signin'); // Redirect to the sign-in page after successful registration
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };
    const handleClickSignIn = () => {
        router.push('/signin')

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
                Sign Up
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
                        type={showPassword ? 'text' : 'password'}
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
        </Container>
    );
};

export default SignupBox;
