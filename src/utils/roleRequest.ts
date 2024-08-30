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
    const response = axios.post(`/roles/delete-role`, {
        id: userId,
    });
    return response;

}

const getListRole = () => {

}

const getRoleWithPagination = (currentPage: number, currentLimit: number) => {
    console.log(currentLimit, currentPage);

    const response = axios.get(`/roles/get-role?page=${currentPage + 1}&limit=${currentLimit}`)
    return response;
}

const handleDeleteMultipleRow = (roleArray: Number[]) => {
    console.log(roleArray);
    const response = axios.post(`/roles/delete-role`, {
        data: roleArray,
    });
    return response;
}


export {

    handleEditRole,
    handleCreateRole,
    handleDeleteRole,
    getListRole,
    getRoleWithPagination,
    handleDeleteMultipleRow
}