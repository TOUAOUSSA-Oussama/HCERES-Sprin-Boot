// Cette component est pour definir About
//import '../../App.css';
import './About.css';
import React from 'react';
import welcomImage from '../../assets/welcomImg.png';
import Navbar from '../Navbar/Navbar';
import {Link} from "react-router-dom";
import {ImBackward} from "react-icons/im";
function About() {
    return (
        <div>
            <div className="container2">
                <div className="left-side1">
                    <img className="labo1" src={welcomImage} alt="Hello"/>
                </div>
                <div className="right-side1">
                    <div className="pg1">
                        <div className="title1">
                             About !
                        </div>
                        Cette application web a été créée par une équipe d'éudiants de l'Ecole Centrale de
                        Nantes dans le contexte d'un projet de groupe en option Informatique en 2021.Le suivi de
                        l'application a été confiée à la DSI de l'université de Nantes.
                        <h1>
                            <br/>
                            <Link to={-1}>{<ImBackward color={"white"}/>}</Link>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;