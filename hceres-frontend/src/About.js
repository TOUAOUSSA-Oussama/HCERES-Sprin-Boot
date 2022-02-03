import './App.css';
import React from 'react';
import welcomImage from './assets/welcomImg.png';


function About(){
    return (
        <div>
            <div class="container1">
                <div class="left-side">
                    <div class="title">
                        About cette application !
                    </div>
                    <div class="pg">
                        Cette application web a été créée par une équipe d'éudiants de l'Ecole Centrale de Nantes dans le
                        contexte d'un projet de groupe en option Informatique en 2021.Le suivi de l'application a été confiée à la DSI de l'université de Nantes.
                    </div>
                </div>
                <div class="right-side">
                    <img class="labo" src={welcomImage} alt= "Hello" />
                </div>
            </div>
        </div>
    );
};

export default About;