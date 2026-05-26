import { useState } from "react";
import "../styles/investimentos.css";

interface Investimento {
    id: number;
    nome: string;
    tipo: string;
    valorInvestido: number;
    valorAtual: number;
    rentabilidade: number;
}

function Investimentos() {
    const [investimentos, setInvestimentos] = useState<Investimento[]>([
        { id: 1, nome: "ITUB4", tipo: "Ação", valorInvestido: 2000, valorAtual: 2340, rentabilidade: 17 },
        { id: 2, nome: "Tesouro IPCA+", tipo: "Renda Fixa", valorInvestido: 5000, valorAtual: 5250, rentabilidade: 5 },
        { id: 3, nome: "Fundos Imobiliários", tipo: "Fundo", valorInvestido: 3000, valorAtual: 3150, rentabilidade: 5 },
        { id: 4, nome: "BDR Apple", tipo: "Ação Int.", valorInvestido: 1500, valorAtual: 1890, rentabilidade: 26 },
        { id: 5, nome: "ETF B3", tipo: "ETF", valorInvestido: 2500, valorAtual: 2870, rentabilidade: 14.8 },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("Ação");
    const [valorInvestido, setValorInvestido] = useState("");
    const [valorAtual, setValorAtual] = useState("");

    const totalInvestido = investimentos.reduce((acc, inv) => acc + inv.valorInvestido, 0);
    const totalAtual = investimentos.reduce((acc, inv) => acc + inv.valorAtual, 0);
    const ganhoTotal = totalAtual - totalInvestido;
    const rentabilidadeTotal = ((ganhoTotal / totalInvestido) * 100).toFixed(2);

    function adicionarInvestimento(e: React.FormEvent) {
        e.preventDefault();
        if (nome && valorInvestido && valorAtual) {
            const valInv = parseFloat(valorInvestido);
            const valAtual = parseFloat(valorAtual);
            const rentabilidade = ((valAtual - valInv) / valInv) * 100;

            const novoInvestimento: Investimento = {
                id: Math.max(...investimentos.map(i => i.id), 0) + 1,
                nome,
                tipo,
                valorInvestido: valInv,
                valorAtual: valAtual,
                rentabilidade: parseFloat(rentabilidade.toFixed(2)),
            };
            setInvestimentos([...investimentos, novoInvestimento]);
            setNome("");
            setValorInvestido("");
            setValorAtual("");
            setShowForm(false);
        }
    }

    function deletarInvestimento(id: number) {
        setInvestimentos(investimentos.filter(i => i.id !== id));
    }

    const tipos = ["Ação", "Renda Fixa", "Fundo", "ETF", "Ação Int.", "Cripto"];

    return (
        <div className="investimentos-container">
            <div className="investimentos-header">
                <h1>Investimentos</h1>
                <button
                    className="btn-adicionar"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Cancelar" : "+ Adicionar Investimento"}
                </button>
            </div>

            {showForm && (
                <form className="investimento-form" onSubmit={adicionarInvestimento}>
                    <input
                        type="text"
                        placeholder="Nome do investimento"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        {tipos.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Valor investido"
                        value={valorInvestido}
                        onChange={(e) => setValorInvestido(e.target.value)}
                        step="0.01"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Valor atual"
                        value={valorAtual}
                        onChange={(e) => setValorAtual(e.target.value)}
                        step="0.01"
                        required
                    />
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
                                    <button
                                        className="btn-deletar"
                                        onClick={() => deletarInvestimento(inv.id)}
                                    >
                                        🗑️
                                    </button>
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