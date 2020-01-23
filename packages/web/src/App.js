import dotenv from 'dotenv';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import Main from './pages/Main';

import GlobalStyle from './styles/global';

dotenv.config();

export default function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer autoClose={2000} />
      <Main />
    </>
  );
}
