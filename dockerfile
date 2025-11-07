# Base env config stage
FROM node:20.18.3-alpine AS base

ENV YARN_VERSION=4.10.3
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

# Build stage
FROM base AS builder

WORKDIR /app

COPY package*.json tsconfig*.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases ./.yarn/releases
COPY ./src ./src
COPY ./prisma ./prisma

RUN yarn install --frozen-lockfile && yarn prisma:generate && yarn build

# Production stage
FROM base AS production

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json tsconfig*.json yarn.lock .yarnrc.yml .env ./
COPY .yarn/releases ./.yarn/releases
COPY --from=builder /app/dist ./dist
# Enable below line if need to run migration inside code using child_process.exec
# COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated/prisma ./generated/prisma

RUN yarn workspaces focus --production

EXPOSE 3000

CMD ["yarn", "start:prod"]