# 🚀 TodoList API - Backend 

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS Badge">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL Badge">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT Badge">
</p>

---

## 📖 Descrição do Projeto

Este repositório contém o backend de uma aplicação de gerenciamento de tarefas (TodoList), construído com NestJS para oferecer uma API modular, escalável e segura.
A API permite que usuários criem, atualizem, excluam e consultem tarefas, organizando-as com tags personalizadas. Cada usuário possui acesso exclusivo às suas próprias tarefas e tags, pela autenticação JWT.

A API oferece um conjunto completo de funcionalidades para:
*   **Autenticação de Usuários** (Registro e Login via JWT).
*   **Gerenciamento de Tarefas** (CRUD completo).
*   **Categorização** de tarefas através de **Tags**.

O projeto utiliza **TypeScript** para garantir a segurança de tipos e o **Sequelize** como ORM para a persistência de dados em um banco **PostgreSQL**.

## 🛠️ Tecnologias Utilizadas

A tabela a seguir detalha as principais ferramentas e bibliotecas que compõem o _stack_ tecnológico deste projeto:

| Categoria | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Framework** | NestJS | Construção da arquitetura da aplicação e servidor HTTP. |
| **Linguagem** | TypeScript | Desenvolvimento com tipagem estática. |
| **Banco de Dados** | PostgreSQL | Sistema de gerenciamento de banco de dados relacional. |
| **ORM** | Sequelize | Mapeamento Objeto-Relacional para o PostgreSQL. |
| **Autenticação** | JWT (Passport-JWT) | Mecanismo de autorização e controle de acesso. |
| **Containerização** | Docker Compose | Orquestração do ambiente de desenvolvimento (incluindo o DB). |

## 🚀 Configuração e Execução

Siga os passos abaixo para configurar e iniciar a API.

### 1. Clonar o Repositório e Instalar Dependências

```bash
# Instala as dependências do projeto
npm install
```

### 2. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto, copiando o conteúdo do `.env.example`, e preencha as variáveis de ambiente.

```bash
cp .env.example .env
```

**Variáveis Essenciais:**

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `PORT` | Porta de execução da API. | `3000` |
| `DB_HOST` | Host do banco de dados (use `db` se via Docker). | `db` |
| `DB_USER`, `DB_PASS`, `DB_NAME` | Credenciais e nome do banco de dados. | `postgres`, `242526`, `teste` |
| `JWT_SECRET` | **Chave secreta para JWT**. | `sua_chave_secreta_aqui` |

### 3. Inicialização do Banco de Dados com Docker

Utilize o Docker Compose para iniciar o container do PostgreSQL:

```bash
docker-compose up -d db
```

### 4. Execução da Aplicação

| Comando | Descrição | URL Base |
| :--- | :--- | :--- |
| `npm run start:dev` | Inicia em modo de desenvolvimento (com _hot-reload_). | `http://localhost:<PORT>` |

## 🗺️ Endpoints da API

Todos os endpoints de Tarefas e Tags requerem autenticação via **Bearer Token (JWT)**.

### 🔑 Autenticação (`/auth`)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Cria um novo usuário. |
| `POST` | `/auth/login` | Autentica o usuário e retorna o JWT. |

### ✅ Tarefas (`/tasks`)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/tasks` | Cria uma nova tarefa. |
| `GET` | `/tasks` | Lista tarefas (com filtros opcionais por `tags_id` e `status`). |
| `GET` | `/tasks/by-tag-name/:name` | Busca tarefas por nome da tag. |
| `GET` | `/tasks/:id` | Busca uma tarefa específica por ID (UUID). |
| `PATCH` | `/tasks/:id` | Atualiza campos de uma tarefa por ID (UUID). |
| `DELETE` | `/tasks/:id` | Remove uma tarefa por ID (UUID). |

### 🏷️ Tags (`/tags`)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/tags` | Cria uma nova tag. |
| `GET` | `/tags` | Lista todas as tags do usuário. |
| `GET` | `/tags/:id` | Busca uma tag específica por ID (UUID). |
| `PATCH` | `/tags/:id` | Atualiza o nome de uma tag por ID (UUID). |
| `DELETE` | `/tags/:id` | Remove uma tag por ID (UUID). |


------------------------------------------------------------------------------
