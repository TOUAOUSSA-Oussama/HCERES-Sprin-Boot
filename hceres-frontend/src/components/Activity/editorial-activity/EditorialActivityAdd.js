import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {ListGroup} from "react-bootstrap";
import {fetchListResearchers} from "../../../services/Researcher/ResearcherActions";
import {addEditorialActivity} from "../../../services/editorial-activity/EditorialActivityActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function EditorialActivityAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)
    const [researchers, setResearchers] = React.useState([]);

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [impactFactor, setImpactFactor] = React.useState("");
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [journalName, setJournalName] = React.useState("");
    const [functionName, setFunctionName] = React.useState("");
    const [formattedStartDate, setFormattedStartDate] = React.useState(null);
    const [formattedEndDate, setFormattedEndDate] = React.useState(null);

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
            impactFactor: impactFactor,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            journalName: "monde",
            functionName: functionName
        };

        addEditorialActivity(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "EditorialActivity ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur EditorialActivity non ajouté, response status: " + error.response.status,
            }
            handleClose(msg);
        })
    }

    const handleStartDate = (event) => {
        let formattedDate = `${event.getFullYear()}-${event.getMonth() + 1
        }-${event.getDate()}`;
        setFormattedStartDate(formattedDate);
        setStartDate(event);
    }

    const handleEndDate = (event) => {
        let formattedDate = `${event.getFullYear()}-${event.getMonth() + 1
        }-${event.getDate()}`;
        setFormattedEndDate(formattedDate);
        setEndDate(event);
    }

    const onReseacherSelection = id => setResearcherId(id.target.value);

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>EditorialActivity</Modal.Title>
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
                            Facteur d'impact
                        </label>
                        <input
                            placeholder="Facteur d'impact"
                            className='input-container'
                            name="impactFactor"
                            type="impactFactor"
                            value={impactFactor}
                            onChange={e => setImpactFactor(e.target.value)}
                            required/>

                        <label className='label'>
                            Date de départ
                        </label>
                        <DatePicker
                            className='datePicker'
                            selected={startDate}
                            onChange={handleStartDate}
                            withPortal
                            placeholderText="Choix de date"/>

                        <label className='label'>
                            Date de fin
                        </label>
                        <DatePicker
                            className='datePicker'
                            selected={endDate}
                            onChange={handleEndDate}
                            withPortal
                            placeholderText="Choix de date"/>

                        <label className='label'>
                            Nom du journal
                        </label>
                        <input
                            placeholder='Nom du journal '
                            className='input-container'
                            name="journalName"
                            type="journalName"
                            value={journalName}
                            onChange={e => setJournalName(e.target.value)}
                            required/>

                        <label className='label'>
                            Nom de la fonction editoriale
                        </label>
                        <input
                            placeholder='Nom de la fonction'
                            className='input-container'
                            name="functionName"
                            type="functionName"
                            value={functionName}
                            onChange={e => setFunctionName(e.target.value)}
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

export default EditorialActivityAdd;
