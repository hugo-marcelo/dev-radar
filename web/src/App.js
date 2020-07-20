import React from 'react';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import Main from './pages/Main';

import GlobalStyle from './styles/global';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer autoClose={2000} />
      <Main />
    </>
  );
}
