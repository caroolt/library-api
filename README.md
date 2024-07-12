# Library API

## Descrição
API para gerenciar um sistema de biblioteca.

## Requisitos
- Node.js
- MongoDB

## Configuração

1. Clone o repositório
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

2. Instale as Dependências
```bash 
  npm install
```
3. Configure o arquivo `.env` seguindo o arquivo `.example.env`

4. Inicie o Servidor 
```bash
  # development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

5. Acesse a documentação do Swagger em `http://localhost:3000/api/docs`

## Endpoints Principais

### Autenticação
- `POST /auth/login` - Login do usuário
  - Corpo da solicitação:
    ```json
    {
      "email": "user@example.com",
      "password": "password"
    }
    ```

- `POST /auth/register` - Registro de um novo usuário
  - Corpo da solicitação:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password"
    }
    ```

- `POST /auth/refresh-token` - Renovação do token de acesso
  - Corpo da solicitação:
    ```json
    {
      "refresh_token": "yourRefreshToken"
    }
    ```

### Livros
- `POST /books` - Criação de um novo livro (apenas para admins)
  - Corpo da solicitação:
    ```json
    {
      "title": "Book Title",
      "description": "Book Description",
      "publicationDate": "2023-01-01",
      "authorId": "authorId"
    }
    ```

- `GET /books` - Listar todos os livros
  - Parâmetros de consulta opcionais:
    - `page`: Número da página
    - `limit`: Limite de resultados por página
    - `sort`: Campo para ordenação
    - `search`: Buscar livros pelo título

- `GET /books/:id` - Buscar um livro por ID

- `PUT /books/:id` - Atualizar um livro (apenas para admins)
  - Corpo da solicitação:
    ```json
    {
      "title": "Updated Title",
      "description": "Updated Description",
      "publicationDateedDate": "2023-01-01",
      "authorId": "authorId"
    }
    ```

- `DELETE /books/:id` - Deletar um livro (apenas para admins)

### Autores
- `POST /authors` - Criação de um novo autor (apenas para admins)
  - Corpo da solicitação:
    ```json
    {
      "name": "Author Name",
      "biography": "Author Biography",
      "birthDate": "1970-01-01"
    }
    ```

- `GET /authors` - Listar todos os autores
  - Parâmetros de consulta opcionais:
    - `page`: Número da página
    - `limit`: Limite de resultados por página
    - `sort`: Campo para ordenação
    - `search`: Buscar autores pelo nome

- `GET /authors/:id` - Buscar um autor por ID

- `PUT /authors/:id` - Atualizar um autor (apenas para admins)
  - Corpo da solicitação:
    ```json
    {
      "name": "Updated Name",
      "biography": "Updated Biography",
      "birthDate": "1970-01-01"
    }
    ```

- `DELETE /authors/:id` - Deletar um autor (apenas para admins)
