import React from 'react';
import './Activity.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Axios from 'axios'

function NationalInternationalCollaboration() {
    const [DateProjectStart, setDateProjectStart] = React.useState(null);
    const [PartnerEntity, setPartnerEntity] = React.useState("");
    const [CountryStateCity, setCountryStateCity] = React.useState("");
    const [PiPartners, setPiPartners] = React.useState("");
    const [MailPartners, setMailPartners] = React.useState(null);
    const [ProjetcTitle, setProjetcTitle] = React.useState("");
    const [StrategicRecurringCollab, setStrategicRecurringCollab] = React.useState("");
    const [ActiveProject, setActiveProject] = React.useState("");
    const [AssociatedFunding, setAssociatedFunding] = React.useState("");
    const [NumberResultingPublications, setNumberResultingPublications] = React.useState("");
    const [RefJointPublication,  setRefJointPublication] = React.useState("");
    const [UmrCoordinated, setUmrCoordinated] = React.useState("");
    const [AgreementSigned, setAgreementSigned] = React.useState("");
    const [NameChoice, setNameChoice] = React.useState("");
    const [researcherId, setresearcherId] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            researcherId: researcherId,
            NameChoice: NameChoice,
            AgreementSigned: AgreementSigned,
            UmrCoordinated: UmrCoordinated,
            RefJointPublication: RefJointPublication,
            NumberResultingPublications: NumberResultingPublications,
            AssociatedFunding: AssociatedFunding,
            ActiveProject: ActiveProject,
            StrategicRecurringCollab: StrategicRecurringCollab,
            ProjetcTitle: ProjetcTitle,
            MailPartners: MailPartners,
            PiPartners: PiPartners,
            CountryStateCity: CountryStateCity,
            PartnerEntity: PartnerEntity,
            DateProjectStart: DateProjectStart };
        
        console.log(data);
        Axios.post("http://localhost:9000/AddNationalInternationalCollaboration", data)
            .then(res => {
                console.log(res.data)
            }).catch(err => alert(err))
    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
            <a href="/Activity" class="close-button">&#10006;</a>
                <h3 className='title'>Collaboration internationale</h3>
                <label className='label' >
                    chercheur
                </label>
                <input
                    placeholder='ID'
                    className='input-container'
                    name="nom"
                    type="nom"
                    value={researcherId}
                    onChange={e => setresearcherId(e.target.value)}
                    required />

                <label className='label'>
                    Date Project Start
                </label>
                <input
                    placeholder='Date Project Start'
                    className='input-container'
                    name="DateProjectStart"
                    type="date"
                    value={DateProjectStart}
                    onChange={e => setDateProjectStart(e.target.value)}
                    required />

                <label className='label' >
                    Partner Entity
                </label>
                <input
                    placeholder='Partner Entity'
                    className='input-container'
                    name="PartnerEntity"
                    type="PartnerEntity"
                    value={PartnerEntity}
                    onChange={e => setPartnerEntity(e.target.value)}
                    required />


                <label className='label' >
                    Country State City
                </label>
                <input
                    placeholder='Country State City '
                    className='input-container'
                    name="CountryStateCity"
                    type="CountryStateCity"
                    value={CountryStateCity}
                    onChange={e => setCountryStateCity(e.target.value)}
                    required />

                <label className='label' >
                    Pi Partners
                </label>
                <input
                    placeholder='PiPartners'
                    type="PiPartners"
                    className='input-container'
                    name="PiPartners"
                    value={PiPartners}
                    onChange={e => setPiPartners(e.target.value)}
                    required />

                <label className='label' >
                    Mail Partners
                </label>
                <input
                    placeholder='Mail Partners'
                    className='input-container'
                    name="MailPartners"
                    type="MailPartners"
                    value={MailPartners}
                    onChange={e => setMailPartners(e.target.value)}
                    required />

                <label className='label'>
                    Project Title
                </label>
                 <input
                    placeholder='ProjetcTitle '
                    className='input-container'
                    name="ProjetcTitle"
                    type="ProjetcTitle"
                    value={ProjetcTitle}
                    onChange={e => setProjetcTitle(e.target.value)}
                    required />

                <label className='label'>
                    StrategicRecurringCollab
                </label>
                 <input
                    placeholder='StrategicRecurringCollab '
                    className='input-container'
                    name="boolean-parameter" type="checkbox"
                    value={StrategicRecurringCollab}
                    onChange={e => setStrategicRecurringCollab(e.target.value)}
                    required />

                <label className='label'>
                    Active Project
                </label>
                 <input
                    placeholder='ActiveProject '
                    className='input-container'
                    name="ActiveProject"
                    type="checkbox"
                    value={ActiveProject}
                    onChange={e => setActiveProject(e.target.value)}
                    required />

                <label className='label'>
                    Associated Funding
                </label>
                 <input
                    placeholder='AssociatedFunding '
                    className='input-container'
                    name="AssociatedFunding"
                    type="AssociatedFunding"
                    value={AssociatedFunding}
                    onChange={e => setAssociatedFunding(e.target.value)}
                    required />

                <label className='label'>
                    Number Resulting Publications
                </label>
                 <input
                    placeholder='NumberResultingPublications '
                    className='input-container'
                    name="NumberResultingPublications"
                    type="number"
                    value={NumberResultingPublications}
                    onChange={e => setNumberResultingPublications(e.target.value)}
                    required />

                <label className='label'>
                    Ref Joint Publication
                </label>
                 <input
                    placeholder='RefJointPublication '
                    className='input-container'
                    name="RefJointPublication"
                    type="RefJointPublication"
                    value={RefJointPublication}
                    onChange={e => setRefJointPublication(e.target.value)}
                    required />

                <label className='label'>
                    Umr Coordinated
                </label>
                 <input
                    placeholder='UmrCoordinated '
                    className='input-container'
                    name="UmrCoordinated"
                    type="checkbox"
                    value={UmrCoordinated}
                    onChange={e => setUmrCoordinated(e.target.value)}
                    required />

                <label className='label'>
                    Agreement Signed
                </label>
                 <input
                    placeholder='AgreementSigned '
                    className='input-container'
                    name="AgreementSigned"
                    type="checkbox"
                    value={AgreementSigned}
                    onChange={e => setAgreementSigned(e.target.value)}
                    required />

                <label className='label'>
                    Name Choice
                </label>
                 <input
                    placeholder='NameChoice '
                    className='input-container'
                    name="NameChoice"
                    type="NameChoice"
                    value={NameChoice}
                    onChange={e => setNameChoice(e.target.value)}
                    required />
                

                <button className='submit'>Valider</button>
            </form>
        </div>
    );
}
export default NationalInternationalCollaboration;