// components/AboutPage.js
import React, { useRef, useEffect, useState } from 'react';
import '../styles/AboutPage.css';
import About from './About';
import Contact from './Contact';
import { scrollToSongsList } from './NavBar';

function AboutPage({ contactRef }) {
    const aboutRef = useRef(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const aboutPosition = aboutRef.current.offsetTop;
            const aboutHeight = aboutRef.current.offsetHeight;
            const scrollPosition = window.pageYOffset;

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
            <About />
            <div ref={contactRef}>
                <Contact />
            </div>
        </div>
    );
}

export default AboutPage;
