import axios from "axios";

export const crud = axios.create({
  baseURL: "http://localhost:5000",
});

export const createSession = async (email, senha) => {
  return crud.post('/sessions', {email, senha});
}

export const getRepositories = async (user_id, query) => {
  let url = `/users/${user_id}/repositories/`;

  if (query !== "") {
    url += `?q=${query}`;
  }

  console.log("query", url)

  return crud.get(url);
};

export const destroyRepositories = async (user_id, id) => {
  const url = `/users/${user_id}/repositories/${id}`;
  return crud.delete(url);
};

export const createRepositories = async (user_id, repository_url) => {
  const url = `/users/${user_id}/repositories/`;
  const repo_name = getRepositoryName(repository_url);
  return crud.post(url, {
    nome: repo_name,
    url: repository_url,
  });
};

const getRepositoryName = (url) => {
  const regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\\+.~#?&\\/\\/=]*)/;
  const match = url.match(regex);
  if (match[2]) {
    const values = match[2].split("/");
    return `${values[1]}/${values[2]}`;
  }
};
