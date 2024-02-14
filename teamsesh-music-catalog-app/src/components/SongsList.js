import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SongsList = () => {
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                // Update the URL to match your endpoint for fetching songs
                const response = await axios.get('http://localhost:3001/api/artists/38842/songs');
                setSongs(response.data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchSongs();
    }, []); // The empty array ensures this effect runs once on mount

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Songs by Bones</h2>
            <ul>
                {songs.map(song => (
                    <li key={song.id}>{song.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SongsList;
