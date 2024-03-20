import React from 'react';
//import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

function scrollToComponent(componentId) {
    document.getElementById(componentId).scrollIntoView({ behavior: 'smooth' });
}

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-title">TeamSESH Database</div>
            <div className="navbar-links">
                <button onClick={() => scrollToComponent('homePage')}>Home</button>
                <button onClick={() => scrollToComponent('songsList')}>Songs</button>
                <button onClick={() => scrollToComponent('aboutPage')}>About</button>
            </div>
            <div className="navbar-contact">
                <button>Contact</button>
            </div>
        </nav>
    );
}

export default NavBar;
