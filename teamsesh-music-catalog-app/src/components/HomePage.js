import React from 'react';
import '../styles/Home.css';
import { scrollToSongsList } from './NavBar';
import Image from '../assets/bones_bottomtext.jpeg';

function HomePage() {
    return (
        <div className="home-container">
            <div className="home-text">
                <h1>Welcome to the <span className="gothic-font">TeamSesh</span> Database</h1>
                <p>This page is a collection of every song <span className="gothic-font">BONES</span> has made, produced, or been featured on.
                    Songs can be fitered by the artist, the producer, album, or feature. </p>
                <p> Songs can also be sorted by release date or alphabetically by title. Thank you for visiting, enjoy. <span className="gothic-font">sesh</span>.
                </p>
                <button class="explore-btn" onClick={scrollToSongsList}>Explore Now</button>
            </div>
            <div className="home-image-container">
                <img src={Image} alt="Bones" className="home-photo" />
            </div>
        </div>
    );
}

export default HomePage;
