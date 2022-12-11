import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PostDocElement from "./PostDocElement";
import {deletePostDoc} from "../../../services/post-doc/PostDocActions";

function PostDocDelete(props) {
    const [show, setShow] = useState(true);
    const targetPostDoc = props.targetPostDoc;

    const handleClose = (msg = null) => {
        setShow(false);
        props.onHideAction(msg);
    };

    const handleDelete = () => {
        deletePostDoc(targetPostDoc.idActivity)
            .then(response => {
                const msg = {
                    "successMsg": "PostDoc supprimé ayant l'id " + targetPostDoc.idActivity,
                }
                handleClose(msg);
            }).catch(error => {
            console.log(error);
            const msg = {
                "errorMsg": "PostDoc non supprimé, response status: " + error.response.status,
            }
            handleClose(msg);
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Êtes-vous sûr de vouloir supprimer le postDoc sélectionné?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PostDocElement targetPostDoc={targetPostDoc}/>
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


export default PostDocDelete;

