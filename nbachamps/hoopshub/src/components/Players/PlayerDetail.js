import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    <div class="mt-6">
      <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img src={playerImage} alt={`Headshot of ${player.name}`} className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"/>
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{player.name} {player.jerseyName}</h2>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Born in {player.birthDate}</p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{player.birthCity}, {player.birthState}</p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{player.height}, {player.weight}</p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><p>Class of {player.draftYear}, Pick {player.draftPick}.</p></p>
          <img src={flagUrl} alt={`Flag of ${player.birthCountry}`} className="blur-sm"/>
        </div>
      </div>
    </div>
  );
}
export default PlayerDetail;