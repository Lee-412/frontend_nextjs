'use client'

import { Button, Container, Pagination, TableCell, TablePagination, Tooltip } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/navigation';
import { Box, IconButton, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddUserModal from './user.create';
import EditUserModal from './user.edit';
import SnackbarModal, { Severity, SnackbarState } from '../feedback/snackbar';
import ConfirmDialog from '../feedback/confirm.dialog';
import { getUserWithPagination, handleDeleteUser } from '@/utils/request';
import axios from '@/utils/axios';
import { AxiosError } from 'axios';
import { UserContext } from '../userContext/userContext';
export type DataUser = {
    id: number,
    email: string,
    username: string,
    address: string,
    sex: string,
    phone: string,
    Group: {
        id: number,
        name: string,
        description: string
    }
}

export type dataUserClient = {
    id: number,
    username: string,
    password: string,
    repeatPassword: string,
    email: string,
    phone: string,
    address: string,
    sex: string,
    groupId: number,
    authen: string,
}
interface TableDataUser {
    data: DataUser[];
    totalRows: number;
    totalPage: number;
    loading: boolean;
}
const TestUserBase = () => {

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

    const [openDialog, setOpenDialog] = useState(false);
    const [confirmDialog, setConformDialog] = useState(false)


    const [currentPage, setCurrentPage] = useState(0);
    const [currentLimit, setCurrentLimit] = useState(5);

    const [dataUser, setDataUser] = useState<TableDataUser>({
        data: [],
        totalRows: 0,
        totalPage: 0,
        loading: false
    })

    const route = useRouter();
    const [openAddUser, setOpenAddUser] = useState(false)
    const [openEditUser, setOpenEditUser] = useState(false)
    const [dataCreate, setDataCreate] = useState<dataUserClient>(
        {
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
        }
    )

    const { user, logoutContext } = React.useContext(UserContext);
    console.log("check user login: ", user);

    useEffect(() => {

        if (user && user.isAuthenticate === false) {
            setSnackbar({
                open: true,
                message: "Bạn phải đăng nhập với có thể sử dụng chức năng  này.\nHệ thống sẽ đưa bạn tới trang đăng nhập sau vài giây...",
                severity: 'warning'
            })
            setTimeout(() => {

                route.push('/login');
            }, 2000);

        }
        else {
            fetchUser();
            console.log("check user");

        }


    }, [currentPage, currentLimit]);

    const handleReloadPage = () => {

        if (user && user.isAuthenticate === false) {
            setSnackbar({
                open: true,
                message: "Bạn phải đăng nhập với có thể sử dụng chức năng này.",
                severity: 'warning'
            })

        }
        else {
            fetchUser();
        }

    }
    const handleClickCreate = async () => {

        if (user && user.isAuthenticate === false) {
            setSnackbar({
                open: true,
                message: "Bạn phải đăng nhập với có thể sử dụng chức năng này.",
                severity: 'warning'
            })


            console.log("user invalid");
        }
        else {
            setOpenAddUser(true)

        }
    }

    const handleClickEdit = async (user: DataUser) => {

        setDataCreate({
            id: user.id,
            username: user.username,
            password: '',
            repeatPassword: '',
            email: user.email,
            phone: user.phone,
            address: user.address,
            sex: user.sex,
            groupId: user.Group.id,
            authen: ''
        })
        setOpenEditUser(true)
    }

    const handleClickDelete = async (userId: number) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this user?");

            if (!confirmed) {
                return;
            }


            if (dataUser.data.length === 1 && dataUser.data[0].id === userId) {
                const response = await handleDeleteUser(userId)
                setCurrentPage(currentPage - 1);
            }
            else {
                const response = await handleDeleteUser(userId);
            }

            setSnackbar({
                open: true,
                message: 'Delete user successfully',
                severity: 'success'
            });
            fetchUser();

        } catch (error: any) {
            console.log(error);
            let errorMessage = error.response.data.EM;
            showSnackbar(errorMessage, 'error');
        }
    };

    const fetchUser = async () => {
        try {

            const response = await getUserWithPagination(currentPage, currentLimit);
            console.log(response);
            if (response.data.EC === "0") {
                console.log('hit 0');

                setDataUser({
                    data: response.data.DT.user,
                    totalRows: response.data.DT.totalRows,
                    totalPage: response.data.DT.totalPage,
                    loading: true,
                })
            }
            else {
                console.log('hit');

                showSnackbar(response.data.EM, 'error');
                logoutContext()
                route.push('/login');
            }

        } catch (error) {
            showSnackbar('error ', 'error');
            route.push('/login');

        }
    }
    const handleChangePage = (_event: any, newPage: any) => {
        setCurrentPage(newPage);

    };

    const handleChangeRowsPerPage = (event: any) => {
        setCurrentLimit(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    return (
        <>

            <Container maxWidth="lg" sx={{ padding: '2vh 2vw' }}>

                <TableContainer component={Paper} sx={{
                    marginBottom: '3vh',
                    paddingTop: '1vh',
                    paddingBottom: '1vh',
                    display: 'flex',
                    justifyContent: 'flex-end   '

                }}>
                    <Button variant='contained'
                        onClick={handleClickCreate}
                        sx={{
                            color: 'white', borderRadius: '1vh', marginRight: '1vw',
                            marginLeft: '3vw'
                        }}>Add user</Button>

                    <IconButton
                        onClick={handleReloadPage}
                        sx={{ color: 'black' }}>
                        <RestartAltIcon />
                    </IconButton>
                </TableContainer>


                <TableContainer component={Paper} >

                    <Table sx={{ minWidth: 700 }} >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">username</TableCell>
                                <TableCell align="center">email</TableCell>
                                <TableCell align="center">address</TableCell>
                                <TableCell align="center">group</TableCell>
                                <TableCell align="center">Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                dataUser.data && dataUser.data.length > 0 ? (

                                    dataUser.data.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableCell align='center'>{currentLimit * (currentPage) + index + 1}</TableCell>
                                            <TableCell align='center'>{user.id}</TableCell>
                                            <TableCell align="center">{user.username}</TableCell>
                                            <TableCell align="center">{user.email}</TableCell>
                                            <TableCell align="center">{user.address}</TableCell>
                                            <TableCell align="center">{user.Group ? user.Group.name : 'undefined'}</TableCell>
                                            <TableCell align="center" >
                                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Tooltip title="Edit user" arrow>

                                                        <IconButton onClick={() => handleClickEdit(user)}
                                                        >
                                                            <BorderColorIcon />
                                                        </IconButton>

                                                    </Tooltip>
                                                    <Tooltip title="Delete user" arrow>

                                                        <IconButton
                                                            onClick={() => handleClickDelete(user.id)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>

                                        </TableRow>
                                    )))
                                    : (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">No users available</TableCell>
                                        </TableRow>
                                    )}
                        </TableBody>


                    </Table>
                    <TablePagination
                        component="div"
                        count={dataUser.totalRows}
                        page={currentPage}
                        onPageChange={handleChangePage}
                        rowsPerPage={currentLimit}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 15]}
                    />
                </TableContainer>

                <SnackbarModal
                    snackbar={snackbar}
                    setSnackbar={setSnackbar}
                />
            </Container >
            <AddUserModal
                openAddUser={openAddUser}
                setOpenAddUser={setOpenAddUser}
                fetchUsers={fetchUser}
                formUserData={dataCreate}
                setFormUserData={setDataCreate}
                snackbar={snackbar}
                setSnackbar={setSnackbar}
                showSnackbar={showSnackbar}
            />

            <EditUserModal
                openEditUser={openEditUser}
                setOpenEditUser={setOpenEditUser}
                fetchUsers={fetchUser}
                formUserData={dataCreate}
                setFormUserData={setDataCreate}
                snackbar={snackbar}
                setSnackbar={setSnackbar}
                showSnackbar={showSnackbar}
            />

            <ConfirmDialog
                open={openDialog}
                setOpenDialog={setOpenDialog}
                setConformDialog={setConformDialog}
                title="Confirm Delete"
                message="Are you sure you want to delete this user?"
            />

        </>
    )
}


export default TestUserBase;
