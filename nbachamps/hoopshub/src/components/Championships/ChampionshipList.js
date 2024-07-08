import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ChampionshipList = () => {
  const [years, setYears] = useState([]);
  const [teamChampionships, setTeamChampionships] = useState({});

  useEffect(() => {
    const fetchChampionships = async () => {
      try {
        const response = await fetch('http://localhost:8080/championship/getAll');
        if (!response.ok) {
          throw new Error('Error fetching championship years');
        }
        const data = await response.json();
        
        // Ordenar los años en orden descendente
        const sortedYears = data.sort((a, b) => b.year - a.year);
        setYears(sortedYears);

        const championshipsPromises = sortedYears.map(championship => {
          return fetch(`http://localhost:8080/teamchampionship/year/${championship.year}`)
            .then(response => response.json())
            .then(details => {
              const champion = details.reduce((prev, current) => {
                return current.games > prev.games ? current : prev;
              });

              let championWestId, championWest, championEastId, championEast, result;
              if (champion.teams.conference === 'Western') {
                championWestId = champion.teams.team_id;
                championWest = champion.teams.city + " " + champion.teams.name;
                championEastId = details.find(team => team.teams.conference === 'Eastern').teams.team_id;
                championEast = details.find(team => team.teams.conference === 'Eastern').teams.city + " " + details.find(team => team.teams.conference === 'Eastern').teams.name;
                result = `${champion.games}-${details.find(team => team !== champion).games}`;
              } else {
                championWestId = details.find(team => team.teams.conference === 'Western').teams.team_id;
                championWest = details.find(team => team.teams.conference === 'Western').teams.city + " " + details.find(team => team.teams.conference === 'Western').teams.name;
                championEastId = champion.teams.team_id;
                championEast = champion.teams.city + " " + champion.teams.name;
                result = `${details.find(team => team !== champion).games}-${champion.games}`;
              }
              return {
                year: championship.year,
                championWestId,
                championWest,
                championEastId,
                championEast,
                result,
              };
            })
            .catch(error => {
              console.error(`Error fetching team championships for ${championship.year}:`, error);
              return {
                year: championship.year,
              };
            });
        });

        Promise.all(championshipsPromises)
          .then(results => {
            const championshipsData = results.reduce((acc, result) => {
              acc[result.year] = {
                championWestId: result.championWestId,
                championWest: result.championWest,
                championEastId: result.championEastId,
                championEast: result.championEast,
                result: result.result,
              };
              return acc;
            }, {});
            setTeamChampionships(championshipsData);
          });
      } catch (error) {
        console.error('Error fetching championship years:', error);
      }
    };

    fetchChampionships();
  }, []);

  // Función para determinar las clases de estilo en función del resultado de los juegos
  const determineCellStyle = (year, teamId, result) => {
    if (!result) {
      return ''; // Si result es undefined, no se puede determinar el estilo
    }

    const [westGames, eastGames] = result.split('-').map(Number);

    if (teamId === teamChampionships[year]?.championWestId) {
      if (westGames > eastGames) {
        return 'bg-green-200'; // Fondo verde para el ganador del Oeste (columna 2)
      }
    } else if (teamId === teamChampionships[year]?.championEastId) {
      if (eastGames > westGames) {
        return 'bg-green-200'; // Fondo verde para el ganador del Este (columna 4)
      }
    }

    return 'bg-red-200'; // Sin fondo para los otros casos
  };

  return (
    <div className="w-full max-w-6xl flex flex-grow overflow-hidden px-4 py-4">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-red-500 text-white py-2 px-4 rounded-lg shadow-lg">
          NBA CHAMPIONSHIPS
        </h2>
        <div className="overflow-x-auto">
          <div className="overflow-y-auto max-h-[calc(9*4rem-6px)]">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 sticky top-0">
                  <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">YEAR</th>
                  <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">WESTERN CHAMPION</th>
                  <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">SCORE</th>
                  <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">EASTERN CHAMPION</th>
                </tr>
              </thead>
              <tbody>
                {years.map((championship) => (
                  <tr key={championship.year} className="border-b border-gray-200">
                    <td className="px-4 py-2">
                      <Link to={`/championship/${championship.year}`} className="text-blue-500 hover:text-blue-700">
                        {championship.year}
                      </Link>
                    </td>
                    <td className={`px-4 py-2 ${determineCellStyle(championship.year, teamChampionships[championship.year]?.championWestId, teamChampionships[championship.year]?.result)}`}>
                      <Link to={`/team/${teamChampionships[championship.year]?.championWestId}`} className="text-blue-500 hover:text-blue-700">
                        {teamChampionships[championship.year]?.championWest}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-center">{teamChampionships[championship.year]?.result}</td>
                    <td className={`px-4 py-2 ${determineCellStyle(championship.year, teamChampionships[championship.year]?.championEastId, teamChampionships[championship.year]?.result)}`}>
                      <Link to={`/team/${teamChampionships[championship.year]?.championEastId}`} className="text-blue-500 hover:text-blue-700">
                        {teamChampionships[championship.year]?.championEast}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionshipList;
