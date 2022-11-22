import React, {Component, useState} from "react";
import "./Connection.css";
import Logo from '../../assets/logo.png';
import {FaUserAlt} from 'react-icons/fa';
import {FaKey} from 'react-icons/fa';
import Button from "react-bootstrap/Button";
import {Alert} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {authenticateUser} from "../../services";
import {useLocation, useNavigate} from "react-router-dom";
import authToken from "../../utils/authToken";

const Login = (props) => {
    // state are parameter passed by navigate functions
    const navState = useLocation().state;
    const [errorLogin, setErrorLogin] = useState(navState ? navState.errorLogin : "");
    const initialState = {
        login: "",
        password: "",
    };

    const [user, setUser] = useState(initialState);

    const credentialChange = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateUser = (event) => {
        authToken('');
        dispatch(authenticateUser(user.login, user.password))
            .then((response) => {
                navigate("/Home");
            })
            .catch((error) => {
                console.log(error)
                resetLoginForm();
                setErrorLogin("Combinaison invalide de login et de mot de passe");
            });
    };

    const resetLoginForm = () => {
        setUser(initialState);
    };

    return (
        <div className="login fadeInDown">
            <form className="login_form">
                <div className="header_login">
                    <img src={Logo} alt="Logo" width="100" className={"fadeIn first"}/>
                    <h1 className={"fadeIn first"}> Connexion </h1>
                </div>

                <label className="username_label fadeIn second">
                    <i><FaUserAlt/></i>
                    <input type="username" placeholder="Nom d'utilisateur" name="login" value={user.login}
                           onChange={credentialChange}/>
                </label>
                <label className="password_label fadeIn third">
                    <i><FaKey/></i>
                    <input type="password" placeholder="Mot de passe" name="password" value={user.password}
                           onChange={credentialChange}/>
                </label>
                {errorLogin && <Alert className={"alert-danger"} dismissible={true} onClose={()=>setErrorLogin('')}>{errorLogin}</Alert>}
                <Button variant={"primary"} className={"btn-primary fadeIn fourth"} value={"connection"}
                        disabled={user.login.length === 0 && user.password.length === 0}
                        onClick={validateUser}> Connexion</Button>
            </form>
        </div>
    );
}

export default Login;
