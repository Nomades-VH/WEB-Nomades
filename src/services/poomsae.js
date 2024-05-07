import {instance} from "./base";

const SERVICE = "/poomsae";

const PoomsaeService = {
    create: async (data) => {
        const poomsae = {
            name: data.name,
            description: data.description,
        }

        console.log(poomsae);

        try {
            const response = await instance.post(`${SERVICE}/`, poomsae)

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

export default PoomsaeService;