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
            const response = await instance.get(`${SERVICE}/me`, config)

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de login
        }
    },
};
export default UserService;
