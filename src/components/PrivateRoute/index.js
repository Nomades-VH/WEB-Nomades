import React, {useEffect, useState} from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
const PrivateRoute = () => {
    const [isClient, setIsClient] = useState(false);
    const [token, setToken] = useState(null)
    const {user} = useAuth();

    useEffect(() => {
        setIsClient(true)
        setToken(localStorage.getItem('access_token'));
    }, []);

    if (isClient) {
        if (!user || !token) return <Navigate to="/login" />;
        return <Outlet />;
    }
};

export default PrivateRoute;