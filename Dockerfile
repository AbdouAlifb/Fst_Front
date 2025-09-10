# ---------- build ----------
FROM node:20-alpine AS build
WORKDIR /app

# more robust installs
RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-factor 2 \
 && npm config set fetch-retry-maxtimeout 300000 \
 && npm config set fetch-retry-mintimeout 20000

COPY package*.json ./
RUN npm ci

COPY . .
# produce static site into /app/out
RUN npm run build

# ---------- runtime ----------
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

# if next.config.js uses output:'export', build output is in /app/out
COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
