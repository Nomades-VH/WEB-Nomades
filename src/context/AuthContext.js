import React, {createContext, useContext, useEffect, useState} from 'react';
import UserService from '../services/user'
import {instance} from "../services/base";
import Loading from "../components/commons/Loading";

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
            setIsAuthenticated(false);
        }

        if (isAuthenticated) {
            async function loadUser() {
                try {
                    const result = await UserService.get_me(token);
                    if (result) {
                        setUser(result);
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    localStorage.removeItem("access_token");
                    setIsAuthenticated(false);
                } finally {
                    setLoading(false);
                }

            }

            loadUser();
        } else {
            setLoading(false);
        }

    }, [isAuthenticated]);

    const login = async (email, password) => {
        try {
            const response = await instance.post('auth',
                {
                    "email": email,
                    "password": password
                }, {
                    'Content-Type': 'application/json'
                }
            );
            localStorage.setItem('access_token', response.data.access_token);
            setIsAuthenticated(true);
            return response;
        } catch (error) {
            throw error; // Propaga o erro para quem chama a função de login
        }
    };

    const logout = async () => {
        const token = localStorage.getItem('access_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const response = await instance.post('auth/logout', {}, config);
        if (response.status === 200) {
            setUser(null)
            localStorage.removeItem('access_token');
            setIsAuthenticated(false);
        }
    };

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <AuthContext.Provider value={{ isAuthenticated, login, logout, user, loading }}>
                {children}
            </AuthContext.Provider>
        );
    }


};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
    }

    return context;
}