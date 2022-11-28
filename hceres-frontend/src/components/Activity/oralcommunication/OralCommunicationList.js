import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {dateFilter} from 'react-bootstrap-table2-filter';

import 'react-datepicker/dist/react-datepicker.css';
import Button from "react-bootstrap/Button";
import {Circles} from "react-loading-icons";
import {chercheursColumnOfActivity, paginationOptions} from "../../util/BootStrapTableOptions";
import {ImFilter} from "react-icons/im";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import OralCommunicationAdd from "./OralCommunicationAdd";

import ActivityTypes from "../../../const/ActivityTypes";
import {fetchListOralCommunications} from "../../../services/oralcommunication/OralCommunicationActions";
import {fetchResearcherActivities} from "../../../services/Researcher/ResearcherActions";
import OralCommunicationDelete from "./OralCommunicationDelete";

// If targetResearcher is set in props display related information only (
// else load list des tous les oralCommunications du database
function OralCommunicationList(props) {
    const targetResearcher = props.targetResearcher;

    const [oralCommunicationList, setOralCommunicationList] = React.useState(null);

    const [showFilter, setShowFilter] = React.useState(false);


    const [targetOralCommunication, setTargetOralCommunication] = React.useState(false);
    const [showOralCommunicationAdd, setShowOralCommunicationAdd] = React.useState(false);
    const [showOralCommunicationDelete, setShowOralCommunicationDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);

    const {SearchBar, ClearSearchButton} = Search;

    const handleHideModal = (msg = null) => {
        setShowOralCommunicationAdd(false);
        setShowOralCommunicationDelete(false);
        if (msg) {
            // an add or delete did occur
            // re render the table to load new data
            // note the list change count on dependencies table of use state
            setListChangeCount(listChangeCount + 1)
        }
        props.sendMessageToActivity(msg);
    };


    React.useEffect(() => {
        if (!targetResearcher) {
            // attention that method always change reference to variable not only its content
            fetchListOralCommunications().then(list => setOralCommunicationList(list))
        } else
            fetchResearcherActivities(targetResearcher.researcherId)
                .then(list => {
                    setOralCommunicationList(list.filter(a => a.idTypeActivity === ActivityTypes.ORAL_COMMUNICATION_POSTER));
                })
    }, [listChangeCount]);


    if (!oralCommunicationList) {
        return <div><Button><Circles/></Button></div>
    } else {
        if (oralCommunicationList.length === 0) {
            return <div className={"row"}>
                <br/>
                <div className={"col-8"}>
                    <h3>Aucun Communication Oral est enregistre</h3>
                </div>
                <div className={"col-4"}>
                    {showOralCommunicationAdd &&
                        <OralCommunicationAdd targetResearcher={targetResearcher} onHideAction={handleHideModal}/>}
                    <button className="btn btn-success" data-bs-toggle="button"
                            onClick={() => setShowOralCommunicationAdd(true)}>
                        <AiOutlinePlusCircle/> &nbsp; Ajouter une Communication Oral
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
                        setTargetOralCommunication(row)
                        setShowOralCommunicationDelete(true)
                    }}><AiFillDelete/></button>
                    &nbsp;  &nbsp;
                    {row.idActivity}
                </div>)
            }
        }, {
            dataField: 'oralCommunication.oralCommunicationTitle',
            text: 'Titre',
            sort: true,
        }, {
            dataField: 'oralCommunication.authors',
            text: 'Auteurs',
        }, {
            dataField: 'oralCommunication.oralCommunicationDat',
            text: 'Date',
            sort: true,
        }];

        let title = "OralCommunication"
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity)
            title = "Liste des communications orales"
        }
        const CaptionElement = <div>
            <h3> {title} - &nbsp;
                <button className={"border-0"}
                        onClick={(e) => setShowFilter(!showFilter)}>{
                    <ImFilter/>}
                </button>
            </h3>
        </div>
        return (
            <div>
                <ToolkitProvider
                    bootstrap4
                    keyField="idActivity"
                    data={oralCommunicationList}
                    columns={columns}
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
                                        {showOralCommunicationAdd &&
                                            <OralCommunicationAdd targetResearcher={targetResearcher}
                                                          onHideAction={handleHideModal}/>}
                                        {showOralCommunicationDelete &&
                                            <OralCommunicationDelete targetOralCommunication={targetOralCommunication}
                                                             onHideAction={handleHideModal}/>}
                                        <button className="btn btn-success" data-bs-toggle="button"
                                                onClick={() => setShowOralCommunicationAdd(true)}>
                                            <AiOutlinePlusCircle/> &nbsp; Ajouter une oralCommunication
                                        </button>
                                    </div>
                                </div>
                                {showFilter && <SearchBar {...props.searchProps} />}
                                <hr/>
                                <BootstrapTable
                                    bootstrap4
                                    filter={filterFactory()}
                                    pagination={paginationFactory(paginationOptions(oralCommunicationList.length))}
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

export default OralCommunicationList;
