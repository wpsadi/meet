# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Stage 2: Set up the production environment
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/ExpressSocket ./ExpressSocket

EXPOSE 3000 3001

# Copy the .env file
COPY .env.local .env.local

# Start the servers
CMD ["sh", "-c", "node -r dotenv/config -e \"require('concurrently')(\\\"next start\\\", \\\"node ExpressSocket/server.js\\\")\""]
