import React from 'react';
import EssaiClinique from './EssaiClinique';
import IncomingMobility from './IncomingMobility';
import ScientificExpertise from './ScientificExpertise';
import './Activity.css'
import Navbar from '../Navbar/Navbar';
import SrAward from './SrAward';
export default function Activity() {
    const [showPrix, setPrix] = React.useState(false);
    const [showEssaiClinique, setEssaiClinique] = React.useState(false);
    const [showIncomingMobility, setIncomingMobility] = React.useState(false);
    const [showScientificExpertise, setScientificExpertise] = React.useState(false);

    return (

        <div> 
        <Navbar />
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
                    <li >
                        <a>Education</a>
                    </li>
                    <li >
                        <a>PostDoctorat</a>
                    </li>
                    <li>
                        <a>Brevet</a>
                    </li>
                    <li onClick={setPrix} >
                        <a>Prix</a>
                    </li>
                    <li>
                        <a>Production</a>
                    </li>
                    <li >
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
                        <li onClick={setScientificExpertise}>
                            <a>Expertise scientifique</a>
                        </li>
                        <li onClick={setEssaiClinique} >
                            <a>Essai clinique</a>
                        </li>
                        <li onClick={setIncomingMobility} >
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
            {showPrix && (<SrAward> </SrAward>)}
            {showEssaiClinique && (<EssaiClinique> </EssaiClinique>)}
            {showIncomingMobility && (<IncomingMobility> </IncomingMobility>)}
            {showScientificExpertise && (<ScientificExpertise> </ScientificExpertise>)}
        </div>
        </div>)
}
