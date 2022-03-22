import React, { Component } from 'react';
//import { StyleSheet, Text, View, Button } from 'react-native';
//import Navbar from '../Navbar/Navbar';
//import {Table} from "antd";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'
import AddResearcher from './AddResearcher';
//const [showForm, setShowForm] = React.useState(false);


class Researcher extends Component {
    constructor() {
        super()
        this.state = {
            researchers: [],
            loading: false
        }
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

        if (this.state.researchers && this.state.researchers.length) {
            //return this.state.researchers.map((chercheur, index) => {

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
                                                <a href="/UpdateResearcher"  class="btn btn-info" role="button" data-bs-toggle="button">Modifier</a>
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





            /*
                return (
                    <div key={index}>
                        <h3>{chercheur.researcherSurname}</h3>
                        <p>{chercheur.researcherName}</p>
                        <p>{chercheur.researcherEmail}</p>
                    </div>
               );
            })
             */
            //const columns = [
            //    {
            //        title:"First name",
            //        dataIndex: "researcherSurname"
            //    }
            //];

            //return  ( 
            //    <Table datasource={this.state.researchers} columns={columns} rowKey="researcherId" />
            //);

        }

        return (
            <div className="container">
                <h1>Telechargement data</h1>
            </div>
        )
    }

};

export default Researcher;

/*
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import ResearcherService from "../services/Researcher.service";
import { Link } from "react-router-dom";
const ResearchersList = () => {
    const [Researchers, setResearchers] = useState([]);
    const init = () => {
        ResearcherService.getAll()
            .then(response => {
                console.log('Printing Researchers data', response.data);
                setResearchers(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }
    useEffect(() => {
        init();
    }, []);
    const handleDelete = (id) => {
        console.log('Printing id', id);
        ResearcherService.remove(id)
            .then(response => {
                console.log('Researcher deleted successfully', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }
    return (
        <div className="container">
            <h3>List of Researchers </h3>
            <hr />
            <div >
                <Link to="/add" className="btn btn-primary mb-2"> Add Researcher</Link>
                <table className="table table-bordered table-striped" >
                    <thead className="thead-dark">
                        <tr>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Researchers.map(Researcher =>
                                <tr key={Researcher.id}>
                                    <td>{Researcher.name}</td>
                                    <td>{Researcher.location}</td>
                                    <td>{Researcher.department}</td>
                                    <td>
                                        <Link className="btn btn-info" to={`/Researchers/edit/${Researcher.id}`}>Update</Link>
                                        <button className="btn btn-danger ml-2" onClick={() => {
                                            handleDelete(Researcher.id);
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ResearchersList;
*/