# Shorttiee

Shorttiee is a shortlet and rental property platform. Guests browse and book apartments from the mobile app, hosts manage listings and reservations from a web dashboard, and a marketing landing page introduces the product. All clients talk to a shared Express API backed by PostgreSQL.

## Repository structure

This is a monorepo with four independent packages:

| Package   | Description                                      | Stack                          |
| --------- | ------------------------------------------------ | ------------------------------ |
| `app/`    | Guest mobile app (iOS, Android, web)             | Expo, React Native, Expo Router |
| `host/`   | Host dashboard for managing shortlets            | React, Vite, Tailwind CSS      |
| `server/` | REST API, auth, file uploads, reservations       | Express, TypeScript, Kysely    |
| `landing/`| Marketing website                                | HTML, Tailwind CSS, JavaScript |

Each package has its own dependencies and scripts. Install and run them separately.

## Features

### Guest app (`app/`)

- Browse shortlet listings by category and location
- View apartment details and make reservations
- Manage bookings and favourites
- User authentication (sign up, login, OTP, password reset)
- Profile management

### Host dashboard (`host/`)

- Authentication and account management
- Create, edit, and manage shortlet listings
- View and manage reservations
- Profile, settings, and notifications

### API (`server/`)

- User registration and JWT authentication
- Listings, categories, and facilities
- Reservation lifecycle
- File uploads for listing images
- Role-based access (USER, ADMIN)
- OpenAPI docs (Swagger UI and Scalar)

### Landing page (`landing/`)

- Responsive marketing site with service, about, and FAQ sections
- App store links and host onboarding call-to-action

## Prerequisites

- **Node.js** 20.x (used in CI)
- **npm** or **yarn**
- **PostgreSQL** 17+ (for the API)
- **Expo Go** or a native simulator/emulator (for the mobile app)

## Getting started

### 1. Clone the repository

```bash
git clone git@github.com:chimdie/shorttiee.git
cd shorttiee
```

### 2. Start the API server

```bash
cd server
npm install
```

Create a `.env` file in `server/` with the variables defined in [`server/src/dto/env.dto.ts`](server/src/dto/env.dto.ts):

| Variable         | Description                          |
| ---------------- | ------------------------------------ |
| `PORT`           | Server port (e.g. `8080`)            |
| `JWT_SECRET`     | Secret for signing JWT tokens        |
| `OTP_SIZE`       | Length of OTP codes                  |
| `OTP_TTL`        | OTP expiry in seconds                |
| `UPLOAD_PATH`    | Directory for uploaded files         |
| `FILE_SIZE_LIMIT`| Max upload size in bytes             |
| `EMAIL_USER`     | SMTP email address                   |
| `EMAIL_PASS`     | SMTP password                        |
| `EMAIL_HOST`     | SMTP host                            |
| `ADMIN_EMAIL`    | Bootstrap admin email                |
| `ADMIN_PASS`     | Bootstrap admin password             |
| `APP_ENV`        | `development`, `test`, `staging`, or `production` |
| `DB_NAME`        | PostgreSQL database name             |
| `DB_HOST`        | PostgreSQL host                      |
| `DB_USER`        | PostgreSQL user                      |
| `DB_PASSWORD`    | PostgreSQL password                  |
| `DB_PORT`        | PostgreSQL port                      |

Run migrations and seeds, then start the dev server:

```bash
npm run migrate:up
npm run seed:run
npm run dev
```

The API is available at `http://localhost:<PORT>/api/v1`.

- Swagger UI: `http://localhost:<PORT>/api/v1/docs`
- Scalar reference: `http://localhost:<PORT>/api/v1/docs/reference`

See [`server/README.md`](server/README.md) for more server details.

### 3. Start the guest mobile app

```bash
cd app
npm install
```

Create an environment file (or set in your shell) with the API base URL:

```bash
EXPO_PUBLIC_BASE_URL=http://localhost:8080
```

Start Expo:

```bash
npx expo start
```

Use the Expo CLI to open iOS, Android, or web. See [`app/README.md`](app/README.md).

### 4. Start the host dashboard

```bash
cd host
yarn install   # or npm install
```

Copy the example env and point it at the API:

```bash
cp .env.example .env
# Set VITE_BASE_URL=http://localhost:8080
```

Start the dev server:

```bash
yarn dev   # or npm run dev
```

The dashboard runs at `http://localhost:5173` by default. See [`host/README.md`](host/README.md).

### 5. Start the landing page

```bash
cd landing
npm install
npm run dev
```

This runs Tailwind CSS in watch mode and serves the site with live-server. See [`landing/README.md`](landing/README.md).

## API overview

Base path: `/api/v1`

| Route                    | Purpose                        |
| ------------------------ | ------------------------------ |
| `/auth`                  | Register, login, password reset |
| `/users`                 | User profile management        |
| `/users/reservations`    | Guest reservations             |
| `/listings`              | Property listings              |
| `/categories`            | Listing categories             |
| `/facilities`            | Listing amenities              |
| `/files`                 | Image and file uploads         |
| `/docs`                  | API documentation              |

Clients use auto-generated SDKs from the OpenAPI spec:

- **App:** `npm run sdk-gen` in `app/` (source: `app/sdk/openapi.json`)
- **Host:** `npm run gen-sdk` in `host/` (source: `host/src/sdk/openapi.yaml`)

## Database

PostgreSQL with [Kysely](https://kysely.dev/) for queries and migrations.

```bash
cd server

npm run migrate:up      # Apply migrations
npm run migrate:down    # Roll back all migrations
npm run seed:run        # Seed categories and sample data
```

Main tables: users, authentications, listings, categories, facilities, reservations, files.

## Testing

Server tests run against a test database with Jest:

```bash
cd server
npm test
```

CI runs lint and tests on pull requests that touch `server/**` (see [`.github/workflows/server.ci.yml`](.github/workflows/server.ci.yml)).

## Project layout

```plaintext
shorttiee/
├── app/                 # Expo guest mobile app
│   ├── app/             # Expo Router screens
│   ├── components/      # Shared UI components
│   └── sdk/             # Generated API client
├── host/                # Host web dashboard
│   └── src/
│       ├── pages/       # Route pages
│       ├── components/  # UI components
│       └── sdk/         # Generated API client
├── server/              # Express API
│   ├── db/
│   │   ├── migrations/  # Kysely migrations
│   │   └── seeds/       # Seed scripts
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── dto/
│       └── tests/
├── landing/             # Marketing site
│   ├── index.html
│   ├── styles/
│   └── assests/
└── .github/workflows/   # CI pipelines
```

## License

MIT — see [`server/package.json`](server/package.json).
