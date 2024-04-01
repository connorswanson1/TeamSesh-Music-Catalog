import React from 'react';

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="social-links">
                    {/* LinkedIn Icon */}
                    <a href="https://www.linkedin.com/in/connorswanson" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    {/* GitHub Icon */}
                    <a href="https://github.com/connorswanson1" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
                <p>© 2024 Connor Swanson. All rights reserved.</p>
                <p>Data provided by the<a href="https://genius.com/" target="_blank" rel="noopener noreferrer">Genius API,</a>Music and content is copyrighted by the respective artists and producers.</p>
            </div>
        </footer>
    );
}

export default Footer;
