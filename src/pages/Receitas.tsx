import { useState } from "react";
import "../styles/receitas.css";

interface Receita {
    id: number;
    descricao: string;
    fonte: string;
    valor: number;
    data: string;
}

function Receitas() {
    const [receitas, setReceitas] = useState<Receita[]>([
        { id: 1, descricao: "Salário mensal", fonte: "Trabalho", valor: 3000, data: "2024-05-01" },
        { id: 2, descricao: "Freelance - Projeto Web", fonte: "Freelancer", valor: 500, data: "2024-05-10" },
        { id: 3, descricao: "Venda de itens antigos", fonte: "Venda", valor: 150, data: "2024-05-15" },
        { id: 4, descricao: "Bônus anual", fonte: "Trabalho", valor: 2000, data: "2024-05-20" },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [descricao, setDescricao] = useState("");
    const [fonte, setFonte] = useState("Trabalho");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");

    const totalReceitas = receitas.reduce((acc, receita) => acc + receita.valor, 0);

    function adicionarReceita(e: React.FormEvent) {
        e.preventDefault();
        if (descricao && valor && data) {
            const novaReceita: Receita = {
                id: Math.max(...receitas.map(r => r.id), 0) + 1,
                descricao,
                fonte,
                valor: parseFloat(valor),
                data,
            };
            setReceitas([...receitas, novaReceita]);
            setDescricao("");
            setValor("");
            setData("");
            setShowForm(false);
        }
    }

    function deletarReceita(id: number) {
        setReceitas(receitas.filter(r => r.id !== id));
    }

    const fontes = ["Trabalho", "Freelancer", "Investimento", "Venda", "Bônus", "Outros"];

    return (
        <div className="receitas-container">
            <div className="receitas-header">
                <h1>Receitas</h1>
                <button
                    className="btn-adicionar"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Cancelar" : "+ Adicionar Receita"}
                </button>
            </div>

            {showForm && (
                <form className="receita-form" onSubmit={adicionarReceita}>
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                    <select
                        value={fonte}
                        onChange={(e) => setFonte(e.target.value)}
                    >
                        {fontes.map(f => (
                            <option key={f} value={f}>{f}</option>
                        ))}
                    </select>
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
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
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
                                <span className="data">{new Date(receita.data).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="receita-valor">
                                <p className="valor-positivo">R$ {receita.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                <button
                                    className="btn-deletar"
                                    onClick={() => deletarReceita(receita.id)}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Receitas;