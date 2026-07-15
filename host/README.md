# Shorttiee Host Dashboard

Web dashboard for property hosts to manage shortlet listings, reservations, and account settings.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + Radix UI + HeroUI
- TanStack Query, React Hook Form, Zod
- Auto-generated API SDK from OpenAPI

## Setup

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Configure environment:

   ```bash
   cp .env.example .env
   ```

   Set `VITE_BASE_URL` to your API server URL (e.g. `http://localhost:8080`).

3. Start the dev server:

   ```bash
   yarn dev
   ```

## Scripts

| Script          | Description                    |
| --------------- | ------------------------------ |
| `yarn dev`      | Start Vite dev server          |
| `yarn build`    | Production build               |
| `yarn preview`  | Preview production build       |
| `yarn lint`     | Run ESLint                     |
| `yarn gen-sdk`  | Regenerate API client from OpenAPI |

## Routes

- **Auth:** login, sign up, forgot password, OTP verification, change password
- **Dashboard:** home, shortlets, reservations, profile, settings, notifications
