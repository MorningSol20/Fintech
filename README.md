# 💸 Finasi — Projeto Integrador FIAP

> Aplicação Fintech completa desenvolvida com **Java + Spring Boot** (Backend) e **ReactJS + TypeScript** (Frontend), integrada ao banco **Oracle da FIAP**.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Inicialização — Backend](#inicialização--backend)
- [Inicialização — Frontend](#inicialização--frontend)
- [Entidades Implementadas](#entidades-implementadas)
- [Endpoints da API](#endpoints-da-api)
- [Dados de Autenticação para Teste](#dados-de-autenticação-para-teste)
- [Observações Importantes](#observações-importantes)

---

## Sobre o Projeto

O **Finasi** é uma aplicação de gestão financeira pessoal que permite ao usuário cadastrar e acompanhar suas **receitas**, **despesas**, **dívidas** e **investimentos**. O sistema conta com autenticação de usuários, CRUD completo para todas as entidades e um dashboard com os dados reais do banco.

---

## Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3.3
- Spring Data JPA
- Oracle Database (instância FIAP)
- Lombok
- Maven

### Frontend
- ReactJS 18 + TypeScript
- React Router DOM (SPA)
- React Hooks (useState, useEffect)
- Axios (consumo REST)
- Vite

---

## Estrutura do Projeto

```
Fintech/
├── backend/
│   ├── src/main/java/com/fintech/
│   │   ├── model/
│   │   │   ├── Usuario.java
│   │   │   ├── Receita.java
│   │   │   ├── Despesa.java
│   │   │   ├── Divida.java
│   │   │   └── Investimento.java
│   │   ├── repository/
│   │   ├── service/
│   │   ├── controller/
│   │   └── dto/
│   └── pom.xml
│
└── src/
    ├── components/
    │   └── Navbar.tsx
    ├── pages/
    │   ├── Login.tsx
    │   ├── Cadastrar.tsx
    │   ├── Home.tsx
    │   ├── Receitas.tsx
    │   ├── Despesas.tsx
    │   ├── Dividas.tsx
    │   ├── Investimentos.tsx
    │   └── Erro.tsx
    ├── services/
    │   └── api.ts
    └── routes/
```

---

## Pré-requisitos

- Java 17+
- Node.js 18+ e npm
- VSCode com as extensões:
  - **Extension Pack for Java** (Microsoft)
  - **Spring Boot Extension Pack** (VMware)
- Acesso à rede da FIAP (VPN ativa se estiver fora da instituição)

---

## Inicialização — Backend

### 1. Configurar o banco de dados

No arquivo `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL
spring.datasource.username=SEU_RM
spring.datasource.password=SUA_SENHA
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

> ⚠️ Substitua `SEU_RM` e `SUA_SENHA` pelas suas credenciais Oracle da FIAP.

### 2. Iniciar o backend

Abra o VSCode e clique no ícone do **Spring Boot Dashboard** na barra lateral esquerda. Clique em ▶️ ao lado do projeto para iniciá-lo.

O backend estará disponível em: **http://localhost:8080**

---

## Inicialização — Frontend

Na pasta raiz do projeto (`Fintech/`), abra o terminal e execute:

```bash
npm install
npm run dev
```

O frontend estará disponível em: **http://localhost:5173**

> ℹ️ Certifique-se de que o backend já está rodando antes de iniciar o frontend.

---

## Entidades Implementadas

### 1. 👤 Usuário
Representa os usuários da plataforma.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long | Identificador único |
| nome | String | Nome do usuário |
| email | String | E-mail (único) |
| senha | String | Senha de acesso |
| dataCriacao | LocalDateTime | Data de cadastro |

### 2. 💰 Receita
Representa as receitas financeiras do usuário.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long | Identificador único |
| descricao | String | Descrição da receita |
| fonte | String | Fonte da receita |
| valor | Double | Valor da receita |
| data | LocalDate | Data da receita |
| usuarioId | Long | Usuário responsável |

### 3. 💸 Despesa
Representa os gastos do usuário.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long | Identificador único |
| nome | String | Nome da despesa |
| categoria | String | Categoria da despesa |
| valor | Double | Valor da despesa |
| data | LocalDate | Data da despesa |
| usuarioId | Long | Usuário responsável |

### 4. 💳 Dívida
Representa as dívidas do usuário.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long | Identificador único |
| credor | String | Nome do credor |
| descricao | String | Descrição da dívida |
| valor | Double | Valor da dívida |
| dataVencimento | LocalDate | Data de vencimento |
| status | String | `ativa` ou `paga` |
| usuarioId | Long | Usuário responsável |

### 5. 📈 Investimento
Representa os investimentos do usuário.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long | Identificador único |
| nome | String | Nome do investimento |
| tipo | String | Tipo (Ação, Fundo, etc.) |
| valorInvestido | Double | Valor investido |
| valorAtual | Double | Valor atual |
| rentabilidade | Double | Rentabilidade (%) |
| usuarioId | Long | Usuário responsável |

---

## Endpoints da API

### Usuários — `/api/usuarios`

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| GET | `/api/usuarios` | Lista todos os usuários | 200 |
| GET | `/api/usuarios/{id}` | Busca usuário por ID | 200 |
| POST | `/api/usuarios` | Cria novo usuário | 201 |
| POST | `/api/usuarios/login` | Autentica usuário | 200 |
| PUT | `/api/usuarios/{id}` | Atualiza usuário | 200 |
| DELETE | `/api/usuarios/{id}` | Remove usuário | 204 |

### Receitas — `/api/receitas`

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| GET | `/api/receitas/usuario/{id}` | Lista receitas do usuário | 200 |
| POST | `/api/receitas` | Cria nova receita | 201 |
| PUT | `/api/receitas/{id}` | Atualiza receita | 200 |
| DELETE | `/api/receitas/{id}` | Remove receita | 204 |

### Despesas — `/api/despesas`

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| GET | `/api/despesas/usuario/{id}` | Lista despesas do usuário | 200 |
| POST | `/api/despesas` | Cria nova despesa | 201 |
| PUT | `/api/despesas/{id}` | Atualiza despesa | 200 |
| DELETE | `/api/despesas/{id}` | Remove despesa | 204 |

### Dívidas — `/api/dividas`

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| GET | `/api/dividas/usuario/{id}` | Lista dívidas do usuário | 200 |
| POST | `/api/dividas` | Cria nova dívida | 201 |
| PATCH | `/api/dividas/{id}/pagar` | Marca dívida como paga | 200 |
| PUT | `/api/dividas/{id}` | Atualiza dívida | 200 |
| DELETE | `/api/dividas/{id}` | Remove dívida | 204 |

### Investimentos — `/api/investimentos`

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| GET | `/api/investimentos/usuario/{id}` | Lista investimentos do usuário | 200 |
| POST | `/api/investimentos` | Cria novo investimento | 201 |
| PUT | `/api/investimentos/{id}` | Atualiza investimento | 200 |
| DELETE | `/api/investimentos/{id}` | Remove investimento | 204 |

---

## Dados de Autenticação para Teste

```
E-mail:  teste@fiap.com.br
Senha:   123456
```

> ℹ️ O usuário de teste já está cadastrado no banco Oracle com dados de exemplo.

---

## Observações Importantes

- O projeto utiliza obrigatoriamente a instância **Oracle da FIAP**. É necessário estar na rede da FIAP ou com VPN ativa.
- Não foram utilizados frameworks ou bibliotecas além dos apresentados no curso.
- O projeto foi testado de ponta a ponta antes da entrega.
- Todas as 5 entidades possuem as camadas **Model → Repository → Service → Controller** no backend e páginas completas no frontend.

---

## 👥 Integrantes do Grupo

| Nome | RM |
|------|----|
| Nome do Integrante 1 | RM000000 |
| Nome do Integrante 2 | RM000000 |
| Nome do Integrante 3 | RM000000 |
| Nome do Integrante 4 | RM000000 |

---

> Projeto desenvolvido para a disciplina de **Desenvolvimento de Aplicações Java e ReactJS** — FIAP 2025.
