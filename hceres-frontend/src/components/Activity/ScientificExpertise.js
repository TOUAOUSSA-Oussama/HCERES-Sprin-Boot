import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react/cjs/react.development";
import Axios from 'axios'
import axios from "axios";
import Modal from "react-bootstrap/Modal";

function ScientificExpertise(props) {

    const [showModal, setShowModal] = React.useState(true);

    const handleClose = () => {
        setShowModal(false);
        props.onHideAction.call();
    };

    const [researcherId, setResearcherId] = React.useState("");
    const [typeName, settypeName] = useState("");
    const [startDate, setstartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const [description, setdescription] = useState("");
    const navigate = useNavigate();

    const [researchers, setResearchers] = React.useState([]);

    async function componentDidMount() {

        const url = "http://localhost:9000/Researchers";
        const response = await axios.get(url);

        const listeChercheurs = response.data;

        setResearchers(listeChercheurs)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {

            researcherId: researcherId,
            ScientificExpertiseTypeName: typeName,
            ScientificExpertiseDescription: description,
            ScientificExpertiseStartDate: startDate,
            ScientificExpertiseEndDate: endDate
        };

        Axios.post("http://localhost:9000/Api/AddScientificExpertise", data)
            .then(res => {
                window.location.reload();
            })
    }
    const handleDate1 = (event) => {
        let startDate = `${event.getFullYear()}-${
            event.getMonth() + 1
        }-${event.getDate()}`;
        setstartDate(startDate);
        setstartDate(event);
    }

    const handleDate2 = (event) => {
        let endDate = `${event.getFullYear()}-${
            event.getMonth() + 1
        }-${event.getDate()}`;
        setendDate(endDate);
        setendDate(event);
    }

    const handleChange = e => setResearcherId(e.target.value);
    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Expertise scientifique</Modal.Title>
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
                    Nom du Type
                </label>
                <input
                    placeholder='Nom du type'
                    className='input-container'
                    name="typeName"
                    id="typeName"
                    value={typeName}
                    onChange={(e) => settypeName(e.target.value)}
                    required/>
                <label className='label'>
                    Date de début
                </label>
                <DatePicker
                    className='datePicker'
                    selected={startDate}
                    onChange={handleDate1}
                    withPortal
                    placeholderText="Choix de date de début"/>
                <label className='label'>
                    Date de fin
                </label>
                <DatePicker
                    className='datePicker'
                    selected={endDate}
                    onChange={handleDate2}
                    withPortal
                    placeholderText="Choix de date de fin"/>

                <label className='label'>
                    description
                </label>
                <input
                    placeholder='description'
                    className='input-container'
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
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
export default ScientificExpertise;