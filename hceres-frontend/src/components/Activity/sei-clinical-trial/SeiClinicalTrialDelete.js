import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SeiClinicalTrialElement from "./SeiClinicalTrialElement";
import {deleteSeiClinicalTrial} from "../../../services/sei-clinical-trial/SeiClinicalTrialActions";

function SeiClinicalTrialDelete(props) {
    const [show, setShow] = useState(true);
    const targetSeiClinicalTrial = props.targetSeiClinicalTrial;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        deleteSeiClinicalTrial(targetSeiClinicalTrial.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "SeiClinicalTrial supprimé ayant l'id " + targetSeiClinicalTrial.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "SeiClinicalTrial non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr de vouloir supprimer l'seiClinicalTrial sélectionné?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SeiClinicalTrialElement targetSeiClinicalTrial={targetSeiClinicalTrial}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Non
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Oui, Supprimer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default SeiClinicalTrialDelete;

