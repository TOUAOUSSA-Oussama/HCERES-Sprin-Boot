import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios'

function Platform() {
    const [chercheur, setChercheur] = React.useState("");
    const [labellisation, setLabellisation] = React.useState("");
    const [description, setDescritption] = React.useState("");
    const [managers, setManagers] = React.useState("");
    const [affiliation, setAffiliation] = React.useState("");
    const [date, setDate] = React.useState(null);
    const [checkbox, setCheckBox] = React.useState();
    const [formattedDate, setFormatted] = React.useState("")

    const handleSubmit = (event) => {
        console.log(checkbox)
        event.preventDefault();
        let data = {

            researcherId: chercheur,
            labellisation: labellisation,
            description: description,
            managers: managers,
            affiliation: affiliation,
            creationDate: formattedDate,
            openPrivateResearchers:checkbox};
        
        console.log(data);
        Axios.post("http://localhost:9000/Api/AddPlatform", data)
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

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <a href="/Activity" class="close-button">&#10006;</a>
                <h3 className='title'>PLATFORM</h3>
                <label className='label' >
                    chercheur
                </label>
                <input
                    placeholder='Nom'
                    className='input-container'
                    name="nom"
                    type="nom"
                    value={chercheur}
                    onChange={e => setChercheur(e.target.value)}
                    required />

                <label className='label'>
                    Date de création
                </label>
                <DatePicker
                    className='datePicker'
                    selected={date}
                    onChange={handleDate}
                    withPortal
                    placeholderText="Choix de date" />

                <label className='label' >
                    Description
                </label>
                <input
                    placeholder='Description'
                    className='input-container'
                    name="description"
                    type="description"
                    value={description}
                    onChange={e => setDescritption(e.target.value)}
                    required />


                <label className='label' >
                    Managers
                </label>
                <input
                    placeholder='Managers '
                    className='input-container'
                    name="managers"
                    type="managers"
                    value={managers}
                    onChange={e => setManagers(e.target.value)}
                    required />

                <label className='label' >
                    Affiliation
                </label>
                <input
                    placeholder='Affiliation'
                    className='input-container'
                    name="affiliation"
                    type="affiliation"
                    value={affiliation}
                    onChange={e => setAffiliation(e.target.value)}
                    required />

                <label className='label' >
                    Labellisation
                </label>
                <input
                    placeholder='Labellisation'
                    className='input-container'
                    name="labellisation"
                    type="labellisation"
                    value={labellisation}
                    onChange={e => setLabellisation(e.target.value)}
                    required />
                <label className='label'>
                    open private researchers
                </label>
                <input 
                type = "checkbox" 
                placeholder='Yes' 
                name='checkbox'
                value= {checkbox}
                onChange={e => setCheckBox(e.target.value)}
                required/>
                <button className='submit'>Valider</button>
            </form>
        </div>
    );
}
export default Platform;