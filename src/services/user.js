import axios from "axios";
import { instance } from "./base"
import AuthService from "./auth";

const SERVICE = "/user"

const UserService = {
    get_me: async () => {
        try {
            const response = await instance.get(`${SERVICE}/me/`)

            if (response.status === 200) {
                return response.data;
            }
            
        } catch (error) {
            throw error;
        }
    },
    get_profile_image: async () => {
        try {
            const response = await instance.get(`${SERVICE}/profile`, {
                responseType: 'blob', // Indica que a resposta será um Blob
            })
            
            if (response.status === 200) {
                return URL.createObjectURL(response.data); // Cria a URL temporária
            }
        } catch (error) {
            throw error;
        }
    },
    upload_profile_image: async (profile) => {
        try {
            const formData = new FormData();
            formData.append('profile', profile)

            const response = await instance.post(`${SERVICE}/profile`, formData)
            if (response.status === 201) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    },
    create_user: async (data) => {
        const user = {
            credentials: {
                username: data.credentials.username,
                email: data.credentials.email,
                password: data.credentials.password,
                confirmPassword: data.credentials.confirmPassword
            },
            permission: parseInt(data.permission),
            hub: data.hub,
            fk_band: data.fkBand ? data.fkBand.toString() : null,
        }

        console.log('usuário: ', user)

        const formData = new FormData();
        formData.append('profile', data.profile)
        formData.append('username', data.credentials.username)
        formData.append('email', data.credentials.email)
        formData.append('password', data.credentials.password)
        formData.append('confirm_password', data.credentials.confirmPassword)
        formData.append('permission', parseInt(data.permission))
        formData.append('hub', data.hub)
        data.fkBand ? formData.append('fk_band', data.fkBand.toString()) : null

        console.log(formData.values())

        try {
            const responseCreate = await instance.post(`${SERVICE}/`, formData)

            if (responseCreate.status !== 201) return

            return responseCreate.data;
            
        } catch (error) {
            throw error;
        }
    }
};
export default UserService;
