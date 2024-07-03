import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/player/getAll')
      .then(response => response.json())
      .then(data => setPlayers(data))
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="w-full max-w-6xl flex flex-col flex-grow overflow-hidden px-4 py-4">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-red-500 text-white py-2 px-4 rounded-lg shadow-lg">
          ALL NBA PLAYERS
        </h2>
        <div className="mb-4 w-full">
          <input
            type="text"
            placeholder="Search Player by Name . . ."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
          />
        </div>
        <div className="flex-grow overflow-hidden">
          {filteredPlayers.length === 0 ? (
            <p className="text-red-500 text-center">No players matching with your search.</p>
          ) : (
            <div className="overflow-y-auto h-[calc(8*4rem)] w-full">
              <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-gray-400">
                <tr>
                  <th className="sticky top-0 bg-gray-400 px-6 py-3 text-left text-s font-medium text-black uppercase tracking-wider text-center">Name</th>
                  <th className="sticky top-0 bg-gray-400 px-6 py-3 text-left text-s font-medium text-black uppercase tracking-wider text-center">Birth Date</th>
                  <th className="sticky top-0 bg-gray-400 px-6 py-3 text-left text-s font-medium text-black uppercase tracking-wider text-center">Birth Place</th>
                  <th className="sticky top-0 bg-gray-400 px-6 py-3 text-left text-s font-medium text-black uppercase tracking-wider text-center">Draft Year</th>
                  <th className="sticky top-0 bg-gray-400 px-6 py-3 text-left text-s font-medium text-black uppercase tracking-wider text-center">Draft Pick</th>
                </tr>
              </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPlayers.map(player => (
                    <tr key={player.player_id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/player/${player.player_id}`} className="text-blue-500 hover:text-blue-700">
                          {player.name} {player.jerseyName}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{player.birthDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{player.birthCity}, {player.birthState}, {player.birthCountry}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/championship/${player.draftYear}`} className="text-blue-500 hover:text-blue-700">
                          {player.draftYear}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{player.draftPick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
  );
}

export default PlayersList;
