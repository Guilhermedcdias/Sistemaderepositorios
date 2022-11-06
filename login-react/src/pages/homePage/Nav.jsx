import React from "react";


const Nav = ({onLogout}) => {
    return(
        <div className="nav">
          <h1 className="logo">SisRepo</h1>
          <button onClick={onLogout}>sair</button>
        </div>
    )
}

export default Nav;