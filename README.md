# 💸 Fintech FIAP — Projeto Integrador

> Projeto completo de uma aplicação Fintech desenvolvida com **Java + Spring Boot** (Backend) e **ReactJS** (Frontend), integrados a uma instância **Oracle** da FIAP.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Configuração e Inicialização — Backend](#configuração-e-inicialização--backend)
- [Configuração e Inicialização — Frontend](#configuração-e-inicialização--frontend)
- [Entidades Implementadas](#entidades-implementadas)
- [Endpoints da API](#endpoints-da-api)
- [Dados de Autenticação para Teste](#dados-de-autenticação-para-teste)
- [Observações Importantes](#observações-importantes)

---

## Sobre o Projeto

Esta aplicação Fintech tem como objetivo gerenciar finanças pessoais, permitindo que usuários cadastrem e acompanhem seus **gastos**, **receitas** e **categorias financeiras**. O sistema oferece autenticação de usuários, CRUD completo para as entidades principais e uma interface web moderna e responsiva.

---

## Tecnologias Utilizadas

### Backend
- Java 17+
- Spring Boot 3.x
- Spring Data JPA
- Oracle Database (instância FIAP)
- Maven

### Frontend
- ReactJS 18.x
- React Router DOM (SPA)
- React Hooks (useState, useEffect)
- Fetch API (consumo REST)

---

## Estrutura do Projeto

```
fintech-fiap/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/br/com/fiap/fintech/
│   │       │   ├── model/
│   │       │   │   ├── Usuario.java
│   │       │   │   ├── Gasto.java
│   │       │   │   └── Categoria.java
│   │       │   ├── repository/
│   │       │   │   ├── UsuarioRepository.java
│   │       │   │   ├── GastoRepository.java
│   │       │   │   └── CategoriaRepository.java
│   │       │   ├── service/
│   │       │   │   ├── UsuarioService.java
│   │       │   │   ├── GastoService.java
│   │       │   │   └── CategoriaService.java
│   │       │   └── controller/
│   │       │       ├── UsuarioController.java
│   │       │       ├── GastoController.java
│   │       │       └── CategoriaController.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── frontend/
    ├── public/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   └── Footer.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── Home.jsx
        │   ├── NotFound.jsx
        │   ├── usuarios/
        │   ├── gastos/
        │   └── categorias/
        ├── App.jsx
        └── main.jsx
```

---

## Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Java 17+](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Maven 3.8+](https://maven.apache.org/download.cgi)
- [Node.js 18+ e npm](https://nodejs.org/)
- Acesso à rede da FIAP (VPN ou rede interna) para conexão com o banco Oracle

---

## Configuração e Inicialização — Backend

### 1. Configurar o banco de dados

No arquivo `backend/src/main/resources/application.properties`, preencha com as credenciais Oracle da FIAP:

```properties
spring.datasource.url=jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL
spring.datasource.username=SEU_USUARIO_ORACLE
spring.datasource.password=SUA_SENHA_ORACLE
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.OracleDialect
```

> ⚠️ Substitua `SEU_USUARIO_ORACLE` e `SUA_SENHA_ORACLE` pelas suas credenciais pessoais da FIAP.

### 2. Compilar e executar o projeto

Abra o terminal na pasta `backend/` e execute:

```bash
# Compilar o projeto
mvn clean install

# Iniciar o servidor
mvn spring-boot:run
```

O backend estará disponível em: **http://localhost:8080**

---

## Configuração e Inicialização — Frontend

### 1. Instalar dependências

Abra o terminal na pasta `frontend/` e execute:

```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O frontend estará disponível em: **http://localhost:5173**

> ℹ️ Certifique-se de que o backend já está rodando antes de iniciar o frontend.

---

## Entidades Implementadas

### 1. 👤 Usuário (`/api/usuarios`)
Representa os usuários cadastrados na plataforma.

| Campo      | Tipo    | Descrição                    |
|------------|---------|------------------------------|
| id         | Long    | Identificador único          |
| nome       | String  | Nome completo do usuário     |
| email      | String  | E-mail (único)               |
| senha      | String  | Senha de acesso              |
| dataCadastro | LocalDate | Data de cadastro          |

---

### 2. 💰 Gasto (`/api/gastos`)
Representa os gastos financeiros registrados pelo usuário.

| Campo      | Tipo       | Descrição                        |
|------------|------------|----------------------------------|
| id         | Long       | Identificador único              |
| descricao  | String     | Descrição do gasto               |
| valor      | BigDecimal | Valor do gasto                   |
| data       | LocalDate  | Data de realização               |
| categoria  | Categoria  | Categoria associada              |
| usuario    | Usuario    | Usuário responsável              |

---

### 3. 🏷️ Categoria (`/api/categorias`)
Representa as categorias para classificação dos gastos.

| Campo     | Tipo   | Descrição                   |
|-----------|--------|-----------------------------|
| id        | Long   | Identificador único         |
| nome      | String | Nome da categoria           |
| descricao | String | Descrição da categoria      |

---

## Endpoints da API

### Usuários — `http://localhost:8080/api/usuarios`

| Método | Endpoint            | Descrição                     | Status |
|--------|---------------------|-------------------------------|--------|
| GET    | `/api/usuarios`     | Lista todos os usuários       | 200    |
| GET    | `/api/usuarios/{id}`| Busca usuário por ID          | 200    |
| POST   | `/api/usuarios`     | Cria novo usuário             | 201    |
| PUT    | `/api/usuarios/{id}`| Atualiza usuário existente    | 200    |
| DELETE | `/api/usuarios/{id}`| Remove usuário                | 204    |

### Gastos — `http://localhost:8080/api/gastos`

| Método | Endpoint          | Descrição                   | Status |
|--------|-------------------|-----------------------------|--------|
| GET    | `/api/gastos`     | Lista todos os gastos       | 200    |
| GET    | `/api/gastos/{id}`| Busca gasto por ID          | 200    |
| POST   | `/api/gastos`     | Registra novo gasto         | 201    |
| PUT    | `/api/gastos/{id}`| Atualiza gasto existente    | 200    |
| DELETE | `/api/gastos/{id}`| Remove gasto                | 204    |

### Categorias — `http://localhost:8080/api/categorias`

| Método | Endpoint              | Descrição                     | Status |
|--------|-----------------------|-------------------------------|--------|
| GET    | `/api/categorias`     | Lista todas as categorias     | 200    |
| GET    | `/api/categorias/{id}`| Busca categoria por ID        | 200    |
| POST   | `/api/categorias`     | Cria nova categoria           | 201    |
| PUT    | `/api/categorias/{id}`| Atualiza categoria existente  | 200    |
| DELETE | `/api/categorias/{id}`| Remove categoria              | 204    |

---

## Dados de Autenticação para Teste

Use as seguintes credenciais para acessar a aplicação no ambiente de testes:

```
Usuário:  admin
Senha:   123456
```

> ℹ️ O usuário de teste já está pré-cadastrado no banco de dados com alguns gastos e categorias de exemplo para facilitar a avaliação.

---

## Observações Importantes

- O projeto utiliza obrigatoriamente a instância **Oracle da FIAP**. Sem acesso à rede FIAP (ou VPN ativa), o backend não conseguirá se conectar ao banco.
- Não foram utilizados frameworks ou bibliotecas além dos apresentados no curso (Spring Boot, JPA, ReactJS e React Router).
- O projeto foi testado de ponta a ponta antes da entrega.
- Todas as 3 entidades possuem as camadas **Model → Repository → Service → Controller** no backend e as respectivas **páginas de listagem, cadastro, edição e remoção** no frontend.

---

## 👥 Integrantes do Grupo

| Nome | RM |
|------|----|
| Morôni Augusto Ribeiro Barra Sol | RM566778 |

---

> Projeto desenvolvido para a disciplina de **Desenvolvimento de Aplicações Java e ReactJS** — FIAP 2025.