import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cadastrar from "../pages/Cadastrar";
import Login from "../pages/Login";
import Dividas from "../pages/Dividas";
import Receitas from "../pages/Receitas";
import Investimentos from "../pages/Investimentos";
import Despesas from "../pages/Despesas";
import Erro from "../pages/Erro";
import Navbar from "../components/Navbar";
import RotaProtegida from "./RotaProtegida";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastrar" element={<Cadastrar />} />
                <Route path="/home" element={<RotaProtegida><Home /></RotaProtegida>} />
                <Route path="/receitas" element={<RotaProtegida><Receitas /></RotaProtegida>} />
                <Route path="/despesas" element={<RotaProtegida><Despesas /></RotaProtegida>} />
                <Route path="/dividas" element={<RotaProtegida><Dividas /></RotaProtegida>} />
                <Route path="/investimentos" element={<RotaProtegida><Investimentos /></RotaProtegida>} />
                <Route path="*" element={<Erro />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;