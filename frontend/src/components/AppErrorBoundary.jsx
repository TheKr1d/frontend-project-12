import * as Sentry from '@sentry/react';

export function AppErrorBoundary({ children }) {
  return (
    <Sentry.ErrorBoundary
      fallback={
        <main>
          <h1>Что-то пошло не так</h1>
          <p>Попробуйте обновить страницу.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Обновить страницу
          </button>
        </main>
      }
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
