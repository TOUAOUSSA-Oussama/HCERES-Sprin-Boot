import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useNavigate} from "react-router-dom";
import Axios from 'axios'
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


function SrAward(props) {
    const [showModal, setShowModal] = React.useState(true);

    const handleClose = () => {
        setShowModal(false);
        props.onHideAction.call();
    };

    const [researcherId, setResearcherId] = React.useState("");
    const [awardeeName, setAwardeeName] = React.useState("");
    const [description, setDescritption] = React.useState("");
    const [awardDate, setDate] = React.useState("");
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

            "researcherId": researcherId,
            awardeeName: awardeeName,
            description: description,
            awardDate: awardDate
        };
        Axios.post("http://localhost:9000/Api/AddSrAward", data)
            .then(res => {
                window.location.reload();
            })
    }

    const handleDate = (event) => {
        let awardDate = `${event.getFullYear()}-${
            event.getMonth() + 1
        }-${event.getDate()}`;
        setDate(awardDate);
        setDate(event);
    }

    const faireRedirection = () => {
        navigate('/Activity');
    }
    const handleChange = e => setResearcherId(e.target.value);
    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Pris</Modal.Title>
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
                    Date d'optention
                </label>
                <DatePicker
                    className='datePicker'
                    selected={awardDate}
                    onChange={handleDate}
                    withPortal
                    placeholderText="Choix de date"/>


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


                <button className='submit' onClick={faireRedirection}>Valider</button>

                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default SrAward;