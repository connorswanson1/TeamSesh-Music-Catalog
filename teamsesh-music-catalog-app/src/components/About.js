// components/About.js
import React from 'react';
import '../styles/About.css';

function About() {
    return (
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
    );
}

export default About;
