import React, { useEffect, useState } from 'react';
import './TeamsList.css'; // Importa el archivo CSS
import { Link } from 'react-router-dom';

function TeamsList() {
  const [teams, setTeams] = useState([]);
  const [conferenceFilter, setConferenceFilter] = useState('All'); // Estado para el filtro de conferencia

  useEffect(() => {
    fetch('http://localhost:8080/team/getAll')
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  const getImageUrl = (city, name) => {
    const formattedCity = city.replace(/\s+/g, '_'); // Reemplaza espacios con _
    const formattedName = name.replace(/\s+/g, '_'); // Reemplaza espacios con _
    return `https://www.fanatics.es/content/ws/106003/NBA_${formattedCity}_${formattedName}_Global_Logo_200x200.svg`;
  };

  const handleConferenceChange = (e) => {
    setConferenceFilter(e.target.value);
  };

  // Filtrar equipos según la conferencia seleccionada
  const filteredTeams = conferenceFilter === 'All' ? teams : teams.filter(team => team.conference === conferenceFilter);

  return (
    <div className="team_table">
      <h2>All NBA Teams</h2>

      {/* Menú desplegable para filtrar por conferencia */}
      <label htmlFor="conferenceFilter">Filter by Conference: </label>
      <select id="conferenceFilter" value={conferenceFilter} onChange={handleConferenceChange}>
        <option value="All">All Teams</option>
        <option value="Eastern">Eastern Conference</option>
        <option value="Western">Western Conference</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeams.map(team => (
            <tr key={team.team_id}>
              <td>
                <img
                  src={getImageUrl(team.city, team.name)}
                  alt={`${team.city} ${team.name} Logo`}
                  className="team-logo"
                />
              </td>
              <td>
              <Link to={`/team/${team.team_id}`}>
                  {team.city} {team.name}
              </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamsList;
