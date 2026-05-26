import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

function Navbar() {
    const location = useLocation();

    const isActiveRoute = (path: string) => {
        return location.pathname === path;
    };

    const isAuthPage = location.pathname === "/" || location.pathname === "/cadastrar";

    if (isAuthPage) {
        return null;
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/home" className="navbar-logo">
                    <img src={logo} alt="Letra-F" className="logo" />
                    <span className="logo-text">inasi</span>
                </Link>

                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link
                            to="/home"
                            className={`navbar-link ${isActiveRoute("/home") ? "active" : ""}`}
                        >
                            📊 Dashboard
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link
                            to="/receitas"
                            className={`navbar-link ${isActiveRoute("/receitas") ? "active" : ""}`}
                        >
                            📈 Receitas
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link
                            to="/despesas"
                            className={`navbar-link ${isActiveRoute("/despesas") ? "active" : ""}`}
                        >
                            📉 Despesas
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link
                            to="/dividas"
                            className={`navbar-link ${isActiveRoute("/dividas") ? "active" : ""}`}
                        >
                            💳 Dívidas
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link
                            to="/investimentos"
                            className={`navbar-link ${isActiveRoute("/investimentos") ? "active" : ""}`}
                        >
                            📊 Investimentos
                        </Link>
                    </li>
                </ul>

                <div className="navbar-profile">
                    <button className="navbar-logout">
                        <Link to="/">Sair</Link>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
