import React from 'react';
import './ActivityList.css'
import EssaiClinique from './EssaiClinique';
import IncomingMobility from './IncomingMobility';
import ScientificExpertise from './ScientificExpertise';
import Navbar from '../Navbar/Navbar';
import SrAward from './SrAward';

import Education from './Education';
import BootstrapTable from 'react-bootstrap-table-next';
import PostDoctorat from './PostDoctorat';
import Platform from './Platform';
import Editorial from './Editorial';
import Review from './Review';
import SeiIndustrialRDContract from './SeiIndustrialRDContract';
import NationalInternationalCollaboration from './NationalInternationalCollaboration';
import OralCommunication from './OralCommunication';
import {Alert, Card, Col, Container, ListGroup, Table} from "react-bootstrap";
import Collapse from 'react-bootstrap/Collapse';
import {BiShow, BiHide} from "react-icons/bi";

export default function ActivityList() {
    const [showEducation, setShowEducation] = React.useState(false);
    const [showPrix, setShowPrix] = React.useState(false);
    const [showPlatform, setShowPlatform] = React.useState(false);
    const [showOralCommunication, setShowOralCommunication] = React.useState(false);
    const [showSeiIndustrialRDContract, setShowSeiIndustrialRDContract] = React.useState(false);
    const [showInterCollaboration, setShowInterCollaboration] = React.useState(false);
    const [showScientificExpertise, setShowScientificExpertise] = React.useState(false);
    const [showEssaiClinique, setShowEssaiClinique] = React.useState(false);
    const [showIncomingMobility, setShowIncomingMobility] = React.useState(false);
    const [showOutgoingMobility, setShowOutgoingMobility] = React.useState(false);
    const [showEditorial, setShowEditorial] = React.useState(false);
    const [showComparnyCreation, setShowComparnyCreation] = React.useState(false);
    const [showPostDoctorat, setShowPostDoctorat] = React.useState(false);
    const [showPatent, setShowPatent] = React.useState(false);
    const [showReview, setShowReview] = React.useState(false);

    const activeItemClass = "border-primary text-primary item_direction"
    const inactiveItemClass = "item_direction"
    return (

        <Container>
            <div>
                <h1>
                    Activités
                </h1>
                <div className={"row"}>

                    <div className={"col-3 list_container"} role={"button"}>
                        <ListGroup>
                            <ListGroup.Item onClick={() => setShowEducation(!showEducation)}
                                            className={showEducation ? activeItemClass : inactiveItemClass}>
                                {showEducation ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Education
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowPrix(!showPrix)}
                                            className={showPrix ? activeItemClass : inactiveItemClass}>
                                {showPrix ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Prix
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowPlatform(!showPlatform)}
                                            className={showPlatform ? activeItemClass : inactiveItemClass}>
                                {showPlatform ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Platform
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowOralCommunication(!showOralCommunication)}
                                            className={showOralCommunication ? activeItemClass : inactiveItemClass}>
                                {showOralCommunication ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Communication orale
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowSeiIndustrialRDContract(!showSeiIndustrialRDContract)}
                                            className={showSeiIndustrialRDContract ? activeItemClass : inactiveItemClass}>
                                {showSeiIndustrialRDContract ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Signature d'une contrat industrielle
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowInterCollaboration(!showInterCollaboration)}
                                            className={showInterCollaboration ? activeItemClass : inactiveItemClass}>
                                {showInterCollaboration ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Collaboration internationale
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowScientificExpertise(!showScientificExpertise)}
                                            className={showScientificExpertise ? activeItemClass : inactiveItemClass}>
                                {showScientificExpertise ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Expertise scientifique
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowEssaiClinique(!showEssaiClinique)}
                                            className={showEssaiClinique ? activeItemClass : inactiveItemClass}>
                                {showEssaiClinique ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Essai clinique
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowIncomingMobility(!showIncomingMobility)}
                                            className={showIncomingMobility ? activeItemClass : inactiveItemClass}>
                                {showIncomingMobility ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Mobilité entrante
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowOutgoingMobility(!showOutgoingMobility)}
                                            className={showOutgoingMobility ? activeItemClass : inactiveItemClass}>
                                {showOutgoingMobility ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Mobilité sortante
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowEditorial(!showEditorial)}
                                            className={showEditorial ? activeItemClass : inactiveItemClass}>
                                {showEditorial ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Edition
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowComparnyCreation(!showComparnyCreation)}
                                            className={showComparnyCreation ? activeItemClass : inactiveItemClass}>
                                {showComparnyCreation ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Création d'entreprise
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowPostDoctorat(!showPostDoctorat)}
                                            className={showPostDoctorat ? activeItemClass : inactiveItemClass}>
                                {showPostDoctorat ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                PostDoctorat
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowPatent(!showPatent)}
                                            className={showPatent ? activeItemClass : inactiveItemClass}>
                                {showPatent ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Brevet
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowReview(!showReview)}
                                            className={showReview ? activeItemClass : inactiveItemClass}>
                                {showReview ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Revue
                            </ListGroup.Item>
                        </ListGroup>
                    </div>

                    <div className={"col-9"}>

                        <Collapse in={showEducation}>
                            <div>{showEducation && <div>import the file to showEducation here</div>}</div>
                        </Collapse>

                        <Collapse in={showPrix}>
                            <div>{showPrix && <div>import the file to showPrix here</div>}</div>
                        </Collapse>

                        <Collapse in={showPlatform}>
                            <div>{showPlatform && <div>import the file to showPlatform here</div>}</div>
                        </Collapse>

                        <Collapse in={showOralCommunication}>
                            <div>{showOralCommunication &&
                                <div>import the file to showOralCommunication here</div>}</div>
                        </Collapse>

                        <Collapse in={showSeiIndustrialRDContract}>
                            <div>{showSeiIndustrialRDContract &&
                                <div>import the file to showSeiIndustrialRDContract here</div>}</div>
                        </Collapse>

                        <Collapse in={showInterCollaboration}>
                            <div>{showInterCollaboration &&
                                <div>import the file to showInterCollaboration here</div>}</div>
                        </Collapse>

                        <Collapse in={showScientificExpertise}>
                            <div>{showScientificExpertise &&
                                <div>import the file to showScientificExpertise here</div>}</div>
                        </Collapse>

                        <Collapse in={showEssaiClinique}>
                            <div>{showEssaiClinique && <div>import the file to showEssaiClinique here</div>}</div>
                        </Collapse>

                        <Collapse in={showIncomingMobility}>
                            <div>{showIncomingMobility && <div>import the file to showIncomingMobility here</div>}</div>
                        </Collapse>

                        <Collapse in={showOutgoingMobility}>
                            <div>{showOutgoingMobility && <div>import the file to showOutgoingMobility here</div>}</div>
                        </Collapse>

                        <Collapse in={showEditorial}>
                            <div>{showEditorial && <div>import the file to showEditorial here</div>}</div>
                        </Collapse>

                        <Collapse in={showComparnyCreation}>
                            <div>{showComparnyCreation && <div>import the file to showComparnyCreation here</div>}</div>
                        </Collapse>

                        <Collapse in={showPostDoctorat}>
                            <div>{showPostDoctorat && <div>import the file to showPostDoctorat here</div>}</div>
                        </Collapse>

                        <Collapse in={showPatent}>
                            <div>{showPatent && <div>import the file to showPatent here</div>}</div>
                        </Collapse>

                        <Collapse in={showReview}>
                            <div>{showReview && <div>import the file to showReview here</div>}</div>
                        </Collapse>
                    </div>
                </div>
            </div>
        </Container>
    )
}

