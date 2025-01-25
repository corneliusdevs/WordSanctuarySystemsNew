# Step 1: Use an official Node.js image as the base image
FROM node:16 AS builder

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Install TypeScript locally and build the project
RUN npm install --save-dev typescript
RUN npx tsc

# Step 7: Use a smaller base image for production
FROM node:16-slim

# Step 8: Set the working directory in the container for production
WORKDIR /app

# Step 9: Copy the built application from the builder stage (including dist)
COPY --from=builder /app /app

# Step 10: Expose the port the app will run on
EXPOSE 4999

# Step 11: Command to start the app (make sure you’re running the compiled JavaScript from `dist/`)
CMD ["node", "dist/app.js"]
