import React from "react";
import { Navigate } from "react-router-dom";

// Higher-order component to protect routes
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    // If there's no token, redirect to login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
