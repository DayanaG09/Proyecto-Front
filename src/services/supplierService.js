import api from "./api"

export const getAllSupplier = () => {
    return api.get(`/supplier/findAll`);
}

export const getSupplierById = (id) => {
    return api.get(`/supplier/find/${id}`)
}

export const createSupplier = (supplier) => {
    return api.post(`/supplier/save`,supplier)
}

export const updateSupplier = (id,supplier) => {
    return api.put(`/supplier/update/${id}`,supplier)
}

export const deleteSupplier = (id) => {
    return api.delete(`/supplier/delete/${id}`)
}