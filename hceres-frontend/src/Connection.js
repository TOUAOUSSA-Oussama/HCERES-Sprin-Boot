import './App.css';
import React from 'react';
import log_1 from './assets/logo_1.png'
import logoCarre from './assets/logoCarre.png'
import userSolid from './assets/user-solid.svg'
import keySolid from './assets/key-solid.svg'

function Connection() {
    return (
        <div>
            <img id="logo" src={log_1} alt="logo" ></img>

            <div class="wrapper">

                <div id="formContent">

                    <div class="fadeIn first">
                    <img src={logoCarre.png} id="icon" alt="User Icon"></img>
                    </div>
                </div>
            </div>

            <div class="connexion_text">Connexion</div>

            <form action="login.do" method="POST">
                <div id="login">
                    <img src={userSolid} alt="user_icon" id="user_icon"></img>
                    <input type="text" id="login_form" name="user" placeholder="Nom d'utilisateur"></input>
                </div>


                <div id="password">
                    <img src={keySolid} alt="lock_icon" id="pw_icon"></img>
                    <input type="password" id="password_form" name="passwd" placeholder="Mot de passe"></input>
                </div>
                <input type="submit" value="Connexion"></input>
            </form>
        </div>

    );
}

export default Connection;