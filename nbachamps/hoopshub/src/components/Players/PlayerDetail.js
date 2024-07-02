import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PlayerDetail.css';


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
    <div className='mt-2'>
      <div className="p-6 w-80 cursor-pointer rounded-3xl bg-green-100 transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl">
        <div className=" mt-32 -mb-20 -translate-y-1/2 transform profile-image">
          <img src={playerImage} alt={player.name} title={player.name} className="mx-auto h-56" />
        </div>
        <div className="text-center">
          <h3 className="text-center text-3xl font-bold">{player.name} {player.jerseyName}</h3>
          <span className="text-sm">{player.birthDate}</span><br/>
          <span className="text-sm">{player.birthCity}, {player.birthState}</span>
        </div>
        <ul className="mt-4 mb-4 flex justify-center text-center text-l">
          <li className="flex flex-col"><span className="font-bold">DRAFT</span>{player.draftYear} Pick {player.draftPick}</li>
        </ul>
        <ul className="mb-4 flex justify-center text-center text-m">
          <li className="flex flex-col"><span className="font-bold">HEIGHT</span> {player.height} m</li>
          <li className="mx-4 flex flex-col"><span className="font-bold">WEIGHT</span> {player.weight} kg</li>
        </ul>
        <ul className="flex justify-center text-center text-xl">
          <li className="flex flex-col"><img src={flagUrl}/></li>
        </ul>
      </div>
    </div>
  );
}
export default PlayerDetail;