import { instance } from "./base"

const SERVICE = "/auth"

const AuthService = {
    refresh: async () => {
        try {
            const response = await instance.put(`${SERVICE}/refresh-token`, {})
            console.log(response.status)
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de refresh
        }
    },
};
export default AuthService;
