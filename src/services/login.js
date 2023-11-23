const axios = require('axios');

export async function login(username, password) {
    return await axios.post('http://localhost:8000/auth',
        {
            "username": username,
            "password": password
        },
        {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    )
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.error(error)
        })
}