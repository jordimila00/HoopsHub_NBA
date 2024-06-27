import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TeamDetail.css'; // Importa el archivo CSS

function TeamDetail() {
  const { team_id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/team/getById/${team_id}`)
      .then(response => response.json())
      .then(data => setTeam(data))
      .catch(error => console.error('Error fetching team:', error));
  }, [team_id]);

  if (!team) {
    return <div>Loading...</div>;
  }

  // Función para construir la URL de la imagen basada en el nombre del equipo
  const getTeamImage = (teamName) => {
    // URL base de las imágenes de los equipos
    const baseUrl = 'https://www.hispanosnba.com/imagenes/estadios/pistas/';
    // Reemplazar espacios con guiones y convertir a minúsculas para el formato de la URL
    const imageName = teamName.replace(/\s+/g, '-').toLowerCase();
    return `${baseUrl}${imageName}-court.png`;
  };

  return (
    <div className="team-detail">
      <h2>{team.city} {team.name}</h2>
      {/* Aquí podrías añadir más detalles del equipo si lo necesitas */}
      {/* Mostrar imagen dinámica basada en el nombre del equipo */}
      <img src={getTeamImage(team.name)} alt={`${team.city} ${team.name} Court`} />
    </div>
  );
}

export default TeamDetail;
