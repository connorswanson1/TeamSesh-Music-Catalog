import React, { useState } from 'react';
import '../styles/Home.css';
import { scrollToSongsList } from './NavBar';
import SongSearch from './SongSearch';

function HomePage() {
    const [isListVisible, setIsListVisible] = useState(false);

    const toggleListVisibility = () => {
        setIsListVisible(!isListVisible);
    };

    return (
        <div className="home-container">
            <div className="home-text">
                <h1><span className="gothic-font">TeamSesh Database</span></h1>
                <p>This page is a collection of every song <span className="gothic-font">BONES</span> has made, been featured on, or is associated with.</p>
                <p>Thank you for visiting, enjoy. <span className="gothic-font">sesh</span>.</p>
                <button className="toggle-list-btn" onClick={toggleListVisibility}>
                    How can I use this site?
                </button>
                <ul className={`home-list ${isListVisible ? 'visible' : ''}`}>
                    <li>Songs can be filtered by the artist, the producer, album, or feature.</li>
                    <li>Songs are sorted by most recent by default, which can be flipped.</li>
                    <li>Clicking the title of a song will take you to the Genius lyrics page.</li>
                    <li>Search for a specific song, or access the full database below.</li>
                </ul>
                <button className="explore-btn" onClick={scrollToSongsList}>Explore Full Database ↓</button>
            </div>
            <div className="home-search-container">
                <SongSearch />
            </div>
        </div>
    );
}

export default HomePage;
