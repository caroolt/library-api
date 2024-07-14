# Library API

## Description
API for managing a library system.

## Requirements
- Node.js: LTS
- MongoDB
- Docker
- Docker Compose


## Setup

1. Clone the repository
   ```bash
   git clone https://github.com/caroolt/library-api.git
   cd library-api

## If you don't want to use Docker

2. Install Dependencies
  ```bash
  npm install
  ```
3. Configure the `.env` file following the `.example.env` file

4. Start the Server
```bash
    # development mode
    $ npm run start

    # watch mode
    $ npm run start:dev

    # production mode
    $ npm run start:prod
 ```
5. Access Swagger documentation at http://localhost:3000/api/docs

## If you want to use Docker
2. Configure the `.docker-compose.yml` file following the `docker-compose.example.yml` file

3. Build and Start the Docker Containers
```bash
  docker-compose up --build
```

4. Access Swagger documentation at http://localhost:3000/api/docs

# Main Endpoints
## Authentication

### User Login
- **POST /auth/login**
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "password": "password"
    }
    ```

### Register a New User
- **POST /auth/register**
  - Request body:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password"
    }
    ```

### Refresh Access Token
- **POST /auth/refresh-token**
  - Request body:
    ```json
    {
      "refresh_token": "yourAccessToken"
    }
    ```

## Users

### Get all users
- **GET /users**
  

### Get a user by ID
- **GET /users/:id**
  - Parameters:
    - `id`: User ID

### Get a user by email
- **GET /users/email/:email**
  - Parameters:
    - `email`: User email

### Update a user by ID (if Admin)
- **PUT /users/:id**
  - Parameters:
    - `id`: User ID
  - Request body:
    ```json
    {
      "name": "Updated Name",
      "email": "updated@example.com",
      "password": "newpassword"
    }
    ```

### Delete a user by ID (if Admin)
- **DELETE /users/:id**
  - Parameters:
    - `id`: User ID


## Books

### Create a New Book (admin only)
- **POST /books**
  - Request body:
    ```json
    {
      "title": "Book Title",
      "description": "Book Description",
      "publicationDate": "2023-01-01",
      "authorId": "authorId"
    }
    ```

### List All Books
- **GET /books**
  - Optional query parameters:
    - `page`: Page number
    - `limit`: Results per page limit
    - `sortDir`: Sort field
    - `sortBy`: Sort books by title or any parameter you like

### Get a Book by ID
- **GET /books/:id**
- Parameters:
    - `id`: Book id

### Get a book by title
- **GET /users/title/:title**
  - Parameters:
    - `title`: Book title

### Update a Book (admin only)
- **PUT /books/:id**
  - Request body:
    ```json
    {
      "title": "Updated Title",
      "description": "Updated Description",
      "publicationDate": "2023-01-01",
      "authorId": "authorId"
    }
    ```

### Delete a Book (admin only)
- **DELETE /books/:id**

## Authors

### Create a New Author (admin only)
- **POST /authors**
  - Request body:
    ```json
    {
      "name": "Author Name",
      "bio": "Author bio",
      "birthDate": "1970-01-01"
    }
    ```

### List All Authors
- **GET /authors**
  - Optional query parameters:
    - `page`: Page number
    - `limit`: Results per page limit
    - `sortDir`: Sort field
    - `sortBy`: Search authors by name or any parameter you like

### Get an Author by ID
- **GET /authors/:id**
- Parameters:
    - `id`: Author id

### Get a Author by name
- **GET /authors/name/:name**
  - Parameters:
    - `name`: Author name

### Update an Author (admin only)
- **PUT /authors/:id**
  - Request body:
    ```json
    {
      "name": "Updated Name",
      "bio": "Updated bio",
      "birthDate": "1970-01-01"
    }
    ```

### Delete an Author (admin only)
- **DELETE /authors/:id**


