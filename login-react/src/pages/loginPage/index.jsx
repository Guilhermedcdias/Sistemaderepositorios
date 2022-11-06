import React, {useState, useContext} from "react";
import './style.css';
import { AuthContext } from "../../contexts/auth";

const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        login(email, password)
    }

    return(
        <div id="login">
            <h1 className="title">
                Login do Sistema
            </h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="field">
                    <label htmlFor="password">Email</label>
                    <input type="password" name="password" id="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="actions">
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </div>
    )
}   


export default LoginPage;