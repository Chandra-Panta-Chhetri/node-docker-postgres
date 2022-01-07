# Node, Docker, Postgresql, & Typescript REST API Boilerplate

- Node.js Architecture was taken from [Bulletproof Node.js](https://github.com/santiq/bulletproof-nodejs)
  - Does not include Dependency Injection, Decorators, Jobs

# Packages

- `celebrate`
  - Middleware that validates request inputs (i.e. req.body...etc)
- `morgan`
  - Logs HTTP requests (useful for debugging)
- `winston`
  - Logger with support for multiple transports (i.e. multiple ways to store logs)
- `event-dispatch`
  - Allows for registering & dispatching events (useful for separation of concerns)
- `nodemon`
  - Automatically restarts API when there are changes to any `.ts` files
- `dotenv`
  - Reads environmental variables from env file and makes it accessible via `process.env`
- `pg`
  - Connect to Postgres

To futher understand the architecture, refer to the [Bulletproof node.js project architecture blog](https://softwareontheroad.com/ideal-nodejs-project-structure/)

# Development

Uses `node` version `16.13.1`

[Docker Desktop](https://www.docker.com/products/docker-desktop) which includes Docker Engine, Docker CLI client, Docker Compose is required

1. Rename `.env-sample` to `.env` & change variables as needed (except `DB_HOST` & `DB_PORT`)
2. Start up Docker Desktop
3. Run `npm i` to install packages
4. Run `docker-compose up` in the terminal to start up the services in Docker containers

# Verify Setup

1. Make POST request to `http://localhost:5000/api/auth/signup` with `body` as `{"password": "hi"}`
   - Should get status `200` with response as `Sign up Successfully`
2. To view the DB via `PgAdmin`, use `host` as `localhost` & `port` as `5433` (yes `5433` **not** `5532` as we exposed `5433` in `docker-compose.yml`)
   - Should see database with name `db_name` & table `user` with 1 entry
