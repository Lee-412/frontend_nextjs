// 'use client'
// import React, { useEffect, useState } from 'react';
// import {
//     TextField, Button, Grid, Box,
//     InputAdornment,
//     IconButton,
//     FormControlLabel,
//     Checkbox,
//     Container
// } from '@mui/material';
// import LockIcon from '@mui/icons-material/Lock';
// import PersonIcon from '@mui/icons-material/Person';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { useRouter } from 'next/navigation';

// import EmailIcon from '@mui/icons-material/Email';
// const SinginBox = () => {

//     const [userLoginId, setUserLoginId] = useState<number>()
//     const [authen, setAuthen] = useState<string>()
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         password: '',
//         address: '',
//     });
//     const route = useRouter();

//     const [showPassword, setShowPassword] = useState(false);

//     const handleShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleChange = (e: any) => {
//         const { name, value } = e.target;
//         console.log(name, value);

//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     useEffect(() => {
//         //console.log(userLoginId);
//         if (userLoginId !== undefined) {
//             if (authen === 'Admin') {

//             } else {

//             }
//         }
//     }, [userLoginId, authen])

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         try {
//             // const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/auth/local`, {
//             //     method: 'POST',
//             //     headers: {
//             //         'Content-Type': 'application/json',
//             //     },
//             //     body: JSON.stringify({
//             //         identifier: formData.email,
//             //         password: formData.password,
//             //     }),
//             // });

//             // const data = await response.json();
//             // console.log(data.user.authen);
//             console.log(formData);


//             // if (
//             //     // response.ok
//             //     formData
//             // ) {
//             // console.log(data.user.id);
//             // setUserLoginId(data.user.id);
//             // const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/`)
//             // const dataUser = await res.json();
//             // console.log(dataUser);

//             // sessionStorage.setItem('userData', JSON.stringify({
//             //     token: data.jwt,
//             //     user: dataUser,
//             // }));

//             // Redirect based on user role
//             // if (data.user.authen === 'Admin') {
//             //     //console.log(userLoginId);
//             //     setAuthen('Admin')

//             // } else {
//             //     console.log(userLoginId);
//             //     setAuthen('User')

//             // }
//             if (formData.email === 'leeduchht@gmail.com' && formData.password === '123456') {
//                 sessionStorage.setItem('userData', JSON.stringify({
//                     token: 'form.jwt',
//                     userID: "1",
//                     email: formData.email,
//                     username: "test",
//                     phone: '0123123',
//                     address: '123123',
//                     authen: 'Admin'
//                 }));
//                 route.push('/');
//                 window.location.reload();

//             } else {
//                 // console.error('Login failed:', data);
//                 console.log("error");

//                 alert('Login failed. Please check your email and password.');
//             }
//         } catch (error) {
//             console.error('Error during login:', error);
//         }
//     };

//     return (
//         <Container
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{
//                 p: 3, // padding
//                 backgroundColor: 'rgba(255, 255, 255, 0.7)', // màu nền trắng với độ trong suốt 70%
//                 display: 'flex',
//                 flexDirection: 'column',
//                 borderRadius: 2,
//                 justifyContent: "space-around",
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // hiệu ứng bóng
//                 backdropFilter: 'blur(10px)' // hiệu ứng làm mờ phía sau container
//             }}
//         >
//             <Grid item>
//                 <TextField
//                     required
//                     name="email"
//                     placeholder="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     variant="outlined"
//                     autoComplete="cuurent-email"
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <EmailIcon />
//                             </InputAdornment>
//                         ),
//                         style: { backgroundColor: 'white', borderRadius: '5px' }
//                     }}
//                     sx={{ mr: 1 }}
//                 />
//             </Grid>
//             <Grid item>
//                 <TextField
//                     required
//                     name="password"
//                     placeholder="Password"
//                     type={showPassword ? 'text' : 'password'}
//                     value={formData.password}
//                     onChange={handleChange}
//                     variant="outlined"
//                     autoComplete="current-password"
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <LockIcon />
//                             </InputAdornment>
//                         ),
//                         endAdornment: (
//                             <InputAdornment position="end">
//                                 <IconButton onClick={handleShowPassword}>
//                                     {showPassword ? <VisibilityOff sx={{ color: 'black' }} /> : <Visibility sx={{ color: 'black' }} />}
//                                 </IconButton>
//                             </InputAdornment>
//                         ),
//                         style: { backgroundColor: 'white', borderRadius: '5px' }
//                     }}
//                     sx={{ mr: 1 }}
//                 />
//             </Grid>

//             <Grid item>
//                 <FormControlLabel
//                     control={<Checkbox sx={{ color: 'black' }} />}
//                     label={<span style={{ color: 'black' }}>Ghi nhớ</span>}
//                 />
//             </Grid>
//             <Grid item>
//                 <Button variant="text" sx={{ color: 'black', textTransform: 'none' }}>
//                     Quên mật khẩu
//                 </Button>
//             </Grid>
//             <Grid>
//                 <Button type="submit"
//                     onClick={handleSubmit}
//                     variant="contained"
//                     color="primary"
//                     sx={{ backgroundColor: 'white', color: '#002855', fontWeight: 'bold', textTransform: 'none' }}>
//                     Đăng nhập
//                 </Button>
//             </Grid>

//         </Container>
//     );



// };

// export default SinginBox;


'use client'
import React, { useState } from 'react';
import {
    TextField, Button, Grid, Box,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox,
    Container,
    Typography
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const SinginBox = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        try {
            if (formData.email === 'leeduchht@gmail.com' && formData.password === '123456') {
                sessionStorage.setItem('userData', JSON.stringify({
                    token: 'form.jwt',
                    userID: "1",
                    email: formData.email,
                    username: "test",
                    phone: '0123123',
                    address: '123123',
                    authen: 'Admin'
                }));
                router.push('/');
                window.location.reload();
            } else {
                alert('Login failed. Please check your email and password.');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleClickSingup = () => {
        router.push('/signup')
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
                Sign In
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="email"
                        placeholder="Email"
                        value={formData.email}
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
                        value={formData.password}
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
        </Container>
    );
};

export default SinginBox;
