// components/SongsList.js

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './SongsList.css';

const SongsList = () => {
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortField, setSortField] = useState('release_date'); // Default sort field
    const [sortOrder, setSortOrder] = useState('asc'); // Sort order: 'asc' or 'desc'

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

    const sortedSongs = useMemo(() => {
        const sortArray = songs.slice(); // Create a shallow copy of the songs array to sort
        sortArray.sort((a, b) => {
            if (a[sortField] < b[sortField]) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (a[sortField] > b[sortField]) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
        return sortArray;
    }, [songs, sortField, sortOrder]); // Dependencies

    const handleSort = (field) => {
        if (field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc'); // Default to ascending when changing sort fields
        }
    };


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <table className="songs-table">
            <thead>
                <tr>
                    <th onClick={() => handleSort('artist')}>
                        Artist
                        {sortField === 'artist' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                    </th>
                    <th onClick={() => handleSort('title')}>
                        Title
                        {sortField === 'title' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                    </th>
                    <th onClick={() => handleSort('album')}>
                        Album
                        {sortField === 'album' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                    </th>
                    <th onClick={() => handleSort('producer')}>
                        Producer
                        {sortField === 'producer' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                    </th>
                    <th onClick={() => handleSort('release_date')}>
                        Release Date
                        {sortField === 'release_date' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                    </th>
                    <th onClick={() => handleSort('feature')}>
                        Feature
                        {sortField === 'feature' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                    </th>
                    {/* <th>Sample</th> */}
                    <th>Art</th>
                </tr>
            </thead>
            <tbody>
                {sortedSongs.map(song => (
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
