// components/SongsList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SongsList.css'; // Ensure your CSS file is updated for table styling

const SongsList = () => {
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/artists/38842/songs');
                setSongs(response.data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchSongs();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <table className="songs-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Album</th>
                    <th>Producer</th>
                    <th>Release Date</th>
                    {/* Add more headings as needed */}
                </tr>
            </thead>
            <tbody>
                {songs.map(song => (
                    <tr key={song.id}>
                        <td>{song.title}</td>
                        <td>{song.album || 'Album'}</td>
                        <td>{song.producer || 'N/A'}</td>
                        <td>{song.releaseDate || 'Unknown'}</td>
                        {/* Add more columns as needed */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SongsList;
