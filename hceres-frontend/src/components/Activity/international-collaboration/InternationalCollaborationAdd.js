import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {ListGroup} from "react-bootstrap";
import {fetchListResearchers} from "../../../services/Researcher/ResearcherActions";
import {
    addInternationalCollaboration
} from "../../../services/international-collaboration/InternationalCollaborationActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function InternationalCollaborationAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)
    const [researchers, setResearchers] = React.useState([]);

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [DateProjectStart, setDateProjectStart] = React.useState(null);
    const [PartnerEntity, setPartnerEntity] = React.useState("");
    const [CountryStateCity, setCountryStateCity] = React.useState("");
    const [PiPartners, setPiPartners] = React.useState("");
    const [MailPartners, setMailPartners] = React.useState(null);
    const [ProjetcTitle, setProjetcTitle] = React.useState("");
    const [StrategicRecurringCollab, setStrategicRecurringCollab] = React.useState("");
    const [ActiveProject, setActiveProject] = React.useState("");
    const [AssociatedFunding, setAssociatedFunding] = React.useState("");
    const [NumberResultingPublications, setNumberResultingPublications] = React.useState("");
    const [RefJointPublication, setRefJointPublication] = React.useState("");
    const [UmrCoordinated, setUmrCoordinated] = React.useState("");
    const [AgreementSigned, setAgreementSigned] = React.useState("");
    const [NameChoice, setNameChoice] = React.useState("");


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };

    React.useEffect(() => {
        if (!targetResearcher)
            fetchListResearchers().then(list => {
                setResearchers(list);
                if (list.length > 0) {
                    setResearcherId(list.entries().next().value[1].researcherId)
                }
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            researcherId: researcherId,
            NameChoice: NameChoice,
            AgreementSigned: AgreementSigned,
            UmrCoordinated: UmrCoordinated,
            RefJointPublication: RefJointPublication,
            NumberResultingPublications: NumberResultingPublications,
            AssociatedFunding: AssociatedFunding,
            ActiveProject: ActiveProject,
            StrategicRecurringCollab: StrategicRecurringCollab,
            ProjetcTitle: ProjetcTitle,
            MailPartners: MailPartners,
            PiPartners: PiPartners,
            CountryStateCity: CountryStateCity,
            PartnerEntity: PartnerEntity,
            DateProjectStart: DateProjectStart
        };

        addInternationalCollaboration(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "InternationalCollaboration ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur InternationalCollaboration non ajouté, response status: " + error.response.status,
            }
            handleClose(msg);
        })
    }

    const onReseacherSelection = id => setResearcherId(id.target.value);

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>InternationalCollaboration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <label className='label'>
                            Chercheur
                        </label>
                        {targetResearcher ?
                            <ListGroup.Item
                                variant={"primary"}>{targetResearcher.researcherName} {targetResearcher.researcherSurname}</ListGroup.Item> :

                            <select onChange={onReseacherSelection}>
                                {researchers.map(item => {
                                    return (<option key={item.researcherId}
                                                    value={item.researcherId}>{item.researcherName} {item.researcherSurname}</option>);
                                })}
                            </select>
                        }

                        <label className='label'>
                            Date Project Start
                        </label>
                        <input
                            placeholder='Date Project Start'
                            className='input-container'
                            name="DateProjectStart"
                            type="date"
                            value={DateProjectStart}
                            onChange={e => setDateProjectStart(e.target.value)}
                            required/>

                        <label className='label'>
                            Partner Entity
                        </label>
                        <input
                            placeholder='Partner Entity'
                            className='input-container'
                            name="PartnerEntity"
                            type="PartnerEntity"
                            value={PartnerEntity}
                            onChange={e => setPartnerEntity(e.target.value)}
                            required/>


                        <label className='label'>
                            Country State City
                        </label>
                        <input
                            placeholder='Country State City '
                            className='input-container'
                            name="CountryStateCity"
                            type="CountryStateCity"
                            value={CountryStateCity}
                            onChange={e => setCountryStateCity(e.target.value)}
                            required/>

                        <label className='label'>
                            Pi Partners
                        </label>
                        <input
                            placeholder='PiPartners'
                            type="PiPartners"
                            className='input-container'
                            name="PiPartners"
                            value={PiPartners}
                            onChange={e => setPiPartners(e.target.value)}
                            required/>

                        <label className='label'>
                            Mail Partners
                        </label>
                        <input
                            placeholder='Mail Partners'
                            className='input-container'
                            name="MailPartners"
                            type="MailPartners"
                            value={MailPartners}
                            onChange={e => setMailPartners(e.target.value)}
                            required/>

                        <label className='label'>
                            Project Title
                        </label>
                        <input
                            placeholder='ProjetcTitle '
                            className='input-container'
                            name="ProjetcTitle"
                            type="ProjetcTitle"
                            value={ProjetcTitle}
                            onChange={e => setProjetcTitle(e.target.value)}
                            required/>

                        <label className='label'>
                            StrategicRecurringCollab
                        </label>
                        <input
                            placeholder='StrategicRecurringCollab '
                            className='input-container'
                            name="boolean-parameter" type="checkbox"
                            value={StrategicRecurringCollab}
                            onChange={e => setStrategicRecurringCollab(e.target.value)}
                            required/>

                        <label className='label'>
                            Active Project
                        </label>
                        <input
                            placeholder='ActiveProject '
                            className='input-container'
                            name="ActiveProject"
                            type="checkbox"
                            value={ActiveProject}
                            onChange={e => setActiveProject(e.target.value)}
                            required/>

                        <label className='label'>
                            Associated Funding
                        </label>
                        <input
                            placeholder='AssociatedFunding '
                            className='input-container'
                            name="AssociatedFunding"
                            type="AssociatedFunding"
                            value={AssociatedFunding}
                            onChange={e => setAssociatedFunding(e.target.value)}
                            required/>

                        <label className='label'>
                            Number Resulting Publications
                        </label>
                        <input
                            placeholder='NumberResultingPublications '
                            className='input-container'
                            name="NumberResultingPublications"
                            type="number"
                            value={NumberResultingPublications}
                            onChange={e => setNumberResultingPublications(e.target.value)}
                            required/>

                        <label className='label'>
                            Ref Joint Publication
                        </label>
                        <input
                            placeholder='RefJointPublication '
                            className='input-container'
                            name="RefJointPublication"
                            type="RefJointPublication"
                            value={RefJointPublication}
                            onChange={e => setRefJointPublication(e.target.value)}
                            required/>

                        <label className='label'>
                            Umr Coordinated
                        </label>
                        <input
                            placeholder='UmrCoordinated '
                            className='input-container'
                            name="UmrCoordinated"
                            type="checkbox"
                            value={UmrCoordinated}
                            onChange={e => setUmrCoordinated(e.target.value)}
                            required/>

                        <label className='label'>
                            Agreement Signed
                        </label>
                        <input
                            placeholder='AgreementSigned '
                            className='input-container'
                            name="AgreementSigned"
                            type="checkbox"
                            value={AgreementSigned}
                            onChange={e => setAgreementSigned(e.target.value)}
                            required/>

                        <label className='label'>
                            Name Choice
                        </label>
                        <input
                            placeholder='NameChoice '
                            className='input-container'
                            name="NameChoice"
                            type="NameChoice"
                            value={NameChoice}
                            onChange={e => setNameChoice(e.target.value)}
                            required/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="outline-primary" type={"submit"}>
                            Ajouter
                        </Button>

                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default InternationalCollaborationAdd;
