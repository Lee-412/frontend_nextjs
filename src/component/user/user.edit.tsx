import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import axios from '@/utils/axios'
import { dataUserClient } from './test.user.page';
import { Severity } from '../feedback/snackbar';
import { handleEditUser } from '@/utils/request';

interface EditUserProps {
    openEditUser: boolean;
    setOpenEditUser: (openEditUser: boolean) => void;
    fetchUsers: () => void;
    formUserData: dataUserClient;
    setFormUserData: (formUserData: dataUserClient) => void;
    snackbar: any,
    setSnackbar: (snackbar: any) => void,
    showSnackbar: (message: string, severity: Severity) => void,
}

const EditUserModal = (props: EditUserProps) => {
    const { openEditUser, setOpenEditUser, fetchUsers, formUserData, setFormUserData, snackbar, setSnackbar, showSnackbar } = props;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormUserData({
            ...formUserData,
            [name]: value,
        });
    };

    const handleCloseModal = () => {
        setOpenEditUser(false);
    };

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

    const handleSubmitUpdate = async (e: any) => {
        e.preventDefault();
        console.log(formUserData);

        if (!formUserData.username) {
            showSnackbar('username is undefined', 'warning');
            return;
        }
        if (!formUserData.email) {
            showSnackbar('email is undefined', 'warning');
            return;
        }
        const regx = /\S+@\S+\.\S+/;

        if (!regx.test(formUserData.email)) {
            showSnackbar('email is invalid', 'warning');
            return;
        }


        if (!formUserData.sex) {
            showSnackbar('gender is undefined', 'warning');
            return;
        }
        if (!formUserData.phone) {
            showSnackbar('phone is undefined', 'warning');
            return;
        }
        if (!formUserData.address) {
            showSnackbar('address is undefined', 'warning');
            return;
        }

        const phonePattern = /^[0-9]+$/;

        if (!phonePattern.test(formUserData.phone)) {
            showSnackbar('Phone number can only contain digits', 'warning');
            return;
        }
        console.log(formUserData);


        try {

            const response = await handleEditUser(formUserData);
            if (response.data.EC === "0") {
                showSnackbar(`${response.data.EM}`, 'success');
                fetchUsers();
                resetFormData();
            } else {
                showSnackbar(`${signin.EM}`, signin.EC === "-1" ? 'warning' : 'error');
            }
        } catch (error) {
            console.error('Error during update:', error);
        }
    };

    return (
        <>
            <Modal
                open={openEditUser}
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
                    <h2>Edit User</h2>
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
                        label="Address"
                        name="address"
                        value={formUserData.address}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ mt: 2 }}>
                        <Button variant="outlined" onClick={handleSubmitUpdate}>
                            Update
                        </Button>
                    </Box>
                </Box>
            </Modal>

        </>
    );
};

export default EditUserModal;
