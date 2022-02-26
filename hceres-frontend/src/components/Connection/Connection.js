import React from "react";
import "./Connection.css";
import Logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import {FaUserAlt} from 'react-icons/fa';
import {FaKey} from 'react-icons/fa';
export default function Login() {
  return (
    <div className="login">
    <form className="login_form">
      <div className="header_login">
      <img src={Logo} alt="Logo" width="100"/>
          <h1> Connexion </h1>
      </div>
      
      <label className="username_label">
        <i><FaUserAlt/></i>
        <input type="username" placeholder="Nom d'utilisateur"/>
      </label>
      <label className="password_label">
      <i><FaKey/></i>
        <input type="password" placeholder="Mot de passe"/>
      </label>
      <div className="button_login">
      <Link to="/Home"><input type="submit" value="Connexion"/></Link>
      </div>
    </form>
    </div>
  );
}