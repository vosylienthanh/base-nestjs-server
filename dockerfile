# Base env config stage
FROM node:20.18.1-alpine AS base

ENV YARN_VERSION=4.5.3
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

# Build stage
FROM base AS builder

WORKDIR /app

COPY package*.json tsconfig*.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY ./src ./src

RUN yarn install --frozen-lockfile && yarn build

# Production stage
FROM base AS production

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json tsconfig*.json yarn.lock .yarnrc.yml .env ./
COPY .yarn ./.yarn
COPY --from=builder /app/dist ./dist

RUN yarn workspaces focus --production

EXPOSE 3000

CMD ["yarn", "start:prod"]