import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {ListGroup} from "react-bootstrap";
import {fetchListResearchers} from "../../../services/Researcher/ResearcherActions";
import {addPlatform} from "../../../services/platform/PlatformActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function PlatformAdd(props) {
    const [showModal, setShowModal] = React.useState(true);
    const targetResearcher = props.targetResearcher;

    const handleClose = (msg = null) => {
        setShowModal(false);
        props.onHideAction(msg);
    };

    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [labellisation, setLabellisation] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [managers, setManagers] = React.useState("");
    const [affiliation, setAffiliation] = React.useState("");
    const [date, setDate] = React.useState(null);
    const [checkbox, setCheckBox] = React.useState(false);
    const [formattedDate, setFormatted] = React.useState("")

    const [researchers, setResearchers] = React.useState([]);

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
            labellisation: labellisation,
            description: description,
            managers: managers,
            affiliation: affiliation,
            creationDate: formattedDate,
            openPrivateResearchers: checkbox
        };

        addPlatform(data).then(response => {
                // const activityId = response.data.researcherId;
                const msg = {
                    "successMsg": "Platform ajouté avec un id " + response.data.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur Platform non ajouté, response status: " + error.response.status,
            }
            handleClose(msg);
        })
    }

    const handleDate = (event) => {
        let formattedDate = `${event.getFullYear()}-${
            event.getMonth() + 1
        }-${event.getDate()}`;
        setFormatted(formattedDate);
        setDate(event);
    }

    const onReseacherSelection = id => setResearcherId(id.target.value);

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Platform</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <label className='label'>
                            Chercheur
                        </label>
                        {targetResearcher ?
                            <ListGroup.Item variant={"primary"}>{targetResearcher.researcherName} {targetResearcher.researcherSurname}</ListGroup.Item>:

                            <select onChange={onReseacherSelection}>
                                {researchers.map(item => {
                                    return (<option key={item.researcherId}
                                                    value={item.researcherId}>{item.researcherName} {item.researcherSurname}</option>);
                                })}
                            </select>
                        }
                        <label className='label'>
                            Date de création
                        </label>
                        <DatePicker
                            className='datePicker'
                            selected={date}
                            onChange={handleDate}
                            withPortal
                            placeholderText="Choix de date"/>

                        <label className='label'>
                            Description
                        </label>
                        <input
                            placeholder='Description'
                            className='input-container'
                            name="description"
                            type="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required/>


                        <label className='label'>
                            Managers
                        </label>
                        <input
                            placeholder='Managers '
                            className='input-container'
                            name="managers"
                            type="managers"
                            value={managers}
                            onChange={e => setManagers(e.target.value)}
                            required/>

                        <label className='label'>
                            Affiliation
                        </label>
                        <input
                            placeholder='Affiliation'
                            className='input-container'
                            name="affiliation"
                            type="affiliation"
                            value={affiliation}
                            onChange={e => setAffiliation(e.target.value)}
                            required/>

                        <label className='label'>
                            Labellisation
                        </label>
                        <input
                            placeholder='Labellisation'
                            className='input-container'
                            name="labellisation"
                            type="labellisation"
                            value={labellisation}
                            onChange={e => setLabellisation(e.target.value)}
                            required/>
                        <label className='label'>
                            open private researchers
                        </label>
                        <input
                            type="checkbox"
                            placeholder='Yes'
                            name='checkbox'
                            value={checkbox}
                            onChange={e => setCheckBox(e.target.value)}
                            required/>

                    </Modal.Body>
                    <Modal.Footer>

                        <button className='submit'>Valider</button>

                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default PlatformAdd;
