// components/NavBar.js
import React from 'react';
import '../styles/NavBar.css';
import DarkModeToggle from './DarkModeToggle';

function scrollToComponent(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
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

function NavBar({ aboutRef, contactRef }) {
    return (
        <nav className="navbar">
            <div className="navbar-title">TeamSESH Database</div>
            <div className="navbar-links">
                <button onClick={() => scrollToComponent({ current: document.getElementById('homePage') })}>Home</button>
                <button onClick={scrollToSongsList}>Songs</button>
                <button onClick={() => scrollToComponent(aboutRef)}>About</button>
            </div>
            <div><DarkModeToggle /></div>
            <div className="navbar-contact">
                <button onClick={() => scrollToComponent(contactRef)}>Contact</button>
            </div>
        </nav>
    );
}

export default NavBar;
