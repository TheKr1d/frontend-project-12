// init.jsx
/* eslint-disable functional/no-expression-statement */
import './instrument';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppErrorBoundary } from './components/components/AppErrorBoundary.jsx';
import NavScrollExample from './components/components/Navbar.jsx';
import ProtectedRoute from './components/components/ProtectedRoute';
import Authorization from './components/pages/Authorization.jsx';
import Chat from './components/pages/Chat.jsx';
import Login from './components/pages/Login.jsx';
import NotFound from './components/pages/NotFound.jsx';
import i18n, { i18nReady } from './i18n.js';
import { restoreAuth } from './slices/auth.js';
import store from './slices/index.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <NavScrollExample>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Authorization />} />
        </Routes>
      </NavScrollExample>
    </BrowserRouter>
  );
};

const app = async () => {
  await i18nReady;

  const root = ReactDOM.createRoot(document.querySelector('#chat'));

  root.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <MantineProvider>
          <Notifications position="top-center" zIndex={1000} />
          <AppErrorBoundary>
            <App />
          </AppErrorBoundary>
        </MantineProvider>
      </I18nextProvider>
    </Provider>,
  );
};

app();
