import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';


function ProtectedRoute() {

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
        return <Navigate to="/" replace />
    }

    return <Outlet />;
}

export default ProtectedRoute
