import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios'
import axios from "axios";
import Modal from "react-bootstrap/Modal";

function SeiIndustrialRDContract(props) {
    const [showModal, setShowModal] = React.useState(true);

    const handleClose = () => {
        setShowModal(false);
        props.onHideAction.call();
    };
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
        const response = await axios.get(url);

        const listeChercheurs = response.data;

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

        Axios.post("http://localhost:9000/IndustrialContract/Create", data)
            .then(res => {
                window.location.reload();
            })
    }

    const handleChange = e => setResearcherId(e.target.value);

    return (

        <div>
            <Modal show={showModal} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Signature d'une contrat industrielle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

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
                    </Modal.Body>
                    <Modal.Footer>

                        <button className='submit'>Valider</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default SeiIndustrialRDContract;