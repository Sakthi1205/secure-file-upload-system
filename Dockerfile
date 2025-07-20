# Dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port and run server
EXPOSE 3000
CMD ["node", "server.js"]
