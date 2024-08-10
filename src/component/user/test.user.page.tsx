'use client'

import { Button, Container, Pagination, TableCell, TablePagination, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
    const [userData, setUserData] = useState({
        token: '',
        userID: 0,
        username: '',
        email: '',
        phone: '',
        address: '',
        groupId: 3,
        authen: ''
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
    useEffect(() => {


        const userDataString = sessionStorage.getItem('userData');
        console.log(userDataString);

        if (!userDataString) {
            // route.push('/');
            console.log("no data");
            setSnackbar({
                open: true,
                message: 'No authenticated',
                severity: 'error'
            })
        }
        else {
            const dataServer = JSON.parse(userDataString);
            console.log(dataServer);
            fetchUser();
            setUserData({
                token: 'form.jwt',
                userID: dataServer.userID,
                email: dataServer.email,
                username: dataServer.username,
                phone: dataServer.phone,
                address: dataServer.address,
                groupId: dataServer.groupId,
                authen: 'Admin'
            })
            {
                // showSnackbar('User check', 'success')
            }

        }


    }, [currentPage, currentLimit]);


    const handleClickCreate = async () => {
        setOpenAddUser(true)
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
            console.log(userId);

            // Hiển thị hộp thoại xác nhận
            const confirmed = window.confirm("Are you sure you want to delete this user?");

            if (!confirmed) {
                return; // Nếu người dùng chọn "Cancel", thoát khỏi hàm
            }

            const response = await handleDeleteUser(userId)

            console.log(response);
            setSnackbar({
                open: true,
                message: 'Delete user successfully',
                severity: 'success'
            });
            fetchUser();
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await getUserWithPagination(currentPage, currentLimit);
            console.log("check reponse", response);
            setDataUser({
                data: response.data.DT.user,
                totalRows: response.data.DT.totalRows,
                totalPage: response.data.DT.totalPage,
                loading: true,
            })
            console.log(dataUser);


        } catch (error) {
            console.log(error);
            //@ts-expect-error
            let errorMessage = error.reponse.data.EM;
            showSnackbar(errorMessage, 'error');
        }
    }
    const handleChangePage = (_event: any, newPage: any) => {
        setCurrentPage(newPage);
        console.log(newPage)

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
                        onClick={fetchUser}
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
                            {dataUser.data.map((user, index) => (
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
                            ))}
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
                <Container sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '3vh'
                }}>

                </Container>

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
