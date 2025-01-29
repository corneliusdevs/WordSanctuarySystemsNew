

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


# Step 1: Build Stage
FROM node:18 AS builder

# Install OpenSSL 3.0 for Prisma client generation (compatible with newer Debian versions)
RUN apt-get update && apt-get install -y libssl3

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json, package-lock.json (or yarn.lock), tsconfig.json, and Prisma files
COPY package*.json ./ 
COPY tsconfig.json ./ 
COPY prisma ./prisma

# Step 4: Install dependencies (both production and development)
RUN npm install

# Step 5: Generate Prisma clients with MongoDB and PostgreSQL support (handling binary targets)
RUN npm run prisma-generate-mongodb
RUN npm run prisma-generate-postgresql

# Step 6: Copy the source files (including `src/`)
COPY src ./src

# Step 7: Compile TypeScript code to JavaScript
RUN npm run build

# Step 8: Production Stage - Use a smaller base image for production
FROM node:18-slim

# Step 9: Set the working directory for production
WORKDIR /app

# Step 10: Copy the compiled app and other necessary files from the builder stage
COPY --from=builder /app ./ 

# Step 11: Ensure generated clients are available in the right location for production
COPY --from=builder /app/generated-clients/mongo ./generated-clients/mongo

# Step 12: Expose the port the app will run on
EXPOSE 5000

# Step 13: Start the application
CMD ["node", "dist/app.js"]
