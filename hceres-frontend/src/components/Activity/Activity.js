import React from 'react';
import Education from './Education/Education';
import './Activity.css'
import Prix from './Prix/Prix';

export default function Activity() {
    const [showForm, setShowForm] = React.useState(false);

    return (
        <div className='activity-container'>
            <div className='header'>
                <h1>
                    Bienvenue dans la section d'ajout d'activités
                </h1>
                <h3>
                    Choisissez une activité à ajouter parmi les activités suivantes. Si vous nous trouvez pas l'activité recherchée, contactez le support.
                </h3>
            </div>
            <div className='activityList'>
                <ul>
                    <li>
                        <a>Education</a>
                    </li>
                    <li onClick={setShowForm}>
                        <a>Prix</a>
                    </li>
                    <li>
                        <a>Brevet</a>
                    </li>
                    <li>
                        <a>Production</a>
                    </li>
                </ul>
            </div>
            {showForm && (<Prix onClick= {showForm}> </Prix>)}
        </div>)
}
