import axios from "axios";
import { instance } from "./base"

const SERVICE = "/user"

const UserService = {
    get_me: async (token) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const response = await instance.get(`${SERVICE}/me/`, config)

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de login
        }
    },
    create_user: async (token, data) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const user = {
            credentials: {
                username: data.credentials.username,
                email: data.credentials.email,
                password: data.credentials.password
            },
            permission: parseInt(data.permission),
            hub: data.hub,
            fk_band: data.fk_band ? data.fk_band.toString() : null
        }

        console.log("USER AQUI USER AQUI")
        console.log(user)

        try {
            const response = await instance.post(`${SERVICE}/`, user, config)

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de login
        }
    }
};
export default UserService;
