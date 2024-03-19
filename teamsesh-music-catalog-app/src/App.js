import React from 'react';
import SongsList from './components/SongsList';
import './App.css';

console.log(SongsList); // Should log the function or class if correctly imported

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TeamSESH Database</h1>
      </header>
      <main>
        <div className="database-container">
          <SongsList />
        </div>
      </main>
    </div>
  );
};

export default App;
