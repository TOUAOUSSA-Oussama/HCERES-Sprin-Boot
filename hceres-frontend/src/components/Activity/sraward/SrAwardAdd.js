import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {ListGroup} from "react-bootstrap";
import {fetchListResearchers} from "../../../services/Researcher/ResearcherActions";
import {addSrAward} from "../../../services/sraward/SrAwardActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function SrAwardAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)
    const [researchers, setResearchers] = React.useState([]);

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [awardeeName, setAwardeeName] = React.useState("");
    const [description, setDescritption] = React.useState("");
    const [awardDate, setAwardDate] = React.useState("");


    const handleClose = (msg = null) => {
        setShowModal(false);
        onHideParentAction(msg);
    };

    React.useEffect(() => {
        if (!targetResearcher) {
            fetchListResearchers().then(list => {
                setResearchers(list);
                if (list.length > 0) {
                    setResearcherId(list.entries().next().value[1].researcherId)
                }
            });
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            researcherId: researcherId,
            awardeeName: awardeeName,
            description: description,
            awardDate: awardDate
        };

        addSrAward(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "SrAward ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur SrAward non ajouté, response status: " + error.response.status,
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
                        <Modal.Title>SrAward</Modal.Title>
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
                            Nom du prix
                        </label>
                        <input
                            placeholder='awardeeName'
                            className='input-container'
                            name="SrAwardawardeeName"
                            type="awardeeName"
                            value={awardeeName}
                            onChange={e => setAwardeeName(e.target.value)}
                            required/>

                        <label className='label'>
                            Date d'obtention
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setAwardDate(e.target.value)}
                            required/>


                        <label className='label'>
                            Description
                        </label>
                        <textarea
                            placeholder='Description'
                            className='textarea'
                            name="SrAwardDescription"
                            type="description"
                            value={description}
                            onChange={e => setDescritption(e.target.value)}
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

export default SrAwardAdd;
