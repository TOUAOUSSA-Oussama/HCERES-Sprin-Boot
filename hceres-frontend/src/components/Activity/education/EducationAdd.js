import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {ListGroup} from "react-bootstrap";
import {fetchListResearchers} from "../../../services/Researcher/ResearcherActions";
import {addEducation} from "../../../services/education/EducationActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function EducationAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)
    const [researchers, setResearchers] = React.useState([]);

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [educationCourseName, setEducationCourseName] = React.useState("");
    const [educationFormation, setEducationFormation] = React.useState("");
    const [educationDescription, setEducationDescription] = React.useState("");
    const [educationInvolvementText, setEducationInvolvementText] = React.useState("");
    const [educationLevelText, setEducationLevelText] = React.useState("");
    const [educationCompletionDate, setEducationCompletionDate] = React.useState(null);


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
            educationCourseName: educationCourseName,
            educationFormation: educationFormation,
            educationDescription: educationDescription,
            educationInvolvmentText: educationInvolvementText,
            educationLevelText: educationLevelText,
            educationCompletion: educationCompletionDate
        };

        addEducation(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "Education ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur Education non ajouté, response status: " + error.response.status,
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
                        <Modal.Title>Education</Modal.Title>
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
                            Nom du cours d'éducation
                        </label>
                        <input
                            placeholder='educationCourseName'
                            className='input-container'
                            name="educationCourseName"
                            type="educationCourseName"
                            value={educationCourseName}
                            onChange={e => setEducationCourseName(e.target.value)}
                            required/>

                        <label className='label'>
                            Formation d'éducation
                        </label>
                        <input
                            placeholder='educationFormation'
                            className='input-container'
                            name="educationFormation"
                            type="educationFormation"
                            value={educationFormation}
                            onChange={e => setEducationFormation(e.target.value)}
                            required/>

                        <label className='label'>
                            Description de l'éducation
                        </label>
                        <input
                            placeholder='educationDescription'
                            className='input-container'
                            name="educationDescription"
                            type="educationDescription"
                            value={educationDescription}
                            onChange={e => setEducationDescription(e.target.value)}
                            required/>

                        <label className='label'>
                            Texte sur la participation à l'éducation
                        </label>
                        <input
                            placeholder='educationInvolvmentText'
                            className='input-container'
                            name="educationInvolvmentText"
                            type="educationInvolvmentText"
                            value={educationInvolvementText}
                            onChange={e => setEducationInvolvementText(e.target.value)}
                            required/>

                        <label className='label'>
                            Niveau d'éducation
                        </label>
                        <input
                            placeholder='educationLevelText'
                            className='input-container'
                            name="educationLevelText"
                            type="educationLevelText"
                            value={educationLevelText}
                            onChange={e => setEducationLevelText(e.target.value)}
                            required/>

                        <label className='label'>
                            Achèvement de l'éducation
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setEducationCompletionDate(e.target.value)}
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

export default EducationAdd;
