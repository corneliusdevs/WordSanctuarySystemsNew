

# # Step 1: Use an official Node.js image as the build environment
# FROM node:18 AS builder

# # Install OpenSSL 1.1 for prisma client generation
# RUN apt-get update && apt-get install -y libssl1.1

# # Step 2: Set the working directory
# WORKDIR /app

# # Step 3: Copy package.json and package-lock.json (or yarn.lock)
# COPY package*.json ./ 

# # Step 4: Install dependencies (both production and development)
# RUN npm install

# # Step 5: Copy the rest of the application files
# COPY . .

# # Step 6: Generate Prisma client for MongoDB and PostgreSQL
# RUN npm run prisma-generate-mongodb
# RUN npm run prisma-generate-postgresql

# # Step 7: Compile TypeScript code to JavaScript
# RUN npm run build

# # Step 8: Use a smaller base image for production (node:18-slim)
# FROM node:18-slim

# # Step 9: Set the working directory for production
# WORKDIR /app

# # Step 10: Copy the compiled app from the builder stage
# COPY --from=builder /app ./

# # Step 11: Expose the port the app will run on
# EXPOSE 5000

# # Step 12: Start the application
# CMD ["node", "dist/app.js"]

# FROM node:18 AS builder

# # Install OpenSSL 3.0 for prisma client generation (compatible with newer Debian versions)
# RUN apt-get update && apt-get install -y libssl3

# # Step 2: Set the working directory
# WORKDIR /app

# # Step 3: Copy package.json and package-lock.json (or yarn.lock)
# COPY package*.json ./ 

# # Step 4: Install dependencies (both production and development)
# RUN npm install

# # Step 5: Copy the rest of the application files
# COPY . . 

# # Step 6: Generate Prisma client for MongoDB and PostgreSQL
# RUN npm run prisma-generate-mongodb
# RUN npm run prisma-generate-postgresql

# # Step 7: Compile TypeScript code to JavaScript
# RUN npm run build

# # Step 8: Use a smaller base image for production (node:18-slim)
# FROM node:18-slim

# # Step 9: Set the working directory for production
# WORKDIR /app

# # Step 10: Copy the compiled app from the builder stage
# COPY --from=builder /app ./ 

# # Step 11: Expose the port the app will run on
# EXPOSE 5000

# # Step 12: Start the application
# CMD ["node", "dist/app.js"]


# # Step 1: Build Stage
# FROM node:18 AS builder

# # Install OpenSSL 3.0 for Prisma client generation (compatible with newer Debian versions)
# RUN apt-get update && apt-get install -y libssl3

# # Step 2: Set the working directory
# WORKDIR /app

# # Step 3: Copy package.json, package-lock.json (or yarn.lock), tsconfig.json, and Prisma files
# COPY package*.json ./
# COPY tsconfig.json ./
# COPY prisma ./prisma

# # Step 4: Install dependencies (both production and development)
# RUN npm install

# # Step 5: Generate Prisma clients with MongoDB and PostgreSQL support (handling binary targets)
# RUN npm run prisma-generate-mongodb
# RUN npm run prisma-generate-postgresql

# # Step 6: Compile TypeScript code to JavaScript
# RUN npm run build

# # Step 7: Production Stage - Use a smaller base image for production
# FROM node:18-slim

# # Step 8: Set the working directory for production
# WORKDIR /app

# # Step 9: Copy the compiled app and other necessary files from the builder stage
# # Copy only the necessary files, including the Prisma client generation output
# COPY --from=builder /app ./ 

# # Step 10: Ensure generated clients are available in the right location for production
# # If your output path is inside ./generated-clients/mongo, ensure it exists in production
# COPY --from=builder /app/generated-clients/mongo ./generated-clients/mongo

# # Step 11: Expose the port the app will run on
# EXPOSE 5000

# # Step 12: Start the application
# CMD ["node", "dist/app.js"]


# # Step 1: Build Stage
# FROM node:18 AS builder

# # Install OpenSSL 3.0 for Prisma client generation (compatible with newer Debian versions)
# RUN apt-get update && apt-get install -y libssl3

# # Step 2: Set the working directory
# WORKDIR /app

# # Step 3: Copy package.json, package-lock.json (or yarn.lock), tsconfig.json, and Prisma files
# COPY package*.json ./ 
# COPY tsconfig.json ./ 
# COPY prisma ./prisma

# # Step 4: Install dependencies (both production and development)
# RUN npm install

# # Step 5: Generate Prisma clients with MongoDB and PostgreSQL support (handling binary targets)
# RUN npm run prisma-generate-mongodb
# RUN npm run prisma-generate-postgresql

# # Step 6: Copy the source files (including `src/`)
# COPY src ./src

# # Step 7: Compile TypeScript code to JavaScript
# RUN npm run build

# # Step 8: Production Stage - Use a smaller base image for production
# FROM node:18-slim

# # Step 9: Set the working directory for production
# WORKDIR /app

# # Step 10: Copy the compiled app and other necessary files from the builder stage
# COPY --from=builder /app ./ 

# # Step 11: Ensure generated clients are available in the right location for production
# COPY --from=builder /app/generated-clients/mongo ./generated-clients/mongo

# # Step 12: Expose the port the app will run on
# EXPOSE 5000

# # Step 13: Start the application
# CMD ["node", "dist/app.js"]


# # Step 1: Build Stage
# FROM node:18-bullseye AS builder

# # Install OpenSSL 3.0 for Prisma client generation
# RUN apt-get update && apt-get install -y openssl libssl3

# # Set working directory
# WORKDIR /app

# # Copy package files, configs, and Prisma schema
# COPY package*.json ./ 
# COPY tsconfig.json ./ 
# COPY prisma ./prisma

# # Install dependencies
# RUN npm install

# # Generate Prisma clients
# # The output directory is specified in the schema file
# RUN npx prisma generate

# # Copy source files
# COPY src ./src

# # Build TypeScript code
# RUN npm run build

# # Step 2: Production Stage
# FROM node:18-bullseye-slim

# # Install OpenSSL 1.1 and 3.0 to support both binary targets
# RUN apt-get update && apt-get install -y openssl libssl1.1 libssl3

# WORKDIR /app

# # Copy necessary files from builder
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/node_modules ./node_modules

# # Expose port
# EXPOSE 5000

# # Start the application
# CMD ["node", "dist/app.js"]


# Step 1: Build Stage
FROM node:18-bullseye AS builder

# Install OpenSSL 3.0 for Prisma client generation
RUN apt-get update && apt-get install -y openssl3 libssl3

# Set working directory
WORKDIR /app

# Copy package files, configs, and Prisma schemas
COPY package*.json ./ 
COPY tsconfig.json ./ 
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Generate Prisma clients for both MongoDB and PostgreSQL
RUN npm run prisma-generate-mongodb && \
    npm run prisma-generate-postgresql

# Copy source files
COPY src ./src

# Build TypeScript code
RUN npm run build

# Step 2: Production Stage
FROM node:18-bullseye-slim

# # Install OpenSSL 1.1 and 3.0 to support both binary targets
# RUN apt-get update && apt-get install -y openssl libssl1.1 libssl3

# Install OpenSSL 1.1 and 3.0 to support both binary targets
RUN apt-get update && apt-get install -y libssl1.1 libssl3

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Fix the start command in package.json
RUN sed -i 's/dist\/app.ts/dist\/app.js/g' package.json

# Expose port
EXPOSE 5000

# Start the application using the corrected start script
CMD ["npm", "start"]