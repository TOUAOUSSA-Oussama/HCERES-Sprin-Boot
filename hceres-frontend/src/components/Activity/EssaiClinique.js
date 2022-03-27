import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import Axios from 'axios'

const EssaiClinique = () => {
    const [researcherId, setResearcherId] = React.useState("");
    const [startDate, setStartDate] = useState(null);
    const [partenaireCoordinateur, setPartenaireCoordinateur] = useState("");
    const [titreEssaiClinique, setTitreEssaiClinique] = useState("");
    const [endDate, setEndDate] = useState(null);
    const [nbEnregistrement, setNbEnregistrement] = useState("");
    const [nomSponsor, setNomSponsor] = useState("");
    const [nbPatients, setNbPatients] = useState("");
    const [financement, setFinancement] = useState("");
    const [montantFinancement, setMontantFinancement] = useState("");
    const navigate = useNavigate();

    const [researchers, setResearchers] = React.useState([]);
    async function componentDidMount() {

        const url = "http://localhost:9000/Researchers";
        const response = await fetch(url);

        const listeChercheurs = await response.json();
        
        setResearchers(listeChercheurs)
        console.log(researchers);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {

            researcherId: researcherId,
            startDate: startDate,
            endDate: endDate,
            coordinatorPartner: partenaireCoordinateur,
            titleClinicalTrial: titreEssaiClinique,
            registrationNb: nbEnregistrement,
            sponsorName:nomSponsor,
            includedPatientsNb:nbPatients,
            funding:financement,
            fundingAmount:montantFinancement
        };
        
        console.log(data);
        Axios.post("http://localhost:9000/Api/AddSeiClinicalTrial", data)
            .then(res => {
                console.log(res.data)
                
            })
            window.location.reload();
    }
    const handleDate1 = (event) =>{
        let startDate = `${event.getFullYear()}-${
            event.getMonth() +1
          }-${event.getDate()}`;
          setStartDate(startDate);
          setStartDate(event);
        }

        const handleDate2 = (event) =>{
            let endDate = `${event.getFullYear()}-${
                event.getMonth() +1
              }-${event.getDate()}`;
              setEndDate(endDate);
              setEndDate(event);
            }

    const handleChange = e => setResearcherId(e.target.value); 
    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <a href="/Activity" class="close-button">&#10006;</a>
                <h3 className='title'>Essai Clinique</h3>
                <label className='label'>
                    Chercheur
                </label>
                <select onClick={componentDidMount} onChange={handleChange}>
                    {researchers.map(item => {
                        return (<option key={item.researcherId} value={item.researcherId}>{item.researcherName} {item.researcherSurname}</option>);
                    })}
                </select>
             
            
                <label className='label'>
                    Date de début
                </label>
                <DatePicker
                    className='datePicker'
                    selected={startDate}
                    onChange={handleDate1}
                    withPortal
                    placeholderText="Choix de date de début" />

                <label className='label' >
                    Partenaire Coordinateur
                </label>
                <input
                    placeholder='partenaire coordinateur'
                    className='input-container'
                    name="partenaireCoordinateur"
                    id="partenaireCoordinateur"
                    value={partenaireCoordinateur}
                    onChange={(e) => setPartenaireCoordinateur(e.target.value)}
                    required />

                <label className='label' >
                    Titre d'essai clinique
                </label>
                <input
                    placeholder='Titre'
                    className='input-container'
                    name="titreEssaiClinique"
                    id="titreEssaiClinique"
                    value={titreEssaiClinique}
                    onChange={(e) => setTitreEssaiClinique(e.target.value)}
                    required />

                <label className='label'>
                    Date de fin
                </label>
                <DatePicker
                    className='datePicker'
                    selected={endDate}
                    onChange={handleDate2}
                    withPortal
                    placeholderText="Choix de date de fin" />

                <label className='label' >
                    Nombre d'enregistrement
                </label>
                <textarea
                    placeholder='Nombre Enregistrement '
                    className='nbEnregistrement'
                    name="nbEnregistrement"
                    id="nbEnregistrement"
                    value={nbEnregistrement}
                    onChange={(e) => setNbEnregistrement(e.target.value)}
                    required />
                <label className='label' >
                    Nom du Sponsor
                </label>
                <textarea
                    placeholder='Nom du Sponsor '
                    className='nomSponsor'
                    name="nomSponsor"
                    id="nomSponsor"
                    value={nomSponsor}
                    onChange={(e) => setNomSponsor(e.target.value)}
                    required />
                <label className='label' >
                        Nombre de patients 
                </label>
                <textarea
                    placeholder='Nom du Sponsor '
                    className='nbPatients'
                    name="nbPatients"
                    id="nbPatients"
                    value={nbPatients}
                    onChange={(e) => setNbPatients(e.target.value)}
                    required />
                <label className='label' >
                        Financement
                </label>
                <textarea
                    placeholder='financement'
                    className='financement'
                    name="financement"
                    id="financement"
                    value={financement}
                    onChange={(e) => setFinancement(e.target.value)}
                    required />
                <label className='label' >
                         Montant de financement
                </label>
                <textarea
                    placeholder='Nom du Sponsor '
                    className='montantFinancement'
                    name="montantFinancement"
                    id="montantFinancement"
                    value={montantFinancement}
                    onChange={(e) => setMontantFinancement(e.target.value)}
                    required />
                
                <button className='submit'>Valider</button>
            </form>
        </div>
    );
}
export default EssaiClinique;