import axios from "axios";
import Alert from "../components/commons/Alert";

export const instance = axios.create({
    baseURL: 'https://api-nomades.onrender.com',
    paramsSerializer: {
        indexes: null,
    },
    validateStatus: (status) => status !== 401,
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    return config
})

instance.interceptors.response.use((response) => {
    console.log(response.status)
    if (response.status === 403) {
        return Promise.reject({message: response.data.message});
    }

    return response;
})
