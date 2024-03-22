import {instance} from "./base";

const SERVICE = "/band";

const BandService = {
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

    get: async (token) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const response = await instance.get(`${SERVICE}`, config)
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de login
        }
    },

    get_by_id: async (token, id) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const response = await instance.get(`${SERVICE}/${id}`, config)
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
}

export default BandService;