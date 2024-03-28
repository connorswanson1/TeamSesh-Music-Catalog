import React from 'react';
//import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

function scrollToComponent(componentId) {
    document.getElementById(componentId).scrollIntoView({ behavior: 'smooth' });
}

export function scrollToSongsList() {
    const songsListElement = document.getElementById('songsList');
    if (songsListElement) {
        const headerOffset = 55; // Adjust this value based on the height of your fixed header/navbar
        const elementPosition = songsListElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
}

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-title">TeamSESH Database</div>
            <div className="navbar-links">
                <button onClick={() => scrollToComponent('homePage')}>Home</button>
                <button onClick={scrollToSongsList}>Songs</button>
                <button onClick={() => scrollToComponent('aboutPage')}>About</button>
            </div>
            <div className="navbar-contact">
                <button>Contact</button>
            </div>
        </nav>
    );
}

export default NavBar;
