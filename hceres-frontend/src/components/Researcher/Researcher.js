import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar';
//import {Table} from "antd";
import {generatePath} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'
import {Link, useNavigate, useParams} from "react-router-dom";
import UpdateResearcher from './UpdateResearcher';
import {FaEdit} from "react-icons/fa";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {ImFilter} from "react-icons/im";
import Button from "react-bootstrap/Button";

class Researcher extends Component {
    constructor() {
        super()
        this.state = {
            researchers: [],
            loading: false,
            showUpdate: false,
            showFilter: false,
            idResearcher: 0,
        }

        this.handleUpdate = this.handleUpdate.bind(this);
    }

    /*{showForm && (<AddResearcher> </AddResearcher>)}
     onClick={setShowForm}
    */
    deleteResearcher(id) {

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
        this.setState({
            researchers: listeChercheurs,
        })
    }


    render() {
        if (this.state.showUpdate) {
            return (
                <UpdateResearcher id={this.state.idResearcher}/>
            );
        }

        if (this.state.researchers && this.state.researchers.length) {
            const columns = [{
                dataField: 'researcherId',
                text: 'ID',
                sort: true,
                search: true,
                filter: this.state.showFilter ? textFilter() : null,
            }, {
                dataField: 'researcherSurname',
                text: 'Nom',
                sort: true,
                filter: this.state.showFilter ? textFilter() : null,
            }, {
                dataField: 'researcherName',
                text: 'Prénom',
                sort: true,
                filter: this.state.showFilter ? textFilter() : null,
            }, {
                dataField: 'researcherEmail',
                text: 'Email',
                sort: true,
                filter: this.state.showFilter ? textFilter() : null,
            }, {
                dataField: 'researcherId',
                text: 'Edit',
                formatter: (cell, row) => {
                    return (
                        <div className="btn-group" role="group">
                            <button onClick={() => {
                                this.handleUpdate(cell)
                            }} className="btn btn-outline-info" role="button"
                                    data-bs-toggle="button">
                                <FaEdit/></button>
                            <button className="btn btn-outline-danger" onClick={() => {
                                this.deleteResearcher(cell)
                            }}><AiFillDelete/></button>
                        </div>
                    )
                }
            }];

            const options = {
                showTotal: true,
                sizePerPageList: [{
                    text: '10', value: 10
                }, {
                    text: '25', value: 25
                }, {
                    text: '50', value: 50
                }, {
                    text: 'All', value: this.state.researchers.length
                }]
            };

            const CaptionElement = () => (

                <div className={"container text-center"}>
                    <div class="row">
                        <div class="col-8">
                            <h3 style={{
                                borderRadius: '0.25em',
                                textAlign: 'center',
                                color: 'darkblue',
                                border: '1px solid darkblue',
                                padding: '0.5em'
                            }}> Liste des chercheurs - &nbsp;
                                <button className={"border-0"}
                                        onClick={(e) => this.setState({showFilter: !this.state.showFilter})}>{
                                    <ImFilter/>}
                                </button>
                            </h3>
                        </div>
                        <div class="col-4">
                            <br/>
                            <a href="/AddResearcher" className="btn btn-success" role="button" data-bs-toggle="button">
                                <AiOutlinePlusCircle /> &nbsp; Ajouter un chercheur</a>
                        </div>
                    </div>
                </div>
            );

            return (
                <div className="container">

                    <BootstrapTable
                        bootstrap4
                        keyField="researcherId"
                        data={this.state.researchers}
                        columns={columns}
                        pagination={paginationFactory(options)}
                        filter={filterFactory()}
                        caption={<CaptionElement/>}
                        striped
                        hover
                        condensed
                    />
                    <br/>
                    <br/>
                </div>
            );
        }

        return (
            <div className="container">
                <h1>Telechargement data</h1>
            </div>
        )
    }

}

export default Researcher;