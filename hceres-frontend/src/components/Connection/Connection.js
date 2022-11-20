import React, {Component} from "react";
import "./Connection.css";
import Logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import {FaUserAlt} from 'react-icons/fa';
import {FaKey} from 'react-icons/fa';
import {Navigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {Alert} from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login: "",
      pass: "",
      canLogin: false,
      errorLogin: null,
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
    event.preventDefault();
    if (this.state.login === "admin" && this.state.pass === "admin") {
      this.setState({canLogin: true});
      this.setState({errorLogin: null});
    } else {
      this.setState({errorLogin: "Login ou mot de passe Incorrecte!"});
    }
  }

  render() {
    if(this.state.canLogin){
      return <Navigate push to="/Home" />;
    }
    return (
      <div className="login fadeInDown">
      <form className="login_form" onSubmit={this.checkLogin}>
        <div className="header_login">
        <img src={Logo} alt="Logo" width="100" className={"fadeIn first"}/>
            <h1 className={"fadeIn first"}> Connexion </h1>
        </div>

        <label className="username_label fadeIn second">
          <i><FaUserAlt/></i>
          <input type="username" placeholder="Nom d'utilisateur" value={this.state.login} onChange={this.handleLogin}/>
        </label>
        <label className="password_label fadeIn third">
          <i><FaKey/></i>
          <input type="password" placeholder="Mot de passe" value={this.state.pass} onChange={this.handlePass}/>
        </label>
        {this.state.errorLogin && <Alert className={"alert-danger"}>{this.state.errorLogin}</Alert>}
        <Button variant={"primary"} className={"btn-primary fadeIn fourth"} value={"connection"} type={"submit"}> Connexion</Button>
      </form>
      </div>
    );
  }
  
}

export default Login;
