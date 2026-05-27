import React from "react";
import { Navigate } from "react-router-dom";

function RotaProtegida({ children }: { children: React.ReactNode }) {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
        return <Navigate to="/" />;
    }
    return children;
}

export default RotaProtegida;