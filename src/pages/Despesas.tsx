import { useState } from "react";
import "../styles/despesas.css";

interface Despesa {
    id: number;
    nome: string;
    categoria: string;
    valor: number;
    data: string;
}

function Despesas() {
    const [despesas, setDespesas] = useState<Despesa[]>([
        { id: 1, nome: "Aluguel", categoria: "Moradia", valor: 1200, data: "2024-05-05" },
        { id: 2, nome: "Supermercado", categoria: "Alimentação", valor: 320.50, data: "2024-05-10" },
        { id: 3, nome: "Gasolina", categoria: "Transporte", valor: 180, data: "2024-05-12" },
        { id: 4, nome: "Netflix", categoria: "Assinatura", valor: 29.90, data: "2024-05-15" },
        { id: 5, nome: "Farmácia", categoria: "Saúde", valor: 95.80, data: "2024-05-18" },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("Alimentação");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");

    const totalDespesas = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);

    function adicionarDespesa(e: React.FormEvent) {
        e.preventDefault();
        if (nome && valor && data) {
            const novaDespesa: Despesa = {
                id: Math.max(...despesas.map(d => d.id), 0) + 1,
                nome,
                categoria,
                valor: parseFloat(valor),
                data,
            };
            setDespesas([...despesas, novaDespesa]);
            setNome("");
            setValor("");
            setData("");
            setShowForm(false);
        }
    }

    function deletarDespesa(id: number) {
        setDespesas(despesas.filter(d => d.id !== id));
    }

    const categorias = ["Alimentação", "Transporte", "Moradia", "Saúde", "Assinatura", "Educação", "Outros"];

    return (
        <div className="despesas-container">
            <div className="despesas-header">
                <h1>Despesas</h1>
                <button
                    className="btn-adicionar"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Cancelar" : "+ Adicionar Despesa"}
                </button>
            </div>

            {showForm && (
                <form className="despesa-form" onSubmit={adicionarDespesa}>
                    <input
                        type="text"
                        placeholder="Nome da despesa"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        {categorias.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
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
                                <span className="data">{new Date(despesa.data).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="despesa-valor">
                                <p>R$ {despesa.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                <button
                                    className="btn-deletar"
                                    onClick={() => deletarDespesa(despesa.id)}
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

export default Despesas;