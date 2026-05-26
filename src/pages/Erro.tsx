import { useNavigate } from "react-router-dom";
import "../styles/erro.css";

function Erro() {
    const navigate = useNavigate();

    return (
        <div className="erro-container">
            <div className="erro-content">
                <h1 className="erro-codigo">404</h1>
                <h2 className="erro-titulo">Página não encontrada</h2>
                <p className="erro-mensagem">
                    Desculpe, parece que você tentou acessar uma página que não existe.
                </p>
                <div className="erro-ilustracao">
                    💔
                </div>
                <button
                    className="btn-voltar"
                    onClick={() => navigate("/home")}
                >
                    Voltar ao Dashboard
                </button>
            </div>
        </div>
    );
}

export default Erro;