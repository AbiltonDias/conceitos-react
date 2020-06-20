import React, { useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRespositories(response.data);
    })
  }, [])


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'FrontEnd GoStack',
      url: 'Abilton Dias',
      techs: [
        'NodeJs', 'ReactJs'
      ]
    });

    const repository= response.data;
    
    setRespositories([...repositories, repository]);
    
  }

  async function handleRemoveRepository(id) {
    console.log(id)
    const repositoryIndex = repositories.findIndex(item => item.id === id);
   
    await api.delete(`repositories/${id}`);
    repositories.splice(repositoryIndex,1);
    setRespositories([...repositories]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repo => 
            <li key={repo.id}>
                {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
          </li>
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
