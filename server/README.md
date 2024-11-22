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
# Migration up
npm run migrate:up

# Migration down
npm run migrate:down
```

### Run dev server

```bash
npm run dev
```
