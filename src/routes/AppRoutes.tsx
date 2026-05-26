import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Gastos from "../pages/Gastos";
import Receitas from "../pages/Receitas";
import Usuarios from "../pages/Usuarios";
import Erro from "../pages/Erro";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/gastos" element={<Gastos />} />
                <Route path="/receitas" element={<Receitas />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="*" element={<Erro />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
