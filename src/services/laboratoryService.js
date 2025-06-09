import api from "./api"

export const getAllLaboratory = () => {
    return api.get("/laboratory/findAll")
}

export const getLaboratoryById = (id) => {
    return api.get(`/laboratory/find/${id}`)
}

export const createLaboratory = (laboratory) => {
    return api.post(`/laboratory/save`,laboratory)
}

export const updateLaboratory = (id,laboratory) => {
    return api.put(`/laboratory/update/${id}`,laboratory)
}

export const deleteLaboratory = (id) => {
    return api.delete(`/laboratory/delete/${id}`)
}