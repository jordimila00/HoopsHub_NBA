import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TeamDetail.css'; // Importa el archivo CSS
import NBATrophy from '../../assets/images/The_NBA_Trophy.png'; // Importa la imagen

function TeamDetail() {
  const { team_id } = useParams();
  const [team, setTeam] = useState(null);
  const [finalsAppearances, setFinalsAppearances] = useState(null);
  const [finalsWins, setFinalsWins] = useState(null);
  const [finalsYears, setFinalsYears] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/team/getById/${team_id}`)
      .then(response => response.json())
      .then(data => setTeam(data))
      .catch(error => console.error('Error fetching team:', error));
  }, [team_id]);

  useEffect(() => {
    fetch(`http://localhost:8080/teamchampionship/count/${team_id}`)
      .then(response => response.json())
      .then(data => setFinalsAppearances(data))
      .catch(error => console.error('Error fetching finals:', error));
  }, [team_id]);

  useEffect(() => {
    fetch(`http://localhost:8080/teamchampionship/wins/count/${team_id}`)
      .then(response => response.json())
      .then(data => setFinalsWins(data))
      .catch(error => console.error('Error fetching finals:', error));
  }, [team_id]);

  useEffect(() => {
    fetch(`http://localhost:8080/teamchampionship/wins/years/${team_id}`)
      .then(response => response.json())
      .then(data => setFinalsYears(data))
      .catch(error => console.error('Error fetching finals:', error));
  }, [team_id]);

  if (!team) {
    return <div>Loading...</div>;
  }

  const getImageUrl = (city, name) => {
    const formattedCity = city.replace(/\s+/g, '_'); // Reemplaza espacios con _
    const formattedName = name.replace(/\s+/g, '_'); // Reemplaza espacios con _
    return `https://www.fanatics.es/content/ws/106003/NBA_${formattedCity}_${formattedName}_Global_Logo_200x200.svg`;
  };

  const getTeamImage = (teamName) => {
    const baseUrl = 'https://www.hispanosnba.com/imagenes/estadios/pistas/';
    const imageName = teamName.replace(/\s+/g, '-').toLowerCase();
    return `${baseUrl}${imageName}-court.png`;
  };

  return (
    <div className="team-detail">
      <div className="left-panel">
        <div className="team-name">
          <img
            src={getImageUrl(team.city, team.name)}
            alt={`${team.city} ${team.name} Logo`}
            className="team-logo"
          />
          <h1>{team.city} {team.name}</h1>
        </div>
        <div className="team-info-location">
          <p>{team.division} Division</p>
          <p>{team.conference} Conference</p>
          <p>Founded in {team.establishmentYear}</p>
          {finalsAppearances > 0 && (
            <div className="championships">
              <p>Finals Appearances: {finalsAppearances}</p>
            </div>
          )}
          <div className="visit-link">
            <p>&nbsp;</p> {/* Espacio amplio */}
            <p>Visit {team.name}:</p>
            <p><a href={`https://www.nba.com/${team.name}`} target="_blank" rel="noopener noreferrer">www.nba.com/{team.name}</a></p>
          </div>
        </div>
      </div>
      <div className="center-panel">
        {finalsAppearances > 0 && (
          <div className="championships-info">
            {finalsWins > 0 && (
              <>
                <h3>NBA Champions</h3>
                <img src={NBATrophy} alt="NBA Trophy"/>
                <p>x{finalsWins}</p>
                <p>{finalsYears.length > 0 ? finalsYears.join(', ') : 'No data available'}</p>
              </>
            )}
          </div>
        )}
      </div>
      <div className="team-arena">
        <br/>
        <br/>
        <img src={getTeamImage(team.name)} alt={`${team.city} ${team.name} Court`} />
        <div className="arena-info">
          <div className="arena-name">
            <p>{team.arena}</p>
          </div>
          <p>{team.seats} Locations</p>
          <p>Constructed in {team.arenaYear}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamDetail;
