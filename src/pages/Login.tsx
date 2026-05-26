import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/login.css";
import "../styles/input.css";
import "../styles/button.css";


function Login() {

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    function entrar(e: React.FormEvent) {
        e.preventDefault();

        console.log(nome, senha);

        navigate("/home", { state: { nome } });
    }

    return (
        <div className="login-container">
            <div className="login-title-container">
                <img src={logo} alt="Letra-F" className="logo" />
                <h1 className="login-title">inasi</h1>                
            </div>


            <form className="login-form" onSubmit={entrar}>

                <h2 className="login-subtitle">Login</h2>

                <input
                    type="text"
                    placeholder="Usuario"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="input"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="input"
                />

                <button className="button-danger" type="submit">
                    Entrar
                </button>

            </form>
            <p className="redirecionar">
                    Não tem uma conta?{" "}
                <Link className="login-link" to="/cadastrar">Cadastrar</Link>
            </p>

        </div>
    );
}

export default Login;