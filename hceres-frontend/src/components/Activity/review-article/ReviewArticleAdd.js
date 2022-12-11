import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {ListGroup} from "react-bootstrap";
import {fetchListResearchers} from "../../../services/Researcher/ResearcherActions";
import {addReviewArticle} from "../../../services/review-article/ReviewArticleActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function ReviewArticleAdd(props) {
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
    const [year, setYear] = React.useState("");
    const [journalName, setJournalName] = React.useState("");
    const [nbReviewedArticles, setNbReviewedArticles] = React.useState("");


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
            journalName: journalName,
            year: year,
            nbReviewedArticles: nbReviewedArticles
        };

        addReviewArticle(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "ReviewArticle ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur ReviewArticle non ajouté, response status: " + error.response.status,
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
                        <Modal.Title>ReviewArticle</Modal.Title>
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
                            Année
                        </label>
                        <input
                            placeholder='Année'
                            className='input-container'
                            name="year"
                            type="year"
                            value={year}
                            onChange={e => setYear(e.target.value)}
                            required/>

                        <label className='label'>
                            Facteur d'impact
                        </label>
                        <input
                            placeholder="Facteur d'impact"
                            className='input-container'
                            name="impactFactor"
                            type="number"
                            value={impactFactor}
                            onChange={e => setImpactFactor(e.target.value)}
                            required/>

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
                            Nombre d'article revues
                        </label>
                        <input
                            placeholder='Nom de la fonction'
                            className='input-container'
                            name="nbReviewedArticles"
                            type="number"
                            value={nbReviewedArticles}
                            onChange={e => setNbReviewedArticles(e.target.value)}
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

export default ReviewArticleAdd;