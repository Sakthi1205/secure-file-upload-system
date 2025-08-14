# Use a small Node image
FROM node:20-alpine

# App dir
WORKDIR /app

# Install only what's needed
COPY package*.json ./
RUN npm ci --omit=dev

# Copy code
COPY . .

# Ensure temp upload dir exists
RUN mkdir -p uploads

# Environment (can be overridden at runtime)
ENV NODE_ENV=production \
    PORT=3000

# Healthcheck (optional but nice)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD wget -qO- http://localhost:3000/ || exit 1

EXPOSE 3000
CMD ["node", "server.js"]
