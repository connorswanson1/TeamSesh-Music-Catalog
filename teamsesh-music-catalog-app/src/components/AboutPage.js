import React, { useRef, useEffect, useState } from 'react';
import '../styles/About.css';
import Image from '../assets/bones_bottomtext.jpeg';
import { scrollToSongsList } from './NavBar';

function AboutPage() {
    const aboutRef = useRef(null);
    const [showButton, setShowButton] = useState(false); // State to show or hide the button

    // Handle the scroll event
    useEffect(() => {
        const handleScroll = () => {
            const aboutPosition = aboutRef.current.offsetTop;
            const aboutHeight = aboutRef.current.offsetHeight;
            const scrollPosition = window.pageYOffset;

            // Check if the scroll position is within the About section boundaries
            if (scrollPosition >= aboutPosition && scrollPosition < aboutPosition + aboutHeight) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="about-container" ref={aboutRef}>
            {showButton && (
                <button className={`back-to-songs ${showButton ? 'visible' : ''}`} onClick={scrollToSongsList}>
                    Back To Songs ↑
                </button>
            )}
            <div className="about-section">
                <h2>About</h2>
                <p>This page was created by me, Connor Swanson. I am a software engineer, and my friends
                    and I consider ourselves to be pretty big TeamSESH fans. BONES has such a huge library of work, and I
                    felt that a true database was needed to log his work. I also wanted to make sure that the incredible
                    producers of his songs got their credit, so being able to see all of the songs each of them had produced
                    over the years was a big focus.
                </p>
                <p>The database is sourced with the Genius API and the app itself is built with ReactJS and NodeJS.</p>
            </div>
            <div className="about-image-container">
                <img src={Image} alt="Bones" className="about-photo" />
            </div>
        </div>
    );
}

export default AboutPage;
