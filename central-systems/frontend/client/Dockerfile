# Use the official Node.js image with version >=18.17.0 for building the app
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files to the container
COPY package*.json ./

# Install dependencies (this will include dev dependencies for building)
RUN npm install --frozen-lockfile

# Copy the rest of the application code into the container
COPY . .

# Set environment variables during build (Next.js will use them for build time)
ARG NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API="http://localhost:4999"
ARG CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ARG CLOUDINARY_API_ENV_VARIABLE

# Build the Next.js app (this will create the `.next` folder for production)
RUN npm run build

# Use a smaller, production-ready image to serve the app
FROM node:18-slim

# Set the working directory inside the container for production
WORKDIR /app

# Copy the built Next.js app from the builder stage
COPY --from=builder /app .

# Install only production dependencies
RUN npm install --production --frozen-lockfile

# Expose the default port used by Next.js (3000)
EXPOSE 3000

# Set runtime environment variables
ENV NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API="${NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API}"
ENV CLOUDINARY_CLOUD_NAME="${CLOUDINARY_CLOUD_NAME}"
ENV CLOUDINARY_API_KEY="${CLOUDINARY_API_KEY}"
ENV CLOUDINARY_API_SECRET="${CLOUDINARY_API_SECRET}"
ENV CLOUDINARY_API_ENV_VARIABLE="${CLOUDINARY_API_ENV_VARIABLE}"

# Command to run the Next.js app
CMD ["npm", "start"]
