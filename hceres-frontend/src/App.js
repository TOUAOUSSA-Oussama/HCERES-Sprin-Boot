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

function App() {
  return (
    <>
      <Router>
      <GlobaleStyle />

      <Navbar />

      <Routes>
          <Route path='/Home' exact  element={<Home/>} />
          <Route path='/Researcher' exact  element={<Researcher/>} />
          <Route path='/Activity' exact  element={<Activity/>} />
          <Route path='/About' exact  element={<About/>} />
          <Route path='/Connection' exact  element={<Connection/>} />
      </Routes> 

      <Footer />

      </Router>
    </>

  );
}

export default App;
