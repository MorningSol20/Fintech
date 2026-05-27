import axios from "axios";
import type { AxiosInstance, AxiosError } from "axios";

const API_URL = "http://localhost:8080/api";

type ApiData = Record<string, unknown>;

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
      },
    );
  }

  // USUARIO ENDPOINTS
  async criarUsuario(usuario: ApiData) {
    return this.api.post("/usuarios", usuario);
  }

  async login(email: string, senha: string) {
    return this.api.post("/usuarios/login", { email, senha });
  }

  async obterUsuario(id: number) {
    return this.api.get(`/usuarios/${id}`);
  }

  async listarUsuarios() {
    return this.api.get("/usuarios");
  }

  async atualizarUsuario(id: number, usuario: ApiData) {
    return this.api.put(`/usuarios/${id}`, usuario);
  }

  async deletarUsuario(id: number) {
    return this.api.delete(`/usuarios/${id}`);
  }

  // RECEITA ENDPOINTS
  async criarReceita(receita: ApiData) {
    return this.api.post("/receitas", receita);
  }

  async obterReceita(id: number) {
    return this.api.get(`/receitas/${id}`);
  }

  async listarReceitasPorUsuario(usuarioId: number) {
    return this.api.get(`/receitas/usuario/${usuarioId}`);
  }

  async atualizarReceita(id: number, receita: ApiData) {
    return this.api.put(`/receitas/${id}`, receita);
  }

  async deletarReceita(id: number) {
    return this.api.delete(`/receitas/${id}`);
  }

  // DESPESA ENDPOINTS
  async criarDespesa(despesa: ApiData) {
    return this.api.post("/despesas", despesa);
  }

  async obterDespesa(id: number) {
    return this.api.get(`/despesas/${id}`);
  }

  async listarDespesasPorUsuario(usuarioId: number) {
    return this.api.get(`/despesas/usuario/${usuarioId}`);
  }

  async atualizarDespesa(id: number, despesa: ApiData) {
    return this.api.put(`/despesas/${id}`, despesa);
  }

  async deletarDespesa(id: number) {
    return this.api.delete(`/despesas/${id}`);
  }

  // DIVIDA ENDPOINTS
  async criarDivida(divida: ApiData) {
    return this.api.post("/dividas", divida);
  }

  async obterDivida(id: number) {
    return this.api.get(`/dividas/${id}`);
  }

  async listarDividasPorUsuario(usuarioId: number) {
    return this.api.get(`/dividas/usuario/${usuarioId}`);
  }

  async atualizarDivida(id: number, divida: ApiData) {
    return this.api.put(`/dividas/${id}`, divida);
  }

  async marcarDividaComoPaga(id: number) {
    return this.api.patch(`/dividas/${id}/pagar`);
  }

  async deletarDivida(id: number) {
    return this.api.delete(`/dividas/${id}`);
  }

  // INVESTIMENTO ENDPOINTS
  async criarInvestimento(investimento: ApiData) {
    return this.api.post("/investimentos", investimento);
  }

  async obterInvestimento(id: number) {
    return this.api.get(`/investimentos/${id}`);
  }

  async listarInvestimentosPorUsuario(usuarioId: number) {
    return this.api.get(`/investimentos/usuario/${usuarioId}`);
  }

  async atualizarInvestimento(id: number, investimento: ApiData) {
    return this.api.put(`/investimentos/${id}`, investimento);
  }

  async deletarInvestimento(id: number) {
    return this.api.delete(`/investimentos/${id}`);
  }
}

export default new ApiService();
