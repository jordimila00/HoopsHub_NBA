import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeamsList from './components/Teams/TeamsList';
import PlayersList from './components/Players/PlayersList';
import './App.css';
import './index.css';
import NBAFinals from './assets/images/The_NBA_Finals_logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';


import PlayerDetail from './components/Players/PlayerDetail';
import TeamDetail from './components/Teams/TeamDetail';
import DraftList from './components/Drafts/DraftList';
import ChampionshipList from './components/Championships/ChampionshipList';
import ErrorDetail from './components/Error/ErrorDetail';
import ChampionshipDetail from './components/Championships/ChampionshipDetail';



function Home() {
  
  const [latestChampionshipData, setLatestChampionshipData] = useState(null);
  const [latestYear, setLatestYear] = useState(null);
  const [draftPlayers, setDraftPlayers] = useState([]);
  const [mostChampionshipTeams, setMostChampionshipTeams] = useState([]);
  const [teamDetails, setTeamDetails] = useState(null);
  const [clutchPlayers, setClutchPlayers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'pointsPerGame', direction: 'desc' });

useEffect(() => {
  // Obtener todos los campeonatos
  fetch('http://localhost:8080/championship/getAll')
    .then(response => response.json())
    .then(championships => {
      // Encontrar el año más reciente
      const latestYear = Math.max(...championships.map(championship => championship.year));
      setLatestYear(latestYear);

      // Obtener los datos del campeonato más reciente
      fetch(`http://localhost:8080/teamchampionship/year/${latestYear}`)
        .then(response => response.json())
        .then(data => {
          setLatestChampionshipData(data);
        })
        .catch(error => {
          console.error('Error fetching championship data:', error);
        });

      // Obtener los jugadores del draft para el último año encontrado
      fetch(`http://localhost:8080/player/getByDraftYear/${latestYear}`)
        .then(response => response.json())
        .then(players => {
          // Limitar a los primeros 10 jugadores
          const firstTenPlayers = players.slice(0, 10);
          setDraftPlayers(firstTenPlayers);
        })
        .catch(error => {
          console.error('Error fetching draft players:', error);
        });

        
    fetch(`http://localhost:8080/teamchampionshipplayer/getByYear/${latestYear}`)
        .then(response => response.json())
        .then(data => {
            setClutchPlayers(data);
        })
        .catch(error => {
            console.error('Error fetching clutch players:', error);
        });


      // Obtener todos los equipos y contar las victorias
      fetch('http://localhost:8080/team/getAll')
        .then(response => response.json())
        .then(teams => {
          const teamIds = teams.map(team => team.team_id);

          // Realizar solicitudes para contar las victorias por cada ID de equipo
          const fetchTeamWins = async () => {
            const teamWinsPromises = teamIds.map(async id => {
              const response = await fetch(`http://localhost:8080/teamchampionship/wins/count/${id}`);
              const result = await response.json();
              return { team_id: id, wins: result };
            });

            const teamWinsResults = await Promise.all(teamWinsPromises);

            // Encontrar los equipos con más victorias
            const maxWins = Math.max(...teamWinsResults.map(team => team.wins));
            const teamsWithMostWins = teamWinsResults.filter(team => team.wins === maxWins);

            setMostChampionshipTeams(teamsWithMostWins);

            // Obtener detalles de los equipos con más victorias
            const fetchTeamDetails = async () => {
              const teamDetailsPromises = teamsWithMostWins.map(async team => {
                const response = await fetch(`http://localhost:8080/team/getById/${team.team_id}`);
                const result = await response.json();
                return result;
              });

              const teamsDetailsResults = await Promise.all(teamDetailsPromises);
              setTeamDetails(teamsDetailsResults);
            };

            fetchTeamDetails();
          };

          fetchTeamWins();
        })
        .catch(error => {
          console.error('Error fetching teams:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching championships:', error);
    });
}, []);



const handleSort = (key) => {
  let direction = 'asc';
  if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
  }
  setSortConfig({ key, direction });
};


if (!latestChampionshipData || !teamDetails) {
  return <div>Loading...</div>;
}


  const finalsWinner = latestChampionshipData.find(team => team.isChampion);
  const finalsLoser = latestChampionshipData.find(team => !team.isChampion);

  const getImageUrl = (city, name) => {
    if (city === 'Los Angeles' && name === 'Clippers') {
      return 'https://www.fanatics.es/content/ws/all/65c2d838-8d23-4e08-8d0f-fdf26abe4011.svg';
    }
    const formattedCity = city.replace(/\s+/g, '_'); // Reemplaza espacios con _
    const formattedName = name.replace(/\s+/g, '_'); // Reemplaza espacios con _
    return `https://www.fanatics.es/content/ws/106003/NBA_${formattedCity}_${formattedName}_Global_Logo_200x200.svg`;
  };
  
  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <FontAwesomeIcon icon={faSortUp} />
      ) : (
        <FontAwesomeIcon icon={faSortDown} />
      );
    }
    return null;
  };

  const filterTopPlayersByTeam = (players) => {
    // Agrupa a los jugadores por equipo
    const groupedByTeam = players.reduce((acc, player) => {
      const team = player.teams.name;
      if (!acc[team]) {
        acc[team] = [];
      }
      acc[team].push(player);
      return acc;
    }, {});
  
    // Ordena y selecciona los 3 mejores jugadores por equipo
    const filteredPlayers = Object.values(groupedByTeam).flatMap(teamPlayers => 
      teamPlayers.sort((a, b) => b.pointsPerGame - a.pointsPerGame).slice(0, 3)
    );
  
    return filteredPlayers;
  };

  const filteredClutchPlayers = filterTopPlayersByTeam(clutchPlayers);

const sortedPlayers = [...filteredClutchPlayers].sort((a, b) => {
  if (sortConfig.direction === 'asc') {
    return a[sortConfig.key] - b[sortConfig.key];
  } else {
    return b[sortConfig.key] - a[sortConfig.key];
  }
});

  

  return (
    <div className="main-content">
      <div className="left-content">
        
        <table className="latest-finals">
          <thead>
            <tr>
              <th colSpan="3">{latestYear} CHAMPIONSHIP</th>
            </tr>
          </thead>
          <tbody>
            {finalsWinner && (
              <tr className="winner-team">
                <td className="team-cell winner">
                  <img
                    src={getImageUrl(finalsWinner.teams.city, finalsWinner.teams.name)}
                    alt={`${finalsWinner.teams.city} ${finalsWinner.teams.name} Logo`}
                    className="team-logo"
                  />
                  <span className="team-name">
                    <td>
                      <Link to={`/team/${finalsWinner.teams.team_id}`}>
                        {finalsWinner.teams.city} {finalsWinner.teams.name}
                      </Link>
                    </td>
                  </span>
                </td>
                <td>{finalsWinner.games}</td>
                <td>{finalsWinner.coach}</td>
              </tr>
            )}
            {finalsLoser && (
              <tr className="loser-team">
                <td className="team-cell">
                  <img
                    src={getImageUrl(finalsLoser.teams.city, finalsLoser.teams.name)}
                    alt={`${finalsLoser.teams.city} ${finalsLoser.teams.name} Logo`}
                    className="team-logo"
                  />
                  <span className="team-name">
                  <td>
                      <Link to={`/team/${finalsLoser.teams.team_id}`}>
                        {finalsLoser.teams.city} {finalsLoser.teams.name}
                      </Link>
                    </td>
                  </span>
                </td>
                <td>{finalsLoser.games}</td>
                <td>{finalsLoser.coach}</td>
              </tr>
            )}
            <br/><br/>
            <tr>
              <th colSpan="12">{latestYear} CHAMPIONSHIP CLUTCH PLAYERS</th>
            </tr>
            <tr>
            <th>Player</th>
              <th>
                NO
              </th>
              <th>
                TM
              </th>
              <th
                className={sortConfig.key === 'gamesPlayed' ? 'sorted-column' : ''}
                onClick={() => handleSort('gamesPlayed')}
              >
                GP {renderSortIcon('gamesPlayed')}
              </th>
              <th
                className={sortConfig.key === 'minutesPerGame' ? 'sorted-column' : ''}
                onClick={() => handleSort('minutesPerGame')}
              >
                MPG {renderSortIcon('minutesPerGame')}
              </th>
              <th
                className={sortConfig.key === 'pointsPerGame' ? 'sorted-column' : ''}
                onClick={() => handleSort('pointsPerGame')}
              >
                PPG {renderSortIcon('pointsPerGame')}
              </th>
              <th
                className={sortConfig.key === 'reboundsPerGame' ? 'sorted-column' : ''}
                onClick={() => handleSort('reboundsPerGame')}
              >
                RPG {renderSortIcon('reboundsPerGame')}
              </th>
              <th
                className={sortConfig.key === 'assistsPerGame' ? 'sorted-column' : ''}
                onClick={() => handleSort('assistsPerGame')}
              >
                APG {renderSortIcon('assistsPerGame')}
              </th>
              <th
                className={sortConfig.key === 'stealsPerGame' ? 'sorted-column' : ''}
                onClick={() => handleSort('stealsPerGame')}
              >
                SPG {renderSortIcon('stealsPerGame')}
              </th>
              <th
                className={sortConfig.key === 'blocksPerGame' ? 'sorted-column' : ''}
                onClick={() => handleSort('blocksPerGame')}
              >
                BPG {renderSortIcon('blocksPerGame')}
              </th>
              <th
                className={sortConfig.key === 'percentageFieldGoals' ? 'sorted-column' : ''}
                onClick={() => handleSort('percentageFieldGoals')}
              >
                FG% {renderSortIcon('percentageFieldGoals')}
              </th>
              <th
                className={sortConfig.key === 'percentageThreePoints' ? 'sorted-column' : ''}
                onClick={() => handleSort('percentageThreePoints')}
              >
                3P% {renderSortIcon('percentageThreePoints')}
              </th>
            </tr>
            {sortedPlayers.map((player) => (
              <tr key={player.players.player_id}>
                <td className="player-cell">
                  <Link to={`/player/${player.players.player_id}`}>
                    {player.players.name} {player.players.jerseyName}
                  </Link>
                </td>
                <td>{player.jerseyNumber}</td>
                <td>{player.teams.code}</td>
                <td className={sortConfig.key === 'gamesPlayed' ? 'highlight-column' : ''}>{player.gamesPlayed}</td>
                <td className={sortConfig.key === 'minutesPerGame' ? 'highlight-column' : ''}>{player.minutesPerGame}</td>
                <td className={sortConfig.key === 'pointsPerGame' ? 'highlight-column' : ''}>{player.pointsPerGame}</td>
                <td className={sortConfig.key === 'reboundsPerGame' ? 'highlight-column' : ''}>{player.reboundsPerGame}</td>
                <td className={sortConfig.key === 'assistsPerGame' ? 'highlight-column' : ''}>{player.assistsPerGame}</td>
                <td className={sortConfig.key === 'stealsPerGame' ? 'highlight-column' : ''}>{player.stealsPerGame}</td>
                <td className={sortConfig.key === 'blocksPerGame' ? 'highlight-column' : ''}>{player.blocksPerGame}</td>
                <td className={sortConfig.key === 'percentageFieldGoals' ? 'highlight-column' : ''}>{player.percentageFieldGoals}</td>
                <td className={sortConfig.key === 'percentageThreePoints' ? 'highlight-column' : ''}>{player.percentageThreePoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="right-content">
        <div className="top-team">
          <table className="most-champs-team">
            <thead>
              <tr>
                <th colSpan="3">TEAM WITH MORE CHAMPIONSHIPS </th>
              </tr>
            </thead>
            <tbody>
            {teamDetails && teamDetails.length > 0 ? (
              teamDetails.map(team => (
                <tr key={team.team_id}>
                  <td className="team-cell">
                    <img
                      src={getImageUrl(team.city, team.name)}
                      alt={`${team.city} ${team.name} Logo`}
                      className="team-logo"
                    />
                    <span className="team-name">
                      <td>
                        <Link to={`/team/${team.team_id}`}>
                          {team.city} {team.name}
                        </Link>
                      </td>
                    </span>
                  </td>
                  <td>{mostChampionshipTeams.find(t => t.team_id === team.team_id).wins}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Loading...</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
        <br/>
        <div className="top-drafts">
          <table>
            <thead>
              <tr>
                <th colSpan="3">{latestYear} DRAFT </th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <th>Player</th>
              <th>Pick</th>
            </tr>
              {draftPlayers.length > 0 ? (
                draftPlayers.map(player => (
                  <tr key={player.player_id}>
                    <td>
                      <Link to={`/player/${player.player_id}`}>
                        {player.name} {player.jerseyName}
                      </Link>
                    </td>
                    <td>{player.draftPick}</td>
                  </tr>
                  
                ))
              ) : (
                <tr>
                  <td colSpan="2">No se encontraron jugadores del draft</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
      <header className="App-header">
            <img src={NBAFinals} alt="NBA Finals" className="header-image" />
          <nav className="navigation">
            <Link to="/"><b>Home</b></Link>
            <Link to="/teams"><b>Teams</b></Link>
            <Link to="/players"><b>Players</b></Link>
            <Link to="/championships"><b>Championships</b></Link>
            <Link to="/drafts"><b>Drafts</b></Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<TeamsList />} />
            <Route path="/players" element={<PlayersList />} />
            <Route path="/championships" element={<ChampionshipList />} />
            <Route path="/drafts" element={<DraftList />} />
            <Route path="/player/:player_id" element={<PlayerDetail />} />
            <Route path="/team/:team_id" element={<TeamDetail />} />
            <Route path="/championship/:year" element={<ChampionshipDetail />} />
            <Route path="*" element={<ErrorDetail />} />
          </Routes>
        </main>

        <footer className="bg-orange-400 p-2 text-black w-full fixed bottom-0 left-0">
          <p>&copy;Copyright 2024 | Made by Jordi Milà</p>
          <div className="flex justify-center space-x-4 mt-2">
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
