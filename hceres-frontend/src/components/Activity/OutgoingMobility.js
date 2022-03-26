import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
function MobiliteSortante() {
  const [chercheur, setResearcherId] = React.useState("");
  const [personConcerned, setpersonConcerned] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [hostLabName, setHostLabName] = React.useState("");
  const [hostLabLocation, setHostLabLocation] = React.useState("");
  const [piPartner, setPiPartner] = React.useState("");
  const [projectTitle, setProjectTitle] = React.useState("");
  const [associatedFunding, setAssociatedFunding] = React.useState("");
  const [publicationReference, setPublicationReference] = React.useState("");
  const [numberOfPublication, setPublicationNumber] = React.useState("");
  const [strategicReccuringCollab, setStrategicReccuringCollab] = React.useState("");
  const [projectActive, setProjectActive] = React.useState("");
  const [umrCoordinated, setumrCoordinated] = React.useState("");
  const [agreementSigned, setagreementSigned] = React.useState("");
  const [date, setDate] = React.useState(null);
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
        researcherId: chercheur,
        namePersonConcerned: personConcerned,
        arrivalDate: date,
        departureDate: date,
        duration: duration,
        HostLabName: hostLabName,
        HostLabLocation: hostLabLocation,
        piPartner:piPartner,
        projectTitle: projectTitle,
        associatedFunding:associatedFunding,
        publicationReference:publicationReference,
        nbPublications: numberOfPublication,
        strategicRecurringCollab: strategicReccuringCollab,
        activeProject: projectActive,
        umrCoordinated:umrCoordinated,
        agreementSigned:agreementSigned
    };
    console.log(data);
    axios.post("http://localhost:9000/AddOutgoingMobility", data)
        .then(res => {
            console.log(res.data)
            navigate('/OutgoingMobility');
        }).catch(err => alert(err))
  }

  const handleDate = (event) =>{
    let date = `${event.getFullYear()}-${
        event.getMonth() +1
      }-${event.getDate()}`;
      setDate(date);
      setDate(event);
    }
  const handleChange = e => setResearcherId(e.target.value);
  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <a href="/Activity" class="close-button">&#10006;</a>
        <h3 className='title'>Mobilité sortante</h3>
        <label className='label'>
          Chercheur
        </label>
        <select onClick={componentDidMount} onChange={handleChange}>
                    {researchers.map(item => {
                        return (<option key={item.researcherId} value={item.researcherId}>{item.researcherName} {item.researcherSurname}</option>);
                    })}
                </select>
        <label className='label'>
          La personne concernée
        </label>
        <input
          placeholder='Nom personConcerned'
          className='input-container'
          name="personConcerned"
          type="personConcerned"
          value={personConcerned}
          onChange={e => setpersonConcerned(e.target.value)}
          required />


        <label className='label' >
          La durée
        </label>
        <input
          placeholder='Duration'
          className='input-container'
          name="Duration"
          type="Duration"
          value={duration}
          onChange={e => setDuration(e.target.value)}
          required />


        <label className='label'>
          Date d'arrivée
        </label>
        <DatePicker
          className='datePicker'
          selected={date}
          onChange={date => setDate(date)}
          withPortal
          placeholderText="Choix de date" />

        <label className='label'>
          Date de départ
        </label>
        <DatePicker
          className='datePicker'
          selected={date}
          onChange={date => setDate(date)}
          withPortal
          placeholderText="Choix de date" />

        
        <label className='label' >
          Le nom de laboratoire hébergeur
        </label>
        <input
          placeholder='HostLabName'
          className='input-container'
          name="HostLabName"
          type="HostLabName"
          value={hostLabName}
          onChange={e => setHostLabName(e.target.value)}
          required />
        
        <label className='label' >
          Le partenaire pi
        </label>
        <input
          placeholder='pi Partner'
          className='input-container'
          name="piPartner"
          type="piPartner"
          value={piPartner}
          onChange={e => setPiPartner(e.target.value)}
          required />

        <label className='label' >
          La location de laboratoire hébergeur
        </label>
        <input
          placeholder='Copropriétaires'
          className='input-container'
          name="HostLabLocation"
          type="HostLabLocation"
          value={hostLabLocation}
          onChange={e => setHostLabLocation(e.target.value)}
          required />

        <label className='label' >
          Le nom de projet
        </label>
        <textarea
          placeholder='Le nom de projet'
          className='input-container'
          name="publicationNumber"
          type="Le nom de projet"
          value={projectTitle}
          onChange={e => setProjectTitle(e.target.value)}
          required />
        

        <label className='label' >
          Le financement associé
        </label>
        <textarea
          placeholder='AssociatedFunding'
          className='input-container'
          name="AssociatedFunding"
          type="AssociatedFunding"
          value={associatedFunding}
          onChange={e => setAssociatedFunding(e.target.value)}
          required />

        <label className='label' >
          le réference de la publication
        </label>
        <textarea
          placeholder='le réference de la publication'
          className='input-container'
          name="PublicationReference"
          type="Numéro de propriété"
          value={publicationReference}
          onChange={e => setPublicationReference(e.target.value)}
          required />

        <label className='label' >
          Numéro de la publication
        </label>
        <textarea
          placeholder='Numéro de la publication'
          className='input-container'
          name="NumberOfPublication"
          type="Numéro de la publication"
          value={numberOfPublication}
          onChange={e => setPublicationNumber(e.target.value)}
          required />
        
        
        <label className='label' >
        Strategic Reccuring Collaboration
        </label>
        <textarea
          placeholder='Oui / Non'
          className='input-container'
          name="StrategicReccuringCollab"
          type="StrategicReccuringCollab"
          value={strategicReccuringCollab}
          onChange={e => setStrategicReccuringCollab(e.target.value)}
          required />

        <label className='label' >
          Le projet est active ?
        </label>
        <textarea
          placeholder='Oui / Non'
          className='input-container'
          name="projectActive"
          type="ProjetActive"
          value={projectActive}
          onChange={e => setProjectActive(e.target.value)}
          required />

        <label className='label' >
          UMR Coordinated ?
        </label>
        <textarea
          placeholder='OUI / NON'
          className='input-container'
          name="umrCoordinated"
          type="Référence de contrat de transfert"
          value={umrCoordinated}
          onChange={e => setumrCoordinated(e.target.value)}
          required />

        <label className='label' >
          Agréement signé
        </label>
        <textarea
          placeholder='Oui / Non'
          className='input-container'
          name="agreementSigned"
          type="agreementSigned"
          value={agreementSigned}
          onChange={e => setagreementSigned(e.target.value)}
          required />
        <button className='submit'>Valider</button>
      </form>
    </div>
  );
}
export default MobiliteSortante;