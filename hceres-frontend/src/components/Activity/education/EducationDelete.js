import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EducationElement from "./EducationElement";
import {deleteEducation} from "../../../services/education/EducationActions";

function EducationDelete(props) {
    const [show, setShow] = useState(true);
    const targetEducation = props.targetEducation;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        deleteEducation(targetEducation.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "Education supprimé ayant l'id " + targetEducation.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "Education non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr de vouloir supprimer l'education sélectionné?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EducationElement targetEducation={targetEducation}/>
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


export default EducationDelete;

