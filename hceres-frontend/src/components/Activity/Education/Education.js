import React from 'react';
import './Education.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';

function Education() {
  const [researcherId, setChercheur] = React.useState("");
  const [educationCourseName, setCours] = React.useState("");
  const [educationFormation, setFormation] = React.useState("");
  const [educationDescription, setDescritption] = React.useState("");
  const [educationInvolvmentText, setEducationInvolvmentText] = React.useState("");
  const [educationLevelText, setEducationLevelText] = React.useState("");
  const [educationCompletion, setDate] = React.useState("");

  const navigate  = useNavigate();
  const faireRedirection = () => { 
    navigate('/Activity');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { researcherId, educationCourseName,  educationCompletion, educationFormation, educationDescription, educationInvolvmentText, educationLevelText  };
 
    fetch("http://localhost:9000/AddEducation", {
      mode: 'no-cors',
      method: "POST",
      body: blog,
    }).then(() => {
      navigate('/Activity');
    });
  };

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
          name="researcherId"
          type="chercheur"
          value={researcherId}
          onChange={e => setChercheur(e.target.value)}
          required />


        <label className='label' >
          Cours
        </label>
        <input
          placeholder='Cours'
          className='input-container'
          name="educationCourseName"
          type="cours"
          value={educationCourseName}
          onChange={e => setCours(e.target.value)}
          required />


        <label className='label'>
          Date de completion
        </label>
        <input
          className='datePicker'
          name="educationCompletion"
          type="date"
          selected={educationCompletion}
          onChange={e => setDate(e.target.value)}
          withPortal
          placeholderText="Choix de date" />


        <label className='label' >
          Formation
        </label>
        <input
          placeholder='Formation'
          className='input-container'
          name="educationFormation"
          type="formation"
          value={educationFormation}
          onChange={e => setFormation(e.target.value)}
          required />

        <label className='label' >
          Description
        </label>
        <textarea
          placeholder='Description'
          className='textarea'
          name="educationDescription"
          type="description"
          value={educationDescription}
          onChange={e => setDescritption(e.target.value)}
          required />

        <label className='label' >
          education Involvment
        </label>
        <textarea
          placeholder='Description'
          className='textarea'
          name="educationInvolvmentText"
          type="description"
          value={educationInvolvmentText}
          onChange={e => setEducationInvolvmentText(e.target.value)}
          required />

        <label className='label' >
          education LevelText
        </label>
        <textarea
          placeholder='Description'
          className='textarea'
          name="educationLevelText"
          type="description"
          value={educationLevelText}
          onChange={e => setEducationLevelText(e.target.value)}
          required />

        <button className='submit'>Valider</button>
      </form>
    </div>
  );
}
export default Education;