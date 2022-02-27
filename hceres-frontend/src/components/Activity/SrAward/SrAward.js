import React from 'react';
import './SrAward.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate  } from "react-router-dom";

function SrAward() {
  const [researcherId, setChercheur] = React.useState("");
  const [awardeeName, setAwardeeName] = React.useState("");
  const [description, setDescritption] = React.useState("");
  const [awardDate, setDate] = React.useState("");

  const navigate  = useNavigate();
  const faireRedirection = () => { 
    navigate('/Activity');
  }

  return (
    <div className='form-container'>
      <form className='form' action="http://localhost:9000/AddSrAward" method="POST">
        <a href="/Activity" class="close-button">&#10006;</a>
        <h3 className='title'>SrAward</h3>
        <label className='label'>
          Chercheur
        </label>
        <input
          placeholder='Nom'
          className='input-container'
          name="researcherId"
          type="chercheur"
          value={researcherId}
          onChange={e => setChercheur(e.target.value)}
          required />
        
        <label className='label' >
          Nom du prix
        </label>
        <input
          placeholder='awardeeName'
          className='input-container'
          name="SrAwardawardeeName"
          type="awardeeName"
          value={awardeeName}
          onChange={e => setAwardeeName(e.target.value)}
          required />

        <label className='label'>
          Date d'optention
        </label>
        <input
          className='datePicker'
          name="SrAwardCompletion"
          type="date"
          selected={awardDate}
          onChange={awardDate => setDate(awardDate)}
          withPortal
          placeholderText="Choix de date" />

        <label className='label' >
          Description
        </label>
        <textarea
          placeholder='Description'
          className='textarea'
          name="SrAwardDescription"
          type="description"
          value={description}
          onChange={e => setDescritption(e.target.value)}
          required />

        <button className='submit' onClick={faireRedirection}>Valider</button>
      </form>
    </div>
  );
}
export default SrAward;