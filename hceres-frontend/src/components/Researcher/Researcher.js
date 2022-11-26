import React, {Component} from 'react';
// import these 2 import to show sort icon on table
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaEdit} from "react-icons/fa";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {ImFilter} from "react-icons/im";
import {Oval} from 'react-loading-icons'
import Axios from "axios";
import AddResearcher from "./AddResearcher";
import {Alert, Dropdown} from "react-bootstrap";
import DeleteResearcher from "./DeleteResearcher";
import {MdOutlinePendingActions} from "react-icons/md";
import Education from "../Activity/Education";
import SrAward from "../Activity/SrAward";

class Researcher extends Component {
    constructor() {
        super()
        this.state = {
            researchers: [],
            loading: false,
            showAddResearcher: false,
            showDeleteResearcher: false,
            showEducation: false,
            showPrix: false,
            researcherSuccessAlert: "",
            researcherErrorAlert: "",
            showFilter: false,
            targetResearcher: null,
        }

        this.onHideModalResearcher = this.onHideModalResearcher.bind(this);
        this.onHideModalActivity = this.onHideModalActivity.bind(this);
    }

    onHideModalResearcher(messages) {
        this.setState({
            showAddResearcher: false,
            showDeleteResearcher: false,
        })
        // silent close
        if (!messages) return;

        // addition close
        if (messages.researcherAdded) {
            this.setState(prevState => ({
                // push added researcher to previous list
                researchers: [...prevState.researchers, messages.researcherAdded],
                // display success message
                researcherSuccessAlert: messages.successMsg,
            }))
        } else if (messages.researcherUpdated) {
            // update close
            // 1. Make a shallow copy of the items
            let items = [...this.state.researchers];
            // 2. Make a shallow copy of the item you want to mutate
            let indexUpdated = this.state.researchers.findIndex(r => r.researcherId === messages.researcherUpdated.researcherId)
            // 3. Put it the new item into our array. N.B. we *are* mutating the array here,
            //    but that's why we made a copy first
            items[indexUpdated] = messages.researcherUpdated;
            // 4. Set the state to our new copy
            this.setState({
                researchers: items,
                researcherSuccessAlert: messages.successMsg,
            });
        } else if (messages.researcherDeleted) {
            let items = [...this.state.researchers];
            let indexDeleted = this.state.researchers.findIndex(r => r.researcherId === messages.researcherDeleted.researcherId)
            items.splice(indexDeleted, 1);
            this.setState({
                researchers: items,
                researcherSuccessAlert: messages.successMsg,
            });
        } else {
            this.setState(prevState => ({
                // displate error message
                researcherErrorAlert: messages.errorMsg,
            }))
        }
    }

    onHideModalActivity(messages = null) {
        this.setState({
            showEducation: false,
            showPrix:false,
        })
        // silent close
        if (!messages) return;

        if (messages.successMsg) {
            this.setState({
                researcherSuccessAlert: messages.successMsg,
            });
        }

        if (messages.errorMsg) {
            this.setState({
                researcherErrorAlert: messages.errorMsg,
            });
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
        if (this.state.researchers && this.state.researchers.length) {
            const columns = [{
                dataField: 'researcherId',
                text: 'ID',
                sort: true,
                search: true,
                filter: this.state.showFilter ? textFilter() : null,
            }, {
                dataField: 'researcherName',
                text: 'Prénom',
                sort: true,
                filter: this.state.showFilter ? textFilter() : null,
            }, {
                dataField: 'researcherSurname',
                text: 'Nom',
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
                            <Dropdown drop={"left"}>
                                <Dropdown.Toggle variant={"outline-secondary"} id="dropdown-activity">
                                    <MdOutlinePendingActions/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => {
                                        this.setState({
                                            targetResearcher: row,
                                            showEducation: true
                                        })
                                    }}>Add Education</Dropdown.Item>

                                    <Dropdown.Item onClick={() => {
                                        this.setState({
                                            targetResearcher: row,
                                            showPrix: true
                                        })
                                    }}>Add Prix</Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                            <button onClick={() => {
                                this.setState({
                                    targetResearcher: row,
                                    showAddResearcher: true
                                })
                            }} className="btn btn-outline-info"
                                    data-bs-toggle="button">
                                <FaEdit/></button>
                            <button className="btn btn-outline-danger" onClick={() => {
                                this.setState({
                                    targetResearcher: row,
                                    showDeleteResearcher: true
                                })
                            }}><AiFillDelete/></button>
                        </div>
                    )
                }
            }];

            const defaultSorted = [{
                dataField: 'researcherId', // if dataField is not match to any column you defined, it will be ignored.
                order: 'asc' // desc or asc
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
                            <button className="btn btn-success" role="button" data-bs-toggle="button" onClick={() => {
                                this.setState({
                                    targetResearcher: null,
                                    showAddResearcher: true
                                })
                            }}>
                                <AiOutlinePlusCircle/> &nbsp; Ajouter un chercheur
                            </button>
                            {this.state.researcherSuccessAlert && (
                                <Alert className={"alert-success"} onClose={() => this.setState({
                                    researcherSuccessAlert: ""
                                })}
                                       dismissible={true}>{this.state.researcherSuccessAlert}
                                </Alert>)}
                            {this.state.researcherErrorAlert && (
                                <Alert className={"alert-danger"} onClose={() => this.setState({
                                    researcherErrorAlert: ""
                                })}
                                       dismissible={true}>{this.state.researcherErrorAlert}
                                </Alert>)}
                        </div>
                    </div>
                </div>
            );

            return (
                <div className="container">
                    {this.state.showAddResearcher && (<AddResearcher targetResearcher={this.state.targetResearcher}
                                                                     onHideAction={this.onHideModalResearcher}/>)}
                    {this.state.showDeleteResearcher && (
                        <DeleteResearcher targetResearcher={this.state.targetResearcher}
                                          onHideAction={this.onHideModalResearcher}/>)}

                    {this.state.showEducation && (<Education targetResearcher={this.state.targetResearcher}
                                                             onHideAction={this.onHideModalActivity}/>)}
                    {this.state.showPrix && (<SrAward targetResearcher={this.state.targetResearcher}
                                                             onHideAction={this.onHideModalActivity}/>)}

                    <BootstrapTable
                        bootstrap4
                        keyField="researcherId"
                        data={this.state.researchers}
                        columns={columns}
                        defaultSorted={defaultSorted}
                        pagination={paginationFactory(options)}
                        filter={filterFactory()}
                        caption={<CaptionElement/>}
                        striped
                        hover
                        condensed
                    />
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