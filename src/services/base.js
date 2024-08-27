import axios from "axios";
import AuthService from "./auth";

export const instance = axios.create({
	baseURL: 'https://api-nomades.onrender.com',
    paramsSerializer: {
        indexes: null,
    },
    validateStatus: (status) => status !== 400,
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

instance.interceptors.response.use(response => response, error => {

    if (error.response.status === 401) {
        localStorage.removeItem('access_token')
        window.location.href = '/login'
    }

    if (error.response.status === 403) {
        window.location.href = '/'
    }   

    if (error.response.status === 404) {
        window.location.href = '/not_found'
    }

    return Promise.reject(error);

})
