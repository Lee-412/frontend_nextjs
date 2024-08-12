'use client'
import React, { useContext, useEffect, useState } from 'react';
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
import SnackbarModal, { Severity, SnackbarState } from '../feedback/snackbar';
import { handleLogin } from '@/utils/request';
import { ContextData, UserContext } from '../userContext/userContext';



const SinginBox = () => {
    const router = useRouter();

    const { loginContext } = React.useContext(UserContext);
    const { user } = React.useContext(UserContext);
    console.log(user);


    useEffect(() => {


        if (user && user.isAuthenticate === true) {
            router.push('/')
        }
    }, [user, router]);

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
            const response = await handleLogin(formDataLogin.user, formDataLogin.password);

            console.log(response);
            if (response.data.EC === "0") {
                showSnackbar(`${response.data.EM}`, 'success')

                console.log(response.data.DT);
                const user = response.data.DT;
                // set session data



                let groupRole = user.role;
                let email = user.email;
                let username = user.username;
                let token = user.access_token;
                let data: ContextData = {
                    token: token,
                    isAuthenticate: true,
                    account: {
                        email: email,
                        username: username,
                        groupRoles: groupRole,

                    }
                }
                localStorage.setItem('jwt', token);
                loginContext(data)
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
