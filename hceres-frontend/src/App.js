import React from 'react';
import {GlobaleStyle} from './AppElements';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Researcher from './components/Researcher/Researcher';
import Activity from './components/Activity/Activity';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Connection from './components/Connection/Connection';
import AddResearcher from './components/Researcher/AddResearcher';
import UpdateResearcher from './components/Researcher/UpdateResearcher';

function App() {
  return (
    <>
      <Router>
      <GlobaleStyle />


      <Routes>
          <Route path='/About' exact  element={<About/>} />
          <Route path='' exact  element={<Connection/>} />


          <Route path='/Home' exact  element={<><Navbar/><Home/></>} />
          <Route path='/Researcher' exact  element={<> <Navbar/>  <Researcher/></>} />
          <Route path='/AddResearcher' exact  element={<> <Navbar/>  <AddResearcher/></>} />
          <Route path='/UpdateResearcher' exact  element={<> <Navbar/>  <UpdateResearcher/></>} />
          <Route path='/Activity' exact  element={<> <Navbar/>  <Activity/></>} />
      </Routes>

      <Footer />

      </Router>
    </>

  );
}

export default App;