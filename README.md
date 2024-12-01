# Task Manager API

Bem-vindo ao **Task Manager API**, um sistema de gerenciamento de tarefas que oferece funcionalidades completas para registro de usuários, autenticação segura, gerenciamento de tarefas e integração com banco de dados MongoDB e Redis. Este projeto foi desenvolvido seguindo os princípios **SOLID**, boas práticas de Clean Code, e utiliza um conjunto moderno de tecnologias para garantir eficiência, escalabilidade e manutenção facilitada.

---

## **Índice**
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Como Configurar e Executar](#como-configurar-e-executar)
- [Endpoints](#endpoints)
  - [Autenticação](#autenticação)
  - [Tarefas](#tarefas)
- [Princípios e Boas Práticas](#princípios-e-boas-práticas)

---

## **Tecnologias Utilizadas**

Este projeto foi construído utilizando:

- **Back-End**:
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados**:
  - [MongoDB](https://www.mongodb.com/)
  - [Redis](https://redis.io/) (para cache e gerenciamento de tokens)
- **Autenticação**:
  - [jsonwebtoken](https://github.com/auth0/node-```jsonwebtoken) (JWT)
  - [bcrypt](https://github.com/kelektiv/node.bcrypt.js) (hashing de senhas)
- **DevOps e Deploy**:
  - [Render](https://render.com/) (deploy com HTTPS configurado)
- **Outras Dependências**:
  - [Mongoose](https://mongoosejs.com/)
  - [ioredis](https://github.com/luin/ioredis)
  - [dotenv](https://github.com/motdotla/dotenv) (gerenciamento de variáveis de ambiente)

---

## **Arquitetura do Projeto**

A estrutura do projeto é organizada em várias pastas, cada uma com responsabilidades bem definidas:

- **`cache/`**: Contém o cliente Redis e os serviços relacionados, como a manipulação de tokens e cache.
  - `redisClient.ts`: Configura a conexão com o Redis.
  - `redisService.ts`: Implementa operações relacionadas a cache, como armazenar e recuperar dados.

- **`controllers/`**: Armazena os controladores que conectam as requisições HTTP à lógica de negócio.
  - `authController.ts`: Controla as funcionalidades de autenticação, como registro e login.
  - `taskController.ts`: Controla as operações relacionadas às tarefas, como criação, edição e exclusão.

- **`database/`**: Gerencia a conexão com o banco de dados.
  - `connection.ts`: Configura e gerencia a conexão com o MongoDB.

- **`middlewares/`**: Contém middlewares para interceptar requisições.
  - `authMiddleware.ts`: Implementa a validação de autenticação via JWT.

- **`models/`**: Define os esquemas de dados do MongoDB usando Mongoose.
  - `userModel.ts`: Modelo de dados para usuários.
  - `taskModel.ts`: Modelo de dados para tarefas.

- **`routes/`**: Organiza as rotas da aplicação.
  - `authRoutes.ts`: Define as rotas relacionadas à autenticação, como registro e login.
  - `taskRoutes.ts`: Define as rotas relacionadas às tarefas.

- **`services/`**: Contém a lógica de negócios e interações com banco de dados e cache.
  - `authService.ts`: Implementa a lógica de autenticação, como geração de tokens e validação.
  - `taskService.ts`: Implementa a lógica de gerenciamento de tarefas.

- **`app.ts`**: Configura o aplicativo Express, incluindo middlewares globais.
- **`server.ts`**: Inicia o servidor, conectando ao MongoDB e definindo a porta.

---

## **Como Configurar e Executar**

### **Pré-requisitos**
Certifique-se de que você tenha instalado:
- [Node.js](https://nodejs.org/) (v16 ou superior)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

### **Passos para Inicializar**

1. Clone o repositório:
   ```bash
   git clone https://github.com/VictorJunqueira1/todo-list-nodejs.git
   cd todo-list-nodejs
2. Instale as dependências:
    ```bash
    npm install
3. Configure as variáveis de ambiente: Crie um arquivo .env na raiz do projeto com os seguintes valores:
    ```bash
    PORT=
    MONGODB_URI=
    JWT_SECRET=
    REDIS_HOST=
    REDIS_PORT=
    REDIS_PASSWORD=
4. Inicie o processo de build:
    ```bash
    npm run build
5. Inicie o servidor:
    ```bash
    npm run start
---

## **Endpoints**

A API possui os seguintes endpoints organizados em dois grupos principais: **Autenticação** e **Tarefas**.

### **Autenticação**

#### **Registrar Usuário**
- **POST** `/api/auth/register`

- **Body**:
  ```json
  {
    "username": "usuario",
    "password": "senha"
  }
-   **Respostas**:
    -   `201`: Usuário registrado com sucesso.
    -   `400`: Usuário já existe.

#### **Login**

-   **POST** `/api/auth/login`

-   **Body**:
    ```json
    {
      "username": "usuario",
      "password": "senha"
    }
-   **Respostas**:
    -   `200`: Retorna o token JWT.
    -   `400`: Credenciais inválidas.
----------
### **Tarefas**

#### **Adicionar Tarefa**

-   **POST** `/api/tasks`
-   **Headers**: `Authorization: Bearer <token>`
-   **Body**:
    
    ```json
    {
      "title": "Minha tarefa",
      "description": "Descrição opcional"
    }
-   **Respostas**:
    -   `201`: Tarefa criada com sucesso.
    -   `401`: Token inválido ou expirado.

#### **Listar Tarefas**

-   **GET** `/api/tasks`
-   **Headers**: `Authorization: Bearer <token>`
-   **Respostas**:
    -   `200`: Lista de tarefas.
    -   `401`: Token inválido ou expirado.

#### **Editar Tarefa**

-   **PUT** `/api/tasks/:id`

-   **Headers**: `Authorization: Bearer <token>`

-   **Body**:
    
    ```json
    {
      "title": "Novo título",
      "description": "Nova descrição",
      "status": "completed"
    }
-   **Respostas**:
    -   `200`: Tarefa atualizada com sucesso.
    -   `404`: Tarefa não encontrada.
    -   `401`: Token inválido ou expirado.

#### **Excluir Tarefa**

-   **DELETE** `/api/tasks/:id`
-   **Headers**: `Authorization: Bearer <token>`
-   **Respostas**:
    -   `200`: Tarefa excluída com sucesso.
    -   `404`: Tarefa não encontrada.
    -   `401`: Token inválido ou expirado.

----------

## **Princípios e Boas Práticas**

Este projeto adota os princípios **SOLID**, garantindo:

-   **SRP**: Cada classe e função possui uma única responsabilidade.
-   **DIP**: Código dependente de abstrações, facilitando extensibilidade.
-   **OCP**: Sistema extensível sem alterar código existente.

Além disso:

-   Código limpo e bem documentado.
-   Tipagem rigorosa com **TypeScript**.
-   Uso eficiente de cache com Redis.