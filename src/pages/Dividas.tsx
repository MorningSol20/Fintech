import { useState, useEffect } from "react";
import "../styles/dividas.css";
import api from "../services/api";

interface Divida {
    id: number;
    credor: string;
    descricao: string;
    valor: number;
    dataVencimento: string;
    status: string;
}

function Dividas() {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const usuarioId = usuario.id;

    const [dividas, setDividas] = useState<Divida[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [credor, setCredor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [dataVencimento, setDataVencimento] = useState("");

    const dividasAtivas = dividas.filter(d => d.status === "ativa");
    const dividasPagas = dividas.filter(d => d.status === "paga");
    const totalDividasAtivas = dividasAtivas.reduce((acc, d) => acc + d.valor, 0);

    useEffect(() => {
        if (usuarioId) {
            api.listarDividasPorUsuario(usuarioId)
                .then(res => setDividas(res.data))
                .catch(() => console.error("Erro ao carregar dívidas"));
        }
    }, [usuarioId]);

    async function adicionarDivida(e: React.FormEvent) {
        e.preventDefault();
        if (credor && descricao && valor && dataVencimento) {
            try {
                const [ano, mes, dia] = dataVencimento.split("-");
                const dataFormatada = `${dia}/${mes}/${ano}`;
                await api.criarDivida({ credor, descricao, valor: parseFloat(valor), dataVencimento: dataFormatada, usuarioId });
                const res = await api.listarDividasPorUsuario(usuarioId);
                setDividas(res.data);
                setCredor("");
                setDescricao("");
                setValor("");
                setDataVencimento("");
                setShowForm(false);
            } catch {
                console.error("Erro ao adicionar dívida");
            }
        }
    }

    async function marcarComoPaga(id: number) {
        try {
            await api.marcarDividaComoPaga(id);
            const res = await api.listarDividasPorUsuario(usuarioId);
            setDividas(res.data);
        } catch {
            console.error("Erro ao marcar dívida como paga");
        }
    }

    async function deletarDivida(id: number) {
        try {
            await api.deletarDivida(id);
            setDividas(dividas.filter(d => d.id !== id));
        } catch {
            console.error("Erro ao deletar dívida");
        }
    }

    function isAtrasada(dataVenc: string) {
        const [dia, mes, ano] = dataVenc.split("/");
        return new Date(`${ano}-${mes}-${dia}`) < new Date();
    }

    return (
        <div className="dividas-container">
            <div className="dividas-header">
                <h1>Dívidas</h1>
                <button className="btn-adicionar" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancelar" : "+ Adicionar Dívida"}
                </button>
            </div>

            {showForm && (
                <form className="divida-form" onSubmit={adicionarDivida}>
                    <input type="text" placeholder="Credor" value={credor}
                        onChange={(e) => setCredor(e.target.value)} required />
                    <input type="text" placeholder="Descrição" value={descricao}
                        onChange={(e) => setDescricao(e.target.value)} required />
                    <input type="number" placeholder="Valor" value={valor}
                        onChange={(e) => setValor(e.target.value)} step="0.01" required />
                    <input type="date" value={dataVencimento}
                        onChange={(e) => setDataVencimento(e.target.value)} required />
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
                            const atrasada = isAtrasada(divida.dataVencimento);
                            return (
                                <div key={divida.id} className={`divida-item ${atrasada ? "atrasada" : ""}`}>
                                    <div className="divida-info">
                                        <h4>{divida.credor}</h4>
                                        <p className="descricao">{divida.descricao}</p>
                                        <span className={`vencimento ${atrasada ? "atrasada" : ""}`}>
                                            Vencimento: {divida.dataVencimento}
                                            {atrasada && " ⚠️ ATRASADA"}
                                        </span>
                                    </div>
                                    <div className="divida-valor">
                                        <p className="valor">R$ {divida.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                        <div className="divida-acoes">
                                            <button className="btn-pagar" onClick={() => marcarComoPaga(divida.id)} title="Marcar como paga">✔</button>
                                            <button className="btn-deletar" onClick={() => deletarDivida(divida.id)}>🗑️</button>
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
                    {dividasPagas.length === 0 ? (
                        <p className="sem-dividas">Nenhuma dívida paga ainda</p>
                    ) : (
                        dividasPagas.map(divida => (
                            <div key={divida.id} className="divida-item paga">
                                <div className="divida-info">
                                    <h4>{divida.credor}</h4>
                                    <p className="descricao">{divida.descricao}</p>
                                    <span className="vencimento">Vencimento: {divida.dataVencimento}</span>
                                </div>
                                <div className="divida-valor">
                                    <p className="valor">R$ {divida.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                    <button className="btn-deletar" onClick={() => deletarDivida(divida.id)}>🗑️</button>
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