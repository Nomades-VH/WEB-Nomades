import {instance} from "./base";

const SERVICE = "/kick";

const KickService = {
    create: async (data) => {
        const kick = {
            name: data.name,
            description: data.description,
        }

        try {
            const response = await instance.post(`${SERVICE}/`, kick)

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    },

    get: async () => {
        try {
            const response = await instance.get(`${SERVICE}/`)

            if (response.status === 200) {
                console.log(response.data)
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
}

export default KickService;