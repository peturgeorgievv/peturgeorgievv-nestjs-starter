## Description

Growing NestJS starter. The master branch is always the latest starter. Each branch is associated with an article that have enriched the project. Article links are below and would be good to be read before using, to understand what and why is done like this.

- Creating our Starter. Setup a NestJS Project with GraphQL, TypeORM - https://peturgeorgievv.com/blog/setup-nestjs-project-with-graphql-typeorm-production-ready [initial]
- Ease up deployment. Create Production Dockerfile with Migrations - https://peturgeorgievv.com/blog/nestjs-with-typeorm-and-docker-running-migrations-before-start [dockerfile-migrations]
- Scale with caching. Create reusable REDIS service with NestJS - https://peturgeorgievv.com/blog/create-redis-service-with-nestjs-use-in-every-project [redis-integration]
- Understand and learn how TypeORM migrations work - https://peturgeorgievv.com/blog/typeorm-migrations-explained-example-with-nestjs-and-postgresql [typeorm-migrations-explained]

## Preparation

- Create .env file and copy env.local contents into it.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
