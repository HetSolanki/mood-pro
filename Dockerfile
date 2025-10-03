FROM node:20 AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci --force
COPY . .

ARG TURSO_AUTH_TOKEN
ARG TURSO_DATABASE_URL
ARG NEXT_PUBLIC_GEMINI_API_KEY
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL
ARG NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL
ARG NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL

ENV TURSO_AUTH_TOKEN=$TURSO_AUTH_TOKEN
ENV TURSO_DATABASE_URL=$TURSO_DATABASE_URL
ENV NEXT_PUBLIC_GEMINI_API_KEY=$NEXT_PUBLIC_GEMINI_API_KEY

RUN npx prisma generate
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]