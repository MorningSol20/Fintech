import { useLocation } from "react-router-dom";
import "../styles/home.css";

interface CardProps {
    titulo: string;
    valor: number;
    icone: string;
    cor: string;
}

function CardResumo({ titulo, valor, icone, cor }: CardProps) {
    return (
        <div className={`card-resumo ${cor}`}>
            <div className="card-header">
                <span className="card-icone">{icone}</span>
                <h3>{titulo}</h3>
            </div>
            <p className="card-valor">R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
    );
}

function Home() {
    const location = useLocation();
    const nome = location.state?.nome || "Usuário";

    const saldoTotal = 5430.50;
    const despesasMes = 1250.00;
    const receitasMes = 3200.00;
    const dividasTotais = 890.00;
    const investimentos = 12500.00;

    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Bem-vindo, {nome}!</h1>
                <p>Acompanhe seu desempenho financeiro</p>
            </div>

            <div className="cards-grid">
                <CardResumo
                    titulo="Saldo Total"
                    valor={saldoTotal}
                    icone="💰"
                    cor="green"
                />
                <CardResumo
                    titulo="Receitas (Mês)"
                    valor={receitasMes}
                    icone="📈"
                    cor="blue"
                />
                <CardResumo
                    titulo="Despesas (Mês)"
                    valor={despesasMes}
                    icone="📉"
                    cor="red"
                />
                <CardResumo
                    titulo="Dívidas"
                    valor={dividasTotais}
                    icone="💳"
                    cor="orange"
                />
                <CardResumo
                    titulo="Investimentos"
                    valor={investimentos}
                    icone="📊"
                    cor="purple"
                />
            </div>

            <div className="resumo-detalhado">
                <div className="resumo-card">
                    <h3>Fluxo do Mês</h3>
                    <div className="fluxo-item">
                        <span>Receitas:</span>
                        <span className="valor-positivo">+R$ {receitasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="fluxo-item">
                        <span>Despesas:</span>
                        <span className="valor-negativo">-R$ {despesasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="fluxo-item total">
                        <span>Resultado:</span>
                        <span className="valor-positivo">+R$ {(receitasMes - despesasMes).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>

                <div className="resumo-card">
                    <h3>Próximas Despesas</h3>
                    <div className="despesa-item">
                        <div className="despesa-info">
                            <span className="despesa-nome">Aluguel</span>
                            <span className="despesa-data">05 de junho</span>
                        </div>
                        <span className="despesa-valor">R$ 1.200,00</span>
                    </div>
                    <div className="despesa-item">
                        <div className="despesa-info">
                            <span className="despesa-nome">Internet</span>
                            <span className="despesa-data">10 de junho</span>
                        </div>
                        <span className="despesa-valor">R$ 89,90</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;