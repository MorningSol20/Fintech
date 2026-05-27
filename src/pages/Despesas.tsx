import { useState, useEffect } from "react";
import "../styles/despesas.css";
import api from "../services/api";

interface Despesa {
    id: number;
    nome: string;
    categoria: string;
    valor: number;
    data: string;
}

function Despesas() {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const usuarioId = usuario.id;

    const [despesas, setDespesas] = useState<Despesa[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("Alimentação");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");

    const categorias = ["Alimentação", "Transporte", "Moradia", "Saúde", "Assinatura", "Educação", "Outros"];
    const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);

    useEffect(() => {
        if (usuarioId) {
            api.listarDespesasPorUsuario(usuarioId)
                .then(res => setDespesas(res.data))
                .catch(() => console.error("Erro ao carregar despesas"));
        }
    }, [usuarioId]);

    async function adicionarDespesa(e: React.FormEvent) {
        e.preventDefault();
        if (nome && valor && data) {
            try {
                const [ano, mes, dia] = data.split("-");
                const dataFormatada = `${dia}/${mes}/${ano}`;
                await api.criarDespesa({ nome, categoria, valor: parseFloat(valor), data: dataFormatada, usuarioId });
                const res = await api.listarDespesasPorUsuario(usuarioId);
                setDespesas(res.data);
                setNome("");
                setValor("");
                setData("");
                setShowForm(false);
            } catch {
                console.error("Erro ao adicionar despesa");
            }
        }
    }

    async function deletarDespesa(id: number) {
        try {
            await api.deletarDespesa(id);
            setDespesas(despesas.filter(d => d.id !== id));
        } catch {
            console.error("Erro ao deletar despesa");
        }
    }

    return (
        <div className="despesas-container">
            <div className="despesas-header">
                <h1>Despesas</h1>
                <button className="btn-adicionar" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancelar" : "+ Adicionar Despesa"}
                </button>
            </div>

            {showForm && (
                <form className="despesa-form" onSubmit={adicionarDespesa}>
                    <input type="text" placeholder="Nome da despesa" value={nome}
                        onChange={(e) => setNome(e.target.value)} required />
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <input type="number" placeholder="Valor" value={valor}
                        onChange={(e) => setValor(e.target.value)} step="0.01" required />
                    <input type="date" value={data}
                        onChange={(e) => setData(e.target.value)} required />
                    <button type="submit" className="btn-salvar">Salvar</button>
                </form>
            )}

            <div className="despesa-resumo">
                <h3>Total de Despesas: R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
            </div>

            <div className="despesas-lista">
                {despesas.length === 0 ? (
                    <p className="sem-despesas">Nenhuma despesa registrada</p>
                ) : (
                    despesas.map(despesa => (
                        <div key={despesa.id} className="despesa-item">
                            <div className="despesa-info">
                                <h4>{despesa.nome}</h4>
                                <span className="categoria">{despesa.categoria}</span>
                                <span className="data">{despesa.data.split("/").join("/")}</span>
                            </div>
                            <div className="despesa-valor">
                                <p>R$ {despesa.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                <button className="btn-deletar" onClick={() => deletarDespesa(despesa.id)}>🗑️</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Despesas;