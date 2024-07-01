import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TeamsList from './components/Teams/TeamsList';
import PlayersList from './components/Players/PlayersList';
import './App.css';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import NBAFinals from './assets/images/The_NBA_Finals_logo.png';
import PlayerDetail from './components/Players/PlayerDetail';
import TeamDetail from './components/Teams/TeamDetail';
import DraftList from './components/Drafts/DraftList';

function Home() {
  
  const [latestChampionshipData, setLatestChampionshipData] = useState(null);
  const [latestYear, setLatestYear] = useState(null);
  const [draftPlayers, setDraftPlayers] = useState([]);
  const [mostChampionshipTeams, setMostChampionshipTeams] = useState([]);
  const [teamDetails, setTeamDetails] = useState(null);

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

            // Encontrar el equipo con más victorias
            let maxWins = -1;
            let teamWithMostWins = null;

            teamWinsResults.forEach(team => {
              if (team.wins > maxWins) {
                maxWins = team.wins;
                teamWithMostWins = team;
              }
            });

            setMostChampionshipTeams(teamWithMostWins);

            // Obtener detalles del equipo con más victorias
            if (teamWithMostWins) {
              fetch(`http://localhost:8080/team/getById/${teamWithMostWins.team_id}`)
                .then(response => response.json())
                .then(teamDetails => {
                  setTeamDetails(teamDetails);
                })
                .catch(error => {
                  console.error(`Error fetching team details for team_id ${teamWithMostWins.team_id}:`, error);
                });
            }
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

if (!latestChampionshipData || !teamDetails) {
  return <div>Loading...</div>;
}

  console.log(mostChampionshipTeams);

  const finalsWinner = latestChampionshipData.find(team => team.isChampion);
  const finalsLoser = latestChampionshipData.find(team => !team.isChampion);

  const getImageUrl = (city, name) => {
    const formattedCity = city.replace(/\s+/g, '_'); // Reemplaza espacios con _
    const formattedName = name.replace(/\s+/g, '_'); // Reemplaza espacios con _
    return `https://www.fanatics.es/content/ws/106003/NBA_${formattedCity}_${formattedName}_Global_Logo_200x200.svg`;
  };

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
              <tr>
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
              <tr>
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
              <th colSpan="6">CLUTCH PLAYERS</th>
            </tr>
            <tr>
              <th>Player</th>
              <th>No</th>
              <th>AVG Pts</th>
              <th>AVG Reb</th>
              <th>AVG Ast</th>
              <th>AVG Min</th>
            </tr>
            <tr>
              <td>Luka Doncic</td>
              <td>77</td>
              <td>25</td>
              <td>8</td>
              <td>8</td>
              <td>30</td>
            </tr>
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
            {mostChampionshipTeams && (
              <tr>
              <td className="team-cell">
                <img
                  src={getImageUrl(teamDetails.city, teamDetails.name)}
                  alt={`${teamDetails.city} ${teamDetails.name} Logo`}
                  className="team-logo"
                />
                <span className="team-name">
                <td>
                      <Link to={`/team/${teamDetails.team_id}`}>
                        {teamDetails.city} {teamDetails.name}
                      </Link>
                    </td>
                </span>
              </td>
              <td>{mostChampionshipTeams.wins}</td>
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
            <Route path="/drafts" element={<DraftList />} />
            <Route path="/player/:player_id" element={<PlayerDetail />} />
            <Route path="/team/:team_id" element={<TeamDetail />} />
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
