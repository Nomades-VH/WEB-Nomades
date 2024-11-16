import axios from "axios";
import { instance } from "./base"

const SERVICE = "/user"

const UserService = {
    get_me: async () => {
        try {
            const response = await instance.get(`${SERVICE}/me/`)

            if (response.status === 200) {
                return response.data;
            }
            
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de login
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
            throw error; // Propaga o erro para quem chama a função de login
        }
    },
    upload_profile_image: async (profile) => {
        try {
            const formData = new FormData();
            formData.append('profile', profile)

            const response = await instance.post(`${SERVICE}/profile`, formData)
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de login
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

        try {
            const response = await instance.post(`${SERVICE}/`, user)

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de login
        }
    }
};
export default UserService;
