import axios from "axios";

const api = axios.create({
    baseURL: "http://18.227.111.116:8080/api",
})

export default api;