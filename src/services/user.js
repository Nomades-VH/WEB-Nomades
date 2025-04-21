import { instance } from "./base"

const SERVICE = "/user"

const UserService = {
    get_me: async () => {
        return instance.get(`${SERVICE}/me/`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch((error) => {
                throw error;
            });
    },
    get_black_bands: async () => {
        return instance.get(`${SERVICE}/black-bands`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch((error) => {
                throw error;
            });
    },
    get_profile_by_id: async (id) => {
        return instance.get(`${SERVICE}/profile/${id}`, {
            responseType: 'blob', // Indica que a resposta será um Blob
        })
            .then((response) => {
                if (response.status === 200) {
                    return URL.createObjectURL(response.data); // Cria a URL temporária
                }
            })
            .catch((error) => {
                throw error;
            });
    },
    get_all: async () => {
        return instance.get(`${SERVICE}/`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch((error) => {
                throw error;
            });
    },
    get_permissions: async() => {
        return instance.get(`${SERVICE}/permissions`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch((error) => {
                throw error;
            });
    },
    get_profile_image: async () => {
        return instance.get(`${SERVICE}/profile`, {
            responseType: 'blob', // Indica que a resposta será um Blob
        })
            .then((response) => {
                if (response.status === 200) {
                    return URL.createObjectURL(response.data); // Cria a URL temporária
                }
            })
            .catch((error) => {
                throw error;
            });
    },
    upload_profile_image: async (profile) => {
        const formData = new FormData();
        formData.append('profile', profile)
        return instance.post(`${SERVICE}/profile`, formData)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch((error) => {
                throw error;
            });
    },
    create_user: async (data) => {

        const formData = new FormData();
        formData.append('profile', data.profile)
        formData.append('username', data.credentials.username)
        formData.append('email', data.credentials.email)
        formData.append('bio', data.bio)
        formData.append('password', data.credentials.password)
        formData.append('confirm_password', data.credentials.confirmPassword)
        formData.append('permission', parseInt(data.permission))
        formData.append('hub', data.hub)
        data.fkBand ? formData.append('fk_band', data.fkBand.toString()) : null

        return instance.post(`${SERVICE}/`, formData)
            .then((response) => {
                if (response.status === 201) {
                    return response.data;
                }
            })
            .catch((error) => {
                throw error;
            });
    },
    get_deactivates: async () => {
        return instance.get(`${SERVICE}/deactivates`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch((error) => {
                throw error;
            });
    },
    approve_users_deactivates: async (list_ids) => {
        return instance.post(`${SERVICE}/activate`, list_ids)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch((error) => {
                throw error;
            });
    }
};
export default UserService;
