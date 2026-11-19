// One place that reads environment variables, so the rest of the app
// imports `env` instead of touching import.meta.env directly.
const read = (key, fallback = '') => import.meta.env[key] ?? fallback

export const env = {
  clientApiUrl: read('VITE_CLIENT_API_URL'),
  cmUrl: read('VITE_CM_URL'),
  operatorUid: read('VITE_OPERATOR_UID'),
  operatorId: read('VITE_OPERATOR_ID'),
  usernamePrefix: read('VITE_USERNAME_PREFIX'),
  countryCallingCode: read('VITE_COUNTRY_CALLING_CODE', '233'),
  cmUsername: read('VITE_CM_USERNAME'),
  cmPassword: read('VITE_CM_PASSWORD'),
  imageAccessKey: read('VITE_IMAGE_ACCESS_KEY'),
  bypassAuth: read('VITE_BYPASS_AUTH') === 'true',
}
