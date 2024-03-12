// components/SongsList.js

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './SongsList.css';

const SongsList = () => {
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [sortField, setSortField] = useState('title'); // Default sort field
    const [sortOrder, setSortOrder] = useState('asc'); // Sort order: 'asc' or 'desc'

    const [currentFilter, setCurrentFilter] = useState({ type: '', value: '' });
    const uniqueArtists = useMemo(() => {
        const artists = [...new Set(songs.map(song => song.artist))];
        return artists.sort();
    }, [songs]);

    const uniqueAlbums = useMemo(() => {
        const albums = [...new Set(songs.map(song => song.album))];
        return albums.sort();
    }, [songs]);

    const uniqueProducers = useMemo(() => {
        const producers = [...new Set(songs.map(song => song.producer))];
        return producers.sort();
    }, [songs]);
    const uniqueFeatures = useMemo(() => {
        const features = [...new Set(songs.map(song => song.feature))];
        return features.sort();
    }, [songs]);


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
    /*
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
    
        const filteredSongs = useMemo(() => {
            if (!currentFilter.type) return songs; // No filter applied
    
            return songs.filter(song => {
                return currentFilter.value === '' || song[currentFilter.type] === currentFilter.value;
            });
        }, [songs, currentFilter]);
    */
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
            if (a[sortField] < b[sortField]) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (a[sortField] > b[sortField]) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return filtered;
    }, [songs, currentFilter, sortField, sortOrder]); // Dependencies include all states affecting the output


    if (isLoading) return <div>Loading...</div>;
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
                    <th onClick={() => handleSort('title')}>
                        Title
                        {sortField === 'title' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
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
                    {/* <th>Sample</th> */}
                    <th>Art</th>
                </tr>
            </thead>
            <tbody>
                {sortedAndFilteredSongs.map(song => (
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
