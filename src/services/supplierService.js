import api from "./api"

export const getAllSupplier = () => {
    return api.get(`/supplier/findAll`);
}