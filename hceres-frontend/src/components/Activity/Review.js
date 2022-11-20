import React from 'react';
import './Activity.css';
import Axios from 'axios'

function Review() {
    const [chercheur, setChercheur] = React.useState("");
    const [impactFactor, setImpactFactor] = React.useState("");
    const [year, setYear] = React.useState("");
    const [journalName, setJournalName] = React.useState("");
    const [nbReviewedArticles, setNbReviewedArticles] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            researcherId: chercheur,
            impactFactor: impactFactor,
            journalName: journalName,
            year: year,
            nbReviewedArticles: nbReviewedArticles
        };

        Axios.post("http://localhost:9000/Api/AddReview", data)
            .then(res => {
            }).catch(err => alert(err))
    }


    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <a href="/Activity" class="close-button">&#10006;</a>
                <h3 className='title'>REVUE</h3>
                <label className='label'>
                    Chercheur
                </label>
                <input
                    placeholder='Id'
                    className='input-container'
                    name="nom"
                    type="nom"
                    value={chercheur}
                    onChange={e => setChercheur(e.target.value)}
                    required/>
                <label className='label'>
                    Année
                </label>
                <input
                    placeholder='Année'
                    className='input-container'
                    name="year"
                    type="year"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    required/>

                <label className='label'>
                    Facteur d'impact
                </label>
                <input
                    placeholder="Facteur d'impact"
                    className='input-container'
                    name="impactFactor"
                    type="impactFactor"
                    value={impactFactor}
                    onChange={e => setImpactFactor(e.target.value)}
                    required/>

                <label className='label'>
                    Nom du journal
                </label>
                <input
                    placeholder='Nom du journal '
                    className='input-container'
                    name="journalName"
                    type="journalName"
                    value={journalName}
                    onChange={e => setJournalName(e.target.value)}
                    required/>

                <label className='label'>
                    Nombre d'article revues
                </label>
                <input
                    placeholder='Nom de la fonction'
                    className='input-container'
                    name="nbReviewedArticles"
                    type="nbReviewedArticles"
                    value={nbReviewedArticles}
                    onChange={e => setNbReviewedArticles(e.target.value)}
                    required/>
                <button className='submit'>Valider</button>
            </form>
        </div>
    );
}

export default Review;