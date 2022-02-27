import React from 'react';
import './Education.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Education() {
  const [chercheur, setChercheur] = React.useState("");
  const [cours, setCours] = React.useState("");
  const [formation, setFormation] = React.useState("");
  const [description, setDescritption] = React.useState("");
  const [date, setDate] = React.useState(null);

  const handleSubmit = (event) => {
    console.log("Submitted");
    event.preventDefault();

  }

  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <a href="/Activity" class="close-button">&#10006;</a>
        <h3 className='title'>EDUCATION</h3>
        <label className='label'>
          Chercheur
        </label>
        <input
          placeholder='Nom'
          className='input-container'
          name="chercheur"
          type="chercheur"
          value={chercheur}
          onChange={e => setChercheur(e.target.value)}
          required />


        <label className='label' >
          Cours
        </label>
        <input
          placeholder='Cours'
          className='input-container'
          name="cours"
          type="cours"
          value={cours}
          onChange={e => setCours(e.target.value)}
          required />


        <label className='label'>
          Date de completion
        </label>
        <DatePicker
          className='datePicker'
          selected={date}
          onChange={date => setDate(date)}
          withPortal
          placeholderText="Choix de date" />


        <label className='label' >
          Formation
        </label>
        <input
          placeholder='Formation'
          className='input-container'
          name="formation"
          type="formation"
          value={formation}
          onChange={e => setFormation(e.target.value)}
          required />

        <label className='label' >
          Description
        </label>
        <textarea
          placeholder='Description'
          className='textarea'
          name="description"
          type="description"
          value={description}
          onChange={e => setDescritption(e.target.value)}
          required />

        <button className='submit'>Valider</button>
      </form>
    </div>
  );
}
export default Education;