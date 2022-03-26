import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
//import {Table} from "antd";
import { generatePath } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom";
import UpdateResearcher from './UpdateResearcher';



class Researcher extends Component {
    constructor() {
        super()
        this.state = {
            researchers: [],
            loading: false,
            showUpdate: false,
            idResearcher: 0,
        }
        
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    /*{showForm && (<AddResearcher> </AddResearcher>)}
     onClick={setShowForm}
    */
    deleteResearcher(id) {

        console.log(id);
        Axios.delete(`http://localhost:9000/deleteResearcher/${id}`)
            .then(res => {
                window.location.reload(false);
            })
    }
    
    handleUpdate(idResearcher) {
        this.setState({
            showUpdate: true,
            idResearcher: idResearcher
        })
    }
    
    async componentDidMount() {

        const url = "http://localhost:9000/Researchers";
        const response = await fetch(url);

        const listeChercheurs = await response.json();
        console.log("hello")
        this.setState({
            researchers: listeChercheurs,
        })
        console.log(this.state.researchers);
    }

    render() {
        if (this.state.showUpdate) {
            return (
                <UpdateResearcher id={this.state.idResearcher}/>
            );
        }

        if (this.state.researchers && this.state.researchers.length) {

            return (

                <div>
                    <div className="container">
                        
                                
                                <h3>Liste des chercheurs </h3>
                                <a href="/AddResearcher"  class="btn btn-success" role="button" data-bs-toggle="button">Ajouter un chercheur</a>
                            
                        
                        <hr />

                        <table className="table table-bordered table-striped" > <thead className="thead-dark">
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                            <tbody>
                                {
                                    this.state.researchers.map((chercheur, index) =>
                                        <tr key={index} >
                                            <td>{chercheur.researcherSurname}</td>
                                            <td>{chercheur.researcherName}</td>
                                            <td>{chercheur.researcherEmail}</td>
                                            <td>
                                                <button onClick={ () => { this.handleUpdate(chercheur.researcherId) }} class="btn btn-info" role="button" data-bs-toggle="button">Modifier</button>
                                                <button className="btn btn-danger ml-2" onClick={() => { this.deleteResearcher(chercheur.researcherId) }} >Supprimer</button>
                                            </td>
                                        </tr>
                                    )}
                                <tr>
                                    <th>----</th>
                                    <th>----</th>
                                    <th>----</th>
                                    <th>----</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
                <h1>Telechargement data</h1>
            </div>
        )
    }

};
export default Researcher;