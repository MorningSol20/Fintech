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

function AppRoutes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastrar" element={<Cadastrar />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dividas" element={<Dividas />} />
                <Route path="/receitas" element={<Receitas />} />
                <Route path="/investimentos" element={<Investimentos />} />
                <Route path="/despesas" element={<Despesas />} />
                <Route path="*" element={<Erro />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;