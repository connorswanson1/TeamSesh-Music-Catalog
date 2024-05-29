// App.js
import React, { useRef } from 'react';
import SongsList from './components/SongsList';
import './App.css';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

console.log(SongsList); // Should log the function or class if correctly imported

const App = () => {
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div className="App">
      <NavBar aboutRef={aboutRef} contactRef={contactRef} />
      <main>
        <div id="homePage">
          <HomePage />
        </div>
        <div id="songsList" className="database-container">
          <SongsList />
        </div>
        <div id="aboutPage" ref={aboutRef}>
          <AboutPage contactRef={contactRef} />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default App;
