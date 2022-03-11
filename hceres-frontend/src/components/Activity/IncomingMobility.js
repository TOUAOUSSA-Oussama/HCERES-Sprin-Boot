import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import IncomingMobilityService from "../../services/IncomingMobility.service";
import Axios from 'axios'

const IncomingMobility = () => {
    const [chercheur, setChercheur] = useState("");
    const [nameSeniorScientist, setnameSeniorScientist] = useState("");
    const [arrivalDate, setarrivalDate] = useState(null);
    const [departureDate, setdepartureDate] = useState(null);
    const [duration, setduration] = useState("");
    const [nationality, setnationality] = useState("");
    const [originalLabName, setoriginalLabName] = useState("");
    const [originaLabLocation, setoriginaLabLocation] = useState("");
    const [piPartner, setpiPartner] = useState("");
    const [projectTitle, setprojectTitle] = useState("");
    const [associatedFunding, setassociatedFunding] = useState("");
    const [publicationReference, setpublicationReference] = useState("");
    const [strategicRecurringCollab, setstrategicRecurringCollab] = useState("");
    const [activeProject, setactiveProject] = useState("");
    const [umrCoordinated, setumrCoordinated] = useState("");
    const [agreementSigned, setagreementSigned] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {

            researcherId: chercheur,
            nameSeniorScientist: nameSeniorScientist,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            duration: duration,
            nationality: nationality,
            originalLabName:originalLabName,
            originaLabLocation:originaLabLocation,
            piPartner:piPartner,
            projectTitle:projectTitle,
            associatedFunding:associatedFunding,
            publicationReference:publicationReference,
            strategicRecurringCollab:strategicRecurringCollab,
            activeProject:activeProject,
            umrCoordinated:umrCoordinated,
            agreementSigned:agreementSigned
        };
        
        console.log(data);
        Axios.post("http://localhost:9000/Api/AddIncomingMobility", data)
            .then(res => {
                console.log(res.data)
            }).catch(err => alert(err))
    }


    const handleDate1 = (event) =>{
        let arrivalDate = `${event.getFullYear()}-${
            event.getMonth() +1
          }-${event.getDate()}`;
          setarrivalDate(arrivalDate);
          setarrivalDate(event);
        }
    const handleDate2 = (event) =>{
            let departureDate = `${event.getFullYear()}-${
                event.getMonth() +1
              }-${event.getDate()}`;
              setdepartureDate(departureDate);
              setdepartureDate(event);
            }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <a href="/Activity" class="close-button">&#10006;</a>
                <h3 className='title'>Mobilité entrante</h3>
                <label className='label'>
                    Chercheur
                </label>
                <input
                    placeholder='Nom'
                    className='input-container'
                    name="chercheur"
                    id="chercheur"
                    value={chercheur}
                    onChange={(e) => setChercheur(e.target.value)}
                    required />
                <label className='label'>
                    Nom du Senior Scientist
                </label>
                <input
                    placeholder='Nom'
                    className='input-container'
                    name="nameSeniorScientist"
                    id="nameSeniorScientist"
                    value={nameSeniorScientist}
                    onChange={(e) => setnameSeniorScientist(e.target.value)}
                    required />
                <label className='label'>
                    Date d'arrivée 
                </label>
                <DatePicker
                    className='datePicker'
                    selected={arrivalDate}
                    onChange={handleDate1}
                    withPortal
                    placeholderText="Choix de date d'arrivée" />
                 <label className='label'>
                    Date de départ  
                </label>
                <DatePicker
                    className='datePicker'
                    selected={departureDate}
                    onChange={handleDate2}
                    withPortal
                    placeholderText="Choix de date de départ" />

                <label className='label' >
                    Durée
                </label>
                <input
                    placeholder='durée'
                    className='input-container'
                    name="duration"
                    id="duration"
                    value={duration}
                    onChange={(e) => setduration(e.target.value)}
                    required />

                <label className='label' >
                    Nationalité
                </label>
                <input
                    placeholder='nationalité'
                    className='nationality'
                    name="nationality"
                    id="nationality"
                    value={nationality}
                    onChange={(e) => setnationality(e.target.value)}
                    required />

    

                <label className='label' >
                    Nom du laboratoire d'origine 
                </label>
                <textarea
                    placeholder='Nom du Laboratoire origine'
                    className='originalLabName'
                    name="originalLabName"
                    id="originalLabName"
                    value={originalLabName}
                    onChange={(e) => setoriginalLabName(e.target.value)}
                    required />
                
                <label className='label' >
                    Emplacement du laboratoire origine
                </label>
                <textarea
                    placeholder='Emplacement du laboratoire origine'
                    className='originaLabLocation'
                    name="originaLabLocation"
                    id="originaLabLocation"
                    value={originaLabLocation}
                    onChange={(e) => setoriginaLabLocation(e.target.value)}
                    required />

                <label className='label' >
                    piPartner
                </label>
                <textarea
                    placeholder='Emplacement du laboratoire origine'
                    className='piPartner'
                    name="piPartner"
                    id="piPartner"
                    value={piPartner}
                    onChange={(e) => setpiPartner(e.target.value)}
                    required />

                <label className='label' >
                    Titre du projet 
                </label>
                <textarea
                    placeholder='Emplacement du laboratoire origine'
                    className='projectTitle'
                    name="projectTitle"
                    id="projectTitle"
                    value={projectTitle}
                    onChange={(e) => setprojectTitle(e.target.value)}
                    required />

                <label className='label' >
                    Financement associé
                </label>
                <textarea
                    placeholder='Nom du Sponsor '
                    className='associatedFunding'
                    name="associatedFunding"
                    id="associatedFunding"
                    value={associatedFunding}
                    onChange={(e) => setassociatedFunding(e.target.value)}
                    required />
                <label className='label' >
                    Référence de la publication
                </label>
                <textarea
                    placeholder='Référence de la publication'
                    className='publicationReference'
                    name="publicationReference"
                    id="publicationReference"
                    value={publicationReference}
                    onChange={(e) => setpublicationReference(e.target.value)}
                    required />

                <label className='label' >
                  Collaboration stratégique récurrente ?
                </label>
                <textarea
                    placeholder='Collaboration stratégique récurrente ? (true/false)'
                    className='strategicRecurringCollab'
                    name="strategicRecurringCollab"
                    id="strategicRecurringCollab"
                    value={strategicRecurringCollab}
                    onChange={(e) => setstrategicRecurringCollab(e.target.value)}
                    required />
                <label className='label' >
                        Projet actif ?
                </label>
                <textarea
                    placeholder=' Projet actif ? (true/false)'
                    className='activeProject'
                    name="activeProject"
                    id="activeProject"
                    value={activeProject}
                    onChange={(e) => setactiveProject(e.target.value)}
                    required />
                <label className='label' >
                         Cordonné UMR ?
                </label>
                <textarea
                    placeholder='Cordonné UMR ? (true/false)'
                    className='umrCoordinated'
                    name="umrCoordinated"
                    id="umrCoordinated"
                    value={umrCoordinated}
                    onChange={(e) => setumrCoordinated(e.target.value)}
                    required />
                    
                <label className='label' >
                    Accord signé ?
                </label>
                <textarea
                    placeholder='Accord signé ? (true/false)'
                    className='agreementSigned'
                    name="agreementSigned"
                    id="agreementSigned"
                    value={agreementSigned}
                    onChange={(e) => setagreementSigned(e.target.value)}
                    required />
                
                <button className='submit'>Valider</button>
            </form>
        </div>
    );
}
export default IncomingMobility;