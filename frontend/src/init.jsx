/* eslint-disable functional/no-expression-statement */

import 'bootstrap/dist/css/bootstrap.min.css';

import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import resources from './locales/index.js';

import Chat from './components/Chat.jsx';
import Authorization from './components/Authorization.jsx'
import NotFound from './components/NotFound.jsx';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Chat />} />
          <Route path='/login' element={<Authorization />} />
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  );
};

export default init;