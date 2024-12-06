import React, {createContext, useContext, useEffect, useState} from 'react';
import UserService from '../services/user'
import {instance} from "../services/base";
import { useLoading } from './LoadingContext';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const {setIsLoading} = useLoading(true);

    async function loadUser() {
        try {
            const result = await UserService.get_me();
            if (result) {
                setUser(result);
                setIsAuthenticated(true);
            } else {
                setUser(null)
                setIsAuthenticated(false);
            }
        } catch (error) {
            localStorage.removeItem("access_token");
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect( () => {
        const token = localStorage.getItem('access_token');

        if (token) {
            loadUser();
        } else {
            setIsLoading(false)
        }

    }, [isAuthenticated]);

    const login = async (login, password, isEmail) => {
        try {
            const response = await instance.post('auth',
                isEmail ? {
                    "email": login,
                    "password": password
                } : {
                    "username": login,
                    "password": password
                }
            );
            if (response.status === 201) {
                localStorage.setItem('access_token', response.data.access_token);
                await loadUser()
                setIsAuthenticated(true);
            }
            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        const response = await instance.post('auth/logout', {});
        if (response.status === 200) {
            setUser(null)
            localStorage.removeItem('access_token');
            setIsAuthenticated(false);
        }
    }; 

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
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