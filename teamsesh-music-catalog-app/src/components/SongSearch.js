// Lots of redundancy in this file, need to create parent component to pass songs
import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import '../styles/LoadingIndicator.css';
import '../styles/SongSearch.css';

const SongSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSong, setSelectedSong] = useState(null);

    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001'; // Fallback to localhost for development
                const response = await axios.get(`${baseURL}/api/songs/details`);
                setSongs(response.data);
                if (response.data.length > 0) {
                    // Select a random song
                    const randomSong = response.data[Math.floor(Math.random() * response.data.length)];
                    setSelectedSong(randomSong);
                }
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchSongs();
    }, []);

    const filteredSongs = useMemo(() => {
        if (searchTerm.length > 1) {
            return songs.filter(song =>
                song.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return [];
    }, [searchTerm, songs]);

    const handleSelectSong = (song) => {
        setSelectedSong(song);
    };

    const LoadingIndicator = () => {
        return (
            <div className="loading-container">
                <span className="loading-text"><span className="gothic-font">Loading Song Search...</span></span>
            </div>
        );
    };

    if (isLoading) return <LoadingIndicator />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search for a song..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className={`search-results ${filteredSongs.length > 0 ? 'expanded' : ''}`}>
                {filteredSongs.map(song => (
                    <li key={song.id} onClick={() => handleSelectSong(song)}>
                        {song.title}
                    </li>
                ))}
            </ul>
            {selectedSong && (
                <div className="song-details">
                    <h3>{selectedSong.title}</h3>
                    <p>Artist: {selectedSong.artist}</p>
                    <p>Producer: {selectedSong.producer || 'N/A'}</p>
                    <p>Album: {selectedSong.album || 'N/A'}</p>
                    <p>Feature: {selectedSong.feature || 'N/A'}</p>
                    <p>Release Date: {selectedSong.release_date ? new Date(selectedSong.release_date).toLocaleDateString() : 'Unknown'}</p>
                    <div>{selectedSong.song_art_url ? <img src={selectedSong.song_art_url} alt="song art" /> : 'N/A'}</div>
                </div>
            )}
        </div>
    );


};

export default SongSearch;
