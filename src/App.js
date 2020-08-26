import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";
import Header from './components/Header';

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then((response) => {
        setRepos(response.data);
        console.log(response);
      });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'AngularJS',
      url: 'https://github.com/vinieloy/app-angular-repositories',
      techs: ['NodeJS', 'Javascript', 'AngularJS']
    });

    const repo = response.data;

    setRepos([
      ...repos,
      repo
    ]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    setRepos(repos.filter(
      (repo) => repo.id !== id
    ));
  }

  return (
    <div>
      <Header title="Repositórios" />

      <ul data-testid="repository-list">

        {repos.map(function(repo) {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
