import React, {Component} from 'react';
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
import {Alert} from "react-bootstrap";
import DeleteResearcher from "./DeleteResearcher";

class Researcher extends Component {
    constructor() {
        super()
        this.state = {
            researchers: [],
            loading: false,
            showAddResearcher: false,
            showDeleteResearcher: false,
            addResearcherSuccess: "",
            addResearcherError: "",
            showFilter: false,
            targetResearcher: null,
        }

        this.onHideModalResearcher = this.onHideModalResearcher.bind(this);
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
                addResearcherSuccess: messages.successMsg,
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
                addResearcherSuccess: messages.successMsg,
            });
        } else if (messages.researcherDeleted) {
            let items = [...this.state.researchers];
            let indexDeleted = this.state.researchers.findIndex(r => r.researcherId === messages.researcherDeleted.researcherId)
            items.splice(indexDeleted, 1);
            this.setState({
                researchers: items,
                addResearcherSuccess: messages.successMsg,
            });
        } else {
            this.setState(prevState => ({
                // displate error message
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