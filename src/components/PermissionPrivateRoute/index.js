import React, {useEffect, useState} from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
const PrivateRoute = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
    }, []);

    const {user} = useAuth();

    if (isClient) {
        if (user.permission < 3) return <Navigate to="/" />;
        return <Outlet />;
    }
};

export default PrivateRoute;