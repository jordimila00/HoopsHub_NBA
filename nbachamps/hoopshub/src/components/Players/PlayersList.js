import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PlayersList.css'; // Importa el archivo CSS

function PlayersList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/player/getAll')
      .then(response => response.json())
      .then(data => setPlayers(data))
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  return (
    <div className="team_table">
      <h2>All NBA Players</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Birth Place</th>
            <th>Draft Year</th>
            <th>Draft Pick</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.player_id}>
              <td>
                <Link to={`/player/${player.player_id}`}>
                  {player.name} {player.jerseyName}
                </Link>
              </td>
              <td>{player.birthDate}</td>
              <td>{player.birthCity}, {player.birthState}, {player.birthCountry}</td>
              <td>{player.draftYear}</td>
              <td>{player.draftPick}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayersList;
