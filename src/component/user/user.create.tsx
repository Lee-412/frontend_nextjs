import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { dataUserClient } from './test.user.page';
import { useRouter } from 'next/navigation';
import { Severity } from '../feedback/snackbar';
import { handleCreateUser } from '@/utils/request';

interface CreateUserProps {
    openAddUser: boolean,
    setOpenAddUser: (openAddUser: boolean) => void,
    fetchUsers: () => void,
    formUserData: dataUserClient,
    setFormUserData: (formUserData: dataUserClient) => void
    snackbar: any,
    setSnackbar: (snackbar: any) => void,
    showSnackbar: (message: string, severity: Severity) => void,
}


const AddUserModal = (props: CreateUserProps) => {
    const { openAddUser, setOpenAddUser, fetchUsers, formUserData, setFormUserData, snackbar, setSnackbar, showSnackbar } = props;
    const router = useRouter();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormUserData({
            ...formUserData,
            [name]: value,
        });
    };

    const handleCloseModal = () => {
        setOpenAddUser(false)
    }
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleShowRepeatPassword = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    const resetFormData = () => {
        setFormUserData({
            id: 0,
            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            phone: '',
            address: '',
            sex: '',
            groupId: 3,
            authen: ''
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formUserData.username) {
            showSnackbar('username is undefind', 'warning');
            return;
        }
        if (!formUserData.email) {
            showSnackbar('email is undefind', 'warning');
            return;
        }
        const regx = /\S+@\S+\.\S+/;

        if (!regx.test(formUserData.email)) {
            showSnackbar('email is invalid', 'warning');
            return
        }

        if (!formUserData.password) {
            showSnackbar('passwords is undefind', 'warning');
            return;
        }
        if (formUserData.password.length < 6) {
            showSnackbar('Passwords must be at least 6 characters', 'warning');
            return false;
        }
        if (!formUserData.repeatPassword) {
            showSnackbar('repeatPassword is undefind', 'warning');
            return;
        }
        if (!formUserData.sex) {
            showSnackbar('gender is undefind', 'warning');
            return;
        }
        if (!formUserData.phone) {
            showSnackbar('phone is undefind', 'warning');
            return;
        }
        if (!formUserData.address) {
            showSnackbar('address is undefind', 'warning');
            return;
        }

        const phonePattern = /^[0-9]+$/;

        console.log(formUserData.phone);

        if (!phonePattern.test(formUserData.phone)) {
            showSnackbar('Phone number can only contain digits', 'warning');
            return false;
        }

        if (formUserData.password !== formUserData.repeatPassword) {
            showSnackbar('Passwords do not match.', 'warning');
            return;
        }
        try {
            console.log(formUserData);

            const respone = await handleCreateUser(formUserData);
            console.log(respone.data.EC);
            if (respone.data.EC === "0") {
                showSnackbar(`${respone.data.EM}`, 'success');
                fetchUsers();
                resetFormData();
            }
            else {
                if (respone.data.EC === "-1") {
                    showSnackbar(`${respone.data.EM}`, 'warning');

                }
                else {
                    showSnackbar(`${respone.data.EM}`, 'error');
                }
            }
            // router.push('/login');
        } catch (error) {
            console.error('Error during registration:', error);

        }
    };
    return (
        <>
            <Modal
                open={openAddUser}
                onClose={handleCloseModal}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '80vw',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        maxHeight: '80vh',
                        overflowY: 'auto',
                    }}
                >
                    <h2>Thêm mới người dùng</h2>
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={formUserData.username}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formUserData.email}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Stack>
                    <TextField
                        fullWidth
                        label="Phone number"
                        name="phone"
                        value={formUserData.phone}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <TextField
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formUserData.password}
                            onChange={handleChange}
                            variant="outlined"
                            autoComplete="current-password"
                            InputProps={{

                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowPassword}>
                                            {showPassword ? <VisibilityOff sx={{ color: 'black' }} /> : <Visibility sx={{ color: 'black' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                // style: { backgroundColor: 'white', borderRadius: '5px' }
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="repeatPassword"
                            name="repeatPassword"
                            type={showRepeatPassword ? 'text' : 'password'}
                            value={formUserData.repeatPassword}
                            onChange={handleChange}
                            variant="outlined"
                            autoComplete="current-password"
                            InputProps={{

                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowRepeatPassword}>
                                            {showRepeatPassword ? <VisibilityOff sx={{ color: 'black' }} /> : <Visibility sx={{ color: 'black' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                // style: { backgroundColor: 'white', borderRadius: '5px' }
                            }}
                            sx={{ mb: 2 }}
                        />
                    </Stack>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Giới tính</InputLabel>
                        <Select
                            name="sex"
                            value={formUserData.sex}
                            onChange={handleChange}
                            label="Giới tính"
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Group</InputLabel>
                        <Select
                            name="groupId"
                            value={formUserData.groupId}
                            onChange={handleChange}
                            label="Group"
                        >
                            <MenuItem value={1}>Developer</MenuItem>
                            <MenuItem value={2}>Leader</MenuItem>
                            <MenuItem value={3}>User</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="address"
                        name="address"
                        value={formUserData.address}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ mt: 2 }}>
                        <Button variant="outlined" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>

        </>
    );
};

export default AddUserModal;
