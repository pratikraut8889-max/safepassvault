# Build Angular 18 SSR and include all Node.js API dependencies from the root package.json.
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build:fullstack

# Runtime runs a single Node.js process for Angular SSR and all /api routes.
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/SafePassVaullAPI ./SafePassVaullAPI

EXPOSE 4000
CMD ["npm", "start"]
