import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Home'
import Navigation from './Navigation'
import About from './About'
import Contact from './Contact';
import Footer from './Footer';
import Connection from './Connection';

function App() {
  return (
    <Router>
    <div>
        <Navigation />
        <Routes>
          <Route path="/" element = {<Home/>} />
          <Route path="/About" element = {<About/>} />
          <Route path="/Contact" element = {<Contact/>} />
          <Route path="/Connection" element = {<Connection/>} />
        </Routes>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
