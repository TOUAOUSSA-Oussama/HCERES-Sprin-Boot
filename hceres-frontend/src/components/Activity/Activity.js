import React from 'react';
import Brevet from './Brevet'
import CompanyCreation from './CompanyCreation';
import OutgoingMobility from './OutgoingMobility';
import './Activity.css';


export default function Activity() {
    const [DateProjectStart, setDateProjectStart] = React.useState(null);
    const [showBrevet, setShowBrevet] = React.useState(false);
    const [showCompanyCreation, setShowCompanyCreation] = React.useState(false);
    const [showOutgoingMobility, setShowOutgoingMobility] = React.useState(false);


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
                    <li>
                        <a>PostDoctorat</a>
                    </li>
                    <li  onClick={setShowBrevet}>
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
                    <li onClick={setShowOutgoingMobility}>
                        <a>Mobilité sortante</a>
                    </li>
                    <li onClick={setShowCompanyCreation}>
                        <a>Création d'entreprise</a>
                    </li>
                </ul>

            </div>
            {showBrevet && (<Brevet> </Brevet>)}
            {showCompanyCreation && (<CompanyCreation> </CompanyCreation>)}
            {showOutgoingMobility && (<OutgoingMobility> </OutgoingMobility>)}
            
        </div>)
}