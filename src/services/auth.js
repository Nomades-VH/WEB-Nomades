import axios from "axios";
import { instance } from "./base"

const SERVICE = "/auth"

const AuthService = {
    refresh: async (setIsAuthenticated) => {
        const token = localStorage.getItem('access_token')
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try {
            const response = await instance.put(`${SERVICE}/refresh-token`, {}, config)

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de refresh
        }
    },
};
export default AuthService;
