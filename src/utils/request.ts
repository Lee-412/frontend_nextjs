import axios from "./axios";

const handleLogin = (user: string, password: string) => {
    const reponse = axios.post(`/login`, {
        userLogin: user,
        password: password,
    })
    return reponse;
}

const handleSignUp = (formData: any) => {
    const respone = axios.post(`/register`, { ...formData });

    return respone;
}

const handleEditUser = (formUserData: any) => {
    const response = axios.post(`/users/edit-user`, { ...formUserData });
    return response
}


const handleCreateUser = (formUserData: any) => {
    const respone = axios.post(`/users/create-user`, { ...formUserData })
    return respone
}

const getUserWithPagination = (currentPage: number, currentLimit: number) => {
    const response = axios.get(`/users/get-user?page=${currentPage + 1}&limit=${currentLimit}`)
    return response;
}

const handleDeleteUser = (userId: number) => {
    const response = axios.post(`/users/delete-user`, {
        id: userId,
    });
    return response;

}

const getUserAccount = () => {
    return axios.get('/account')
}
export {
    handleLogin,
    handleSignUp,
    handleEditUser,
    handleCreateUser,
    getUserWithPagination,
    handleDeleteUser,
    getUserAccount
}