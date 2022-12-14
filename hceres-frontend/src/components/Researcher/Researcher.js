import React, {Component} from 'react';
// import these 2 import to show sort icon on table
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';

import {FaEdit} from "react-icons/fa";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {GrDocumentCsv} from "react-icons/gr";
import {ImFilter} from "react-icons/im";
import {Oval} from 'react-loading-icons'
import AddResearcher from "./AddResearcher";
import {Alert} from "react-bootstrap";
import DeleteResearcher from "./DeleteResearcher";
import {MdPendingActions} from "react-icons/md";
import {paginationOptions} from "../util/BootStrapTableOptions";
import ActivityList from "../Activity/ActivityList";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import {VscEyeClosed} from "react-icons/vsc";
import {fetchListResearchers} from "../../services/Researcher/ResearcherActions";
import MyGlobalVar from "../../services/MyGlobalVar";

class Researcher extends Component {
    constructor() {
        super()
        this.state = {
            researchers: [],
            loading: false,
            showAddResearcher: false,
            showDeleteResearcher: false,
            showActivities: false,
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
        MyGlobalVar.listeChercheurs = this.state.researchers
    }

    onHideModalActivity(messages = null) {
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
        fetchListResearchers().then(list => {
            this.setState({
                researchers: list,
            })
        })
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
                csvExport: false,
                formatter: (cell, row) => {
                    return (
                        <div className="btn-group" role="group">

                            <button onClick={() => {
                                this.setState({
                                    showActivities: this.state.targetResearcher === row ? !this.state.showActivities : false,
                                    targetResearcher: row,
                                })
                                // refresh contents by alternating sate
                                if (this.state.targetResearcher !== row) {
                                    setTimeout(() => {
                                        this.setState({
                                            showActivities: true
                                        })
                                    })
                                }
                            }} className={"btn btn-outline-secondary"}>
                                <MdPendingActions/>
                            </button>


                            <button onClick={() => {
                                this.setState({
                                    targetResearcher: row,
                                    showAddResearcher: true
                                })
                            }} className="btn btn-outline-info">
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

            const CaptionElement = (props) => (

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
                                {this.state.showFilter && <div><MyExportCSV  { ...props.tableProps.csvProps }/> </div>}
                            </h3>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-success" data-bs-toggle="button" onClick={() => {
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

            const MyExportCSV = (props) => {
                const handleClick = () => {
                    props.onExport();
                };
                return (
                    <button className={"border-0"}
                            onClick={handleClick}>{
                        <GrDocumentCsv/>}
                    </button>
                );
            };

            return (
                <div className="container">
                    {this.state.showAddResearcher && (<AddResearcher targetResearcher={this.state.targetResearcher}
                                                                     onHideAction={this.onHideModalResearcher}/>)}
                    {this.state.showDeleteResearcher && (
                        <DeleteResearcher targetResearcher={this.state.targetResearcher}
                                          onHideAction={this.onHideModalResearcher}/>)}

                    <ToolkitProvider
                        bootstrap4
                        keyField="researcherId"
                        data={this.state.researchers}
                        columns={columns}
                        exportCSV={ {
                            fileName: 'researcherList.csv',
                            onlyExportFiltered: true,
                            exportAll: false
                        }}
                        search
                    >
                        {
                            props => (
                                <BootstrapTable
                                    defaultSorted={defaultSorted}
                                    pagination={paginationFactory(paginationOptions(this.state.researchers.length))}
                                    filter={filterFactory()}
                                    caption={<CaptionElement tableProps={props}/>}
                                    striped
                                    hover
                                    condensed
                                    {...props.baseProps} />
                            )
                        }
                    < /ToolkitProvider>

                    <Collapse in={this.state.showActivities}>
                        <div>
                            <Button onClick={() => this.setState({showActivities: false})}><VscEyeClosed/></Button>
                            {this.state.showActivities &&
                                <ActivityList targetResearcher={this.state.targetResearcher}/>}
                        </div>
                    </Collapse>
                </div>
            );
        }

        return (
            <div className="container">
                <h1>Téléchargement des données des chercheurs
                    <button className={'btn btn-primary'}><Oval/></button>
                </h1>
            </div>
        )
    }

}

export default Researcher;