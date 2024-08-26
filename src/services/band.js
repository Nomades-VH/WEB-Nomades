import {instance} from "./base";

const SERVICE = "/band";

const BandService = {
    get_me: async () => {
        try {
            const response = await instance.get(`${SERVICE}/me`)

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de login
        }
    },

    get: async () => {
        try {
            const response = await instance.get(`${SERVICE}/`)
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de login
        }
    },

    get_by_id: async (id) => {
        try {
            const response = await instance.get(`${SERVICE}/${id}`)
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    },

    create: async (data) => {

        console.log('DADOS: ', data)
        
        const band = {
            gub: data.gub,
            name: data.name,
            meaning: data.meaning,
            theory: data.theory,
            breakdown: data.breakdown,
            stretching: data.stretching,
            kicks: data.kicks || null,
            poomsaes: data.poomsaes || null,
            kibon_donjaks: data.kibonDonjaks || null
        }

        try {
            const response = await instance.post(`${SERVICE}/`, band)

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de login
        }
    },

    update: async (data) => {
        const band = {
            gub: data.gub,
            name: data.name,
            meaning: data.meaning,
            theory: data.theory,
            breakdown: data.breakdown,
            stretching: data.stretching,
            kicks: data.kicks || [],
            poomsaes: data.poomsaes || [],
            kibon_donjaks: data.kibonDonjaks || []
        }

        try {
            const response = await instance.put(`${SERVICE}/${data.id}`, band)

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de login
        }
    },
    delete: async (id) => {
        try {
            const response = await instance.delete(`${SERVICE}/${id}`)
            if (response.status === 200) {
                return response
            }
        } catch (error) {
            throw error;
        }
    }
}

export default BandService;