import React from 'react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {dateFilter} from 'react-bootstrap-table2-filter';

import 'react-datepicker/dist/react-datepicker.css';
import Button from "react-bootstrap/Button";
import {Audio} from "react-loading-icons";
import {chercheursColumnOfActivity, paginationOptions} from "../../util/BootStrapTableOptions";
import {ImFilter} from "react-icons/im";
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai";
import EducationAdd from "./EducationAdd";

import ActivityTypes from "../../../const/ActivityTypes";
import {fetchListEducations} from "../../../services/education/EducationActions";
import {fetchResearcherActivities} from "../../../services/Researcher/ResearcherActions";
import EducationDelete from "./EducationDelete";

// If targetResearcher is set in props display related information only (
// else load list des tous les educations du database
function EducationList(props) {
    const targetResearcher = props.targetResearcher;

    const [educationList, setEducationList] = React.useState(null);

    const [showFilter, setShowFilter] = React.useState(false);


    const [targetEducation, setTargetEducation] = React.useState(false);
    const [showEducationAdd, setShowEducationAdd] = React.useState(false);
    const [showEducationDelete, setShowEducationDelete] = React.useState(false);
    const [listChangeCount, setListChangeCount] = React.useState(0);

    const {SearchBar, ClearSearchButton} = Search;

    const handleHideModal = (msg = null) => {
        setShowEducationAdd(false);
        setShowEducationDelete(false);
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
            fetchListEducations().then(list => setEducationList(list))
        } else
            fetchResearcherActivities(targetResearcher.researcherId)
                .then(list => {
                    setEducationList(list.filter(a => a.idTypeActivity === ActivityTypes.EducationIdType));
                })
    }, [listChangeCount]);


    if (!educationList) {
        return <div><Button><Audio/></Button></div>
    } else {
        if (educationList.length === 0) {
            return <div className={"row"}>
                <br/>
                <div className={"col-8"}>
                    <h3>Aucun Education est enregistre</h3>
                </div>
                <div className={"col-4"}>
                    {showEducationAdd &&
                        <EducationAdd targetResearcher={targetResearcher} onHideAction={handleHideModal}/>}
                    <button className="btn btn-success" data-bs-toggle="button"
                            onClick={() => setShowEducationAdd(true)}>
                        <AiOutlinePlusCircle/> &nbsp; Ajouter une education
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
                        setTargetEducation(row)
                        setShowEducationDelete(true)
                    }}><AiFillDelete/></button>
                    &nbsp;  &nbsp;
                    {row.idActivity}
                </div>)
            }
        }, {
            dataField: 'education.educationCourseName',
            text: 'Course',
            sort: true,
        }, {
            dataField: 'education.educationDescription',
            text: 'Description',
        }, {
            dataField: 'education.educationFormation',
            text: 'Formation',
            sort: true,
        }, {
            dataField: 'education.educationCompletion',
            text: 'date d\'achèvement',
            sort: true,
            filter: showFilter ? dateFilter() : null,
        }];

        let title = "Education"
        if (!targetResearcher) {
            columns.push(chercheursColumnOfActivity)
            title = "Liste des educations pour les Chercheurs"
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
                    data={educationList}
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
                                        {showEducationAdd &&
                                            <EducationAdd targetResearcher={targetResearcher}
                                                          onHideAction={handleHideModal}/>}
                                        {showEducationDelete &&
                                            <EducationDelete targetEducation={targetEducation}
                                                             onHideAction={handleHideModal}/>}
                                        <button className="btn btn-success" data-bs-toggle="button"
                                                onClick={() => setShowEducationAdd(true)}>
                                            <AiOutlinePlusCircle/> &nbsp; Ajouter une education
                                        </button>
                                    </div>
                                </div>
                                {showFilter && <SearchBar {...props.searchProps} />}
                                <hr/>
                                <BootstrapTable
                                    bootstrap4
                                    filter={filterFactory()}
                                    pagination={paginationFactory(paginationOptions(educationList.length))}
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

export default EducationList;
