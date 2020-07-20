import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import '../../App.css';
import '../../Sidebar.css';
import '../../Main.css';

import DevForm from '../../components/DevForm';
import DevItem from '../../components/DevItem';
import UpdateForm from '../../components/UpdateForm';

function Main() {
  const [devs, setDevs] = useState([]);
  const [actualDev, setActualDev] = useState('');
  const [editMode, setEditMode] = useState(false);

  async function loadDevs() {
    const response = await api.get('/devs');
    setDevs(response.data);
  }

  useEffect(() => {
    loadDevs();
  }, []);

  async function handleSubmit(data) {
    const response = await api.post('/devs', data);
    setDevs([response.data, ...devs]);
  }

  async function handleDelete(data) {
    await api.delete(`/devs/${data.github_username}`);
    setDevs(devs.filter(dev => dev.github_username !== data.github_username));
  }

  async function handleUpdate(data) {
    await api.put(`/devs/${actualDev.github_username}`, data);

    loadDevs();
    setMode();
  }

  function loadMode() {
    if (editMode) {
      return (
        <aside>
          <strong>Editar</strong>
          <UpdateForm
            onUpdateForm={handleUpdate}
            onCancel={setMode}
            dev={actualDev}
          />
        </aside>
      );
    }
    return (
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit} />
      </aside>
    );
  }

  function setMode(data) {
    if (!editMode) {
      setEditMode(true);
      setActualDev(data);
    } else {
      setEditMode(false);
    }
  }

  return (
    <div id="app">
      {loadMode()}
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem
              key={dev._id}
              dev={dev}
              onDeleteForm={handleDelete}
              onUpdateClick={setMode}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Main;
