'use client'
import { Description } from '@mui/icons-material';
import { Button, Checkbox, Container, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveIcon from '@mui/icons-material/Remove';

const RolePage = () => {
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

    const handleSubmitAddRole = () => {
        console.log('Form data:', roleFormRows);
    };
    return (
        <Container>



            <Grid container spacing={2} sx={{ alignItems: 'center', mt: '5vh' }}>
                {roleFormRows.map((roleForm, index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={5}>
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
                                                        <AddCircleOutlinedIcon />
                                                    </IconButton>
                                                </>
                                                : <>
                                                    <IconButton aria-label="add" onClick={handleAddNewRole}>
                                                        <AddCircleOutlinedIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="remove" onClick={() => handleRemoveRole(index)}>
                                                        <RemoveIcon />
                                                    </IconButton>
                                                </>
                                        }
                                    </>
                                ) : (
                                    <IconButton aria-label="remove" onClick={() => handleRemoveRole(index)}>
                                        <RemoveIcon />
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
        </Container>

    );
}

export default RolePage;