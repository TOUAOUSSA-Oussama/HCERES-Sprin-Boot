import React, { Component } from "react";
import "./Connection.css";
import Logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import {FaUserAlt} from 'react-icons/fa';
import {FaKey} from 'react-icons/fa';
import { Navigate } from "react-router-dom";

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      login: "",
      pass: "",
      canLogin: false,
    }
    
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.checkLogin = this.checkLogin.bind(this);

  }

  handleLogin(event){
    this.setState({login: event.target.value});
  }

  handlePass(event){
      this.setState({pass: event.target.value});
  }

  checkLogin(event){
      if(this.state.login==="admin" && this.state.pass==="admin") {
        this.setState({canLogin: true});
      }
  }

  render() {
    if(this.state.canLogin){
      return <Navigate push to="/Home" />;
    }
    return (
      <div className="login">
      <form className="login_form" onSubmit={this.checkLogin}>
        <div className="header_login">
        <img src={Logo} alt="Logo" width="100"/>
            <h1> Connexion </h1>
        </div>
        
        <label className="username_label">
          <i><FaUserAlt/></i>
          <input type="username" placeholder="Nom d'utilisateur" value={this.state.login} onChange={this.handleLogin}/>
        </label>
        <label className="password_label">
        <i><FaKey/></i>
          <input type="password" placeholder="Mot de passe" value={this.state.pass} onChange={this.handlePass}/>
        </label>
        <div className="button_login">
          <button type="submit" value="Connexion">Connexion</button>
        </div>
      </form>
      </div>
    );
  }
  
}

export default Login;