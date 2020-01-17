import React from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';

import './styles.css';

function DevItem({ dev, onClick }) {
  async function handleDeleteDev(github_username) {
    try {
      await api.delete(`/devs/${github_username}`);

      toast.success('Dev removido');

      await onClick();
    } catch (err) {
      const { error } = err.response.data;

      toast.success(error);
    }
  }

  return (
    <li className="dev-item">
      <header>
        <div className="profile">
          <img src={dev.avatar_url} alt={dev.name} />

          <div className="info">
            <strong>{dev.name}</strong>
            <span>{dev.techs.join(', ')}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => handleDeleteDev(dev.github_username)}
        >
          <MdDelete size={20} />
        </button>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no Github
      </a>
    </li>
  );
}

export default DevItem;
