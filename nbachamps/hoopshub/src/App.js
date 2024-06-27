import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeamsList from './components/Teams/TeamsList';
import PlayersList from './components/Players/PlayersList';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import NBAFinals from './assets/images/The_NBA_Finals_logo.png'; // Importa la imagen
import PlayerDetail from './components/Players/PlayerDetail';
import TeamDetail from './components/Teams/TeamDetail';
import DraftList from './components/Drafts/DraftList';

function Home() {
  return (
    <div>
      <h2>Welcome to My Application</h2>
      <nav className="navigation">
        <button><Link to="/teams">Teams</Link></button>
        <button><Link to="/players">Players</Link></button>
        <button><Link to="/championships">Championships</Link></button>
        <button><Link to="/drafts">Drafts</Link></button>
        {/* Puedes agregar más botones de navegación aquí */}
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <img src={NBAFinals} alt="NBA Finals" className="header-image" />
          </Link>
          {/* Añade la imagen en el header */}
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<TeamsList />} />
            <Route path="/players" element={<PlayersList />} />
            <Route path="/drafts" element={<DraftList />} />
            <Route path="/player/:player_id" element={<PlayerDetail/>}/>
            <Route path="/team/:team_id" element={<TeamDetail/>}/>
            {/* Puedes agregar más rutas aquí */}
          </Routes>
        </main>

        <footer className="App-footer">
          <p>&copy;Copyright 2024 | Made by Jordi Milà</p>
          <div className="social-icons">
            <a href="https://github.com/jordimila00" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="https://www.linkedin.com/in/jmilamartos" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
