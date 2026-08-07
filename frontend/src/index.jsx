// init.jsx
/* eslint-disable functional/no-expression-statement */

import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authorization from './components/Authorization.jsx';
import Chat from './components/Chat.jsx';
import NotFound from './components/NotFound.jsx';
import resources from './locales/index.js';
import { restoreAuth } from './slices/auth.js';
import store from './slices/index.js';

const App = ({ i18n }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Authorization />} />
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  );
};

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  return (
    <Provider store={store}>
      <App i18n={i18n} />
    </Provider>
  );
};

const app = async () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(await init());
};

app();

export default init;
