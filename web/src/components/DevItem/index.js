import React from 'react';
import { Edit, Delete } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';

import './styles.css';

function DevItem({ dev, onDeleteForm, onUpdateClick }) {
  const { _id, avatar_url, name, techs, github_username, bio } = dev;

  async function handleDelete() {
    await onDeleteForm({ github_username });

    toast.success('Dev removido');
  }

  async function handleUpdateState() {
    await onUpdateClick({ _id, github_username });
  }

  return (
    <li className="dev-item">
      <header>
        <div className="profile">
          <img src={avatar_url} alt={name} />

          <div className="info">
            <strong>{name}</strong>
            <span>{techs.join(', ')}</span>
          </div>
        </div>
        <Button size="small" color="primary" onClick={handleDelete}>
          <Delete fontSize="default" />
        </Button>
      </header>
      <p>{bio}</p>
      <footer>
        <a href={`https://github.com/${github_username}`}>
          Acessar perfil no Github
        </a>
        <Button size="small" color="secondary" onClick={handleUpdateState}>
          <Edit fontSize="default" />
        </Button>
      </footer>
    </li>
  );
}

export default DevItem;
