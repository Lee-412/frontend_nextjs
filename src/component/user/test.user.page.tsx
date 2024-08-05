'use client'

import { Button, Container, Grid, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'

const TestUserBase = () => {

    const handleClickCreate = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/users/create-user`, {
                username: 'test create123',
                password: 'tes31at',
                email: '11111111@gmail.com',
                phone: '12389813212',
                sex: 'male',
                address: 'Ha Noi',
            })
            console.log(response);
        } catch (error) {
            console.log(error);

        }

    }
    const handleClickEdit = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/users/edit-user`, {
                id: 13,
                username: 'test edit 123 ',
                email: 'testEdit123@gmail.com',
                phone: '123123123',
                sex: 'male',
                address: 'Ha Noi',
                groupId: '2',
            })
            console.log(response);
        } catch (error) {
            console.log(error);

        }
    }
    const handleClickDelete = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/users/delete-user`, {
                id: 14,
            })
            console.log(response);
        } catch (error) {
            console.log(error);

        }
    }
    const handleClickGetUser = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/users/get-user`)
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Container>
                <Grid container spacing={2} justifyContent="center">

                    <Grid item xs={12}>

                        <Button variant='contained'
                            onClick={handleClickGetUser}
                            sx={{ color: 'white', textTransform: 'none' }}>Get user</Button>

                    </Grid>
                    <Grid item xs={12}>

                        <Button variant='contained'
                            onClick={handleClickEdit}
                            sx={{ color: 'white', textTransform: 'none' }}>Edit user</Button>

                    </Grid>
                    <Grid item xs={12}>

                        <Button variant='contained'
                            onClick={handleClickCreate}
                            sx={{ color: 'white', textTransform: 'none' }}>Create user</Button>

                    </Grid>
                    <Grid item xs={12}>

                        <Button variant='contained'
                            onClick={handleClickDelete}
                            sx={{ color: 'white', textTransform: 'none' }}>Delete user</Button>

                    </Grid>
                </Grid>


            </Container >

        </>
    )
}

export default TestUserBase;