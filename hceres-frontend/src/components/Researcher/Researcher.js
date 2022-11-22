import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateResearcher from './UpdateResearcher';
import {FaEdit} from "react-icons/fa";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {ImFilter} from "react-icons/im";
import {Oval} from 'react-loading-icons'
import Axios from "axios";
import AddResearcher from "./AddResearcher";
import {Alert} from "react-bootstrap";

class Researcher extends Component {
    constructor() {
        super()
        this.state = {
            researchers: [],
            loading: false,
            showAddResearcher: false,
            addResearcherSuccess: "",
            addResearcherError: "",
            showUpdate: false,
            showFilter: false,
            idResearcher: 0,
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleAddResearcher = this.handleAddResearcher.bind(this);
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

    handleAddResearcher(messages) {
        this.setState({
            showAddResearcher: false,
        })
        // silent close
        if (!messages) return;

        // addition close
        if (messages.successMsg) {
            this.setState(prevState => ({
                researchers: [...prevState.researchers, messages.researcherAdded],
                addResearcherSuccess: messages.successMsg,
            }))
        } else {
            this.setState(prevState => ({
                addResearcherError: messages.errorMsg,
            }))
        }
    }

    async componentDidMount() {

        const url = "/Researchers";
        Axios.get(url).then(response => {
            this.setState({
                researchers: response.data,
            })
        });
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
                dataField: 'actionColumn',
                isDummyField: true,
                text: 'Edit',
                formatter: (cell, row) => {
                    return (
                        <div className="btn-group" role="group">
                            <button onClick={() => {
                                this.handleUpdate(row.researcherId)
                            }} className="btn btn-outline-info"
                                    data-bs-toggle="button">
                                <FaEdit/></button>
                            <button className="btn btn-outline-danger" onClick={() => {
                                this.deleteResearcher(row.researcherId)
                            }}><AiFillDelete/></button>
                        </div>
                    )
                }
            }];

            const options = {
                showTotal: true,
                sizePerPageList: [{
                    text: '5', value: 5
                }, {
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
                    <div className="row">
                        <div className="col-8">
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
                        <div className="col-4">
                            {this.state.addResearcherSuccess && (
                                <Alert className={"alert-success"} onClose={() => this.setState({
                                    addResearcherSuccess: ""
                                })}
                                       dismissible={true}>{this.state.addResearcherSuccess}
                                </Alert>)}
                            {this.state.addResearcherError && (
                                <Alert className={"alert-danger"} onClose={() => this.setState({
                                    addResearcherError: ""
                                })}
                                       dismissible={true}>{this.state.addResearcherError}
                                </Alert>)}
                            <button className="btn btn-success" role="button" data-bs-toggle="button" onClick={() => {
                                this.setState({
                                    showAddResearcher: true
                                })
                            }}>
                                <AiOutlinePlusCircle/> &nbsp; Ajouter un chercheur
                            </button>
                        </div>
                    </div>
                </div>
            );

            return (
                <div className="container">
                    {this.state.showAddResearcher && (<AddResearcher onHideAction={this.handleAddResearcher}/>)}
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
                    {/*To more scrolling area and see the total list of table size per page*/}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
            );
        }

        return (
            <div className="container">
                <h1>Telechargement des donnees
                    <button className={'btn btn-primary'}><Oval/></button>
                </h1>
            </div>
        )
    }

}

export default Researcher;