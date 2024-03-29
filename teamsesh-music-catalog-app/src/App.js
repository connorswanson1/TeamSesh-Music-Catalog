import React from 'react';
import SongsList from './components/SongsList';
import './App.css';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

console.log(SongsList); // Should log the function or class if correctly imported

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <main>
        <div id="homePage">
          <HomePage />
        </div>
        <div id="songsList" className="database-container">
          <SongsList />
        </div>
        <div id="aboutPage">
          <AboutPage />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default App;
