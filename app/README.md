# Shorttiee Guest App

Search for and book shortlet apartments around your location.

Built with Expo, React Native, and Expo Router.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set the API base URL:

   ```bash
   EXPO_PUBLIC_BASE_URL=http://localhost:8080
   ```

3. Start the app:

   ```bash
   npx expo start
   ```

   Use the Expo CLI to open on iOS, Android, or web.

## Scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `npx expo start`    | Start Expo dev server                |
| `npm run android`   | Start on Android                     |
| `npm run ios`       | Start on iOS                         |
| `npm run web`       | Start on web                         |
| `npm run sdk-gen`   | Regenerate API client from OpenAPI   |
| `npm test`          | Run Jest tests                       |

## Screens

- **Auth:** login, sign up, OTP, forgot password
- **Tabs:** home, favourites, bookings, profile
- **Booking flow:** apartment details, confirm booking, payment
