import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {dateFilter} from 'react-bootstrap-table2-filter';
import {Alert} from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import Button from "react-bootstrap/Button";
import {Oval} from "react-loading-icons";
import {chercheursColumnOfActivity, paginationOptions} from "../../util/BootStrapTableOptions";
import {ImFilter} from "react-icons/im";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {GrDocumentCsv} from "react-icons/gr";
import ScientificExpertiseAdd from "./ScientificExpertiseAdd";

import ActivityTypes from "../../../const/ActivityTypes";
import {fetchListScientificExpertises} from "../../../services/scientific-expertise/ScientificExpertiseActions";
import {fetchResearcherActivities} from "../../../services/Researcher/ResearcherActions";
import ScientificExpertiseDelete from "./ScientificExpertiseDelete";

// If targetResearcher is set in props display related information only (
// else load list des tous les scientificExpertises du database
function ScientificExpertiseList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [scientificExpertiseList, setScientificExpertiseList] = React.useState(null);

    // UI states (List Template)
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const {SearchBar} = Search;


    // Form state (List Template)
    const [targetScientificExpertise, setTargetScientificExpertise] = React.useState(false);
    const [showScientificExpertiseAdd, setShowScientificExpertiseAdd] = React.useState(false);
    const [showScientificExpertiseDelete, setShowScientificExpertiseDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);


    const handleHideModal = (msg = null) => {
        setShowScientificExpertiseAdd(false);
        setShowScientificExpertiseDelete(false);
        if (msg) {
            // an add or delete did occur
            // re render the table to load new data
            // note the list change count on dependencies table of use effect
            setListChangeCount(listChangeCount + 1)
        }
        displayResultMessage(msg);
    };

    const displayResultMessage = (messages = null) => {
        // silent close
        if (!messages) return;

        if (messages.successMsg) {
            setSuccessActivityAlert(messages.successMsg)
        }

        if (messages.errorMsg) {
            setErrorActivityAlert(messages.errorMsg)
        }
    }


    React.useEffect(() => {
        if (!targetResearcher) {
            // attention that method always change reference to variable not only its content
            fetchListScientificExpertises().then(list => setScientificExpertiseList(list))
        } else
            fetchResearcherActivities(targetResearcher.researcherId)
                .then(list => {
                    setScientificExpertiseList(list.filter(a => a.idTypeActivity === ActivityTypes.SCIENTIFIC_EXPERTISE));
                })
    }, [listChangeCount, targetResearcher]);


    if (!scientificExpertiseList) {
        return <div><Button><Oval/></Button></div>
    } else {
        if (scientificExpertiseList.length === 0) {
            return <div className={"row"}>
                <br/>
                <div className={"col-8"}>
                    <h3>Aucune  expertise scientifique n'est enregistrée</h3>
                </div>
                <div className={"col-4"}>
                    {showScientificExpertiseAdd &&
                        <ScientificExpertiseAdd targetResearcher={targetResearcher} onHideAction={handleHideModal}/>}
                    <button className="btn btn-success" data-bs-toggle="button"
                            onClick={() => setShowScientificExpertiseAdd(true)}>
                        <AiOutlinePlusCircle/> &nbsp; Ajouter une scientificExpertise
                    </button>
                </div>
            </div>;
        }

        const columns = [{
            dataField: 'idActivity',
            text: 'ID',
            sort: true,
            formatter: (cell, row) => {
                return (<div>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => {
                        setTargetScientificExpertise(row)
                        setShowScientificExpertiseDelete(true)
                    }}><AiFillDelete/></button>
                    &nbsp;  &nbsp;
                    {row.idActivity}
                </div>)
            }
        }, {
            dataField: 'scientificExpertise.scientificExpertiseTypeId.nameChoice',
            text: 'Type d\'expertise scientifique',
            sort: true,
        }, {
            dataField: 'scientificExpertise.description',
            text: 'description',
            sort: true,
        }, {
            dataField: 'scientificExpertise.startDate',
            text: 'Date de début',
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'scientificExpertise.endDate',
            text: 'Date de fin',
            filter: showFilter ? dateFilter() : null,
        }];

        let title = "ScientificExpertise"
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity)
            title = "Liste des scientificExpertises pour les Chercheurs"
        }
        const CaptionElement = <div>
            <h3> {title} - &nbsp;
                <button className={"border-0"}
                        onClick={(e) => setShowFilter(!showFilter)}>{
                    <ImFilter/>}
                </button>
            </h3>
        </div>

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
            <div>
                <ToolkitProvider
                    bootstrap4
                    keyField="idActivity"
                    data={scientificExpertiseList}
                    columns={columns}
                    exportCSV={ {
                        fileName: 'scientificExpertiseList.csv',
                        onlyExportFiltered: true,
                        exportAll: false } }
                    search
                >
                    {
                        props => (
                            <div>
                                <br/>
                                <div className={"row"}>
                                    <div className={"col-8"}>
                                        <h3>{CaptionElement}</h3>
                                    </div>
                                    <div className={"col-4"}>
                                        {showScientificExpertiseAdd &&
                                            <ScientificExpertiseAdd targetResearcher={targetResearcher}
                                                          onHideAction={handleHideModal}/>}
                                        {showScientificExpertiseDelete &&
                                            <ScientificExpertiseDelete targetScientificExpertise={targetScientificExpertise}
                                                             onHideAction={handleHideModal}/>}
                                        <button className="btn btn-success" data-bs-toggle="button"
                                                onClick={() => setShowScientificExpertiseAdd(true)}>
                                            <AiOutlinePlusCircle/> &nbsp; Ajouter une scientificExpertise
                                        </button>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-4"}>
                                        {showFilter && <SearchBar {...props.searchProps} />}
                                    </div>
                                    <div className={"col-4"}>
                                        <h3>{showFilter && <MyExportCSV  { ...props.csvProps }/>}</h3>
                                    </div>
                                    <div className={"col-4"}>
                                        {successActivityAlert && <Alert variant={"success"}
                                                                        onClose={() => setSuccessActivityAlert("")}
                                                                        dismissible={true}>{successActivityAlert}</Alert>}
                                        {errorActivityAlert && <Alert variant={"danger"}
                                                                      onClose={() => setErrorActivityAlert("")}
                                                                      dismissible={true}>{errorActivityAlert}</Alert>}
                                    </div>
                                </div>
                                <hr/>
                                <BootstrapTable
                                    bootstrap4
                                    filter={filterFactory()}
                                    pagination={paginationFactory(paginationOptions(scientificExpertiseList.length))}
                                    striped
                                    hover
                                    condensed
                                    {...props.baseProps} />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        );
    }
}

export default ScientificExpertiseList;
