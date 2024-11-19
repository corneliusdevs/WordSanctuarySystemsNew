# Project Setup with Prisma (MongoDB & PostgreSQL)
Consult the /server/prisma/README.md file to understand how to generate prisma files and run migrations

---

# Architecture and Flow of the Application

This document explains the architecture and flow of execution in the Express application, which interacts with both **MongoDB** and **PostgreSQL** databases. The application follows the **Model-View-Controller (MVC)** pattern, and **Prisma** is used to manage database interactions.

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
- **Controllers**: Contain the business logic for handling requests, interacting with the Prisma Clients, and sending responses.
- **Routes**: Define the HTTP routes that map to specific controller methods.

The application separates the logic for **MongoDB** and **PostgreSQL**, with each having its own set of routes and controllers. This modular architecture ensures that the application is scalable, maintainable, and flexible in handling multiple database types.

---

## Flow of Execution

### App Initialization

When the application starts, the **Express** server is initialized in `app.ts`. Middleware such as `express.json()` is configured to handle request bodies, and routes for both MongoDB and PostgreSQL are set up.

### Routes

Routes are defined for each type of database and interact with the corresponding controllers:

- **MongoDB routes** are prefixed with `/api/database/mongodb` and handled by the `mongoDbRouter`.
- **PostgreSQL routes** are prefixed with `/api/database/postgres` and handled by the `postgresRouter`.

Both routers are responsible for handling requests such as creating users or fetching users from their respective databases.

### Controllers

Controllers define the logic for interacting with the databases via Prisma Clients. They contain functions that are invoked by routes to perform specific tasks like fetching users or creating new records.

For example, in `userController.ts`, we have the following functions:

- **`getUsersFromMongo`**: Fetches users from the MongoDB database.
- **`createUserInMongo`**: Creates a new user in MongoDB.
- **`getUsersFromPostgres`**: Fetches users from the PostgreSQL database.
- **`createUserInPostgres`**: Creates a new user in PostgreSQL.

These functions interact with the Prisma Clients (`mongoDbClient` and `postgresClient`) to fetch or manipulate data in the databases.

### Database Interaction (Prisma Clients)

The application uses **Prisma** to manage interactions with both **MongoDB** and **PostgreSQL**:

- **MongoDB**: The `mongoDbClient` is used to interact with MongoDB, leveraging the Prisma MongoDB schema.
- **PostgreSQL**: The `postgresClient` is used to interact with PostgreSQL, leveraging the Prisma PostgreSQL schema.

Each client provides methods such as `findMany()`, `create()`, and others to perform CRUD operations on the databases.

### Graceful Shutdown

To ensure a smooth shutdown, the Prisma Clients are disconnected when the application receives a `SIGINT` signal (e.g., when you press `Ctrl + C` to stop the server). This is done in the `process.on('SIGINT')` event listener in `app.ts`, where the MongoDB and PostgreSQL clients are disconnected before the application exits.

---

## Example: Request Flow

### Fetch Users from PostgreSQL

**URL**: `http://localhost:5000/api/database/postgres/users`

**Flow**:
1. The browser sends an HTTP **GET** request to `http://localhost:5000/api/database/postgres/users`.
2. The request is routed to the `getUsersFromPostgres` function in the `postgres/userController.ts`.
3. Inside the controller, the Prisma Client for PostgreSQL (`postgresClient`) is used to query the PostgreSQL database for users.
4. The result (list of users) is sent as a JSON response to the client.



### Fetch Users from MongoDB

**URL**: `http://localhost:5000/api/database/mongodb/users`

**Flow**:
1. The browser sends an HTTP **GET** request to `http://localhost:5000/api/database/mongodb/users`.
2. The request is routed to the `getUsersFromMongo` function in the `mongodb/userController.ts`.
3. Inside the controller, the Prisma Client for MongoDB (`mongoDbClient`) is used to query the MongoDB database for users.
4. The result (list of users) is sent as a JSON response to the client.


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

## Folder Structure

For reference, here is the folder structure of the application:

```
src/
|-- routes/
|   |-- mongodb/
|   |   |-- mongoDbRouter.ts
|   |   |-- userRouter.ts
|   |-- postgres/
|   |   |-- postgresRouter.ts
|   |   |-- userRouter.ts
|-- controllers/
|   |-- mongodb/
|   |   |-- userController.ts
|   |-- postgres/
|   |   |-- userController.ts
|-- db_connections/
|   |-- prismaClients.ts
|-- app.ts
|-- .env
```

This modular structure ensures that MongoDB and PostgreSQL logic is cleanly separated, making the codebase more maintainable and scalable.

--- 


