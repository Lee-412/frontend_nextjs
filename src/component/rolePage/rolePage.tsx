'use client'
import { Description } from '@mui/icons-material';
import { Box, Button, Checkbox, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveIcon from '@mui/icons-material/Remove';
import SnackbarModal, { Severity, SnackbarState } from '../feedback/snackbar';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { getRoleWithPagination, handleCreateRole, handleDeleteMultipleRow, handleDeleteRole } from '@/utils/roleRequest';
import { log } from 'console';
import { UserContext } from '../userContext/userContext';
import { useRouter } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';


interface Group {
    id: number;
    name: string;
    description: string;
}

interface Role {
    id: number;
    formattedGroups: string;
    url: string;
    description: string;
    groups?: Group;
}


const RolePage = () => {
    // config base
    const { user, logoutContext } = React.useContext(UserContext);
    const route = useRouter();

    // config snackbar
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

    //config page , pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [currentLimit, setCurrentLimit] = useState(5);

    const handleChangePage = (_event: any, newPage: any) => {
        setCurrentPage(newPage);

    };

    const handleChangeRowsPerPage = (event: any) => {
        setCurrentLimit(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };


    const [dataRole, setDataRole] = useState<{
        data: Role[];
        totalRows: number;
        totalPage: number;
        loading: boolean;
    }>({
        data: [], // Đây là mảng rỗng kiểu Role[]
        totalRows: 0,
        totalPage: 0,
        loading: false
    });


    const [roleFormRows, setRoleFormRows] = useState([{ url: '', description: '' }]);

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
            fetchDataRole();
            console.log("check user");

        }

    }, [currentPage, currentLimit]);

    const fetchDataRole = async () => {
        const res = await getRoleWithPagination(currentPage, currentLimit);
        console.log(res);
        if (res.data.EC === '0') {

            const processedRoles = res.data.DT.role.map((role: { groups: any[]; }) => {

                const groupNames = role.groups && role.groups.length > 0
                    ? role.groups.map((group: { name: any; }) => group.name).join(', ')
                    : 'null';

                return {
                    ...role,
                    formattedGroups: ` ${groupNames}`
                };
            });

            console.log(processedRoles);

            setDataRole({
                data: processedRoles,
                totalRows: res.data.DT.totalRows,
                totalPage: res.data.DT.totalPage,
                loading: true,
            })
        }
        else {
            console.log('hit here');

        }
    }

    // console.log(roleServer);
    // console.log(dataRole.data);

    // handle CRUD role
    const handleAddNewRole = () => {

        if (user && user.isAuthenticate === false) {
            setSnackbar({
                open: true,
                message: "Bạn phải đăng nhập với có thể sử dụng chức năng này.",
                severity: 'warning'
            })
            console.log("user invalid");
        }
        else {
            setRoleFormRows([...roleFormRows, { url: '', description: '' }]);

        }
    };
    const handleRemoveRole = (index: number) => {

        const updatedRows = roleFormRows.filter((_, idx) => idx !== index);
        setRoleFormRows(updatedRows);
    };
    const handleFormChange = (index: number, field: string, value: string) => {
        const updatedRows = roleFormRows.map((row, idx) =>
            idx === index ? { ...row, [field]: value } : row
        );
        setRoleFormRows(updatedRows);
    };

    const handleSubmitAddRole = async () => {
        if (user && user.isAuthenticate === false) {
            setSnackbar({
                open: true,
                message: "Bạn phải đăng nhập với có thể sử dụng chức năng này.",
                severity: 'warning'
            })
            console.log("user invalid");
        }

        else {
            let validate = true;
            roleFormRows.map((role, index) => {

                if (role.url === '') {
                    // console.log('hit here');
                    showSnackbar(`url ${index} is empty`, 'warning');
                    validate = false
                    return
                }
            })

            if (!validate) {
                return
            }
            const res = await handleCreateRole(roleFormRows);

            if (res.data.EC === "0") {
                showSnackbar(`${res.data.EM}  ${res.data.DT.total} role`, 'success')
                setRoleFormRows([{ url: '', description: '' }])
                fetchDataRole()
            }
            else if (res.data.EC === "1") {
                showSnackbar(`${res.data.EM}...`, 'error')
                setRoleFormRows([{ url: '', description: '' }])
                fetchDataRole()

            }
            else if (res.data.EC === -1) {
                showSnackbar(`${res.data.EM}. Please login and try again`, 'error')
                console.log(res);
                console.log('hit here');

            }
            else {
                console.log(res);

                console.log('hit here');
                showSnackbar(`${res.data.EM}`, 'error')


            }
        }
    };

    const handleClickDelete = async (roleId: number) => {
        console.log(roleId);


        try {
            const arrayId = []
            arrayId[0] = roleId
            const confirmed = window.confirm("Are you sure you want to delete this user?");

            if (!confirmed) {
                return;
            }


            if (dataRole.data.length === 1 && dataRole.data[0].id === roleId) {
                const response = await handleDeleteMultipleRow(arrayId)
                setCurrentPage(currentPage - 1);
            }
            else {
                const response = await handleDeleteMultipleRow(arrayId);
            }

            setSnackbar({
                open: true,
                message: 'Delete user successfully',
                severity: 'success'
            });
            fetchDataRole();

        } catch (error: any) {
            console.log(error);
            let errorMessage = error.message;
            showSnackbar(errorMessage, 'error');
        }
    };

    const handleClickEdit = async (roleId: number) => {
        setSnackbar({
            open: true,
            message: 'Chức năng sẽ cập nhật sau, vui lòng xóa và tạo lại role mới',
            severity: 'info'
        });
    }


    // checkbox delete
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const handleSelectRow = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleSelectAllRows = () => {
        if (selectedIds.length === dataRole.data.length) {
            setSelectedIds([]);
        } else {
            const allIds = dataRole.data.map(role => role.id);
            setSelectedIds(allIds);
        }
    };

    const handleDeleteSelected = async () => {
        try {
            const confirmed = window.confirm("Bạn có chắc chắn muốn xóa các mục đã chọn?");
            if (!confirmed) return;
            console.log(selectedIds);
            let res;


            console.log(dataRole.data.length);
            console.log();

            if (dataRole.data.length === selectedIds.length) {
                console.log('hit here');

                setCurrentPage(currentPage - 1);
                res = await handleDeleteMultipleRow(selectedIds)
            }
            else {
                res = await handleDeleteMultipleRow(selectedIds)
                console.log(res);
            }


            if (res.data.EC === '0') {
                setSnackbar({ open: true, message: `${res.data.EM}`, severity: 'success' });
                fetchDataRole();
                setSelectedIds([]);
            }
            else if (res.data.EC === '1') {
                setSnackbar({ open: true, message: `${res.data.EM}`, severity: 'warning' });
                setSelectedIds([]);
                fetchDataRole();

            }
            else {
                setSnackbar({ open: true, message: `${res.data.EM}`, severity: 'error' });
                setSelectedIds([]);
            }

        } catch (error: any) {
            showSnackbar(error.message, 'error');
        }
    };

    return (
        <Container>

            <Grid container spacing={2} sx={{ alignItems: 'center', mt: '5vh' }}>
                {roleFormRows.map((roleForm, index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={1} sx={{ width: '4%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography sx={{ alignItems: 'center', justifyContent: 'center' }}>{index}</Typography>
                        </Grid>

                        <Grid item xs={4} sx={{}} >


                            <TextField
                                label="Url"
                                value={roleForm.url}
                                onChange={(e) => handleFormChange(index, 'url', e.target.value)}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                label="Description"
                                value={roleForm.description}
                                onChange={(e) => handleFormChange(index, 'description', e.target.value)}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                            {index === roleFormRows.length - 1 ?
                                (
                                    <>
                                        {
                                            index === 0 ?
                                                <>
                                                    <IconButton aria-label="add" onClick={handleAddNewRole}>
                                                        <AddCircleOutlineSharpIcon style={{ color: 'green' }} />
                                                    </IconButton>
                                                </>
                                                : <>
                                                    <IconButton aria-label="add" onClick={handleAddNewRole}>
                                                        <AddCircleOutlineSharpIcon style={{ color: 'green' }} />
                                                    </IconButton>
                                                    <IconButton aria-label="remove" onClick={() => handleRemoveRole(index)}>
                                                        <RemoveCircleOutlineSharpIcon style={{ color: 'red' }} />
                                                    </IconButton>
                                                </>
                                        }
                                    </>
                                ) : (
                                    <IconButton aria-label="remove" onClick={() => handleRemoveRole(index)}>
                                        <RemoveCircleOutlineSharpIcon style={{ color: 'red' }} />
                                    </IconButton>
                                )}
                        </Grid>
                    </React.Fragment>
                ))}
                <Grid item xs={12}>
                    <Button variant="contained" startIcon={<AddBoxIcon />} onClick={handleSubmitAddRole}>
                        Submit
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ marginTop: '2vh' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" align='center'>
                                <Box sx={{ display: 'flex' }}>
                                    <Checkbox

                                        indeterminate={selectedIds.length > 0 && selectedIds.length < dataRole.data.length}
                                        checked={selectedIds.length === dataRole.data.length}
                                        onChange={handleSelectAllRows}
                                        inputProps={{ 'aria-label': 'select all roles' }}
                                    />
                                    {selectedIds.length > 0 && (
                                        <IconButton color='warning' size='small' onClick={handleDeleteSelected}>


                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell align='center'>
                                <TableSortLabel>
                                    URL
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align='center'>
                                <TableSortLabel>
                                    Description
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align='center'>
                                <TableSortLabel>
                                    Group
                                </TableSortLabel>
                            </TableCell>

                            <TableCell align='center'>
                                <TableSortLabel>
                                    Acction
                                </TableSortLabel>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dataRole.data && dataRole.data.length > 0 ? (
                                dataRole.data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell padding="checkbox" align='center'>
                                            <Checkbox
                                                checked={selectedIds.includes(row.id)}

                                                inputProps={{
                                                    'aria-label': `select row ${index + 1}`,
                                                }}
                                                onChange={() => handleSelectRow(row.id)}

                                            />
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.url}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.description}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.groups && row.formattedGroups !== ' ' ? row.formattedGroups : "No group"}
                                        </TableCell>

                                        <TableCell align='center'>
                                            <Tooltip title="Edit Role" arrow>
                                                <IconButton onClick={() => handleClickEdit(row.id)}
                                                >
                                                    <BorderColorIcon />
                                                </IconButton>

                                            </Tooltip>
                                            <Tooltip title="Delete Role" arrow>

                                                <IconButton
                                                    onClick={() => handleClickDelete(row.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>

                                    </TableRow>
                                )))
                                : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">No roles available</TableCell>
                                    </TableRow>
                                )}

                    </TableBody>

                </Table>
                <TablePagination
                    component="div"
                    count={dataRole.totalRows}
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
        </Container>

    );
}

export default RolePage;