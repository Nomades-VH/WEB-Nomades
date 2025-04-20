import axios from "axios";
import AuthService from "./auth";

export const instance = axios.create({
	baseURL: 'http://localhost:8000',
    paramsSerializer: {
        indexes: null,
    },
    validateStatus: (status) => status !== 400,
    timeout: 10000,
})

export const setupAxiosInterceptors = (setIsLoading) => {
    let count = 0;

    instance.interceptors.request.use(async (config) => {
        count++
        if (count > 0) setIsLoading(true)
        if (localStorage.getItem('access_token')) config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

        if (Math.random() <= 0.08 && !config.url.includes("auth")) {
            try {
                const response = await AuthService.refresh();
                if (response) {
                    localStorage.setItem("access_token", response.access_token);
                    config.headers.Authorization = `Bearer ${response.access_token}`;
                }
            } catch (error) {
                console.error('Failed to refresh token', error);
            }
        }

        return config
    }, (error) => {
        count--
        if (count === 0) setIsLoading(false)
        return Promise.reject(error)
    })

    instance.interceptors.response.use((response) => {
        count--
        if (count === 0) setIsLoading(false)

        return response;
    }, (error) => {
        count--
        if (count === 0) setIsLoading(false)

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
}
