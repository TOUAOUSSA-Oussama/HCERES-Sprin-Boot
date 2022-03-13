import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
//import {Table} from "antd";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class Researcher extends Component {
    constructor() {
        super()
        this.state = {
            researchers: [],
            loading: false
        }
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
                        <Navbar/>
                        
                        <div className="container">
                        <h3>Liste des chercheurs </h3>
                        <hr/>
                        <table className="table table-bordered table-striped" > <thead className="thead-dark">
                            <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                            <tbody>
                                {
                            this.state.researchers.map((chercheur,index) => 
                                        <tr key={index} >
                                            <td>{chercheur.researcherSurname}</td>
                                            <td>{chercheur.researcherName}</td>
                                            <td>{chercheur.researcherEmail}</td>
                                            <td>
                                        <button className="btn btn-info" >Update</button>

                                        <button className="btn btn-danger ml-2">Delete</button>
                                    </td>
                                        </tr>
                )}
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
            <div>
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