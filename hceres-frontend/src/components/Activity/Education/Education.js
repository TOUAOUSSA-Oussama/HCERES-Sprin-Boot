import React, { Component } from 'react';
import './Education.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Navigate  } from "react-router-dom";
import axios from 'axios';

class Education extends Component {
  constructor(props){
    super(props);

    this.state = {
      researcherId: "",
      educationCourseName: "",
      educationFormation: "",
      educationDescription: "",
      educationInvolvmentText: "",
      educationLevelText: "",
      educationCompletion: "",
      IsCompleted: false,
    }

    this.handleReseatcherId = this.handleReseatcherId.bind(this);
    this.handleEducationCourseName = this.handleEducationCourseName.bind(this);
    this.handleEducationFormation = this.handleEducationFormation.bind(this);
    this.handleEducationDescription = this.handleEducationDescription.bind(this);
    this.handleEducationInvolvmentText = this.handleEducationInvolvmentText.bind(this);
    this.handleEducationLevelText = this.handleEducationLevelText.bind(this);
    this.handleEducationCompletion = this.handleEducationCompletion.bind(this);
    this.checkIsCompleted = this.checkIsCompleted.bind(this);
  }

  handleReseatcherId(event){
    this.setState({researcherId: event.target.value});
  }
  handleEducationCourseName(event){
    this.setState({educationCourseName: event.target.value});
  }
  handleEducationFormation(e){
    this.setState({educationFormation: e.target.value});
  }
  handleEducationDescription(e){
    this.setState({educationDescription: e.target.value});
  }
  handleEducationInvolvmentText(e){
    this.setState({educationInvolvmentText: e.target.value});
  }
  handleEducationLevelText(e){
    this.setState({educationLevelText: e.target.value});
  }
  handleEducationCompletion(e){
    this.setState({educationCompletion: e.target.value});
  }

  checkIsCompleted(){
    this.setState({IsCompleted: true});
  }

  

  handleSubmit = event => {
    event.preventDefault();

    const data = {
      researcherId: this.state.researcherId,
      educationCourseName: this.state.educationCourseName,
      educationFormation: this.state.educationFormation,
      educationDescription: this.state.educationDescription,
      educationInvolvmentText: this.state.educationInvolvmentText,
      educationLevelText: this.state.educationLevelText,
      educationCompletion: this.state.educationCompletion,
    };

    axios.post(`http://localhost:9000/AddEducation`, { data })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.checkIsCompleted();
      })
  }

  render(){
    if(this.state.IsCompleted){
      return <Navigate push to="/Activity" />;
    }
    return (
      <div className='form-container'>
        <form className='form' onSubmit={this.handleSubmit}>
          <a href="/Activity" class="close-button">&#10006;</a>
          <h3 className='title'>EDUCATION</h3>
          <label className='label'>
            Chercheur
          </label>
          <input
            placeholder='Nom'
            className='input-container'
            name="researcherId"
            type="chercheur"
            value={this.state.researcherId}
            onChange={this.handleReseatcherId}
            required />
  
  
          <label className='label' >
            Cours
          </label>
          <input
            placeholder='Cours'
            className='input-container'
            name="educationCourseName"
            type="cours"
            value={this.state.educationCourseName}
            onChange={this.handleEducationCourseName}
            required />
  
  
          <label className='label'>
            Date de completion
          </label>
          <input
            className='datePicker'
            name="educationCompletion"
            type="date"
            value={this.state.educationCompletion}
            onChange={this.handleEducationCompletion}
            withPortal
            placeholderText="Choix de date" />
  
  
          <label className='label' >
            Formation
          </label>
          <input
            placeholder='Formation'
            className='input-container'
            name="educationFormation"
            type="formation"
            value={this.state.educationFormation}
            onChange={this.handleEducationFormation}
            required />
  
          <label className='label' >
            Description
          </label>
          <textarea
            placeholder='Description'
            className='textarea'
            name="educationDescription"
            type="description"
            value={this.state.educationDescription}
            onChange={this.handleEducationDescription}
            required />
  
          <label className='label' >
            education Involvment
          </label>
          <textarea
            placeholder='Description'
            className='textarea'
            name="educationInvolvmentText"
            type="description"
            value={this.state.educationInvolvmentText}
            onChange={this.handleEducationInvolvmentText}
            required />
  
          <label className='label' >
            education LevelText
          </label>
          <textarea
            placeholder='Description'
            className='textarea'
            name="educationLevelText"
            type="description"
            value={this.state.educationLevelText}
            onChange={this.handleEducationLevelText}
            required />
  
          <button className='submit'>Valider</button>
        </form>
      </div>
    );
  }
}
export default Education;