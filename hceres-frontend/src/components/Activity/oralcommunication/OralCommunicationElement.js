import {ListGroup} from "react-bootstrap";

const OralCommunicationElement = (props) =>
    props.targetOralCommunication && props.targetOralCommunication.oralCommunication ? <ListGroup horizontal={props.horizontal}>
        <ListGroup.Item variant={"primary"}>ID : {props.targetOralCommunication.idActivity}</ListGroup.Item>
        <ListGroup.Item>Titre : {props.targetOralCommunication.oralCommunication.oralCommunicationTitle}</ListGroup.Item>
        <ListGroup.Item>Auteurs : {props.targetOralCommunication.oralCommunication.authors}</ListGroup.Item>
        <ListGroup.Item>Date : {props.targetOralCommunication.oralCommunication.oralCommunicationDat}</ListGroup.Item>
    </ListGroup> : "Target oralCommunication is not send as props!"


export default OralCommunicationElement