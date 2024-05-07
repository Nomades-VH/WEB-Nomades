import React, {useEffect, useState} from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
const PrivateRoute = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, []);

    const {isAuthenticated} = useAuth();

    if (isClient) {
        if (!isAuthenticated) return <Navigate to="/login" />;
        return <Outlet />;
    }
};

export default PrivateRoute;