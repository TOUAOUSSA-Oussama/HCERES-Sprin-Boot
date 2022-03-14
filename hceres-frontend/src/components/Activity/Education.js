import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios'

function Education() {
    const [researcherId, setResearcherId] = React.useState("");
    const [educationCourseName, setEducationCourseName] = React.useState("");
    const [educationFormation, setEducationFormation] = React.useState("");
    const [educationDescription, setEducationDescription] = React.useState("");
    const [educationInvolvmentText, setEducationInvolvmentText] = React.useState("");
    const [educationLevelText, setEducationLevelText] = React.useState("");
    const [date, setDate] = React.useState(null);
    const [formattedDate, setFormatted] = React.useState("");

    const [researchers, setResearchers] = React.useState([]);

    async function componentDidMount() {

        const url = "http://localhost:9000/Researchers";
        const response = await fetch(url);

        const listeChercheurs = await response.json();
        
        setResearchers(listeChercheurs)
        console.log(researchers);
    }

    const handleSubmit = (event) => {
         console.log(formattedDate);
         event.preventDefault();
         let data = {
             "researcherId": researcherId,
             "educationCourseName": educationCourseName,
             "educationFormation": educationFormation,
             "educationDescription": educationDescription,
             "educationInvolvmentText": educationInvolvmentText,
             "educationLevelText": educationLevelText,
             "educationCompletion":formattedDate};
        
         console.log(data);
         Axios.post("http://localhost:9000/AddEducation", data)
             .then(res => {
                 console.log(res.data)
             }).catch(err => alert(err))
     }

    const handleDate = (event) =>{
        let formattedDate = `${event.getFullYear()}-${
            event.getMonth() +1
          }-${event.getDate()}`;
          setFormatted(formattedDate);
          setDate(event);
        }

     const handleChange = e => setResearcherId(e.target.value); 
        
    return (
        <div className='form-container'>
            <form  className='form' onSubmit={handleSubmit}>
                <a href="/Activity" class="close-button">&#10006;</a>
                <h3 className='title'>EDUCATION :</h3>

                <label className='label' >
                  Chercheur
                </label>
                <select onClick={componentDidMount} onChange={handleChange}>
                    {researchers.map(item => {
                        return (<option key={item.researcherId} value={item.researcherId}>{item.researcherName} {item.researcherSurname}</option>);
                    })}
                </select>
                

                <label className='label' >
                Nom du cours d'éducation
                </label>
                <input
                    placeholder='educationCourseName'
                    className='input-container'
                    name="educationCourseName"
                    type="educationCourseName"
                    value={educationCourseName}
                    onChange={e => setEducationCourseName(e.target.value)}
                    required />

                <label className='label' >
                Formation d'éducation
                </label>
                <input
                    placeholder='educationFormation'
                    className='input-container'
                    name="educationFormation"
                    type="educationFormation"
                    value={educationFormation}
                    onChange={e => setEducationFormation(e.target.value)}
                    required />

                <label className='label' >
                Description de l'éducation
                </label>
                <input
                    placeholder='educationDescription'
                    className='input-container'
                    name="educationDescription"
                    type="educationDescription"
                    value={educationDescription}
                    onChange={e => setEducationDescription(e.target.value)}
                    required />

                <label className='label' >
                Texte sur la participation à l'éducation
                </label>
                <input
                    placeholder='educationInvolvmentText'
                    className='input-container'
                    name="educationInvolvmentText"
                    type="educationInvolvmentText"
                    value={educationInvolvmentText}
                    onChange={e => setEducationInvolvmentText(e.target.value)}
                    required />

                <label className='label' >
                Niveau d'éducation 
                </label>
                <input
                    placeholder='educationLevelText'
                    className='input-container'
                    name="educationLevelText"
                    type="educationLevelText"
                    value={educationLevelText}
                    onChange={e => setEducationLevelText(e.target.value)}
                    required />

                <label className='label'>
                Achèvement de l'éducation
                </label>
                <DatePicker
                    className='datePicker'
                    selected={date}
                    onChange={handleDate}
                    withPortal
                    placeholderText="Choix de date" />
                <button className='submit'>Valider</button>
            </form>
        </div>
    );
}
export default Education;
