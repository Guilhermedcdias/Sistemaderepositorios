import React, { useContext } from "react";
import "./style.css";
import { AuthContext } from "../../contexts/auth";
import Nav from "./Nav";
import Search from "./Search";
import Repositories from "./Repositories";
import { getRepositories, createRepositories, destroyRepositories } from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const loadData = async (query = "") => {
    try {
      setLoading(true);
      const reponse = await getRepositories(user?.id, query);
      setRepositories(reponse.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  };
  useEffect(() => {
    (async () => await loadData())();
  }, []);
  const { authenticated, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  const handleSearch = (query) => {
    loadData(query);
  };

  const handleDeleteRepo = async(repositorio) => {
    try{
      await destroyRepositories(user?.id, repositorio.id);
      await loadData();
    } catch(err){
      console.error(err);
      setLoadingError(true)
    }
  };
  const handleNewRepo = async (url) => {
    try {
      await createRepositories(user?.id, url);
      await loadData();
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  };

  if (loadingError) {
    return (
      <div className="loading">
        erro ao carregar, atualize a pagina <Link to="/login">Voltar</Link>
      </div>
    );
  } else {
    if (loading) {
      return <div className="loading">carregando...</div>;
    } else {
      return (
        <>
          <div id="main">
            <Nav onLogout={handleLogout} />
            <Search onSearch={handleSearch} />
            <Repositories
              repositories={repositories}
              onDeleterepo={handleDeleteRepo}
              onNewRepo={handleNewRepo}
            />

          </div>
        </>
      );
    }
  }
};
export default HomePage;
