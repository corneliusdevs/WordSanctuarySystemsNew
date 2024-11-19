# Project Setup with Prisma (MongoDB & PostgreSQL)
Consult the /server/prisma/README.md file to understand how to generate prisma files and run migrations

Here's the updated **`ARCHITECTURE.md`** with a clear **Table of Contents** and correctly formatted sections pointing to their corresponding content:

---

# Architecture and Flow of the Application

This document explains the architecture and the flow of execution in the Express application, which is structured to interact with two separate databases: **MongoDB** and **PostgreSQL**. The application follows a **Model-View-Controller (MVC)** pattern, and Prisma is used to manage database interactions.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Flow of Execution](#flow-of-execution)
   - [App Initialization](#app-initialization)
   - [Routes](#routes)
   - [Controllers](#controllers)
   - [Database Interaction (Prisma Clients)](#database-interaction-prisma-clients)
   - [Graceful Shutdown](#graceful-shutdown)
3. [Example: Request Flow](#example-request-flow)
   - [Fetch Users from PostgreSQL](#fetch-users-from-postgresql)
   - [Fetch Users from MongoDB](#fetch-users-from-mongodb)
4. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

The architecture of this application follows the **Model-View-Controller (MVC)** pattern, where:

- **Models**: Define the database schema and structure (using Prisma for MongoDB and PostgreSQL).
- **Controllers**: Contain the business logic for handling requests, performing database operations via Prisma Clients, and sending responses.
- **Routes**: Define the HTTP routes that map to specific controller methods.

The application handles both **MongoDB** and **PostgreSQL** databases separately. Each database has its own Prisma schema file and corresponding Prisma client, which allows us to keep database interactions isolated.

---

## Flow of Execution

### App Initialization

When the application starts, the `app.ts` (or `index.ts`) file is executed. Here, the **Express** server is initialized, middleware is set up, and routes are registered.

### Routes

Routes map specific URL paths to corresponding controller methods. The routes for user-related operations are defined in **`userRoutes.ts`**. For example, the following routes are defined:

- **GET /users/mongo**: Fetches users from MongoDB.
- **POST /users/mongo**: Creates a new user in MongoDB.
- **GET /users/postgres**: Fetches users from PostgreSQL.
- **POST /users/postgres**: Creates a new user in PostgreSQL.

### Controllers

The controller methods define the logic for handling the incoming HTTP requests. These methods interact with the **Prisma Clients** (MongoDB or PostgreSQL) to fetch or manipulate data.

The controllers are responsible for:

- Handling the request data (e.g., parsing JSON body).
- Interacting with the Prisma Client to fetch or create users in the respective databases.
- Sending a response back to the client with the data or an error message.

For example, the **`userController.ts`** file defines the following functions:

- **`getUsersFromMongo`**: Fetches users from the MongoDB database.
- **`getUsersFromPostgres`**: Fetches users from the PostgreSQL database.
- **`createUserInMongo`**: Creates a new user in MongoDB.
- **`createUserInPostgres`**: Creates a new user in PostgreSQL.

### Database Interaction (Prisma Clients)

The controllers use the Prisma Clients to interact with **MongoDB** or **PostgreSQL**. These clients are initialized in the **`prismaClients.ts`** file and imported into the controllers for database operations.

- **MongoDB**: Uses the `mongoDbClient` (generated from `schema.mongodb.prisma`) to interact with the MongoDB database.
- **PostgreSQL**: Uses the `postgresClient` (generated from `schema.postgresql.prisma`) to interact with the PostgreSQL database.

Each Prisma Client provides methods (e.g., `findMany`, `create`, etc.) to perform CRUD operations on the database.

### Graceful Shutdown

The application ensures that the Prisma Clients are disconnected properly when the server shuts down. This is handled in the `process.on('SIGINT')` event listener in **`app.ts`**, which disconnects both the **MongoDB** and **PostgreSQL** clients before exiting the application.

---

## Example: Request Flow

### Fetch Users from PostgreSQL

**URL**: `http://localhost:5000/users/postgres`

**Flow**:
1. The browser sends an HTTP **GET** request to `http://localhost:5000/users/postgres`.
2. The request is routed to the **`getUsersFromPostgres`** function in the **`userController.ts`**.
3. Inside the controller, the Prisma Client for PostgreSQL (`postgresClient`) is used to query the PostgreSQL database for users.
4. The result (list of users) is sent as a response to the client in JSON format.

**Expected Response**:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "janesmith@example.com"
  }
]
```

### Fetch Users from MongoDB

**URL**: `http://localhost:5000/users/mongo`

**Flow**:
1. The browser sends an HTTP **GET** request to `http://localhost:5000/users/mongo`.
2. The request is routed to the **`getUsersFromMongo`** function in the **`userController.ts`**.
3. Inside the controller, the Prisma Client for MongoDB (`mongoDbClient`) is used to query the MongoDB database for users.
4. The result (list of users) is sent as a response to the client in JSON format.

**Expected Response**:
```json
[
  {
    "id": "5f8b3c2e29b5b217b3f9f7b3",
    "name": "Alice Cooper",
    "email": "alicecooper@example.com"
  },
  {
    "id": "5f8b3c2e29b5b217b3f9f7b4",
    "name": "Bob Marley",
    "email": "bobmarley@example.com"
  }
]
```

---

## Troubleshooting

### Common Issues

1. **Missing `schema.prisma` file**: If you're getting errors related to `schema.prisma`, make sure you are explicitly specifying the `--schema` flag when generating or applying migrations for MongoDB or PostgreSQL, as each schema file has a different name.
   
   Example:
   ```bash
   npx prisma generate --schema=prisma/schema.mongodb.prisma
   ```

2. **Invalid Data Model**: If you're seeing validation errors regarding model definitions, ensure that you have correctly defined the models and data sources in your respective schema files.

3. **Migrations Failing**: Ensure that your database is running, and check the logs for detailed error messages. You can manually inspect the generated migration SQL files under `prisma/migrations/`.

4. **Database Not Connected**: Double-check your `.env` file to make sure the MongoDB and PostgreSQL connection strings are correct.

---


