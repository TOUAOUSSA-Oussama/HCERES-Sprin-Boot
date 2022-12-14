import React, {useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {ListGroup} from "react-bootstrap";
import {fetchListResearchers} from "../../../services/Researcher/ResearcherActions";
import {addSeiClinicalTrial} from "../../../services/sei-clinical-trial/SeiClinicalTrialActions";

// If targetResearcher is set in props use it as default without charging list from database
// else load list de chercheurs from database
function SeiClinicalTrialAdd(props) {
    // parameter constant (Add Template)
    const targetResearcher = props.targetResearcher;
    const onHideParentAction = props.onHideAction

    // Cached state (Add Template)
    const [researchers, setResearchers] = React.useState([]);

    // UI states (Add Template)
    const [showModal, setShowModal] = React.useState(true);


    // Form state (Add Template)
    const [researcherId, setResearcherId] = React.useState(targetResearcher ? targetResearcher.researcherId : "");
    const [startDate, setStartDate] = useState(null);
    const [partenaireCoordinateur, setPartenaireCoordinateur] = useState(false);
    const [titreEssaiClinique, setTitreEssaiClinique] = useState("");
    const [endDate, setEndDate] = useState(null);
    const [nbEnregistrement, setNbEnregistrement] = useState(""); // number
    const [nomSponsor, setNomSponsor] = useState("");
    const [nbPatients, setNbPatients] = useState(""); // number
    const [financement, setFinancement] = useState("");
    const [montantFinancement, setMontantFinancement] = useState(""); // number

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
            startDate: startDate,
            endDate: endDate,
            coordinatorPartner: partenaireCoordinateur,
            titleClinicalTrial: titreEssaiClinique,
            registrationNb: nbEnregistrement,
            sponsorName: nomSponsor,
            includedPatientsNb: nbPatients,
            funding: financement,
            fundingAmount: montantFinancement
        };

        addSeiClinicalTrial(data).then(response => {
            // const activityId = response.data.researcherId;
            const msg = {
                "successMsg": "SeiClinicalTrial ajouté avec un id " + response.data.idActivity,
            }
            handleClose(msg);
        }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Erreur SeiClinicalTrial non ajouté, response status: " + error.response.status,
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
                        <Modal.Title>SeiClinicalTrial</Modal.Title>
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
                            Date de début
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setStartDate(e.target.value)}
                            required/>

                        <label className='label'>
                            Partenaire Coordinateur ?
                        </label>
                        <input
                            type="checkbox"
                            className='input-container'
                            onChange={e => setPartenaireCoordinateur(e.target.checked)}
                            required/>

                        <label className='label'>
                            Titre d'essai clinique
                        </label>
                        <input
                            placeholder='Titre'
                            className='input-container'
                            name="titreEssaiClinique"
                            id="titreEssaiClinique"
                            value={titreEssaiClinique}
                            onChange={(e) => setTitreEssaiClinique(e.target.value)}
                            required/>

                        <label className='label'>
                            Date de fin
                        </label>
                        <input
                            type="date"
                            className='input-container'
                            onChange={e => setEndDate(e.target.value)}
                            required/>

                        <label className='label'>
                            Nombre d'enregistrement
                        </label>
                        <input
                            type={"number"}
                            className='input-container'
                            placeholder='Nombre Enregistrement '
                            value={nbEnregistrement}
                            onChange={(e) => setNbEnregistrement(e.target.value)}
                            required/>
                        <label className='label'>
                            Nom du Sponsor
                        </label>
                        <input
                            type={"text"}
                            placeholder='Nom du Sponsor '
                            className='input-container'
                            value={nomSponsor}
                            onChange={(e) => setNomSponsor(e.target.value)}
                            required/>

                        <label className='label'>
                            Nombre de patients
                        </label>
                        <input
                            type={"number"}
                            placeholder='Nombre de patients'
                            className='input-container'
                            value={nbPatients}
                            onChange={(e) => setNbPatients(e.target.value)}
                            required/>
                        <label className='label'>
                            Financement
                        </label>
                        <input
                            type={"text"}
                            placeholder='financement'
                            className='input-container'
                            value={financement}
                            onChange={(e) => setFinancement(e.target.value)}
                            required/>

                        <label className='label'>
                            Montant de financement
                        </label>
                        <input
                            type={"number"}
                            placeholder='Montant de financement'
                            className='input-container'
                            value={montantFinancement}
                            onChange={(e) => setMontantFinancement(e.target.value)}
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

export default SeiClinicalTrialAdd;
