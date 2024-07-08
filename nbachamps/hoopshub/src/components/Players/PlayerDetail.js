import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PlayerDetail.css';

function PlayerDetail() {
  const { player_id } = useParams();
  const [player, setPlayer] = useState(null);
  const [playerImage, setPlayerImage] = useState('');
  const [flagUrl, setFlagUrl] = useState('');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/player/getById/${player_id}`)
      .then(response => response.json())
      .then(data => {
        setPlayer(data);
        setPlayerImage(getPlayerImageLink(data.name, data.jerseyName));
        setFlagUrl(`https://flagsapi.com/${data.birthCountry}/flat/64.png`);
      })
      .catch(error => console.error('Error fetching player:', error));

    fetch(`http://localhost:8080/teamchampionshipplayer/getByPlayer/${player_id}`)
      .then(response => response.json())
      .then(data => setMatches(data))
      .catch(error => console.error('Error fetching matches:', error));
  }, [player_id]);

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const getPlayerImageLink = (name, jerseyName) => {
    const formattedName = removeAccents(name.substring(0, 2)).toLowerCase();
    const formattedJerseyName = removeAccents(jerseyName.substring(0, 5)).toLowerCase();
    return `https://www.basketball-reference.com/req/202106291/images/headshots/${formattedJerseyName}${formattedName}01.jpg`;
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-2 flex'>
      <div className="p-6 w-[48rem] mt-4 cursor-pointer rounded-3xl bg-gray-100 transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl">
        <div className="mt-32 -mb-20 -translate-y-1/2 transform profile-image">
          <img src={playerImage} alt={player.name} title={player.name} className="mx-auto h-56" />
        </div>
        <div className="text-center">
          <h3 className="text-center text-3xl font-bold">{player.name} {player.jerseyName}</h3>
          <span className="text-sm">{player.birthDate}</span><br/>
          <span className="text-sm">{player.birthCity}, {player.birthState}</span>
        </div>
        <ul className="mt-4 mb-4 flex justify-center text-center text-l">
          <li className="flex flex-col"><span className="font-bold">DRAFT</span> {player.draftYear !== 0 ? `${player.draftYear} Pick ${player.draftPick}` : "Undrafted"}</li>
        </ul>
        <ul className="mb-4 flex justify-center text-center text-m">
          <li className="flex flex-col"><span className="font-bold">HEIGHT</span> {player.height} m</li>
          <li className="mx-4 flex flex-col"><span className="font-bold">WEIGHT</span> {player.weight} kg</li>
        </ul>
        <ul className="flex justify-center text-center text-xl">
          <li className="flex flex-col"><img src={flagUrl} alt="Country flag"/></li>
        </ul>
      </div>

      <div className="ml-32 mt-32 w-full">
        <h4 className="text-xl font-bold mb-4 text-gray-800">AVERAGE FINALS</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Year</th>
                <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Team</th>
                <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">No</th>
                <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">GP</th>
                <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">MPG</th>
                <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">PPG</th>
                <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">RPG</th>
                <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">APG</th>
                <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">SPG</th>
                <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">BPG</th>
                <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">FG%</th>
                <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">3P%</th>
              </tr>
            </thead>
            <tbody>
              {matches.map(match => (
                <tr key={match.team_id} className="border-b border-gray-200">
                  <td className="px-4 py-2 whitespace-nowrap">
                    {player.draftYear !== 0 ? (
                      <Link to={`/championship/${match.id.year}`} className="text-blue-500 hover:underline">
                        {match.id.year}
                      </Link>
                    ) : (
                      "Undrafted"
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <Link to={`/team/${match.id.team_id}`} className="text-blue-500 hover:underline">
                      {match.teams.code}
                    </Link>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{match.jerseyNumber}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{match.gamesPlayed}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{match.minutesPerGame}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{match.pointsPerGame}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{match.reboundsPerGame}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{match.assistsPerGame}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{match.stealsPerGame}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{match.blocksPerGame}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{match.percentageFieldGoals}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{match.percentageThreePoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PlayerDetail;
