# Project Setup with Prisma (MongoDB & PostgreSQL)

This project uses **Prisma** as an ORM to interact with two different databases: **MongoDB** and **PostgreSQL**. Each database has its own separate Prisma schema file.

## Table of Contents
- [Setup Prisma](#setup-prisma)
- [Generate Prisma Clients](#generate-prisma-clients)
- [Run Migrations](#run-migrations)
  - [MongoDB Migrations](#mongodb-migrations)
  - [PostgreSQL Migrations](#postgresql-migrations)
- [Environment Configuration](#environment-configuration)

## Setup Prisma

1. Install the necessary dependencies:

   ```bash
   npm install prisma @prisma/client
   ```

2. Make sure you have your `.env` file configured with the database connection URLs for MongoDB and PostgreSQL.

   Example `.env`:
   ```env
   MONGODB_CONN_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   POSTGRES_CONN_URI=postgresql://<username>:<password>@localhost:5432/dbname?schema=public
   ```

## Generate Prisma Clients

Since we are using separate schema files for MongoDB and PostgreSQL, you need to generate two separate Prisma Clients.

### MongoDB Prisma Client

1. Run the following command to generate the Prisma Client for MongoDB:

   ```bash
   npx prisma generate --schema=prisma/schema.mongodb.prisma
   ```

   or simply use the commands specified in the package.json file

   ```bash
   npm run prisma-generate-mongodb
   ```

   This will generate a Prisma Client for MongoDB in the `prisma/generated/mongo` directory.

2. To use the MongoDB Prisma Client in your code, import it as follows:

   ```typescript
   import { PrismaClient } from './prisma/generated/mongo';

   const prisma = new PrismaClient();
   ```

### PostgreSQL Prisma Client

1. Run the following command to generate the Prisma Client for PostgreSQL:

   ```bash
   npx prisma generate --schema=prisma/schema.postgresql.prisma
   ```
   or simply use the command specified in the package.json file

   ```bash
   npm run prisma-generate-postgresql
   ```

   This will generate a Prisma Client for PostgreSQL in the `prisma/generated/postgres` directory.

2. To use the PostgreSQL Prisma Client in your code, import it as follows:

   ```typescript
   import { PrismaClient } from './prisma/generated/postgres';

   const prisma = new PrismaClient();
   ```

## Run Migrations

Prisma Migrations are used to apply changes to your databases based on your Prisma schema files.

### MongoDB Migrations

MongoDB does not have traditional SQL-based migrations (like PostgreSQL), so Prisma currently handles schema synchronization differently. For MongoDB, you can generate a migration file, but you will need to manually sync your schema or handle changes directly in the MongoDB database using Prisma Client queries.

However, the following command applies any changes to the MongoDB database based on your schema:

1. Run the MongoDB migration command:

   ```bash
   npx prisma migrate dev --schema=prisma/schema.mongodb.prisma
   ```

   This will attempt to apply any changes to your MongoDB database schema.

### PostgreSQL Migrations

For PostgreSQL, Prisma will generate traditional SQL migrations to modify the schema of your PostgreSQL database. Here’s how to apply migrations:

1. Run the PostgreSQL migration command:

   ```bash
   npx prisma migrate dev --schema=prisma/schema.postgresql.prisma
   ```

   This will:
   - Generate a migration file (if there are schema changes).
   - Apply the migration to your PostgreSQL database.
   - Regenerate the Prisma Client for PostgreSQL.

   You can also use `prisma migrate deploy` for production-ready migrations after committing them.

   ```bash
   npx prisma migrate deploy --schema=prisma/schema.postgresql.prisma
   ```

   This command will only apply unapplied migrations and is safe for production environments.

## Environment Configuration

Make sure to configure your `.env` file with the correct database connection strings.

Example `.env` file:
```env
MONGODB_CONN_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname?retryWrites=true&w=majority
POSTGRES_CONN_URI=postgresql://<username>:<password>@localhost:5432/dbname?schema=public
```

- **MONGODB_CONN_URI**: MongoDB connection string.
- **POSTGRES_CONN_URI**: PostgreSQL connection string.

## Troubleshooting

- **Missing schema.prisma file**: If you're getting errors related to `schema.prisma`, make sure you are explicitly specifying the `--schema` flag when generating or applying migrations for MongoDB or PostgreSQL, as each schema file has a different name.
  
  Example:
  ```bash
  npx prisma generate --schema=prisma/schema.mongodb.prisma
  ```

- **Invalid Data Model**: If you're seeing validation errors regarding model definitions, ensure that you have correctly defined the models and data sources in your respective schema files.

- **Migrations Failing**: Ensure that your database is running, and check the logs for detailed error messages. You can manually inspect the generated migration SQL files under `prisma/migrations/`.