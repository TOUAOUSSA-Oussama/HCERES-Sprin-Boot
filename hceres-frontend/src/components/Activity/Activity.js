import React from 'react';
import './Activity.css'

import PostDoctorat from './PostDoctorat';
import {Alert} from "react-bootstrap";

export default function Activity() {
    const [DateProjectStart, setDateProjectStart] = React.useState(null);
    const [showPostDoctorat, setShowPostDoctorat] = React.useState(false);

    return (
        <div>
            <div className='activity-container'>
                <div className='header'>
                    {<Alert variant={"warning"}><h1>Page a remplacer plus tard par l'onglet activités</h1> <s>Activity.js</s> ActivityList.js</Alert>}
                    <Alert variant={"primary"}>Voir le video <a href={"https://youtu.be/e-voo9vu7IQ"} target={"_blank"}>https://youtu.be/3RvyijmwZE4</a></Alert>
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
                        <li>
                            <a>Mobilité sortante</a>
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
                    </ul>



                </div>
                {showPostDoctorat && (<PostDoctorat onHideAction={() => setShowPostDoctorat(false)}> </PostDoctorat>)}
            </div>
        </div>
    )
}

