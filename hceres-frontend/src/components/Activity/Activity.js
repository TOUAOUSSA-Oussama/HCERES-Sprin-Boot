import React from 'react';
import IncomingMobility from './IncomingMobility';
import './Activity.css'
import Navbar from '../Navbar/Navbar';

import PostDoctorat from './PostDoctorat';
import Editorial from './Editorial';
import Review from './Review';
import {Alert} from "react-bootstrap";

export default function Activity() {
    const [showIncomingMobility, setIncomingMobility] = React.useState(false);
    const [DateProjectStart, setDateProjectStart] = React.useState(null);
    const [showPostDoctorat, setShowPostDoctorat] = React.useState(false);
    const [showEditorial, setShowEditorial] = React.useState(false);
    const [showReview, setShowReview] = React.useState(false);

    return (
        <div>
            <div className='activity-container'>
                <div className='header'>
                    {<Alert variant={"warning"}><h1>Page a remplacer plus tard par l'onglet activités</h1> <s>Activity.js</s> ActivityList.js</Alert>}
                    <h1>
                        Bienvenue dans la section d'ajout d'activités
                    </h1>
                    <h3>
                        Choisissez une activité à ajouter parmi les activités suivantes. Si vous nous trouvez pas
                        l'activité recherchée, contactez le support.
                    </h3>
                </div>
                <div className='activityList'>
                    <ul>
                        <li onClick={() => setIncomingMobility(true)}>
                            <a>Mobilité entrante</a>
                        </li>
                        <li>
                            <a>Mobilité sortante</a>
                        </li>
                        <li onClick={() => setShowEditorial(true)}>
                            <a>Edition</a>
                        </li>
                        <li>
                            <a>Création d'entreprise</a>
                        </li>
                        <li onClick={() => setShowPostDoctorat(true)}>
                            <a>PostDoctorat</a>
                        </li>
                        <li>
                            <a>Brevet</a>
                        </li>
                        <li onClick={() => setShowReview(true)}>
                            <a>Revue</a>
                        </li>
                    </ul>



                </div>
                {showIncomingMobility && (<IncomingMobility onHideAction={() => setIncomingMobility(false)}> </IncomingMobility>)}
                {showPostDoctorat && (<PostDoctorat onHideAction={() => setShowPostDoctorat(false)}> </PostDoctorat>)}
                {showEditorial && (<Editorial onHideAction={() => setShowEditorial(false)}></Editorial>)}
                {showReview && (<Review onHideAction={() => setShowReview(false)}></Review>)}
            </div>
        </div>
    )
}

