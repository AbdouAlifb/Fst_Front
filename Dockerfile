# front/Dockerfile
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
# Use npm ci if you have a lockfile; fallback to npm i automatically
RUN if [ -f package-lock.json ]; then npm ci; else npm i; fi

COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build without static export
# (Make sure next.config.js does NOT set: output: 'export')
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
