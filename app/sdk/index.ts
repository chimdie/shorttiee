import * as API from './generated';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL as string;

API.OpenAPI.BASE = BASE_URL;
console.log('API URL', BASE_URL);
export const APISDK = API;
