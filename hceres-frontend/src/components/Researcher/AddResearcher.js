import React from 'react';
import './Researcher.css';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom";

function AddResearcher() {
    const [AddResearcherFirstName, setAddResearcherFirstName] = React.useState("");
    const [AddResearcherLastName, setAddResearcherLastName] = React.useState("");
    const [AddResearcherEmail, setAddResearcherEmail] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
         event.preventDefault();
         let data = {
             "researcherSurname": AddResearcherFirstName,
             "researcherName": AddResearcherLastName,
             "researcherEmail": AddResearcherEmail};
        
         Axios.post("http://localhost:9000/AddResearcher", data)
             .then(res => {
                navigate('/Researcher');
             })
     }
        
    return (
        <div className='form-container'>
            <form  className='form' onSubmit={handleSubmit}>
                <a href="/Researcher" class="close-button">&#10006;</a>
                <h3 className='title'>Ajouter un chercheur:</h3>
                <label className='label' >
                Prénom du chercheur
                </label>
                <input
                    placeholder='Prénom'
                    className='input-container'
                    name="AddResearcherFirstName"
                    type="AddResearcherFirstName"
                    value={AddResearcherFirstName}
                    onChange={e => setAddResearcherFirstName(e.target.value)}
                    required />
                <label className='label' >
                Nom du chercheur
                </label>
                <input
                    placeholder='Nom'
                    className='input-container'
                    name="AddResearcherLastName"
                    type="AddResearcherLastName"
                    value={AddResearcherLastName}
                    onChange={e => setAddResearcherLastName(e.target.value)}
                    required />

                <label className='label' >
                Email du chercheur
                </label>
                <input
                    placeholder='Email'
                    className='input-container'
                    name="AddResearcherEmail"
                    type="AddResearcherEmail"
                    value={AddResearcherEmail}
                    onChange={e => setAddResearcherEmail(e.target.value)}
                    required />
                <button className='submit'>Valider</button>
            </form>
        </div>
    );
}
export default AddResearcher;
