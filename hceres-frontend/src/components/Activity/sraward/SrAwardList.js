import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {dateFilter} from 'react-bootstrap-table2-filter';

import 'react-datepicker/dist/react-datepicker.css';
import Button from "react-bootstrap/Button";
import {BallTriangle} from "react-loading-icons";
import {chercheursColumnOfActivity, paginationOptions} from "../../util/BootStrapTableOptions";
import {ImFilter} from "react-icons/im";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import SrAwardAdd from "./SrAwardAdd";

import ActivityTypes from "../../../const/ActivityTypes";
import {fetchListSrAwards} from "../../../services/sraward/SrAwardActions";
import {fetchResearcherActivities} from "../../../services/Researcher/ResearcherActions";
import SrAwardDelete from "./SrAwardDelete";

// If targetResearcher is set in props display related information only (
// else load list des tous les srAwards du database
function SrAwardList(props) {
    const targetResearcher = props.targetResearcher;

    const [srAwardList, setSrAwardList] = React.useState(null);

    const [showFilter, setShowFilter] = React.useState(false);


    const [targetSrAward, setTargetSrAward] = React.useState(false);
    const [showSrAwardAdd, setShowSrAwardAdd] = React.useState(false);
    const [showSrAwardDelete, setShowSrAwardDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);

    const {SearchBar, ClearSearchButton} = Search;

    const handleHideModal = (msg = null) => {
        setShowSrAwardAdd(false);
        setShowSrAwardDelete(false);
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
            fetchListSrAwards().then(list => setSrAwardList(list))
        } else
            fetchResearcherActivities(targetResearcher.researcherId)
                .then(list => {
                    setSrAwardList(list.filter(a => a.idTypeActivity === ActivityTypes.SR_AWARD));
                })
    }, [listChangeCount]);


    if (!srAwardList) {
        return <div><Button><BallTriangle/></Button></div>
    } else {
        if (srAwardList.length === 0) {
            return <div className={"row"}>
                <br/>
                <div className={"col-8"}>
                    <h3>Aucun SrAward est enregistre</h3>
                </div>
                <div className={"col-4"}>
                    {showSrAwardAdd &&
                        <SrAwardAdd targetResearcher={targetResearcher} onHideAction={handleHideModal}/>}
                    <button className="btn btn-success" data-bs-toggle="button"
                            onClick={() => setShowSrAwardAdd(true)}>
                        <AiOutlinePlusCircle/> &nbsp; Ajouter une srAward
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
                        setTargetSrAward(row)
                        setShowSrAwardDelete(true)
                    }}><AiFillDelete/></button>
                    &nbsp;  &nbsp;
                    {row.idActivity}
                </div>)
            }
        }, {
            dataField: 'srAward.awardeeName',
            text: 'Course',
            sort: true,
        }, {
            dataField: 'srAward.description',
            text: 'Description',
        }, {
            dataField: 'srAward.awardDate',
            text: 'date d\'achèvement',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }];

        let title = "SrAward"
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity)
            title = "Liste des srAwards pour les Chercheurs"
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
                    data={srAwardList}
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
                                        {showSrAwardAdd &&
                                            <SrAwardAdd targetResearcher={targetResearcher}
                                                          onHideAction={handleHideModal}/>}
                                        {showSrAwardDelete &&
                                            <SrAwardDelete targetSrAward={targetSrAward}
                                                             onHideAction={handleHideModal}/>}
                                        <button className="btn btn-success" data-bs-toggle="button"
                                                onClick={() => setShowSrAwardAdd(true)}>
                                            <AiOutlinePlusCircle/> &nbsp; Ajouter une srAward
                                        </button>
                                    </div>
                                </div>
                                {showFilter && <SearchBar {...props.searchProps} />}
                                <hr/>
                                <BootstrapTable
                                    bootstrap4
                                    filter={filterFactory()}
                                    pagination={paginationFactory(paginationOptions(srAwardList.length))}
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

export default SrAwardList;