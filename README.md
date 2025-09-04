# 🚀 HelpDeskAPI

Uma API RESTful para gestão de chamados, desenvolvida com Node.js, Express, Prisma ORM e autenticação JWT.

<br>

## ✨ Funcionalidades

- **Cadastro e autenticação de usuários (JWT)**
- **Gestão de técnicos e seus horários disponíveis**
- **Criação e acompanhamento de chamados**
- **Serviços técnicos cadastrados via seed**
- **Controle de permissões por papel (admin, technician, client)**
- **Validações robustas com Zod**
- **Integração com banco de dados via Prisma**
- **Logs e tratamento de erros personalizados**

<br>

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Zod](https://zod.dev/)
- [Jest](https://jestjs.io/) + [Supertest](https://github.com/ladjs/supertest)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

<br>

## 🚦 Como rodar o projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Fel1324/HelpDeskAPI.git
   cd HelpDeskAPI

2. **Instale as dependências:**
   ```bash
   npm install

3. **Configure o ambiente: Crie um arquivo .env na raiz com as variáveis:**
   ```bash
   DATABASE_URL="postgres://postgres:postgres@localhost:5432/helpdesk?schema=public"
   JWT_SECRET="sua_chave_secreta"
   PORT=3333
   ADMIN_PASSWORD="sua_senha_de_admin"
   
4. **Suba o banco de dados com Docker**
   ```bash
   docker-compose up -d
   ```
   ou
   ```bash
   docker compose up -d

5. **Execute as migrations e as seeds do Prisma:**
   ```bash
   npx prisma migrate deploy
   npx prisma db seed

6. **Rode o servidor em modo desenvolvimento:**
   ```bash
   npm run dev
  
> O servidor estará disponível em [http://localhost:3333](http://localhost:3333).

<br>

## 🧪 Rodando os testes

```bash
npm run test:dev
```

<br>

## 📚 Endpoints

### SignUp

- **POST /users**  
   Cria conta de usuário

### SignIn

- **POST /sessions**  
   Realiza login e retorna o token JWT.

### Horários

- **GET /times**
   Lista todos os horários disponíveis para atribuir a um técnico.
   (Requer autenticação JWT, somente admin)

### Técnicos

- **GET /technicians**
   Lista todos os técnicos e seus horários.
   (Requer autenticação JWT, somente admin)

- **POST /technicians**
   Cria um novo técnico.
   (Requer autenticação JWT, somente admin)

- **PUT /technicians/:id**
   Atualiza dados e horários de um técnico.
   (Requer autenticação JWT, somente admin)

### Serviços

- **GET /services**
   Lista todos os serviços disponíveis.
   (Requer autenticação JWT)

- **POST /services**
   Cria um novo serviço.
   (Requer autenticação JWT, somente admin)

- **POST /services/additional/:ticketId**
   adiciona um serviço adicional para um chamado se for necessário.
   (Requer autenticação JWT, somente técnico responsável pelo chamado)

- **PUT /services/:id**
   Atualiza as informações de um serviço.
   (Requer autenticação JWT, somente admin)

- **PATCH /services/:id**
   Atualiza o status de um serviço.
   (Requer autenticação JWT, somente admin)

- **DELETE /services/additional/delete/:ticketId/:serviceId**
   deleta um serviço adicional de um chamado.
   (Requer autenticação JWT, somente técnico responsável pelo chamado)

### Clientes

- **GET /customers**
   Lista todos os clientes.
   (Requer autenticação JWT, somente admin)

- **PUT /customers/:id**
   Atualiza os dados de um cliente.
   (Requer autenticação JWT, somente admin)

- **DELETE /customers/:id**
   Deleta a conta um cliente.
   (Requer autenticação JWT, somente admin e cliente responsável pela conta)

### Chamados

- **GET /tickets**
   Lista todos os chamados.
   (Requer autenticação JWT)

- **GET /tickets/:id**
   Detalha um chamado específico.
   (Requer autenticação JWT)

- **POST /tickets**
   Cria um novo chamado.
   (Requer autenticação JWT, somente cliente)

- **PATCH /tickets/:id**
   Atualiza o status de um chamado.
   (Requer autenticação JWT, somente admin e técnico responsável pelo chamado)

### Usuários

- **GET /profile/:id**
   Lista os dados da conta de usuário.
   (Requer autenticação JWT, somente técnico e cliente responsáveis pela conta)

- **PUT /profile/:id**
   Atualiza os dados da conta de usuário.
   (Requer autenticação JWT, somente técnico e cliente responsáveis pela conta)

- **PATCH /profile/:id**
   Atualiza a senha da conta de usuário
   (Requer autenticação JWT, somente técnico e cliente responsáveis pela conta)

### Upload de Foto de Perfil

- **GET /uploads**
   Lista foto de perfil
   (Requer autenticação JWT)

- **POST /uploads/:id**
   Faz upload de foto de perfil e a atualiza logo em seguida
   (Requer autenticação JWT, somente técnico e cliente responsáveis pela conta)

<br>

## 👨‍💻 Desenvolvedor do Projeto

- Rafael Roberto de Oliveira

<br>

## 💡 Contribuidor

- [Gabriel José de Oliveira](https://github.com/gaoliveira21)

<br>

## 📄 Licença

Este projeto está sob a licença MIT.

<br>

> Feito com ♥ by Rocketseat :wave: [Participe da nossa comunidade!](https://discord.gg/rocketseat)
