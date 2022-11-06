import React from "react";
import { useState } from "react";

const Repositories = ({ repositories, onDeleterepo, onNewRepo }) => {
  const [newRepo, setNewRepo] = useState("");
  return (
    <div className="repositories">
      <h2 className="title">Repositórios</h2>

      <ul className="list">
        {Array.isArray(repositories)
          ? repositories.map((repo) => (
              <l1 className="item" key={repo.id}>
                <div className="info">
                  <div className="owner">{repo.nome.split('/')[0]}</div>
                  <div className="name">{repo.nome.split('/')[1]}</div>
                </div>
                <button onClick={() => onDeleterepo(repo)}>Apagar</button>
              </l1>
            ))
          : null}
      </ul>

      <div className="new">
        <label htmlFor="newRepo">Novo Repo</label>
        <input
          type="url"
          name="newRepo"
          id="newRepo"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button onClick={() => onNewRepo(newRepo)}>Adicionar</button>
      </div>
    </div>
  );
};

export default Repositories;
