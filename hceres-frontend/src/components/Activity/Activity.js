import React from 'react';
import Education from './Education';
import PostDoctorat from './PostDoctorat'
import './Activity.css'

export default function Activity() {
    const [showForm, setShowForm] = React.useState(false);
    const [showPostDoctorat, setPostDoctorat] = React.useState(false);
    
    
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
                    <li onClick={setShowForm}>
                        <a>Education</a>
                    </li>
                    <li>
                        <a onClick={setPostDoctorat}>PostDoctorat</a>
                    </li>
                    <li>
                        <a>Brevet</a>
                    </li>
                    <li>
                        <a>Production</a>
                    </li>
                    <li>
                            <a>Platform</a>
                        </li>
                        <li>
                            <a>Edition</a>
                        </li>
                        <li>
                            <a>Revue</a>
                        </li>
                        <li>
                            <a>Publication</a>
                        </li>
                        <li>
                            <a>Livre</a>
                        </li>
                        <li>
                            <a>Séminaire</a>
                        </li>
                        <li>
                            <a>Communication orale</a>
                        </li>
                        <li>
                            <a>Signature d'une contrat industrielle</a>
                        </li>
                        <li>
                            <a>Collaboration internationale</a>
                        </li>
                        <li>
                            <a>Expertise scientifique</a>
                        </li>
                        <li>
                            <a>Essai clinique</a>
                        </li>
                        <li>
                            <a>Mobilité entrante</a>
                        </li>
                        <li>
                            <a>Mobilité sortante</a>
                        </li>
                        <li>
                            <a>Création d'entreprise</a>
                        </li>
                </ul>

            </div>
            {showForm && (<Education> </Education>)}
            {showPostDoctorat && (<PostDoctorat> </PostDoctorat>)}
        </div>)
}
