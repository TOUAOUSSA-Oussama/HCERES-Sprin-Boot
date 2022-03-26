import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Brevet() {
  const [chercheur, setResearcherId] = React.useState("");
  const [titre, settitre] = React.useState("");
  const [inventeurs, setInventeurs] = React.useState("");
  const [coowners, setCoOwners] = React.useState("");
  const [priority_number, setPriorityNumber] = React.useState("");
  const [pub_number, setPubNumber] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [extensionPCT, setextensionPCT] = React.useState("");
  const [extensionPCTnumber, setPCTnumber] = React.useState("");
  const [extensionInternationale, setExtensionInternationale] = React.useState("");
  const [extensionInternationalNumber, setExtInternNumber] = React.useState("");
  const [ContractRef, setContractRef] = React.useState("");
  const [CompanyName, setCompanyName] = React.useState("");
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
        title: titre,
        inventors: inventeurs,
        coOwners: coowners,
        priorityNumber: priority_number,
        filingDate: date,
        registrationDate: date,
        acceptationDate: date,
        licensingDate: date,
        publicationNumber: pub_number,
        publicationDate: date,
        status: status,
        pctExtensionObtained: extensionPCT,
        publicationNumberPctExtension: extensionPCTnumber,
        publicationDatePctExtension: date,
        internationalExtension: extensionInternationale,
        publicationNumberInternationalExtension: extensionInternationalNumber,
        publicationDateInternationalExtension: date,
        refTransferContract: ContractRef,
        nameCompanyInvolved: CompanyName};
    
    console.log(data);
    axios.post("http://localhost:9000/AddPatent", data)
        .then(res => {
            console.log(res.data)
            navigate('/Home');
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
        <h3 className='title'>Brevet</h3>
        <label className='label'>
          Chercheur
        </label>
        <select onClick={componentDidMount} onChange={handleChange}>
                    {researchers.map(item => {
                        return (<option key={item.researcherId} value={item.researcherId}>{item.researcherName} {item.researcherSurname}</option>);
                    })}
                </select>


        <label className='label' >
          Titre
        </label>
        <input
          placeholder='Titre'
          className='input-container'
          name="titre"
          type="titre"
          value={titre}
          onChange={e => settitre(e.target.value)}
          required />


        <label className='label'>
          Date d'enregistrement
        </label>
        <DatePicker
          className='datePicker'
          selected={date}
          onChange={date => setDate(date)}
          withPortal
          placeholderText="Choix de date" />

        <label className='label'>
          Date de dépôt
        </label>
        <DatePicker
          className='datePicker'
          selected={date}
          onChange={date => setDate(date)}
          withPortal
          placeholderText="Choix de date" />

        <label className='label'>
          Date d'acceptation
        </label>
        <DatePicker
          className='datePicker'
          selected={date}
          onChange={date => setDate(date)}
          withPortal
          placeholderText="Choix de date" />

        <label className='label'>
          Date de license
        </label>
        <DatePicker
          className='datePicker'
          selected={date}
          onChange={date => setDate(date)}
          withPortal
          placeholderText="Choix de date" />

        <label className='label' >
          Inventeurs
        </label>
        <input
          placeholder='Inventeurs'
          className='input-container'
          name="inventeurs"
          type="inventeurs"
          value={inventeurs}
          onChange={e => setInventeurs(e.target.value)}
          required />
        

        <label className='label' >
          Les copropriétaires
        </label>
        <input
          placeholder='Copropriétaires'
          className='input-container'
          name="coowners"
          type="coowners"
          value={coowners}
          onChange={e => setCoOwners(e.target.value)}
          required />
        
        <label className='label' >
          Numéro de propriété
        </label>
        <textarea
          placeholder='Numéro de propriété'
          className='input-container'
          name="propertyNumber"
          type="Numéro de propriété"
          value={priority_number}
          onChange={e => setPriorityNumber(e.target.value)}
          required />

        <label className='label' >
          Numéro de publication
        </label>
        <textarea
          placeholder='Numéro de publication'
          className='input-container'
          name="publicationNumber"
          type="Numéro de publication"
          value={pub_number}
          onChange={e => setPubNumber(e.target.value)}
          required />
        
        <label className='label'>
          Date de publication
        </label>
        <DatePicker
          className='datePicker'
          selected={date}
          onChange={date => setDate(date)}
          withPortal
          placeholderText="Choix de date" />


        <label className='label' >
          Status
        </label>
        <textarea
          placeholder='status'
          className='input-container'
          name="status"
          type="status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          required />

        <label className='label' >
          Extension PCT
        </label>
        <textarea
          placeholder='Obtenu/Non obtenu'
          className='input-container'
          name="extensionPCT"
          type="Numéro de propriété"
          value={extensionPCT}
          onChange={e => setextensionPCT(e.target.value)}
          required />

        <label className='label' >
          Numéro d'extension PCT
        </label>
        <textarea
          placeholder='Numéro dextension PCT'
          className='input-container'
          name="extensionPCTnumber"
          type="Numéro dextension PCT"
          value={extensionPCTnumber}
          onChange={e => setPCTnumber(e.target.value)}
          required />
        
        <label className='label'>
          Date d'extension PCT
        </label>
        <DatePicker
          className='datePicker'
          selected={date}
          onChange={date => setDate(date)}
          withPortal
          placeholderText="Choix de date" />


        <label className='label' >
          Extension Internationale
        </label>
        <textarea
          placeholder='Obtenu/Non obtenu'
          className='input-container'
          name="extensionInternationale"
          type="ExtensionInternationale"
          value={extensionInternationale}
          onChange={e => setExtensionInternationale(e.target.value)}
          required />

        <label className='label' >
          Numéro dextension internationale'
        </label>
        <textarea
          placeholder='Numéro dextension internationale'
          className='input-container'
          name="extensionInternationalNumber"
          type="Numéro dextension internationale'"
          value={extensionInternationalNumber}
          onChange={e => setExtInternNumber(e.target.value)}
          required />


        <label className='label'>
          Date d'extension internationale'
        </label>
        <DatePicker
          className='datePicker'
          selected={date}
          onChange={date => setDate(date)}
          withPortal
          placeholderText="Choix de date" />

        
        <label className='label' >
          Référence de contrat de transfert
        </label>
        <textarea
          placeholder='Référence de contrat de transfert'
          className='input-container'
          name="ContractRef"
          type="Référence de contrat de transfert"
          value={ContractRef}
          onChange={e => setContractRef(e.target.value)}
          required />

        <label className='label' >
          Nom d'entreprise impliquée
        </label>
        <textarea
          placeholder='Nom dentreprise impliquée'
          className='input-container'
          name="CompanyName"
          type="Nom d'entreprise impliquée"
          value={CompanyName}
          onChange={e => setCompanyName(e.target.value)}
          required />
        <button className='submit'>Valider</button>
      </form>
    </div>
  );
}
export default Brevet;