## [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Table of contents

* auto-gen TOC:
  {:toc}

### Tech stack

- Language: [NodeJS](https://nodejs.org/en/)
- Database: [Redis](https://redis.io/), [MongoDB](https://www.mongodb.com/), [PostgreSQL](https://www.postgresql.org/), [ElasticSearch](https://www.elastic.co/)
- Container: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
- Package manager: [Yarn](https://yarnpkg.com/en/)
- Linter: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- Package and library:
    - Typing: [TypeScript](https://www.typescriptlang.org/)
    - Framework: [express](https://expressjs.com/)
    - Authentication: [passport](https://www.npmjs.com/package/passport), [passport-jwt](https://www.npmjs.com/package/passport-jwt), [passport-local](https://www.npmjs.com/package/passport-local)
    - Logger: [winston](https://npmjs.com/package/winston), [morgan](https://www.npmjs.com/package/morgan)
    - Validation: [class-validator](https://www.npmjs.com/package/class-validator), [class-transformer](https://www.npmjs.com/package/class-transformer)
    - ORM: [Sequelize](https://sequelize.org/), [Mongoose](https://mongoosejs.com/)
    - Cache: [redis](https://www.npmjs.com/package/redis)
    - Search: [elasticsearch](https://www.npmjs.com/package/elasticsearch)
- Testing: [Jest](https://jestjs.io/), [Supertest](https://www.npmjs.com/package/supertest)

# Setup and development

## Coding convention and principles

- [Read this]('/docs/coding-convention.md')

### Installation

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

### Generators

```bash
nest new <projectname> # Generate new project
nest g co <featurename> # Generate controller feature (controller.spec, controller)
```

# Structure
> **_NOTE:_** </br>
> Module small: 5 files (`controller`, `service`, `dto`, `interface`, `spec`) </br>
> Module medium: 3 files (`controller`, `service`, `spec`) + 2 dir `dtos/` and `interfaces/`

| Name                                         | Description                                                                                                                                                                  |
|----------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **dist/**                                    | Compiled source files will be placed here                                                                                                                                    |
| **src/**                                     | Source files                                                                                                                                                                 |
| **src/docker/**                              | Dockerfile and docker-compose.yml                                                                                                                                            |
| **src/config/**                              | Configure environment and swagger                                                                                                                                            |
| **src/features/{feat}/{feat}.module.ts**     | A feature module simply organizes code relevant for a specific feature, keeping code organized and establishing clear boundaries.                                            |
| **src/features/{feat}/{feat}.controller.ts** | Controllers are responsible for handling incoming **requests** and returning **responses** to the client.                                                                    |
| **src/features/{feat}/{feat}.service.ts**    | This service will be responsible for data storage and retrieval, and is designed to be used by the `Controller`                                                              |
| **src/features/{feat}/{feat}.dto.ts**        | A DTO is an object that defines how the data will be sent over the **request**                                                                                               |
| **src/features/{feat}/{feat}.interface.ts**  | A Schema define how the data will be **response**                                                                                                                            |
| **src/features/{feat}/{feat}.spec.ts**       | Unit test                                                                                                                                                                    |
| **src/lib/**                                 | Connection of databases, using [`providers`](https://docs.nestjs.com/providers#provider-registration)                                                                        |
| **src/models/**                              | Model entities of database. Each type of database in a difference dir (Eg: `pg/`, `mongo/`)                                                                                  |
| **src/middleware/**                          | Additional middleware. Middleware functions have access to the request and response objects, and the next() middleware function in the application’s request-response cycle. |
| **src/utils/**                               | Additional function, constant, customized library                                                                                                                            |
| **src/app.module.ts**                        | The **root module** is the starting point Nest uses to build the application graph                                                                                           |
| **src/main.ts**                              | The entry file of the application which uses the core function NestFactory to create a Nest application instance                                                             |
| .env.example                                 | Example Environment configurations                                                                                                                                           |
| .env.test                                    | Test environment configurations                                                                                                                                              |

