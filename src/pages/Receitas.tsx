import { useState, useEffect } from "react";
import "../styles/receitas.css";
import api from "../services/api";

interface Receita {
    id: number;
    descricao: string;
    fonte: string;
    valor: number;
    data: string;
}

function Receitas() {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const usuarioId = usuario.id;

    const [receitas, setReceitas] = useState<Receita[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [descricao, setDescricao] = useState("");
    const [fonte, setFonte] = useState("Trabalho");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");

    const fontes = ["Trabalho", "Freelancer", "Investimento", "Venda", "Bônus", "Outros"];
    const totalReceitas = receitas.reduce((acc, r) => acc + r.valor, 0);

    useEffect(() => {
        if (usuarioId) {
            api.listarReceitasPorUsuario(usuarioId)
                .then(res => setReceitas(res.data))
                .catch(() => console.error("Erro ao carregar receitas"));
        }
    }, [usuarioId]);

    async function adicionarReceita(e: React.FormEvent) {
        e.preventDefault();
        if (descricao && valor && data) {
            try {
                const [ano, mes, dia] = data.split("-");
                const dataFormatada = `${dia}/${mes}/${ano}`;
                await api.criarReceita({ descricao, fonte, valor: parseFloat(valor), data: dataFormatada, usuarioId });
                const res = await api.listarReceitasPorUsuario(usuarioId);
                setReceitas(res.data);
                setDescricao("");
                setValor("");
                setData("");
                setShowForm(false);
            } catch {
                console.error("Erro ao adicionar receita");
            }
        }
    }

    async function deletarReceita(id: number) {
        try {
            await api.deletarReceita(id);
            setReceitas(receitas.filter(r => r.id !== id));
        } catch {
            console.error("Erro ao deletar receita");
        }
    }

    return (
        <div className="receitas-container">
            <div className="receitas-header">
                <h1>Receitas</h1>
                <button className="btn-adicionar" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancelar" : "+ Adicionar Receita"}
                </button>
            </div>

            {showForm && (
                <form className="receita-form" onSubmit={adicionarReceita}>
                    <input type="text" placeholder="Descrição" value={descricao}
                        onChange={(e) => setDescricao(e.target.value)} required />
                    <select value={fonte} onChange={(e) => setFonte(e.target.value)}>
                        {fontes.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <input type="number" placeholder="Valor" value={valor}
                        onChange={(e) => setValor(e.target.value)} step="0.01" required />
                    <input type="date" value={data}
                        onChange={(e) => setData(e.target.value)} required />
                    <button type="submit" className="btn-salvar">Salvar</button>
                </form>
            )}

            <div className="receita-resumo">
                <h3>Total de Receitas: R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
            </div>

            <div className="receitas-lista">
                {receitas.length === 0 ? (
                    <p className="sem-receitas">Nenhuma receita registrada</p>
                ) : (
                    receitas.map(receita => (
                        <div key={receita.id} className="receita-item">
                            <div className="receita-info">
                                <h4>{receita.descricao}</h4>
                                <span className="fonte">{receita.fonte}</span>
                                <span className="data">{receita.data.split("/").join("/")}</span>
                            </div>
                            <div className="receita-valor">
                                <p className="valor-positivo">R$ {receita.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                <button className="btn-deletar" onClick={() => deletarReceita(receita.id)}>🗑️</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Receitas;