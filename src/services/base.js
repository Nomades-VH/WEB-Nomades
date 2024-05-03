import axios from "axios";
import AuthService from "./auth";

export const instance = axios.create({
    baseURL: 'http://localhost:8000',
    paramsSerializer: {
        indexes: null,
    },
    validateStatus: (status) => status !== 401,
})

instance.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

    if (Math.random() <= 0.08 && !config.url.includes("auth")) {
        const response = await AuthService.refresh()
        if (response) {
            localStorage.setItem("access_token", response.access_token)
            config.headers.Authorization = `Bearer ${response.access_token}`;
        }
    }

    return config
})

instance.interceptors.response.use((response) => {

    if (response.status === 403) {
        return Promise.reject({message: response.data.message});
    }

    if (response.status === 404) {
        return Promise.reject({message: response.data.message});
    }

    return response;
})
