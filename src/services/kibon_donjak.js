import {instance} from "./base";

const SERVICE = "/kibon_donjak";

const KibonDonjakService = {
    create: async (data) => {
        const kibonDonjak = {
            name: data.name,
            description: data.description,
        }

        try {
            const response = await instance.post(`${SERVICE}/`, kibonDonjak)

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
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
}

export default KibonDonjakService;