import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import UserService from '../services/user'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect( () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false)
        }

        if (isAuthenticated) {
            async function loadUser() {
                try {
                    const result = await UserService.get_me(token)
                    if (result) {
                        setUser(result)
                        setIsAuthenticated(true)
                    } else {
                        setIsAuthenticated(false)
                    }
                } catch (error) {
                    localStorage.removeItem("access_token");
                    setIsAuthenticated(false)
                } finally {
                    setLoading(false);
                }

            }

            loadUser()
        } else {
            setLoading(false);
        }

    }, [isAuthenticated]);

    const login = async (username, password) => {
        try {
            const response = await axios.post('https://api-nomades.onrender.com/auth',
                {
                    "username": username,
                    "password": password
                }, {
                    'Content-Type': 'application/json'
                }
            )
            localStorage.setItem('access_token', response.data.access_token);
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de login
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
    }

    return context;
}