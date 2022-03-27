import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios'

function OralCommunication() {
    const [OralCommunicationTitle, setOralCommunicationTitle] = React.useState(null);
    const [OralCommunicationDate, setOralCommunicationDate] = React.useState("");
    const [Authors, setAuthors] = React.useState("");
    const [MeetingName, setMeetingName] = React.useState("");
    const [MeetingYear, setMeetingYear] = React.useState(null);
    const [MeetingLocation, setMeetingLocation] = React.useState("");
    const [MeetingStart, setMeetingStart] = React.useState("");
    const [MeetingEnd, setMeetingEnd] = React.useState("");
    const [TypeOralCommunicationName, setTypeOralCommunicationName] = React.useState("");
    const [researcherId, setResearcherId] = React.useState("");
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
            researcherId: researcherId,
            TypeOralCommunicationName: TypeOralCommunicationName,
            MeetingEnd: MeetingEnd,
            MeetingStart: MeetingStart,
            MeetingLocation: MeetingLocation,
            MeetingYear:MeetingYear,
            MeetingName: MeetingName,
            Authors: Authors,
            OralCommunicationDate :OralCommunicationDate,
            OralCommunicationTitle : OralCommunicationTitle };
        
        console.log(data);
        Axios.post("http://localhost:9000/AddOralCommunication", data)
            .then(res => {
                console.log(res.data)
                window.location.reload();
            }).catch(err => alert(err))
    }

    const handleChange = e => setResearcherId(e.target.value);

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <a href="/Activity" class="close-button">&#10006;</a>
                <h3 className='title'>Communication orale</h3>
                <label className='label' >
                    chercheur
                </label>
               <select onClick={componentDidMount} onChange={handleChange}>
                    {researchers.map(item => {
                        return (<option key={item.researcherId} value={item.researcherId}>{item.researcherName} {item.researcherSurname}</option>);
                    })}
                </select>

                <label className='label'>
                    Oral Communication Title
                </label>
                <input
                    placeholder='OralCommunicationTitle'
                    className='input-container'
                    name="OralCommunicationTitle"
                    type="OralCommunicationTitle"
                    value={OralCommunicationTitle}
                    onChange={e => setOralCommunicationTitle(e.target.value)}
                    required />

                <label className='label' >
                    Oral Communication Date
                </label>
                <input
                    placeholder='OralCommunicationDate'
                    className='input-container'
                    name="OralCommunicationDate"
                    type="date"
                    value={OralCommunicationDate}
                    onChange={e => setOralCommunicationDate(e.target.value)}
                    required />


                <label className='label' >
                    Authors
                </label>
                <input
                    placeholder='Authors '
                    className='input-container'
                    name="Authors"
                    type="Authors"
                    value={Authors}
                    onChange={e => setAuthors(e.target.value)}
                    required />

                <label className='label' >
                Meeting Name
                </label>
                <input
                    placeholder='MeetingName'
                    type="MeetingName"
                    className='input-container'
                    name="MeetingName"
                    value={MeetingName}
                    onChange={e => setMeetingName(e.target.value)}
                    required />

                <label className='label' >
                    Meeting Year 
                </label>
                <input
                    placeholder='MeetingYear'
                    className='input-container'
                    name="MeetingYear"
                    type="number"
                    value={MeetingYear}
                    onChange={e => setMeetingYear(e.target.value)}
                    required />

                <label className='label'>
                Meeting Location
                </label>
                 <input
                    placeholder='MeetingLocation '
                    className='input-container'
                    name="MeetingLocation"
                    type="MeetingLocation"
                    value={MeetingLocation}
                    onChange={e => setMeetingLocation(e.target.value)}
                    required />

                <label className='label'>
                Meeting Start
                </label>
                 <input
                    placeholder='MeetingStart '
                    className='input-container'
                    name="MeetingStart"
                    type="date"
                    value={MeetingStart}
                    onChange={e => setMeetingStart(e.target.value)}
                    required />

                <label className='label'>
                Meeting End
                </label>
                 <input
                    placeholder='MeetingEnd '
                    className='input-container'
                    name="MeetingEnd"
                    type="date"
                    value={MeetingEnd}
                    onChange={e => setMeetingEnd(e.target.value)}
                    required />

                <label className='label'>
                Type Oral CommunicationName
                </label>
                 <input
                    placeholder='TypeOralCommunicationName '
                    className='input-container'
                    name="TypeOralCommunicationName"
                    type="TypeOralCommunicationName"
                    value={TypeOralCommunicationName}
                    onChange={e => setTypeOralCommunicationName(e.target.value)}
                    required />

                <button className='submit'>Valider</button>
            </form>
        </div>
    );
}
export default OralCommunication;