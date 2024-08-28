'use client'
import { Description } from '@mui/icons-material';
import { Button, Checkbox, Container, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveIcon from '@mui/icons-material/Remove';
import SnackbarModal, { Severity, SnackbarState } from '../feedback/snackbar';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { handleCreateRole } from '@/utils/roleRequest';

const RolePage = () => {

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

    const [roleFormRows, setRoleFormRows] = useState([{ url: '', description: '' }]);

    const handleAddNewRole = () => {
        setRoleFormRows([...roleFormRows, { url: '', description: '' }]);
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

        }
        else if (res.data.EC === "1") {
            showSnackbar(`${res.data.EM}...`, 'error')
            setRoleFormRows([{ url: '', description: '' }])

        }
        else {
            showSnackbar('Failed to create role', 'error')
        }
    };

    const fetchDataRole = () => {

    }


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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                inputProps={{
                                    'aria-label': 'select all rows',
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            <TableSortLabel>
                                URL
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel>
                                Description
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {roleFormRows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    inputProps={{
                                        'aria-label': `select row ${index + 1}`,
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                {row.url}
                            </TableCell>
                            <TableCell>
                                {row.description}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <SnackbarModal
                snackbar={snackbar}
                setSnackbar={setSnackbar}
            />
        </Container>

    );
}

export default RolePage;