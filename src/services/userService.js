import api from "./api"

export const getAllUser = () => {
    return api.get("/user/findAll")
}

export const getUserById = (id) => {
    return api.get(`/user/find/${id}`)
}

export const createUser = (user) => {
    return api.post(`/user/save`,user)
}

export const updateUser = (id,user) => {
    return api.put(`/user/update/${id}`,user)
}

export const deleteUser = (id) => {
    return api.delete(`/user/delete/${id}`)
}

export const getUserByEmail = (email) => {
    return api.get(`/user/findByEmail/${email}`)
}