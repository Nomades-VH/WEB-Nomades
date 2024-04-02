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
            const response = await instance.get(`${SERVICE}/`, config)
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
    },

    create: async (token, data) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const band = {
            gub: data.gub,
            name: data.name,
            meaning: data.meaning,
            theory: data.theory,
            breakdown: data.breakdown,
            stretching: data.stretching,
            kicks: [],
            poomsaes: [],
            kibon_donjaks: []
        }

        try {
            const response = await instance.post(`${SERVICE}/`, band, config)

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de login
        }
    },
    delete: async (token, id) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        try {
            const response = await instance.delete(`${SERVICE}/${id}`, config)
            if (response.status === 200) {
                return response
            }
        } catch (error) {
            throw error;
        }
    }
}

export default BandService;