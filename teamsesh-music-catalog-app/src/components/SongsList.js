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
                const response = await axios.get('http://localhost:3001/api/songs/details');
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
                    <th>Artist</th>
                    <th>Title</th>
                    <th>Album</th>
                    <th>Producer</th>
                    <th>Release Date</th>
                    <th>Feature</th>
                    {/* <th>Sample</th> */}
                    <th>Art</th>
                </tr>
            </thead>
            <tbody>
                {songs.map(song => (
                    <tr key={song.id}>
                        <td>{song.artist}</td>
                        <td>{song.title}</td>
                        <td>{song.album || 'N/A'}</td>
                        <td>{song.producer || 'N/A'}</td>
                        <td>{song.release_date ? new Date(song.release_date).toLocaleDateString() : 'Unknown'}</td>                        <td>{song.feature || 'N/A'}</td>
                        {/* <td>{song.sample || 'N/A'}</td> */}
                        <td>
                            {song.song_art_url ? <img src={song.song_art_url} alt="song art" style={{ width: '50px', height: '50px' }} /> : 'N/A'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SongsList;
