import React from 'react';
import EssaiClinique from './EssaiClinique';
import IncomingMobility from './IncomingMobility';
import ScientificExpertise from './ScientificExpertise';
import './Activity.css'
import Navbar from '../Navbar/Navbar';
import SrAward from './SrAward';

import EducationAdd from './education/EducationAdd';
import PostDoctorat from './PostDoctorat';
import Platform from './Platform';
import Editorial from './Editorial';
import Review from './Review';
import SeiIndustrialRDContract from './SeiIndustrialRDContract';
import NationalInternationalCollaboration from './NationalInternationalCollaboration';
import OralCommunication from './OralCommunication';
import {Alert} from "react-bootstrap";

export default function Activity() {
    const [showPrix, setShowPrix] = React.useState(false);
    const [showEssaiClinique, setEssaiClinique] = React.useState(false);
    const [showIncomingMobility, setIncomingMobility] = React.useState(false);
    const [showScientificExpertise, setScientificExpertise] = React.useState(false);
    const [DateProjectStart, setDateProjectStart] = React.useState(null);
    const [showEducation, setShowEducation] = React.useState(false);
    const [showPostDoctorat, setShowPostDoctorat] = React.useState(false);
    const [showPlatform, setShowPlatform] = React.useState(false);
    const [showEditorial, setShowEditorial] = React.useState(false);
    const [showReview, setShowReview] = React.useState(false);
    const [showSeiIndustrialRDContract, setShowSeiIndustrialRDContract] = React.useState(false);
    const [showNationalInternationalCollaboration, setShowNationalInternationalCollaboration] = React.useState(false);
    const [showOralCommunication, setShowOralCommunication] = React.useState(false);

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
                        <li onClick={() => setShowEducation(true)}>
                            <a>Education</a>
                        </li>

                        <li onClick={() => setShowPrix(true)}>
                            <a>Prix</a>
                        </li>
                        <li onClick={() => setShowPlatform(true)}>
                            <a>Platform</a>
                        </li>
                        <li onClick={() => setShowOralCommunication(true)}>
                            <a>Communication orale</a>
                        </li>
                        <li onClick={() => setShowSeiIndustrialRDContract(true)}>
                            <a>Signature d'une contrat industrielle</a>
                        </li>
                        <li onClick={() => setShowNationalInternationalCollaboration(true)}>
                            <a>Collaboration internationale</a>
                        </li>
                        <li onClick={() => setScientificExpertise(true)}>
                            <a>Expertise scientifique</a>
                        </li>
                        <li onClick={() => setEssaiClinique(true)}>
                            <a>Essai clinique</a>
                        </li>
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
                {showPrix && (<SrAward onHideAction={() => setShowPrix(false)}> </SrAward>)}
                {showEssaiClinique && (<EssaiClinique onHideAction={() => setEssaiClinique(false)}> </EssaiClinique>)}
                {showIncomingMobility && (<IncomingMobility onHideAction={() => setIncomingMobility(false)}> </IncomingMobility>)}
                {showScientificExpertise && (<ScientificExpertise onHideAction={() =>setScientificExpertise(false)}> </ScientificExpertise>)}
                {showEducation && (<EducationAdd onHideAction={() => setShowEducation(false)}/>)}
                {showPostDoctorat && (<PostDoctorat onHideAction={() => setShowPostDoctorat(false)}> </PostDoctorat>)}
                {showPlatform && (<Platform onHideAction={() => setShowPlatform(false)}></Platform>)}
                {showEditorial && (<Editorial onHideAction={() => setShowEditorial(false)}></Editorial>)}
                {showReview && (<Review onHideAction={() => setShowReview(false)}></Review>)}
                {showSeiIndustrialRDContract && (<SeiIndustrialRDContract onHideAction={() => setShowSeiIndustrialRDContract(false)}></SeiIndustrialRDContract>)}
                {showNationalInternationalCollaboration && (<NationalInternationalCollaboration onHideAction={() => setShowNationalInternationalCollaboration(false)}></NationalInternationalCollaboration>)}
                {showOralCommunication && (<OralCommunication onHideAction={() => setShowOralCommunication(false)}></OralCommunication>)}
            </div>
        </div>
    )
}

