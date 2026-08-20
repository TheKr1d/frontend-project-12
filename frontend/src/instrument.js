import * as Sentry from '@sentry/react';

console.log('DSN from env:', import.meta.env.VITE_SENTRY_DSN);

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  enabled: Boolean(import.meta.env.VITE_SENTRY_DSN),
  sendDefaultPii: false,
  tracesSampleRate: 0,
});
