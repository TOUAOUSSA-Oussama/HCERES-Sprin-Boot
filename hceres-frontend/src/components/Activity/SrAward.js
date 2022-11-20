import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate  } from "react-router-dom";
import Axios from 'axios'

function SrAward() {
  const [researcherId, setResearcherId] = React.useState("");
  const [awardeeName, setAwardeeName] = React.useState("");
  const [description, setDescritption] = React.useState("");
  const [awardDate, setDate] = React.useState("");
  const navigate = useNavigate();
  const [researchers, setResearchers] = React.useState([]);
    async function componentDidMount() {

        const url = "http://localhost:9000/Researchers";
        const response = await fetch(url);

        const listeChercheurs = await response.json();
        
        setResearchers(listeChercheurs)
    }
  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {

        "researcherId": researcherId,
        awardeeName: awardeeName,
        description: description,
        awardDate: awardDate};
    Axios.post("http://localhost:9000/Api/AddSrAward", data)
        .then(res => {
            window.location.reload();
        })
}

  const handleDate = (event) =>{
  let awardDate = `${event.getFullYear()}-${
      event.getMonth() +1
    }-${event.getDate()}`;
    setDate(awardDate);
    setDate(event);
  }

  const faireRedirection = () => { 
    navigate('/Activity');
  }
  const handleChange = e => setResearcherId(e.target.value); 
  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <a href="/Activity" class="close-button">&#10006;</a>
        <h3 className='title'>Prix</h3>
        <label className='label'>
          Chercheur
        </label>
        <select onClick={componentDidMount} onChange={handleChange}>
                    {researchers.map(item => {
                        return (<option key={item.researcherId} value={item.researcherId}>{item.researcherName} {item.researcherSurname}</option>);
                    })}
                </select>
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
        <DatePicker
                    className='datePicker'
                    selected={awardDate}
                    onChange={handleDate}
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