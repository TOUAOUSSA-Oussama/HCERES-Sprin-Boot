import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios'

function SeiIndustrialRDContract() {
    const [StartDate, setStartDate] = React.useState(null);
    const [NameCompanyInvolved, setNameCompanyInvolved] = React.useState("");
    const [ProjectTitle, setProjectTitle] = React.useState("");
    const [AgreementAmount, setAgreementAmount] = React.useState("");
    const [EndDate, setEndDate] = React.useState(null);
    const [AssociatedPubliRef, setAssociatedPubliRef] = React.useState("");
    const [researcherId, setResearcherId] = React.useState("");
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
            researcherId: researcherId,
            AssociatedPubliRef: AssociatedPubliRef,
            EndDate: EndDate,
            AgreementAmount: AgreementAmount,
            ProjectTitle: ProjectTitle,
            NameCompanyInvolved: NameCompanyInvolved,
            StartDate: StartDate
        };

        Axios.post("http://localhost:9000/AddSeiIndustrialRDContract", data)
            .then(res => {
                window.location.reload();
            })
    }

    const handleChange = e => setResearcherId(e.target.value);

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <a href="/Activity" class="close-button">&#10006;</a>
                <h3 className='title'>Signature d'une contrat industrielle</h3>
                <label className='label'>
                    chercheur
                </label>
                <select onClick={componentDidMount} onChange={handleChange}>
                    {researchers.map(item => {
                        return (<option key={item.researcherId}
                                        value={item.researcherId}>{item.researcherName} {item.researcherSurname}</option>);
                    })}
                </select>

                <label className='label'>
                    Date de début
                </label>
                <input
                    placeholder='Description'
                    className='input-container'
                    name="StartDate"
                    type="date"
                    value={StartDate}
                    onChange={e => setStartDate(e.target.value)}
                    required/>

                <label className='label'>
                    Nom Entreprise impliquée
                </label>
                <input
                    placeholder='Description'
                    className='input-container'
                    name="Nom Entreprise impliquée"
                    type="Nom Entreprise impliquée"
                    value={NameCompanyInvolved}
                    onChange={e => setNameCompanyInvolved(e.target.value)}
                    required/>


                <label className='label'>
                    Titre du projet
                </label>
                <input
                    placeholder='ProjectTitle '
                    className='input-container'
                    name="ProjectTitle"
                    type="ProjectTitle"
                    value={ProjectTitle}
                    onChange={e => setProjectTitle(e.target.value)}
                    required/>

                <label className='label'>
                    Montant de l'accord
                </label>
                <input
                    placeholder='Affiliation'
                    type="number"
                    className='input-container'
                    name="AgreementAmount"
                    value={AgreementAmount}
                    onChange={e => setAgreementAmount(e.target.value)}
                    required/>

                <label className='label'>
                    Date de fin
                </label>
                <input
                    placeholder='Description'
                    className='input-container'
                    name="EndDate"
                    type="date"
                    value={EndDate}
                    onChange={e => setEndDate(e.target.value)}
                    required/>

                <label className='label'>
                    Référence de la publication associée
                </label>
                <input
                    placeholder='ProjectTitle '
                    className='input-container'
                    name="AssociatedPubliRef"
                    type="AssociatedPubliRef"
                    value={AssociatedPubliRef}
                    onChange={e => setAssociatedPubliRef(e.target.value)}
                    required/>

                <button className='submit'>Valider</button>
            </form>
        </div>
    );
}

export default SeiIndustrialRDContract;