import React from 'react';
import EssaiClinique from './EssaiClinique';
import IncomingMobility from './IncomingMobility';
import ScientificExpertise from './ScientificExpertise';
import './Activity.css'
import Navbar from '../Navbar/Navbar';
import SrAward from './SrAward';

import Education from './Education';
import PostDoctorat from './PostDoctorat';
import Platform from './Platform';
import Editorial from './Editorial';
import Review from './Review';
import SeiIndustrialRDContract from './SeiIndustrialRDContract';
import NationalInternationalCollaboration from './NationalInternationalCollaboration';
import OralCommunication from './OralCommunication';

export default function Activity() {
    const [showPrix, setPrix] = React.useState(false);
    const [showEssaiClinique, setEssaiClinique] = React.useState(false);
    const [showIncomingMobility, setIncomingMobility] = React.useState(false);
    const [showScientificExpertise, setScientificExpertise] = React.useState(false);
    const [DateProjectStart, setDateProjectStart] = React.useState(null);
    const [showForm, setShowForm] = React.useState(false);
    const [showPostDoctorat, setShowPostDoctorat] = React.useState(false);
    const [showPlatform, setShowPlatform] = React.useState(false);
    const [showEditorial, setShowEditorial] = React.useState(false);
    const [showReview, setShowReview] = React.useState(false);
    const [showSeiIndustrialRDContract, setShowSeiIndustrialRDContract] = React.useState(false);
    const [showNationalInternationalCollaboration, setShowNationalInternationalCollaboration] = React.useState(false);
    const [showOralCommunication, setShowOralCommunication] = React.useState(false);

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
                <li onClick={setShowForm}>
                        <a>Education</a>
                    </li>
                    <li onClick={setShowPostDoctorat}>
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
                    <li onClick={setShowPlatform}>
                        <a>Platform</a>
                    </li>
                    <li onClick={setShowEditorial}>
                        <a>Edition</a>
                    </li>
                    <li onClick={setShowReview}>
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
                    <li onClick={setShowOralCommunication}>
                        <a>Communication orale</a>
                    </li>
                    <li onClick={setShowSeiIndustrialRDContract}>
                        <a>Signature d'une contrat industrielle</a>
                    </li>
                    <li onClick={setShowNationalInternationalCollaboration}>
                        <a>Collaboration internationale</a>
                    </li>
                    <li onClick={setScientificExpertise}>
                        <a>Expertise scientifique</a>
                    </li>
                    <li onClick={setEssaiClinique}>
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
            {showForm && (<Education> </Education>)}
            {showPostDoctorat && (<PostDoctorat> </PostDoctorat>)}
            {showPlatform && (<Platform></Platform>)}
            {showEditorial && (<Editorial></Editorial>)}
            {showReview && (<Review></Review>)}
            {showSeiIndustrialRDContract && (<SeiIndustrialRDContract></SeiIndustrialRDContract>)}
            {showNationalInternationalCollaboration && (<NationalInternationalCollaboration></NationalInternationalCollaboration>)}
            {showOralCommunication && (<OralCommunication></OralCommunication>)}
        </div>
    </div>
)
    }