import { useState, useEffect } from "react";
import "../styles/investimentos.css";
import api from "../services/api";

interface Investimento {
    id: number;
    nome: string;
    tipo: string;
    valorInvestido: number;
    valorAtual: number;
    rentabilidade: number;
}

function Investimentos() {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const usuarioId = usuario.id;

    const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("Ação");
    const [valorInvestido, setValorInvestido] = useState("");
    const [valorAtual, setValorAtual] = useState("");

    const tipos = ["Ação", "Renda Fixa", "Fundo", "ETF", "Ação Int.", "Cripto"];

    const totalInvestido = investimentos.reduce((acc, inv) => acc + inv.valorInvestido, 0);
    const totalAtual = investimentos.reduce((acc, inv) => acc + inv.valorAtual, 0);
    const ganhoTotal = totalAtual - totalInvestido;
    const rentabilidadeTotal = totalInvestido > 0 ? ((ganhoTotal / totalInvestido) * 100).toFixed(2) : "0.00";

    useEffect(() => {
        if (usuarioId) {
            api.listarInvestimentosPorUsuario(usuarioId)
                .then(res => setInvestimentos(res.data))
                .catch(() => console.error("Erro ao carregar investimentos"));
        }
    }, [usuarioId]);

    async function adicionarInvestimento(e: React.FormEvent) {
        e.preventDefault();
        if (nome && valorInvestido && valorAtual) {
            try {
                const valInv = parseFloat(valorInvestido);
                const valAtual = parseFloat(valorAtual);
                const rentabilidade = parseFloat(((valAtual - valInv) / valInv * 100).toFixed(2));
                await api.criarInvestimento({ nome, tipo, valorInvestido: valInv, valorAtual: valAtual, rentabilidade, usuarioId });
                const res = await api.listarInvestimentosPorUsuario(usuarioId);
                setInvestimentos(res.data);
                setNome("");
                setValorInvestido("");
                setValorAtual("");
                setShowForm(false);
            } catch {
                console.error("Erro ao adicionar investimento");
            }
        }
    }

    async function deletarInvestimento(id: number) {
        try {
            await api.deletarInvestimento(id);
            setInvestimentos(investimentos.filter(i => i.id !== id));
        } catch {
            console.error("Erro ao deletar investimento");
        }
    }

    return (
        <div className="investimentos-container">
            <div className="investimentos-header">
                <h1>Investimentos</h1>
                <button className="btn-adicionar" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancelar" : "+ Adicionar Investimento"}
                </button>
            </div>

            {showForm && (
                <form className="investimento-form" onSubmit={adicionarInvestimento}>
                    <input type="text" placeholder="Nome do investimento" value={nome}
                        onChange={(e) => setNome(e.target.value)} required />
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        {tipos.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <input type="number" placeholder="Valor investido" value={valorInvestido}
                        onChange={(e) => setValorInvestido(e.target.value)} step="0.01" required />
                    <input type="number" placeholder="Valor atual" value={valorAtual}
                        onChange={(e) => setValorAtual(e.target.value)} step="0.01" required />
                    <button type="submit" className="btn-salvar">Salvar</button>
                </form>
            )}

            <div className="investimentos-resumo">
                <div className="resumo-card">
                    <h3>Total Investido</h3>
                    <p className="valor">R$ {totalInvestido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="resumo-card">
                    <h3>Valor Atual</h3>
                    <p className="valor">R$ {totalAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="resumo-card">
                    <h3>Ganho Total</h3>
                    <p className={`valor ${ganhoTotal >= 0 ? 'positivo' : 'negativo'}`}>
                        R$ {ganhoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                </div>
                <div className="resumo-card">
                    <h3>Rentabilidade</h3>
                    <p className={`valor ${parseFloat(rentabilidadeTotal) >= 0 ? 'positivo' : 'negativo'}`}>
                        {rentabilidadeTotal}%
                    </p>
                </div>
            </div>

            <div className="investimentos-lista">
                <h2>Seus Investimentos ({investimentos.length})</h2>
                {investimentos.length === 0 ? (
                    <p className="sem-investimentos">Nenhum investimento registrado</p>
                ) : (
                    investimentos.map(inv => {
                        const ganho = inv.valorAtual - inv.valorInvestido;
                        return (
                            <div key={inv.id} className={`investimento-item ${inv.rentabilidade >= 0 ? 'ganho' : 'perda'}`}>
                                <div className="inv-info">
                                    <h4>{inv.nome}</h4>
                                    <span className="tipo">{inv.tipo}</span>
                                </div>
                                <div className="inv-valores">
                                    <div className="valor-item">
                                        <span className="label">Investido:</span>
                                        <span>R$ {inv.valorInvestido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="valor-item">
                                        <span className="label">Atual:</span>
                                        <span>R$ {inv.valorAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                                <div className="inv-ganho">
                                    <div className="ganho-valor">
                                        <span className={ganho >= 0 ? 'positivo' : 'negativo'}>
                                            {ganho >= 0 ? '+' : ''} R$ {ganho.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                    <div className="ganho-pct">
                                        <span className={inv.rentabilidade >= 0 ? 'positivo' : 'negativo'}>
                                            {inv.rentabilidade >= 0 ? '+' : ''}{inv.rentabilidade}%
                                        </span>
                                    </div>
                                    <button className="btn-deletar" onClick={() => deletarInvestimento(inv.id)}>🗑️</button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default Investimentos;