import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/login.css";
import "../styles/input.css";
import "../styles/button.css";
import api from "../services/api";

function Cadastrar() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    async function cadastrar(e: React.FormEvent) {
        e.preventDefault();
        setErro("");
        try {
            await api.criarUsuario({ nome, email, senha });
            navigate("/");
        } catch {
            setErro("Erro ao cadastrar. Verifique os dados e tente novamente.");
        }
    }

    return (
        <div className="login-container">
            <div className="login-title-container">
                <img src={logo} alt="Letra-F" className="login-logo" />
                <h1 className="login-title">inasi</h1>
            </div>
            <form className="login-form" onSubmit={cadastrar}>
                <h2 className="login-subtitle">Cadastrar</h2>
                {erro && <p style={{ color: "red" }}>{erro}</p>}
                <input type="text" placeholder="Usuario" value={nome}
                    onChange={(e) => setNome(e.target.value)} className="input" />
                <input type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} className="input" />
                <input type="password" placeholder="Senha" value={senha}
                    onChange={(e) => setSenha(e.target.value)} className="input" />
                <button className="button-danger" type="submit">Cadastrar</button>
            </form>
            <p className="redirecionar">
                Já tem uma conta?{" "}
                <Link className="login-link" to="/">Login</Link>
            </p>
        </div>
    );
}
export default Cadastrar;