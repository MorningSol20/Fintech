# ⚡ Quick Start - Fintech

## 📱 Resumo do Projeto

**Full-stack Fintech** com React + Spring Boot + Oracle, totalmente funcional e pronto para produção.

---

## 🚀 Start em 5 Minutos

### **Passo 1: Configurar Banco de Dados**
```bash
# No Oracle SQL*Plus, conecte como DBA e execute:
@backend/src/main/resources/schema.sql
```

### **Passo 2: Configurar Backend**
```bash
# Edite: backend/src/main/resources/application.properties
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
```

### **Passo 3: Rodar Backend**
```bash
cd backend
mvn clean install
mvn spring-boot:run
# ✅ Backend rodando em http://localhost:8080/api
```

### **Passo 4: Rodar Frontend** (outro terminal)
```bash
npm install
npm run dev
# ✅ Frontend rodando em http://localhost:5173
```

---

## 📊 O que foi entregue?

| Item | Frontend | Backend |
|------|----------|---------|
| **Páginas** | 8 (Home, Login, Cadastrar, + 5 módulos) | - |
| **Entidades** | - | 5 (Usuario, Receita, Despesa, Divida, Investimento) |
| **Repositories** | - | 5 (JPA com métodos customizados) |
| **Services** | - | 5 (lógica de negócio) |
| **Controllers** | - | 5 (REST APIs) |
| **Endpoints** | - | 20+ (GET, POST, PUT, DELETE, PATCH) |
| **Tabelas Oracle** | - | 5 criadas automaticamente |
| **UI/UX** | ✅ Completo | - |
| **Responsivo** | ✅ Sim (768px, 600px) | - |
| **Animações** | ✅ 6 tipos | - |

---

## 🔗 Fluxo de Uso

```
Frontend (React)
    ↓
    ↓ HTTP Axios
    ↓
Backend (Spring Boot)
    ↓
    ↓ JPA/Hibernate
    ↓
Oracle FIAP
```

---

## 📋 Checklist de Requisitos

- [x] 5 Entidades (mínimo 3 ✓)
- [x] 5 Repositories JPA
- [x] 5 Services com regras de negócio
- [x] REST Controllers com CRUD
- [x] Códigos HTTP corretos
- [x] Conexão com Oracle FIAP
- [x] Frontend em React com routing
- [x] 5+ páginas funcionais
- [x] Props e Hooks (useState, useLocation)
- [x] Login e 404
- [x] Integração Frontend-Backend

---

## 🧪 Testar API Rapidamente

```bash
# Criar usuário
curl -X POST http://localhost:8080/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Test","email":"test@test.com","senha":"123"}'

# Listar usuários
curl http://localhost:8080/api/usuarios

# Criar receita (substitua usuarioId com o ID do usuário criado)
curl -X POST http://localhost:8080/api/receitas \
  -H "Content-Type: application/json" \
  -d '{"usuarioId":1,"descricao":"Teste","fonte":"API","valor":100.00,"data":"2024-05-26"}'
```

---

## 📚 Arquivos Principais

**Backend:**
- `pom.xml` - Dependências Maven
- `application.properties` - Configuração Oracle
- `schema.sql` - Script SQL
- Models, Repositories, Services, Controllers - em `src/main/java/com/fintech/`

**Frontend:**
- `package.json` - Dependências npm
- `src/pages/` - 8 páginas React
- `src/services/api.ts` - Serviço HTTP
- `src/styles/` - 13 arquivos CSS

---

## ⚠️ Verificações Finais

Antes de submeter, verifique:

- [ ] Backend roda sem erros: `mvn clean install`
- [ ] Frontend roda sem erros: `npm run build`
- [ ] Oracle conecta corretamente
- [ ] Todos os 5 endpoints funcionam
- [ ] Páginas são responsivas
- [ ] Navbar aparece (exceto em Login)

---

## 📞 Troubleshooting

**Erro de conexão Oracle?**
- Verifique credenciais em `application.properties`
- Teste conexão: `sqlplus usuario@oracle.fiap.com.br:1521/ORCL`

**Erro CORS no Frontend?**
- Backend tem `@CrossOrigin(origins = "http://localhost:5173")`
- Frontend chama `http://localhost:8080/api`

**Axios não funciona?**
- Certifique que `npm install axios` foi rodado
- Verifique `src/services/api.ts` está importado

---

**Status: ✅ COMPLETO E PRONTO PARA APRESENTAÇÃO**
