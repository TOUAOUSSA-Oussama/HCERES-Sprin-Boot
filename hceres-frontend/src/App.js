import React from 'react';
import {GlobaleStyle} from './AppElements';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Researcher from './components/Researcher/Researcher';
import Activity from './components/Activity/Activity';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Connection from './components/Connection/Connection';
import UpdateResearcher from './components/Researcher/UpdateResearcher';
import AuthWrapper from "./utils/AuthWrapper";
import PageNotExist from "./components/pageNotExist";

function App() {
    return (
        <>
            <Router>
                <GlobaleStyle/>

                {/*Add navigation bar only when user is logged in*/}
                <Routes>
                    <Route path='/Home' exact element={<Navbar/>}/>
                    <Route path='/Researcher' exact element={<Navbar/>}/>
                    <Route path='/AddResearcher' exact element={<Navbar/>}/>
                    <Route path='/UpdateResearcher' exact element={<Navbar/>}/>
                    <Route path='/Activity' exact element={<Navbar/>}/>
                    <Route path='*' exact element={<></>}/>
                </Routes>

                <Routes>
                    <Route path='/About' exact element={<About/>}/>
                    <Route path='/' exact element={<Connection/>}/>
                    <Route path='*' exact element={<PageNotExist/>}/>

                    <Route element={<AuthWrapper />}>
                        <Route path='/Home' exact element={<Home/>}/>
                        <Route path='/Researcher' exact element={<Researcher/>}/>
                        <Route path='/UpdateResearcher' exact element={<UpdateResearcher/>}/>
                        <Route path='/Activity' exact element={<Activity/>}/>
                    </Route>

                </Routes>

                <Footer/>

            </Router>
        </>

    );
}

export default App;