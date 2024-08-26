import React, {createContext, useContext, useEffect, useState} from 'react';
import UserService from '../services/user'
import {instance} from "../services/base";
import Loading from "../components/commons/Loading";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
            setUser(result);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect( () => {
        const token = localStorage.getItem('access_token');
        console.log('EAI')

        if (token) {
            loadUser();
        } else {
            setLoading(false)
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
            if (response.status === 200) {
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