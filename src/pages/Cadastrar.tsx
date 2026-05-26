import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/login.css";
import "../styles/input.css";
import "../styles/button.css";



function Cadastrar() {

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function cadastrar(e: React.FormEvent) {
        e.preventDefault();

        console.log(nome, email, senha);

        navigate("/home", { state: { nome, email, senha } });
    }

    return (
        <div className="login-container">
            <div className="login-title-container">
                <img src={logo} alt="Letra-F" className="login-logo" />
                <h1 className="login-title">inasi</h1>                
            </div>


            <form className="login-form" onSubmit={cadastrar}>

                <h2 className="login-subtitle">Cadastrar</h2>

                <input
                    type="text"
                    placeholder="Usuario"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    Cadastrar
                </button>

            </form>
            <p className="redirecionar">
                Já tem uma conta?{" "}
                <Link className="login-link" to="/">Login</Link>
            </p>

        </div>
    );
}

export default Cadastrar;