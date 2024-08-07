import axios from "./axios";

const handleLogin = async (user: string, password: string) => {
    const reponse = await axios.post(`/login`, {
        userLogin: user,
        password: password,
    })
    return reponse;
}

const handleSignUp = async (formData: any) => {
    const respone = await axios.post(`/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        sex: formData.sex,
        phone: formData.phone,
        address: formData.address
    })

    return respone;
}

const handleEditUser = async (formUserData: any) => {
    const response = await axios.post(`/users/edit-user`, {
        id: formUserData.id,
        username: formUserData.username,
        email: formUserData.email,
        sex: formUserData.sex,
        phone: formUserData.phone,
        address: formUserData.address,
        groupId: formUserData.groupId,
    });
    return response
}


const handleCreateUser = async (formUserData: any) => {
    const respone = await axios.post(`/users/create-user`, {
        username: formUserData.username,
        email: formUserData.email,
        password: formUserData.password,
        sex: formUserData.sex,
        phone: formUserData.phone,
        address: formUserData.address,
        groupId: formUserData.groupId,
    })
    return respone
}

const getAllUser = () => {

}

const getUserWithPagination = async (currentPage: number, currentLimit: number) => {
    const response = await axios.get(`/users/get-user?page=${currentPage + 1}&limit=${currentLimit}`)
    return response;
}

const handleDeleteUser = async (userId: number) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/users/delete-user`, {
        id: userId,
    });
    return response;

}
export {
    handleLogin,
    handleSignUp,
    handleEditUser,
    handleCreateUser,
    getUserWithPagination,
    handleDeleteUser
}