import api from "./api"

export const getAllLaboratory = () => {
    return api.get("/laboratory/findAll")
}