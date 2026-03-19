# Using an older Node image but switching to lightweight alpine 
FROM node:22-alpine

# Set main working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install npm packages
RUN npm install

# Copy application source code
COPY . .

# Create a non-root user for security
RUN adduser -D appuser
USER appuser

# Expose our updated API port
EXPOSE 4000

# Start up the express server
CMD ["node", "server.js"]