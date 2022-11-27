import React from 'react';
import './ActivityList.css'
import EssaiClinique from './EssaiClinique';
import IncomingMobility from './IncomingMobility';
import ScientificExpertise from './ScientificExpertise';
import Navbar from '../Navbar/Navbar';

import EducationAdd from './education/EducationAdd';
import BootstrapTable from 'react-bootstrap-table-next';
import PostDoctorat from './PostDoctorat';
import Editorial from './Editorial';
import Review from './Review';
import SeiIndustrialRDContract from './SeiIndustrialRDContract';
import NationalInternationalCollaboration from './NationalInternationalCollaboration';
import OralCommunication from './OralCommunication';
import {Alert, Card, Col, Container, ListGroup, Table} from "react-bootstrap";
import Collapse from 'react-bootstrap/Collapse';
import {BiShow, BiHide} from "react-icons/bi";
import EducationList from "./education/EducationList";
import ResearcherElement from "../Researcher/ResearcherElement";
import SrAwardElement from "./sraward/SrAwardElement";
import SrAwardList from "./sraward/SrAwardList";
import PlatformList from "./platform/PlatformList";


// if target researcher is set in props will show only related information of target researcher
// otherwise it show actvities by category
export default function ActivityList(props) {
    const targetResearcher = props.targetResearcher;
    const showListByDefault = props.showListByDefault;
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');

    const [showEducationList, setShowEducationList] = React.useState(showListByDefault);
    const [showPrixList, setShowPrixList] = React.useState(showListByDefault);
    const [showPlatformList, setShowPlatformList] = React.useState(showListByDefault);
    const [showOralCommunicationList, setShowOralCommunicationList] = React.useState(showListByDefault);
    const [showSeiIndustrialRDContractList, setShowSeiIndustrialRDContractList] = React.useState(showListByDefault);
    const [showInterCollaborationList, setShowInterCollaborationList] = React.useState(showListByDefault);
    const [showScientificExpertiseList, setShowScientificExpertiseList] = React.useState(showListByDefault);
    const [showEssaiCliniqueList, setShowEssaiCliniqueList] = React.useState(showListByDefault);
    const [showIncomingMobilityList, setShowIncomingMobilityList] = React.useState(showListByDefault);
    const [showOutgoingMobilityList, setShowOutgoingMobilityList] = React.useState(showListByDefault);
    const [showEditorialList, setShowEditorialList] = React.useState(showListByDefault);
    const [showComparnyCreationList, setShowComparnyCreationList] = React.useState(showListByDefault);
    const [showPostDoctoratList, setShowPostDoctoratList] = React.useState(showListByDefault);
    const [showPatentList, setShowPatentList] = React.useState(showListByDefault);
    const [showReviewList, setShowReviewList] = React.useState(showListByDefault);

    // cached variable list to prevent loading multiple times
    const [educationList, setEducationList] = React.useState();

    const sendMessageToActivity = (messages = null) => {
        // silent close
        if (!messages) return;

        if (messages.successMsg) {
            setSuccessActivityAlert(messages.successMsg)
        }

        if (messages.errorMsg) {
            setErrorActivityAlert(messages.errorMsg)
        }
    }

    const activeItemClass = "border-primary text-primary flex-fill"
    const inactiveItemClass = "flex-fill"
    return (

        <div>
            <div>
                <h1>
                    Activités
                </h1>
                <div>

                    <div className={"list_container"} role={"button"}>
                        {targetResearcher && <ResearcherElement targetResearcher={targetResearcher} horizontal/>}
                        <ListGroup horizontal={true}>
                            <ListGroup.Item onClick={() => setShowEducationList(!showEducationList)}
                                            className={showEducationList ? activeItemClass : inactiveItemClass}>
                                {showEducationList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Education
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowPrixList(!showPrixList)}
                                            className={showPrixList ? activeItemClass : inactiveItemClass}>
                                {showPrixList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Prix
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowPlatformList(!showPlatformList)}
                                            className={showPlatformList ? activeItemClass : inactiveItemClass}>
                                {showPlatformList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Platform
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowOralCommunicationList(!showOralCommunicationList)}
                                            className={showOralCommunicationList ? activeItemClass : inactiveItemClass}>
                                {showOralCommunicationList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Communication orale
                            </ListGroup.Item>

                            <ListGroup.Item
                                onClick={() => setShowSeiIndustrialRDContractList(!showSeiIndustrialRDContractList)}
                                className={showSeiIndustrialRDContractList ? activeItemClass : inactiveItemClass}>
                                {showSeiIndustrialRDContractList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Signature d'une contrat industrielle
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup horizontal={true}>
                            <ListGroup.Item onClick={() => setShowInterCollaborationList(!showInterCollaborationList)}
                                            className={showInterCollaborationList ? activeItemClass : inactiveItemClass}>
                                {showInterCollaborationList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Collaboration internationale
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowScientificExpertiseList(!showScientificExpertiseList)}
                                            className={showScientificExpertiseList ? activeItemClass : inactiveItemClass}>
                                {showScientificExpertiseList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Expertise scientifique
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowEssaiCliniqueList(!showEssaiCliniqueList)}
                                            className={showEssaiCliniqueList ? activeItemClass : inactiveItemClass}>
                                {showEssaiCliniqueList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Essai clinique
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowIncomingMobilityList(!showIncomingMobilityList)}
                                            className={showIncomingMobilityList ? activeItemClass : inactiveItemClass}>
                                {showIncomingMobilityList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Mobilité entrante
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowOutgoingMobilityList(!showOutgoingMobilityList)}
                                            className={showOutgoingMobilityList ? activeItemClass : inactiveItemClass}>
                                {showOutgoingMobilityList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Mobilité sortante
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup horizontal={true}>
                            <ListGroup.Item onClick={() => setShowEditorialList(!showEditorialList)}
                                            className={showEditorialList ? activeItemClass : inactiveItemClass}>
                                {showEditorialList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Edition
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowComparnyCreationList(!showComparnyCreationList)}
                                            className={showComparnyCreationList ? activeItemClass : inactiveItemClass}>
                                {showComparnyCreationList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Création d'entreprise
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowPostDoctoratList(!showPostDoctoratList)}
                                            className={showPostDoctoratList ? activeItemClass : inactiveItemClass}>
                                {showPostDoctoratList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                PostDoctorat
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowPatentList(!showPatentList)}
                                            className={showPatentList ? activeItemClass : inactiveItemClass}>
                                {showPatentList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Brevet
                            </ListGroup.Item>

                            <ListGroup.Item onClick={() => setShowReviewList(!showReviewList)}
                                            className={showReviewList ? activeItemClass : inactiveItemClass}>
                                {showReviewList ? <BiShow/> : <BiHide/>}
                                &nbsp;
                                Revue
                            </ListGroup.Item>
                        </ListGroup>
                    </div>

                    <div>
                        {successActivityAlert && <Alert variant={"success"}
                                                        onClose={() => setSuccessActivityAlert("")}
                                                        dismissible={true}>{successActivityAlert}</Alert>}
                        {errorActivityAlert && <Alert variant={"danger"}
                                                      onClose={() => setErrorActivityAlert("")}
                                                      dismissible={true}>{errorActivityAlert}</Alert>}
                        <Collapse in={showEducationList}>
                            <div>
                                {showEducationList && <EducationList sendMessageToActivity={sendMessageToActivity} targetResearcher={targetResearcher}/>}
                            </div>
                        </Collapse>

                        <Collapse in={showPrixList}>
                            <div>{showPrixList && <SrAwardList sendMessageToActivity={sendMessageToActivity} targetResearcher={targetResearcher}/>}</div>
                        </Collapse>

                        <Collapse in={showPlatformList}>
                            <div>{showPlatformList && <PlatformList sendMessageToActivity={sendMessageToActivity} targetResearcher={targetResearcher}/>}</div>
                        </Collapse>

                        <Collapse in={showOralCommunicationList}>
                            <div>{showOralCommunicationList &&
                                <div>import the file to showOralCommunicationList here</div>}</div>
                        </Collapse>

                        <Collapse in={showSeiIndustrialRDContractList}>
                            <div>{showSeiIndustrialRDContractList &&
                                <div>import the file to showSeiIndustrialRDContractList here</div>}</div>
                        </Collapse>

                        <Collapse in={showInterCollaborationList}>
                            <div>{showInterCollaborationList &&
                                <div>import the file to showInterCollaborationList here</div>}</div>
                        </Collapse>

                        <Collapse in={showScientificExpertiseList}>
                            <div>{showScientificExpertiseList &&
                                <div>import the file to showScientificExpertiseList here</div>}</div>
                        </Collapse>

                        <Collapse in={showEssaiCliniqueList}>
                            <div>{showEssaiCliniqueList &&
                                <div>import the file to showEssaiCliniqueList here</div>}</div>
                        </Collapse>

                        <Collapse in={showIncomingMobilityList}>
                            <div>{showIncomingMobilityList &&
                                <div>import the file to showIncomingMobilityList here</div>}</div>
                        </Collapse>

                        <Collapse in={showOutgoingMobilityList}>
                            <div>{showOutgoingMobilityList &&
                                <div>import the file to showOutgoingMobilityList here</div>}</div>
                        </Collapse>

                        <Collapse in={showEditorialList}>
                            <div>{showEditorialList && <div>import the file to showEditorialList here</div>}</div>
                        </Collapse>

                        <Collapse in={showComparnyCreationList}>
                            <div>{showComparnyCreationList &&
                                <div>import the file to showComparnyCreationList here</div>}</div>
                        </Collapse>

                        <Collapse in={showPostDoctoratList}>
                            <div>{showPostDoctoratList && <div>import the file to showPostDoctoratList here</div>}</div>
                        </Collapse>

                        <Collapse in={showPatentList}>
                            <div>{showPatentList && <div>import the file to showPatentList here</div>}</div>
                        </Collapse>

                        <Collapse in={showReviewList}>
                            <div>{showReviewList && <div>import the file to showReviewList here</div>}</div>
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>)
}

