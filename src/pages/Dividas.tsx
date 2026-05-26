import { useState } from "react";
import "../styles/dividas.css";

interface Divida {
    id: number;
    credor: string;
    descricao: string;
    valor: number;
    dataVencimento: string;
    status: "ativa" | "paga";
}

function Dividas() {
    const [dividas, setDividas] = useState<Divida[]>([
        { id: 1, credor: "Banco ABC", descricao: "Empréstimo pessoal", valor: 5000, dataVencimento: "2024-08-15", status: "ativa" },
        { id: 2, credor: "Cartão XYZ", descricao: "Compras diversos", valor: 890, dataVencimento: "2024-06-05", status: "ativa" },
        { id: 3, credor: "Loja Eletrônicos", descricao: "TV 50\"", valor: 2500, dataVencimento: "2024-07-20", status: "ativa" },
        { id: 4, credor: "Banco DEF", descricao: "Financiamento", valor: 350, dataVencimento: "2024-05-10", status: "paga" },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [credor, setCredor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [dataVencimento, setDataVencimento] = useState("");

    const dividasAtivas = dividas.filter(d => d.status === "ativa");
    const totalDividasAtivas = dividasAtivas.reduce((acc, d) => acc + d.valor, 0);

    function adicionarDivida(e: React.FormEvent) {
        e.preventDefault();
        if (credor && descricao && valor && dataVencimento) {
            const novaDivida: Divida = {
                id: Math.max(...dividas.map(d => d.id), 0) + 1,
                credor,
                descricao,
                valor: parseFloat(valor),
                dataVencimento,
                status: "ativa",
            };
            setDividas([...dividas, novaDivida]);
            setCredor("");
            setDescricao("");
            setValor("");
            setDataVencimento("");
            setShowForm(false);
        }
    }

    function marcarComoPaga(id: number) {
        setDividas(dividas.map(d => d.id === id ? { ...d, status: "paga" } : d));
    }

    function deletarDivida(id: number) {
        setDividas(dividas.filter(d => d.id !== id));
    }

    return (
        <div className="dividas-container">
            <div className="dividas-header">
                <h1>Dívidas</h1>
                <button
                    className="btn-adicionar"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Cancelar" : "+ Adicionar Dívida"}
                </button>
            </div>

            {showForm && (
                <form className="divida-form" onSubmit={adicionarDivida}>
                    <input
                        type="text"
                        placeholder="Credor"
                        value={credor}
                        onChange={(e) => setCredor(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        step="0.01"
                        required
                    />
                    <input
                        type="date"
                        value={dataVencimento}
                        onChange={(e) => setDataVencimento(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn-salvar">Salvar</button>
                </form>
            )}

            <div className="divida-resumo">
                <h3>Dívidas Ativas: R$ {totalDividasAtivas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
            </div>

            <div className="dividas-secao">
                <h2>Dívidas Ativas ({dividasAtivas.length})</h2>
                <div className="dividas-lista">
                    {dividasAtivas.length === 0 ? (
                        <p className="sem-dividas">Nenhuma dívida ativa</p>
                    ) : (
                        dividasAtivas.map(divida => {
                            const dataVenc = new Date(divida.dataVencimento);
                            const hoje = new Date();
                            const atrasada = dataVenc < hoje;

                            return (
                                <div key={divida.id} className={`divida-item ${atrasada ? "atrasada" : ""}`}>
                                    <div className="divida-info">
                                        <h4>{divida.credor}</h4>
                                        <p className="descricao">{divida.descricao}</p>
                                        <span className={`vencimento ${atrasada ? "atrasada" : ""}`}>
                                            Vencimento: {dataVenc.toLocaleDateString('pt-BR')}
                                            {atrasada && " ⚠️ ATRASADA"}
                                        </span>
                                    </div>
                                    <div className="divida-valor">
                                        <p className="valor">R$ {divida.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                        <div className="divida-acoes">
                                            <button
                                                className="btn-pagar"
                                                onClick={() => marcarComoPaga(divida.id)}
                                                title="Marcar como paga"
                                            >
                                                ✓
                                            </button>
                                            <button
                                                className="btn-deletar"
                                                onClick={() => deletarDivida(divida.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            <div className="dividas-secao">
                <h2>Dívidas Pagas</h2>
                <div className="dividas-lista">
                    {dividas.filter(d => d.status === "paga").length === 0 ? (
                        <p className="sem-dividas">Nenhuma dívida paga ainda</p>
                    ) : (
                        dividas.filter(d => d.status === "paga").map(divida => (
                            <div key={divida.id} className="divida-item paga">
                                <div className="divida-info">
                                    <h4>{divida.credor}</h4>
                                    <p className="descricao">{divida.descricao}</p>
                                    <span className="vencimento">Pago em: {new Date(divida.dataVencimento).toLocaleDateString('pt-BR')}</span>
                                </div>
                                <div className="divida-valor">
                                    <p className="valor">R$ {divida.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                    <button
                                        className="btn-deletar"
                                        onClick={() => deletarDivida(divida.id)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dividas;