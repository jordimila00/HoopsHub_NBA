import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PlayerDetail.css'; // Importa el archivo CSS

function PlayerDetail() {
  const { player_id } = useParams();
  const [player, setPlayer] = useState(null);
  const [playerImage, setPlayerImage] = useState('');
  const [flagUrl, setFlagUrl] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/player/getById/${player_id}`)
      .then(response => response.json())
      .then(data => {
        setPlayer(data);
        setPlayerImage(getPlayerImageLink(data.name, data.jerseyName));
        setFlagUrl(`https://flagsapi.com/${data.birthCountry}/flat/64.png`);
      })
      .catch(error => console.error('Error fetching player:', error));
  }, [player_id]);

  // Función para eliminar acentos y caracteres especiales
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const getPlayerImageLink = (name, jerseyName) => {
    // Formatear el nombre y el jerseyName según las reglas
    const formattedName = removeAccents(name.substring(0, 2)).toLowerCase(); // Tomar las primeras dos letras del nombre sin acentos
    const formattedJerseyName = removeAccents(jerseyName.substring(0, 5)).toLowerCase(); // Tomar las primeras cinco letras del jerseyName sin acentos

    // Construir el enlace de la imagen
    return `https://www.basketball-reference.com/req/202106291/images/headshots/${formattedJerseyName}${formattedName}01.jpg`;
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div className="player-detail">
      <h2>{player.name} {player.jerseyName}</h2>
      <img src={playerImage} alt={`Headshot of ${player.name}`} />
      <p>Born in {player.birthDate}</p>
      <p>{player.birthCity}, {player.birthState}</p><img src={flagUrl} alt={`Flag of ${player.birthCountry}`} />
      <p>Class of {player.draftYear}, Pick {player.draftPick}.</p>
    </div>
  );
}

export default PlayerDetail;
