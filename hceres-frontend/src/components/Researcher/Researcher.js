import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
//import {Table} from "antd";

class Researcher extends Component {
    constructor() {
        super()
        this.state = {
            researchers : [],
            loading: false
        }
    }

    
    async componentDidMount() {
        
        const url = "http://localhost:9000/Researchers";
        const response = await fetch(url);
        
        const listeChercheurs = await response.json();
        console.log("hello")
        this.setState({
            researchers: listeChercheurs,
        })
        console.log(this.state.researchers);
    }

    render() {
                
                if (this.state.researchers && this.state.researchers.length ){
                    return  this.state.researchers.map( (chercheur, index) => {
                        return (
                            <div key={index}>

                                <h3>{chercheur.researcherSurname}</h3>
                                <p>{chercheur.researcherName}</p>
                                <p>{chercheur.researcherEmail}</p>
                            </div>
                       );
                    })

                    //const columns = [
                    //    {
                    //        title:"First name",
                    //        dataIndex: "researcherSurname"
                    //    }
                    //];

                    //return  ( 
                    //    <Table datasource={this.state.researchers} columns={columns} rowKey="researcherId" />
                    //);

                } 
                return (
                    <div>
                        <h1>Telechargement data</h1>
                    </div>
                )
            
        
    }
    
};

export default Researcher;