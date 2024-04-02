import axios from "axios";
import {router} from "next/router";
import AuthService from "./auth";

export const instance = axios.create({
    baseURL: 'http://localhost:8000',
    paramsSerializer: {
        indexes: null,
    },
    validateStatus: (status) => status !== 401,
})

instance.interceptors.response.use(
    (response) => {
        return response;
    }, async function (error) {
        const token = localStorage.getItem('access_token');
        // if ((error.response.status === 401) && token) {
        //     localStorage.removeItem('access_token');
        //     router.push("/login")
        // }
    }
)