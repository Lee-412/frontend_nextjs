import axios from "./axios";


const handleEditRole = (formUserData: any) => {
    const response = axios.post(`/users/edit-user`, { ...formUserData });
    return response
}


const handleCreateRole = (formRolesData: any) => {
    const respone = axios.post(`/roles/create-role`, [...formRolesData])
    return respone
}


const handleDeleteRole = (userId: number) => {
    const response = axios.post(`/users/delete-user`, {
        id: userId,
    });
    return response;

}

const getListRole = () => {

}

export {

    handleEditRole,
    handleCreateRole,
    handleDeleteRole,
    getListRole
}