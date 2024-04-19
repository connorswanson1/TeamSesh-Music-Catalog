import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkMode', !darkMode);
        document.body.setAttribute('data-theme', !darkMode ? 'dark' : 'light');
    };
    return (
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? <i class="fa-solid fa-sun"></i> : <i class="fa-solid fa-moon"></i>}
        </button>
    );
};

export default DarkModeToggle;
