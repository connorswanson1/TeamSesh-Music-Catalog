import React from 'react';
import '../styles/Home.css';
import { scrollToSongsList } from './NavBar';
// import Image from '../assets/bones_smoke.jpeg';
import SongSearch from './SongSearch';

function HomePage() {
    return (
        <div className="home-container">
            <div className="home-text">
                <h1> <span className="gothic-font">TeamSesh Database</span></h1>
                <p>This page is a collection of every song <span className="gothic-font">BONES</span> has made, produced, or been featured on. </p>
                <p>You can search for a specific song, or access the full database below.</p>
                <p> Songs can be fitered by the artist, the producer, album, or feature.
                    Songs can also be sorted by release date or alphabetically by title. Thank you for visiting, enjoy. <span className="gothic-font">sesh</span>.
                </p>
                <button class="explore-btn" onClick={scrollToSongsList}>Explore Full Database ↓</button>
            </div>
            <div className="home-search-container">
                < SongSearch />
            </div>
        </div>
    );
}

export default HomePage;
