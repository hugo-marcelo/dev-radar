import React, { useState, useEffect } from 'react';

import api from '~/services/api';

import '~/App.css';
import '~/Sidebar.css';
import '~/Main.css';

import DevForm from '~/components/DevForm';
import DevItem from '~/components/DevItem';

function Main() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    loadDevs();
  }, []);

  async function loadDevs() {
    const response = await api.get('/devs');

    setDevs(response.data);
  }

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  async function handleDeleteDev() {
    loadDevs();
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} onClick={handleDeleteDev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Main;
