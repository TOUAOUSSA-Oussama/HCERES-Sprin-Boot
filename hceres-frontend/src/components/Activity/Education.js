import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Education(props) {
    const [showModal, setShowModal] = React.useState(true);

    const handleClose = () => {
        setShowModal(false);
        props.onHideAction.call();
    };

    const [researcherId, setResearcherId] = React.useState("");
    const [educationCourseName, setEducationCourseName] = React.useState("");
    const [educationFormation, setEducationFormation] = React.useState("");
    const [educationDescription, setEducationDescription] = React.useState("");
    const [educationInvolvmentText, setEducationInvolvmentText] = React.useState("");
    const [educationLevelText, setEducationLevelText] = React.useState("");
    const [date, setDate] = React.useState(null);
    const [formattedDate, setFormatted] = React.useState("");

    const [researchers, setResearchers] = React.useState([]);

    async function componentDidMount() {

        const url = "http://localhost:9000/Researchers";
        const response = await fetch(url);

        const listeChercheurs = await response.json();

        setResearchers(listeChercheurs)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            researcherId: researcherId,
            educationCourseName: educationCourseName,
            educationFormation: educationFormation,
            educationDescription: educationDescription,
            educationInvolvmentText: educationInvolvmentText,
            educationLevelText: educationLevelText,
            educationCompletion: formattedDate
        };

        Axios.post("http://localhost:9000/AddEducation", data)
            .then(res => {
                window.location.reload();
            })
    }

    const handleDate = (event) => {
        let formattedDate = `${event.getFullYear()}-${
            event.getMonth() + 1
        }-${event.getDate()}`;
        setFormatted(formattedDate);
        setDate(event);
    }

    const handleChange = e => setResearcherId(e.target.value);

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
                        <select onClick={componentDidMount} onChange={handleChange}>
                            {researchers.map(item => {
                                return (<option key={item.researcherId}
                                                value={item.researcherId}>{item.researcherName} {item.researcherSurname}</option>);
                            })}
                        </select>

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
                            value={educationInvolvmentText}
                            onChange={e => setEducationInvolvmentText(e.target.value)}
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
                        <DatePicker
                            className='datePicker'
                            selected={date}
                            onChange={handleDate}
                            withPortal
                            placeholderText="Choix de date"/>
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

export default Education;
