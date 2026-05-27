import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/login.css";
import "../styles/input.css";
import "../styles/button.css";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    async function entrar(e: React.FormEvent) {
        e.preventDefault();
        setErro("");
        try {
            const res = await api.login(email, senha);
            localStorage.setItem("usuario", JSON.stringify(res.data));
            navigate("/home", { state: { nome: res.data.nome } });
        } catch {
            setErro("Email ou senha incorretos.");
        }
    }

    return (
        <div className="login-container">
            <div className="login-title-container">
                <img src={logo} alt="Letra-F" className="login-logo" />
                <h1 className="login-title">inasi</h1>
            </div>
            <form className="login-form" onSubmit={entrar}>
                <h2 className="login-subtitle">Login</h2>
                {erro && <p style={{ color: "red" }}>{erro}</p>}
                <input type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} className="input" />
                <input type="password" placeholder="Senha" value={senha}
                    onChange={(e) => setSenha(e.target.value)} className="input" />
                <button className="button-danger" type="submit">Entrar</button>
            </form>
            <p className="redirecionar">
                Não tem uma conta?{" "}
                <Link className="login-link" to="/cadastrar">Cadastrar</Link>
            </p>
        </div>
    );
}
export default Login;