# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS builder



# Set the working directory in the container
WORKDIR /app

# Install git
RUN apk add --no-cache git

# Clone the repository
RUN git clone https://github.com/rubenfb23/poultry-insight-digital-twin/

# Copy package.json and bun.lockb (or package-lock.json if you use npm)
# These files should be in the cloned repository, so this step might be redundant
# or adjusted depending on the repository structure.
# If they are at the root of the repo, the git clone already brought them.
# COPY package.json bun.lockb ./

# Install dependencies
# If you are using npm instead of bun, you might want to use:
# RUN npm install --legacy-peer-deps
# Or generate a package-lock.json with npm install and copy that instead of bun.lockb
RUN npm install

# Copy the rest of the application code
# This is no longer needed as the code is cloned from git
# COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application using a lighter-weight image
FROM node:20-alpine

WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/dist ./dist
# Copy necessary files for running the preview server
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/vite.config.ts ./vite.config.ts

# Install only production dependencies if 'vite' is a devDependency
# and 'npm run preview' relies on it.
# If vite is a direct dependency, this is not strictly needed for 'vite preview'
# but good practice if you were using a different server.
# We need vite to run 'npm run preview'
RUN npm install --omit=dev vite

# Expose the port the app runs on
EXPOSE 8080

# The command to start the app
CMD ["npm", "run", "preview"]
