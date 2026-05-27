import { useEffect, useState } from "react";
import "../styles/home.css";
import api from "../services/api";

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
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const nome = usuario.nome || "Usuário";
    const usuarioId = usuario.id;

    const [totalReceitas, setTotalReceitas] = useState(0);
    const [totalDespesas, setTotalDespesas] = useState(0);
    const [totalDividas, setTotalDividas] = useState(0);
    const [totalInvestimentos, setTotalInvestimentos] = useState(0);
    const [proximasDespesas, setProximasDespesas] = useState<any[]>([]);

    useEffect(() => {
        if (!usuarioId) return;

        api.listarReceitasPorUsuario(usuarioId).then(res => {
            const total = res.data.reduce((acc: number, r: any) => acc + r.valor, 0);
            setTotalReceitas(total);
        });

        api.listarDespesasPorUsuario(usuarioId).then(res => {
            const total = res.data.reduce((acc: number, d: any) => acc + d.valor, 0);
            setTotalDespesas(total);
            const proximas = res.data.slice(0, 3);
            setProximasDespesas(proximas);
        });

        api.listarDividasPorUsuario(usuarioId).then(res => {
            const ativas = res.data.filter((d: any) => d.status === "ativa");
            const total = ativas.reduce((acc: number, d: any) => acc + d.valor, 0);
            setTotalDividas(total);
        });

        api.listarInvestimentosPorUsuario(usuarioId).then(res => {
            const total = res.data.reduce((acc: number, i: any) => acc + i.valorAtual, 0);
            setTotalInvestimentos(total);
        });
    }, [usuarioId]);

    const saldo = totalReceitas - totalDespesas;

    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Bem-vindo, {nome}!</h1>
                <p>Acompanhe seu desempenho financeiro</p>
            </div>

            <div className="cards-grid">
                <CardResumo titulo="Saldo Total" valor={saldo} icone="💰" cor="green" />
                <CardResumo titulo="Receitas" valor={totalReceitas} icone="📈" cor="blue" />
                <CardResumo titulo="Despesas" valor={totalDespesas} icone="📉" cor="red" />
                <CardResumo titulo="Dívidas Ativas" valor={totalDividas} icone="💳" cor="orange" />
                <CardResumo titulo="Investimentos" valor={totalInvestimentos} icone="📊" cor="purple" />
            </div>

            <div className="resumo-detalhado">
                <div className="resumo-card">
                    <h3>Fluxo Financeiro</h3>
                    <div className="fluxo-item">
                        <span>Receitas:</span>
                        <span className="valor-positivo">+R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="fluxo-item">
                        <span>Despesas:</span>
                        <span className="valor-negativo">-R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="fluxo-item total">
                        <span>Resultado:</span>
                        <span className={saldo >= 0 ? "valor-positivo" : "valor-negativo"}>
                            {saldo >= 0 ? "+" : ""}R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>

                <div className="resumo-card">
                    <h3>Últimas Despesas</h3>
                    {proximasDespesas.length === 0 ? (
                        <p>Nenhuma despesa registrada</p>
                    ) : (
                        proximasDespesas.map((d: any) => (
                            <div key={d.id} className="despesa-item">
                                <div className="despesa-info">
                                    <span className="despesa-nome">{d.nome}</span>
                                    <span className="despesa-data">{d.data}</span>
                                </div>
                                <span className="despesa-valor">R$ {d.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;