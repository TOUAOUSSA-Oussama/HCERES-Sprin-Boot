import React from 'react';
import './Prix.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import prixService from "../../../services/Prix.service";


const Prix = () => {
    const [chercheur, setChercheur] = useState("");
    const [nom, setNom] = useState("");
    const [description, setDescritption] = useState("");
    const [date, setDate] = useState(null);
    const navigate = useNavigate();
    //const {id} = useParams();
    /*
    const handleSubmit = (event) => {
        console.log("Submitted");
        event.preventDefault();
        onSubmit={handleSubmit}
    
    const faireRedirection=()=> {
        let navigate = useHistory();
        navigate('/Activity');
      }
*/
    const savePrix = (e) => {
        e.preventDefault();
        const prix = {chercheur, nom, description, date};
            prixService.create(prix)
            .then(response => {
                console.log("Prix added successfully", response.data);
                navigate("/Home");
            })
            .catch(error => {
                console.log('something went wroing', error);
            })
        }
    
    /*
    useEffect(() => {
        if (id) {
            employeeService.get(id)
                .then(employee => {
                    setName(employee.data.name);
                    setLocation(employee.data.location);
                    setDepartment(employee.data.department);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])
     */
    return (
        <div className='form-container'>
            <form className='form' >
                <a href="/Activity" class="close-button">&#10006;</a>
                <h3 className='title'>PRIX</h3>
                <label className='label'>
                    Chercheur
                </label>
                <input
                    placeholder='Nom'
                    className='input-container'
                    name="chercheur"
                    id="chercheur"
                    value={chercheur}
                    onChange={(e) => setChercheur(e.target.value)}
                    required />

                <label className='label' >
                    Nom du prix
                </label>
                <input
                    placeholder='Nom'
                    className='input-container'
                    name="nom"
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required />

                <label className='label'>
                    Date d'obtention
                </label>
                <DatePicker
                    className='datePicker'
                    selected={date}
                    onChange={date => setDate(date)}
                    withPortal
                    placeholderText="Choix de date" />

                <label className='label' >
                    Description
                </label>
                <textarea
                    placeholder='Description'
                    className='textarea'
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescritption(e.target.value)}
                    required />

                <button onClick={(e) => savePrix(e)} className='submit'>Valider</button>
            </form>
        </div>
    );
}
export default Prix;