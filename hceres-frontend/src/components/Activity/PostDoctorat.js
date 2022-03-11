import React from 'react';
import './Activity.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios'

function PostDoctorat() {
  const [chercheur, setChercheur] = React.useState("");
  const [superviseur, setSuperviseur] = React.useState("");
  const [titre, setTitre] = React.useState("");
  const [duree, setDuree] = React.useState("");
  const [nationalite, setNationalite] = React.useState("");
  const [labo, setLabo] = React.useState("");
  const [date, setDate] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:9000/postDoctorat", {
      nom: chercheur,
      titre: titre,
      duree: duree,
      nationalite: nationalite,
      labo: labo,
      date: date
    })
      .then(res => {
        console.log(res.data)
      })

  }


  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <a href="/Activity" class="close-button">&#10006;</a>
        <h3 className='title'>POST DOCTORAT</h3>

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


        <label className='label' >
          Titre du post-doctorat
        </label>
        <input
          placeholder='Titre'
          className='input-container'
          name="titre"
          type="titre"
          value={titre}
          onChange={e => setTitre(e.target.value)}
          required />

        <label className='label' >
          Superviseur
        </label>
        <input
          placeholder='Nom'
          className='input-container'
          name="superviseur"
          type="superviseur"
          value={superviseur}
          onChange={e => setSuperviseur(e.target.value)}
          required />


        <label className='label'>
          Date d'arrivé
        </label>
        <DatePicker
          className='datePicker'
          selected={date}
          onChange={date => setDate(date)}
          withPortal
          placeholderText="Choix de date" />

        <label className='label'>
          Date de départ
        </label>
        <DatePicker
          className='datePicker'
          selected={date}
          onChange={date => setDate(date)}
          withPortal
          placeholderText="Choix de date" />


        <label className='label' >
          Durée
        </label>
        <input
          placeholder='Formation'
          className='input-container'
          name="duree"
          type="duree"
          value={duree}
          onChange={e => setDuree(e.target.value)}
          required />


        <label className='label' >
          Nationalité
        </label>
        <input
          placeholder='Nationalité'
          className='input-container'
          name="nationalite"
          type="nationalite"
          value={nationalite}
          onChange={e => setNationalite(e.target.value)}
          required />

        <label className='label' >
          Laboratoire d'origine
        </label>
        <input
          placeholder='Nom du laboratoire'
          className='input-container'
          name="labo"
          type="labo"
          value={labo}
          onChange={e => setLabo(e.target.value)}
          required />
        <button className='submit'>Valider</button>
      </form>
    </div>
  );
}
export default PostDoctorat;