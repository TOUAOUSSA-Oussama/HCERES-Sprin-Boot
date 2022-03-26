import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

function CompanyCreation() {
  const [chercheur, setResearcherId] = React.useState("");
  const [companytitle, setCompanytitle] = React.useState("");
  const [companyActive, setCompanyActive] = React.useState("");
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
        companytitle: companytitle,
        companyActive: companyActive,
        companyCreationDate: date};
    
    console.log(data);
    axios.post("http://localhost:9000/AddCompanyCreation", data)
        .then(res => {
            console.log(res.data)
            navigate('/CompanyCreation');
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
        <h3 className='title'>Création d'entreprise</h3>
        <label className='label'>
          Chercheur
        </label>
        <select onClick={componentDidMount} onChange={handleChange}>
                    {researchers.map(item => {
                        return (<option key={item.researcherId} value={item.researcherId}>{item.researcherName} {item.researcherSurname}</option>);
                    })}
                </select>
        <label className='label'>
          Le nom de l'entreprise
        </label>
        <input
          placeholder="Nom de l'entreprise"
          className='input-container'
          name="company"
          type="company"
          value={companytitle}
          onChange={e => setCompanytitle(e.target.value)}
          required />

        <label className='label'>
          Date de création
        </label>
        <DatePicker
          className='datePicker'
          selected={date}
          onChange={date => setDate(date)}
          withPortal
          placeholderText="Choix de date" />

        <label className='label' >
          L'entreprise est active ?
        </label>
        <input
          placeholder='oui/non'
          className='input-container'
          name="CompanyActive"
          type="CompanyActive"
          value={companyActive}
          onChange={e => setCompanyActive(e.target.value)}
          required />


        <button className='submit'>Valider</button>
      </form>
    </div>
  );
}
export default CompanyCreation;