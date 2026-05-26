# Fintech Backend - Java Spring Boot API

Backend RESTful para aplicação Fintech desenvolvida com Spring Boot 3.3.0 e Java 21.

## Estrutura do Projeto

```
src/main/
├── java/com/fintech/
│   ├── model/              # Entidades JPA
│   ├── repository/         # Interfaces JPA Repository
│   ├── service/            # Lógica de negócio
│   ├── controller/         # REST Controllers
│   ├── dto/                # Data Transfer Objects
│   └── FintechBackendApplication.java
└── resources/
    ├── application.properties
    └── schema.sql
```

## Entidades Principais

### 1. **Usuario**
- Usuário da plataforma
- Relacionamento: 1:N com Receita, Despesa, Divida, Investimento

### 2. **Receita**
- Entrada de valores financeiros
- Atributos: descricao, fonte, valor, data
- Relacionamento: N:1 com Usuario

### 3. **Despesa**
- Saída de valores financeiros
- Atributos: nome, categoria, valor, data
- Relacionamento: N:1 com Usuario

### 4. **Divida**
- Rastreamento de dívidas
- Atributos: credor, descricao, valor, dataVencimento, status
- Relacionamento: N:1 com Usuario

### 5. **Investimento**
- Carteira de investimentos
- Atributos: nome, tipo, valorInvestido, valorAtual, rentabilidade
- Relacionamento: N:1 com Usuario

## Endpoints da API

### Usuários
- `POST /api/usuarios` - Criar usuário
- `GET /api/usuarios` - Listar todos
- `GET /api/usuarios/{id}` - Obter por ID
- `PUT /api/usuarios/{id}` - Atualizar
- `DELETE /api/usuarios/{id}` - Deletar

### Receitas
- `POST /api/receitas` - Criar
- `GET /api/receitas/{id}` - Obter por ID
- `GET /api/receitas/usuario/{usuarioId}` - Listar por usuário
- `PUT /api/receitas/{id}` - Atualizar
- `DELETE /api/receitas/{id}` - Deletar

### Despesas
- `POST /api/despesas` - Criar
- `GET /api/despesas/{id}` - Obter por ID
- `GET /api/despesas/usuario/{usuarioId}` - Listar por usuário
- `PUT /api/despesas/{id}` - Atualizar
- `DELETE /api/despesas/{id}` - Deletar

### Dívidas
- `POST /api/dividas` - Criar
- `GET /api/dividas/{id}` - Obter por ID
- `GET /api/dividas/usuario/{usuarioId}` - Listar por usuário
- `PUT /api/dividas/{id}` - Atualizar
- `PATCH /api/dividas/{id}/pagar` - Marcar como paga
- `DELETE /api/dividas/{id}` - Deletar

### Investimentos
- `POST /api/investimentos` - Criar
- `GET /api/investimentos/{id}` - Obter por ID
- `GET /api/investimentos/usuario/{usuarioId}` - Listar por usuário
- `PUT /api/investimentos/{id}` - Atualizar
- `DELETE /api/investimentos/{id}` - Deletar

## Configuração

### Pré-requisitos
- Java 21 JDK
- Maven 3.9+
- Oracle Database 19c+
- Acesso à instância Oracle FIAP

### Configurar Banco de Dados

Editar `application.properties`:

```properties
spring.datasource.url=jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
```

### Criar Tabelas

Executar script `schema.sql` no Oracle:

```sql
@schema.sql
```

## Como Rodar

### 1. Build do projeto
```bash
cd backend
mvn clean install
```

### 2. Executar aplicação
```bash
mvn spring-boot:run
```

A aplicação estará disponível em: `http://localhost:8080/api`

### 3. Testar Endpoints
```bash
# Criar usuário
curl -X POST http://localhost:8080/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@email.com","senha":"123456"}'

# Listar todos os usuários
curl http://localhost:8080/api/usuarios

# Criar receita
curl -X POST http://localhost:8080/api/receitas \
  -H "Content-Type: application/json" \
  -d '{"usuarioId":1,"descricao":"Salário","fonte":"Trabalho","valor":3000,"data":"2024-05-26"}'
```

## Tecnologias Utilizadas

- **Spring Boot 3.3.0** - Framework web
- **Spring Data JPA** - ORM
- **Java 21 LTS** - Linguagem
- **Oracle JDBC Driver 23.3.0** - Conector banco
- **Lombok** - Redução de boilerplate
- **Maven** - Gerenciador de dependências

## Códigos HTTP Retornados

- `200 OK` - Sucesso em GET, PUT
- `201 CREATED` - Sucesso em POST
- `204 NO CONTENT` - Sucesso em DELETE
- `400 BAD REQUEST` - Erro de validação
- `404 NOT FOUND` - Recurso não encontrado
- `500 INTERNAL SERVER ERROR` - Erro do servidor

## Estrutura de Erro

```json
{
  "timestamp": "2024-05-26T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Email já cadastrado",
  "path": "/api/usuarios"
}
```

## Próximos Passos

1. Implementar autenticação com JWT
2. Adicionar validações mais robustas
3. Implementar paginação nos endpoints GET
4. Adicionar filtros avançados
5. Implementar testes unitários e integração
