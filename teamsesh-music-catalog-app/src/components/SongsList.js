// components/SongsList.js
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../styles/SongsList.css';
import '../styles/LoadingIndicator.css';

const SongsList = () => {
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [sortField, setSortField] = useState('release_date'); // Default sort field
    const [sortOrder, setSortOrder] = useState('desc'); // Sort order: 'asc' or 'desc'

    const [currentFilter, setCurrentFilter] = useState({ type: '', value: '' });

    const getUniqueSortedItems = (songs, property) => {
        const items = [...new Set(songs.map(song => song[property] ? song[property] : ''))];
        return items.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    };

    const uniqueArtists = useMemo(() => getUniqueSortedItems(songs, 'artist'), [songs]);
    const uniqueAlbums = useMemo(() => getUniqueSortedItems(songs, 'album'), [songs]);
    const uniqueProducers = useMemo(() => getUniqueSortedItems(songs, 'producer'), [songs]);
    const uniqueFeatures = useMemo(() => getUniqueSortedItems(songs, 'feature'), [songs]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001'; // Fallback to localhost for development
                const response = await axios.get(`${baseURL}/api/songs/details`);
                setSongs(response.data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchSongs();
    }, []);

    const handleSort = (field) => {
        if (field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc'); // Default to ascending when changing sort fields
        }
    };

    const sortedAndFilteredSongs = useMemo(() => {
        let filtered = songs;

        // Apply filter based on currentFilter state
        if (currentFilter.type && currentFilter.value) {
            filtered = filtered.filter(song => song[currentFilter.type] === currentFilter.value);
        }

        // Apply sorting based on sortField and sortOrder states
        filtered.sort((a, b) => {
            // Handling "unknown" dates, assuming 'Unknown' is used for unknown dates
            const dateA = a[sortField] === 'Unknown' ? new Date('9999-12-31') : new Date(a[sortField]);
            const dateB = b[sortField] === 'Unknown' ? new Date('9999-12-31') : new Date(b[sortField]);

            // Sorting based on date values
            if (dateA < dateB) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (dateA > dateB) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return filtered;
    }, [songs, currentFilter, sortField, sortOrder]); // Dependencies include all states affecting the output

    const LoadingIndicator = () => (
        <div className="loading-container">
            <span className="loading-text"><span className="gothic-font">Loading...</span></span>
        </div>
    );

    if (isLoading) return <LoadingIndicator />;
    if (error) return <div>Error: {error}</div>;

    return (
        <table className="songs-table">
            <thead>
                <tr>
                    <th>
                        Artist
                        <select onChange={e => setCurrentFilter({ type: 'artist', value: e.target.value })} value={currentFilter.type === 'artist' ? currentFilter.value : ''}>
                            <option value="">All Artists</option>
                            {uniqueArtists.map(artist => <option key={artist} value={artist}>{artist}</option>)}
                        </select>
                    </th>
                    <th>
                        Title
                    </th>
                    <th>
                        Album
                        <select onChange={e => setCurrentFilter({ type: 'album', value: e.target.value })} value={currentFilter.type === 'album' ? currentFilter.value : ''}>
                            <option value="">All Albums</option>
                            {uniqueAlbums.map(album => <option key={album} value={album}>{album}</option>)}
                        </select>
                    </th>
                    <th>
                        Producer
                        <select onChange={e => setCurrentFilter({ type: 'producer', value: e.target.value })} value={currentFilter.type === 'producer' ? currentFilter.value : ''}>
                            <option value="">All Producers</option>
                            {uniqueProducers.map(producer => <option key={producer} value={producer}>{producer}</option>)}
                        </select>
                    </th>
                    <th onClick={() => handleSort('release_date')}>
                        Release Date
                        {sortField === 'release_date' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                    </th>
                    <th>
                        Feature
                        <select onChange={e => setCurrentFilter({ type: 'feature', value: e.target.value })} value={currentFilter.type === 'feature' ? currentFilter.value : ''}>
                            <option value="">All Features</option>
                            {uniqueFeatures.map(feature => <option key={feature} value={feature}>{feature}</option>)}
                        </select>
                    </th>
                    <th>Art</th>
                </tr>
            </thead>
            <tbody>
                {sortedAndFilteredSongs.map(song => (
                    <tr key={song.id}>
                        <td>{song.artist}</td>
                        <td><a href={song.url} target="_blank" rel="noopener noreferrer">{song.title}</a></td>
                        <td>{song.album || 'N/A'}</td>
                        <td>{song.producer || 'N/A'}</td>
                        <td>{song.release_date ? new Date(song.release_date).toLocaleDateString() : 'Unknown'}</td>
                        <td>{song.feature || 'N/A'}</td>
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
