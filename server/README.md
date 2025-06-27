# Shorttiee Server

## Server setup

### Install dependencies

```bash
npm install
```

### Add env

Create a .env file and ensure it matches the value in [EnvDto](src/dto/env.dto.ts)

### Run migrations

```bash
# Migration down
npm run migrate:down

# Migration up
npm run migrate:up

# Seed run
npm run seed:run
```

### Run dev server

```bash
npm run dev
```
