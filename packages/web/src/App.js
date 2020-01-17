import React from 'react';
import { ToastContainer } from 'react-toastify';

import Main from './pages/Main';

import GlobalStyle from './styles/global';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
      <Main />
    </>
  );
}
