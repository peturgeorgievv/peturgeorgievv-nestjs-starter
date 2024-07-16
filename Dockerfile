FROM node:18 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --development
RUN rm -rf .npmrc

COPY tsconfig*.json ./
COPY src/ src/

RUN npm run build

FROM node:18 as builder

WORKDIR /app

ARG NODE_ENV=production

COPY package*.json ./

RUN npm ci --production

FROM node:18-alpine as production

WORKDIR /app

RUN apk --no-cache add curl postgresql-client

COPY package*.json ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000 443

CMD npx typeorm migration:run -d dist/config/migrations-prod.config.js && node dist/main
