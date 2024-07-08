import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ChampionshipDetail() {
  const { year } = useParams();
  const [players, setPlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teams, setTeams] = useState([]);
  const [teamColors, setTeamColors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/teamchampionshipplayer/getByYear/${year}`);
        if (!response.ok) {
          throw new Error('Error fetching player data');
        }
        const data = await response.json();
        setPlayers(data);

        // Extract teams and set the first team as the default selected team
        const uniqueTeams = [...new Set(data.map(player => player.teams.code))];
        setTeams(uniqueTeams);
        setSelectedTeam(uniqueTeams[0]);

        // Extract team colors
        const colors = {};
        data.forEach(player => {
          colors[player.teams.code] = player.teams.color; // Assuming 'color' is the property name for the team's color
        });
        setTeamColors(colors);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchPlayerData();
  }, [year]);

  const handleTeamChange = (teamCode) => {
    setSelectedTeam(teamCode);
  };

  const getImageUrl = (city, name) => {
    if (city === 'Los Angeles' && name === 'Clippers') {
      return 'https://www.fanatics.es/content/ws/all/65c2d838-8d23-4e08-8d0f-fdf26abe4011.svg';
    }
    const formattedCity = city.replace(/\s+/g, '_');
    const formattedName = name.replace(/\s+/g, '_');
    return `https://www.fanatics.es/content/ws/106003/NBA_${formattedCity}_${formattedName}_Global_Logo_200x200.svg`;
  };

  const filteredPlayers = players.filter(player => player.teams.code === selectedTeam);

  // Mapeo de nombres de color a clases de Tailwind CSS
  const colorClasses = {
    blue: 'bg-blue-200',
    green: 'bg-green-200',
    red: 'bg-red-200',
    yellow: 'bg-yellow-200',
    purple: 'bg-purple-200',
    stone: 'bg-stone-300'
    // Agrega más colores según sea necesario
  };

  // Calcular totales y medias
  const totalStats = filteredPlayers.reduce((totals, player) => {
    totals.totalPoints += player.pointsPerGame;
    totals.totalRebounds += player.reboundsPerGame;
    totals.totalAssists += player.assistsPerGame;
    totals.totalSteals += player.stealsPerGame;
    totals.totalBlocks += player.blocksPerGame;
    totals.totalFieldGoals += player.percentageFieldGoals;
    totals.totalThreePoints += player.percentageThreePoints;
    totals.playerCount += 1;
    return totals;
  }, {
    totalPoints: 0,
    totalRebounds: 0,
    totalAssists: 0,
    totalSteals: 0,
    totalBlocks: 0,
    totalFieldGoals: 0,
    totalThreePoints: 0,
    playerCount: 0
  });

  const averageFieldGoals = (totalStats.totalFieldGoals / totalStats.playerCount).toFixed(2);
  const averageThreePoints = (totalStats.totalThreePoints / totalStats.playerCount).toFixed(2);

  return (
    <div className='mt-4 flex flex-col items-center w-full'>
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-red-500 text-white py-2 px-4 rounded-lg shadow-lg max-w-6xl w-full">
        {year} FINALS
      </h2>
      <div className="mb-4 flex space-x-4 w-full max-w-6xl">
        {teams.map(team => {
          const teamDetails = players.find(player => player.teams.code === team)?.teams;
          const teamColor = teamColors[team]; // Get team color from state
          const colorClass = teamColor ? colorClasses[teamColor.toLowerCase()] : 'bg-gray-500'; // Default to gray if no valid color

          return (
            <button
              key={team}
              onClick={() => handleTeamChange(team)}
              className={`flex-1 px-4 py-2 rounded-lg ${selectedTeam === team ? `${colorClass} text-black` : 'bg-gray-200 text-gray-700'} font-bold text-center`}
            >
              <img
                src={getImageUrl(teamDetails?.city, teamDetails?.name)}
                alt={`${teamDetails?.city} ${teamDetails?.name} Logo`}
                className="mx-auto w-16 h-16"
              />
            </button>
          );
        })}
      </div>
      <div className="overflow-x-auto w-full max-w-6xl relative">
  <div className="overflow-y-auto max-h-[25.5rem]">
    <table className="min-w-full bg-white border border-gray-200">
      <thead className="sticky top-0 bg-gray-100 z-10">
        <tr>
          <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider" style={{ width: '20%' }}>Player</th>
          <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider" style={{ width: '8%' }}>Jersey</th>
          <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider" style={{ width: '8%' }}>GAMES</th>
          <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider" style={{ width: '8%' }}>MINUTES</th>
          <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider" style={{ width: '8%' }}>Points</th>
          <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider" style={{ width: '8%' }}>Rebounds</th>
          <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider" style={{ width: '8%' }}>Assists</th>
          <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider" style={{ width: '8%' }}>Steals</th>
          <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider" style={{ width: '8%' }}>blocks</th>
          <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider" style={{ width: '8%' }}>Fg%</th>
          <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider" style={{ width: '8%' }}>3P%</th>
        </tr>
      </thead>
      <tbody>
        {filteredPlayers.map(player => (
          <tr key={player.players.player_id} className="border-b border-gray-200">
            <td className="px-4 py-2" style={{ width: '20%' }}>
              <Link to={`/player/${player.players.player_id}`} className="text-blue-500 hover:text-blue-700">
                {player.players.name} {player.players.jerseyName}
              </Link>
            </td>
            <td className="px-4 py-2 text-center" style={{ width: '8%' }}>{player.jerseyNumber}</td>
            <td className="px-4 py-2 text-center" style={{ width: '8%' }}>{player.gamesPlayed}</td>
            <td className="px-4 py-2 text-center" style={{ width: '8%' }}>{player.minutesPerGame}</td>
            <td className="px-4 py-2 text-center" style={{ width: '8%' }}>{player.pointsPerGame}</td>
            <td className="px-4 py-2 text-center" style={{ width: '8%' }}>{player.reboundsPerGame}</td>
            <td className="px-4 py-2 text-center" style={{ width: '8%' }}>{player.assistsPerGame}</td>
            <td className="px-4 py-2 text-center" style={{ width: '8%' }}>{player.stealsPerGame}</td>
            <td className="px-4 py-2 text-center" style={{ width: '8%' }}>{player.blocksPerGame}</td>
            <td className="px-4 py-2 text-center" style={{ width: '8%' }}>{player.percentageFieldGoals}%</td>
            <td className="px-4 py-2 text-center" style={{ width: '8%' }}>{player.percentageThreePoints}%</td>
          </tr>
        ))}
        {/* Fila de totales */}
        <tr className="bg-gray-300 font-bold sticky bottom-0">
          <td className="px-4 py-2 text-center uppercase">Total</td>
          <td className="px-4 py-2 text-center"></td>
          <td className="px-4 py-2 text-center"></td>
          <td className="px-4 py-2 text-center"></td>
          <td className="px-4 py-2 text-center">{totalStats.totalPoints.toFixed(1)}</td>
          <td className="px-4 py-2 text-center">{totalStats.totalRebounds.toFixed(1)}</td>
          <td className="px-4 py-2 text-center">{totalStats.totalAssists.toFixed(1)}</td>
          <td className="px-4 py-2 text-center">{totalStats.totalSteals.toFixed(1)}</td>
          <td className="px-4 py-2 text-center">{totalStats.totalBlocks.toFixed(1)}</td>
          <td className="px-4 py-2 text-center">{averageFieldGoals}%</td>
          <td className="px-4 py-2 text-center">{averageThreePoints}%</td>
        </tr>
      </tbody>
    </table>
  </div>
  <button onClick={() => navigate('/championships')} className="mt-4 text-l bg-gray-200 font-bold mb-4 py-4 px-8 rounded-lg shadow-lg w-full max-w-6xl text-center">Back to Championship List</button>
</div>

    </div>
  );
}

export default ChampionshipDetail;
