# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run
FROM node:18-alpine AS runner
WORKDIR /app

# Copy package.json and node_modules
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env ./

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/main.js"]
