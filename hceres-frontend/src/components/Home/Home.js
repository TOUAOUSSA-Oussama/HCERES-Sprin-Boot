// Cette component est pour definir Home
//import '../../App.css';
import './Home.css';
import React from 'react';
import welcomImage from '../../assets/welcomImg.png';
//import { HomeContainer,leftside,rightside } from './HomeElements';
//style={{ backgroundColor: "#" + `${randomColor}` }}
//let randomColor = Math.floor(Math.random() * 16777215).toString(16);
function Home(){
    return (
        <div>
            <div class="container1" >
                <div class="left-side">
                    <div class="title">
                        Bienvenue !
                    </div>
                    <div class="pg">
                    Serveur d'administration des données pour les enquêtes HCERES
                    </div>
                </div>
                <div class="right-side">
                    <img class="labo" src={welcomImage} alt= "Hello" />
                </div>
            </div>
        </div>
    );
};

export default Home;