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
import {ThreeDots} from "react-loading-icons";
import {chercheursColumnOfActivity, paginationOptions} from "../../util/BootStrapTableOptions";
import {ImFilter} from "react-icons/im";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {GrDocumentCsv} from "react-icons/gr";
import PostDocAdd from "./PostDocAdd";

import ActivityTypes from "../../../const/ActivityTypes";
import {fetchListPostDocs} from "../../../services/post-doc/PostDocActions";
import {fetchResearcherActivities} from "../../../services/Researcher/ResearcherActions";
import PostDocDelete from "./PostDocDelete";

// If targetResearcher is set in props display related information only (
// else load list des tous les postDocs du database
function PostDocList(props) {
    // parameter constant (List Template)
    const targetResearcher = props.targetResearcher;

    // Cached state (List Template)
    const [postDocList, setPostDocList] = React.useState(null);

    // UI states (List Template)
    const [successActivityAlert, setSuccessActivityAlert] = React.useState('');
    const [errorActivityAlert, setErrorActivityAlert] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);
    const {SearchBar} = Search;


    // Form state (List Template)
    const [targetPostDoc, setTargetPostDoc] = React.useState(false);
    const [showPostDocAdd, setShowPostDocAdd] = React.useState(false);
    const [showPostDocDelete, setShowPostDocDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);


    const handleHideModal = (msg = null) => {
        setShowPostDocAdd(false);
        setShowPostDocDelete(false);
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
            fetchListPostDocs().then(list => setPostDocList(list))
        } else
            fetchResearcherActivities(targetResearcher.researcherId)
                .then(list => {
                    setPostDocList(list.filter(a => a.idTypeActivity === ActivityTypes.POST_DOC));
                })
    }, [listChangeCount, targetResearcher]);


    if (!postDocList) {
        return <div><Button><ThreeDots/></Button></div>
    } else {
        if (postDocList.length === 0) {
            return <div className={"row"}>
                <br/>
                <div className={"col-8"}>
                    <h3>Aucun Post doctoral n'est enregistré</h3>
                </div>
                <div className={"col-4"}>
                    {showPostDocAdd &&
                        <PostDocAdd targetResearcher={targetResearcher} onHideAction={handleHideModal}/>}
                    <button className="btn btn-success" data-bs-toggle="button"
                            onClick={() => setShowPostDocAdd(true)}>
                        <AiOutlinePlusCircle/> &nbsp; Ajouter une postDoc
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
                        setTargetPostDoc(row)
                        setShowPostDocDelete(true)
                    }}><AiFillDelete/></button>
                    &nbsp;  &nbsp;
                    {row.idActivity}
                </div>)
            }
        }, {
            dataField: 'postDoc.namePostDoc',
            text: 'Nom',
            sort: true,
        }, {
            dataField: 'postDoc.nameSupervisor',
            text: 'Superviseur',
            sort: true,
        }, {
            dataField: 'postDoc.arrivalDate',
            text: 'Date d\'arrivée',
            hidden: true, // for csv only
        }, {
            dataField: 'postDoc.departureDate',
            text: 'Date de départ',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }, {
            dataField: 'postDoc.duration',
            text: 'Durée',
            sort: true,
        }, {
            dataField: 'postDoc.nationality',
            text: 'Nationalité',
            sort: true,
        }, {
            dataField: 'postDoc.originalLab',
            text: 'Laboratoire d\'origine',
            sort: true,
        }, {
            dataField: 'postDoc.associatedFunding',
            text: 'Financement associé',
            hidden: true, // for csv only
        }, {
            dataField: 'postDoc.associatedPubliRef',
            text: 'Réf Publi associée',
            hidden: true, // for csv only
        }];

        let title = "PostDoc"
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity)
            title = "Liste des postDocs pour les Chercheurs"
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
                    data={postDocList}
                    columns={columns}
                    exportCSV={ {
                        fileName: 'postDocList.csv',
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
                                        {showPostDocAdd &&
                                            <PostDocAdd targetResearcher={targetResearcher}
                                                          onHideAction={handleHideModal}/>}
                                        {showPostDocDelete &&
                                            <PostDocDelete targetPostDoc={targetPostDoc}
                                                             onHideAction={handleHideModal}/>}
                                        <button className="btn btn-success" data-bs-toggle="button"
                                                onClick={() => setShowPostDocAdd(true)}>
                                            <AiOutlinePlusCircle/> &nbsp; Ajouter une postDoc
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
                                    pagination={paginationFactory(paginationOptions(postDocList.length))}
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

export default PostDocList;
