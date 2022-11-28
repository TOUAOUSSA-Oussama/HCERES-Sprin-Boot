import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {ListGroup} from "react-bootstrap";
import {fetchListResearchers} from "../../../services/Researcher/ResearcherActions";
import {addScientificExpertise} from "../../../services/scientific-expertise/ScientificExpertiseActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function ScientificExpertiseAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)
    const [researchers, setResearchers] = React.useState([]);

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [typeName, settypeName] = useState("");
    const [startDate, setstartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const [description, setdescription] = useState("");


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
            ScientificExpertiseTypeName: typeName,
            ScientificExpertiseDescription: description,
            ScientificExpertiseStartDate: startDate,
            ScientificExpertiseEndDate: endDate
        };

        addScientificExpertise(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "ScientificExpertise ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur ScientificExpertise non ajouté, response status: " + error.response.status,
            }
            handleClose(msg);
        })
    }

    const handleDate1 = (event) => {
        let startDate = `${event.getFullYear()}-${
            event.getMonth() + 1
        }-${event.getDate()}`;
        setstartDate(startDate);
        setstartDate(event);
    }

    const handleDate2 = (event) => {
        let endDate = `${event.getFullYear()}-${
            event.getMonth() + 1
        }-${event.getDate()}`;
        setendDate(endDate);
        setendDate(event);
    }

    const onReseacherSelection = id => setResearcherId(id.target.value);

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>ScientificExpertise</Modal.Title>
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
                            Nom du Type
                        </label>
                        <input
                            placeholder='Nom du type'
                            className='input-container'
                            name="typeName"
                            id="typeName"
                            value={typeName}
                            onChange={(e) => settypeName(e.target.value)}
                            required/>
                        <label className='label'>
                            Date de début
                        </label>
                        <DatePicker
                            className='datePicker'
                            selected={startDate}
                            onChange={handleDate1}
                            withPortal
                            placeholderText="Choix de date de début"/>
                        <label className='label'>
                            Date de fin
                        </label>
                        <DatePicker
                            className='datePicker'
                            selected={endDate}
                            onChange={handleDate2}
                            withPortal
                            placeholderText="Choix de date de fin"/>

                        <label className='label'>
                            description
                        </label>
                        <input
                            placeholder='description'
                            className='input-container'
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
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

export default ScientificExpertiseAdd;
