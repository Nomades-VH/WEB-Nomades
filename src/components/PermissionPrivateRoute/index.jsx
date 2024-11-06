import React, {useEffect, useState} from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
const PrivateRoute = () => {
    const [isClient, setIsClient] = useState(false);
    const [token, setToken] = useState(null)

    useEffect(() => {
        setIsClient(true)
        setToken(localStorage.getItem("access_token"))
    }, []);

    const {user} = useAuth();
    if (isClient) if (!token || user?.permission <= 3) return <Navigate to="/" />;

    return <Outlet />;
};

export default PrivateRoute;