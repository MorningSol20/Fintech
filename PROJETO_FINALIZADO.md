# 📊 Projeto Fintech - Documentação Completa

## ✅ O QUE FOI FEITO

### **Frontend (React + TypeScript + Vite)**
- ✅ 6 páginas completas: Home, Login, Cadastrar, Receitas, Despesas, Dividas, Investimentos, Erro
- ✅ Componentização profissional com React Hooks
- ✅ Sistema de navegação SPA com React Router v7
- ✅ Design responsivo e moderno com CSS Grid/Flexbox
- ✅ Sistema de cores e temas centralizado
- ✅ Navbar com navegação entre páginas
- ✅ Animações suaves e transições
- ✅ Dados de exemplo em cada página
- ✅ Integração preparada com Backend via API Service

### **Backend (Java 21 + Spring Boot 3.3 + Maven)**
- ✅ 5 Entidades Principais:
  - `Usuario` - Usuários da plataforma
  - `Receita` - Entrada de valores
  - `Despesa` - Saída de valores
  - `Divida` - Rastreamento de dívidas
  - `Investimento` - Carteira de investimentos

- ✅ 5 Repositories JPA completos
- ✅ 5 Services com lógica de negócio
- ✅ 5 RestControllers com endpoints CRUD
- ✅ 5 DTOs para comunicação
- ✅ Conexão configurada para Oracle FIAP
- ✅ Script SQL completo para criar tabelas
- ✅ Validações e tratamento de erros
- ✅ CORS configurado para frontend
- ✅ Códigos HTTP corretos (200, 201, 204, 404, etc)

---

## 📁 ESTRUTURA DO PROJETO

```
Fintech/
├── src/                          # Frontend (React)
│   ├── pages/                   # 8 páginas React
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Cadastrar.tsx
│   │   ├── Receitas.tsx
│   │   ├── Despesas.tsx
│   │   ├── Dividas.tsx
│   │   ├── Investimentos.tsx
│   │   └── Erro.tsx
│   ├── components/
│   │   └── Navbar.tsx           # Navegação
│   ├── services/
│   │   └── api.ts              # Serviço HTTP
│   ├── styles/                  # 13 arquivos CSS
│   ├── routes/
│   │   └── AppRoutes.tsx
│   ├── App.tsx
│   └── main.tsx
├── backend/                      # Backend (Java)
│   ├── src/main/java/com/fintech/
│   │   ├── model/              # 5 Entidades
│   │   ├── repository/         # 5 Repositories
│   │   ├── service/            # 5 Services
│   │   ├── controller/         # 5 RestControllers
│   │   ├── dto/                # 5 DTOs
│   │   └── FintechBackendApplication.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── schema.sql
│   ├── pom.xml
│   └── README.md
├── package.json                 # Frontend dependencies
└── pom.xml                      # Backend dependencies
```

---

## 🚀 COMO RODAR O PROJETO

### **1. Configurar Banco de Dados Oracle**

```sql
-- Conecte ao Oracle FIAP e execute:
@backend/src/main/resources/schema.sql

-- Ou execute os comandos manualmente (veja arquivo schema.sql)
```

### **2. Configurar Backend**

```bash
# Abra: backend/src/main/resources/application.properties

# Altere as credenciais:
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
```

### **3. Rodar Backend**

```bash
cd backend

# Instalar dependências e build
mvn clean install

# Rodar a aplicação
mvn spring-boot:run

# Backend estará em: http://localhost:8080/api
```

### **4. Rodar Frontend**

```bash
# Outro terminal

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Frontend estará em: http://localhost:5173
```

---

## 📡 ENDPOINTS DA API

### **Usuarios** (`/api/usuarios`)
```
POST   /usuarios              # Criar
GET    /usuarios              # Listar todos
GET    /usuarios/{id}         # Obter um
PUT    /usuarios/{id}         # Atualizar
DELETE /usuarios/{id}         # Deletar
```

### **Receitas** (`/api/receitas`)
```
POST   /receitas                    # Criar
GET    /receitas/{id}              # Obter um
GET    /receitas/usuario/{usuarioId} # Listar por usuário
PUT    /receitas/{id}              # Atualizar
DELETE /receitas/{id}              # Deletar
```

### **Despesas** (`/api/despesas`)
```
POST   /despesas                    # Criar
GET    /despesas/{id}              # Obter um
GET    /despesas/usuario/{usuarioId} # Listar por usuário
PUT    /despesas/{id}              # Atualizar
DELETE /despesas/{id}              # Deletar
```

### **Dividas** (`/api/dividas`)
```
POST    /dividas                     # Criar
GET     /dividas/{id}               # Obter um
GET     /dividas/usuario/{usuarioId} # Listar por usuário
PUT     /dividas/{id}               # Atualizar
PATCH   /dividas/{id}/pagar         # Marcar como paga
DELETE  /dividas/{id}               # Deletar
```

### **Investimentos** (`/api/investimentos`)
```
POST   /investimentos                    # Criar
GET    /investimentos/{id}              # Obter um
GET    /investimentos/usuario/{usuarioId} # Listar por usuário
PUT    /investimentos/{id}              # Atualizar
DELETE /investimentos/{id}              # Deletar
```

---

## 🧪 TESTAR COM CURL

```bash
# Criar usuário
curl -X POST http://localhost:8080/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome":"João Silva",
    "email":"joao@email.com",
    "senha":"123456"
  }'

# Listar usuários
curl http://localhost:8080/api/usuarios

# Criar receita
curl -X POST http://localhost:8080/api/receitas \
  -H "Content-Type: application/json" \
  -d '{
    "usuarioId":1,
    "descricao":"Salário mensal",
    "fonte":"Trabalho",
    "valor":3000.00,
    "data":"2024-05-26"
  }'

# Listar receitas do usuário
curl http://localhost:8080/api/receitas/usuario/1
```

---

## 🛠 TECNOLOGIAS UTILIZADAS

### **Frontend**
- React 19.2.6
- TypeScript 6.0.2
- Vite 8.0.12
- React Router DOM 7.15.1
- Axios 1.16.1
- CSS Grid/Flexbox

### **Backend**
- Java 21 LTS
- Spring Boot 3.3.0
- Spring Data JPA
- Spring Web
- Hibernate
- Oracle JDBC Driver 23.3.0
- Lombok
- Maven 3.9+

---

## 📋 REQUISITOS ATENDIDOS

### **Backend**
✅ 1. Criar classes de modelos (Entidades) - 5 entidades
✅ 2. Implementar Repository com JPA - 5 repositories
✅ 3. Camada de service com regras de negócio - 5 services
✅ 4. Endpoints REST com GET, POST, PUT, DELETE
✅ 5. Códigos de status HTTP corretos (201, 200, 204)
✅ 6. Tabelas criadas via script SQL
✅ 7. Conexão com Oracle FIAP (oracle.fiap.com.br:1521)
✅ 8. Mínimo 3 entidades (5 implementadas)

### **Frontend**
✅ 1. Componentização profissional
✅ 2. Rotas de navegação SPA
✅ 3. Props e Hooks (useState)
✅ 4. Página de autenticação (Login)
✅ 5. Página inicial (Home) e erro (404)
✅ 6. Páginas para cada controller (5 entidades)
✅ 7. Preparado para consumir APIs REST

---

## ⚙️ CONFIGURAÇÕES IMPORTANTES

### **CORS no Backend**
```java
@CrossOrigin(origins = "http://localhost:5173")
```
Permite requisições do frontend sem erro CORS

### **DDL Auto no Backend**
```properties
spring.jpa.hibernate.ddl-auto=update
```
Cria/atualiza tabelas automaticamente

### **API Service no Frontend**
```typescript
const API_URL = 'http://localhost:8080/api';
```
URL base de todas as requisições

---

## 🔍 PRÓXIMOS PASSOS

1. ✅ Implementar autenticação com JWT
2. ✅ Adicionar filtros avançados nas buscas
3. ✅ Implementar paginação
4. ✅ Adicionar gráficos de desempenho
5. ✅ Testes unitários e integração
6. ✅ Deploy em produção

---

## 📞 SUPORTE

- Backend: `http://localhost:8080/api`
- Frontend: `http://localhost:5173`
- Logs: Terminal do Maven (backend) e console (frontend)

---

**Projeto finalizado com sucesso!** ✨
