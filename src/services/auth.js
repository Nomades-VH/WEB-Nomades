import { instance } from "./base"

const SERVICE = "/auth"

const AuthService = {
    refresh: async () => {
        try {
            const response = await instance.put(`${SERVICE}/refresh-token`, {})

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    },
    login: async (login, password, isEmail) => {
        let credentials;
        isEmail ? 
        credentials = {
            email: login,
            password: password
        } : 
        credentials = {
            username: login,
            password: password
        }

        try {
            const response = await instance.post(`${SERVICE}`, credentials)

            console.log(response.status)
            if (response.status === 201) {
                localStorage.setItem('access_token', response.data.access_token);
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
};
export default AuthService;
