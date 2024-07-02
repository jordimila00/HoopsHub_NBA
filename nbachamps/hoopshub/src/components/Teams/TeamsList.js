import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NBAMap from '../../assets/images/NBA_Map.png';
import NBAEastern from '../../assets/images/NBA_Eastern.png';
import NBAWestern from '../../assets/images/NBA_Western.png';

function TeamsList() {
  const [teams, setTeams] = useState([]);
  const [conferenceFilter, setConferenceFilter] = useState('All'); // Estado para el filtro de conferencia
  const [divisions, setDivisions] = useState([]); // Estado para almacenar las divisiones y equipos
  const [showMapAndLogos, setShowMapAndLogos] = useState(true); // Estado para mostrar mapa y logos

  useEffect(() => {
    fetch('http://localhost:8080/team/getAll')
      .then(response => response.json())
      .then(data => {
        setTeams(data);
        groupTeamsByDivision(data);
      })
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  const getImageUrl = (city, name) => {
    const formattedCity = city.replace(/\s+/g, '_'); // Reemplaza espacios con _
    const formattedName = name.replace(/\s+/g, '_'); // Reemplaza espacios con _
    return `https://www.fanatics.es/content/ws/106003/NBA_${formattedCity}_${formattedName}_Global_Logo_200x200.svg`;
  };

  const handleConferenceChange = (conference) => {
    setConferenceFilter(conference);
    if (conference === 'Eastern') {
      groupTeamsByDivision(teams.filter(team => team.conference === 'Eastern'));
    } else if (conference === 'Western') {
      groupTeamsByDivision(teams.filter(team => team.conference === 'Western'));
    } else {
      groupTeamsByDivision(teams);
    }
    setShowMapAndLogos(false); // Ocultar mapa y logos al cambiar a una conferencia
  };

  const handleShowMapAndLogos = () => {
    setConferenceFilter('All'); // Reiniciar filtro de conferencia
    setShowMapAndLogos(true); // Mostrar mapa y logos
  };

  const groupTeamsByDivision = (teamsData) => {
    const groupedDivisions = {};

    teamsData.forEach(team => {
      if (!groupedDivisions[team.division]) {
        groupedDivisions[team.division] = [];
      }
      groupedDivisions[team.division].push(team);
    });

    setDivisions(groupedDivisions);
  };

  // Filtrar equipos según la conferencia seleccionada
  const filteredTeams = conferenceFilter === 'All' ? teams : teams.filter(team => team.conference === conferenceFilter);

  return (
    <div className="px-4 bg-white h-full">
      <div className="flex flex-col items-center justify-center">
        <div className="mt-4 mb-8">
          {!showMapAndLogos && (
            <button
              onClick={handleShowMapAndLogos}
              className="bg-orange-500 hover:bg-orange-700 text-black font-bold py-2 px-4 rounded-lg mb-4"
            >
              Go Back to Map
            </button>
          )}
        </div>

        {showMapAndLogos && (
          <div className="flex items-center justify-center w-full mb-8">
            <img
              src={NBAWestern}
              alt={`NBAWestern`}
              className="w-1/12 max-w-xs md:w-1/10 lg:w-1/12 mr-8 cursor-pointer"
              onClick={() => handleConferenceChange('Western')}
            />
            <div className="w-1/6 md:w-1/4"></div> {/* Separación entre logo izquierdo y mapa */}
            <img
              src={NBAMap}
              alt={`NBA Map`}
              className="w-1/2 md:w-3/5 lg:w-1/2 max-w-screen-lg mb-4" // Ajuste de tamaño del mapa
            />
            <div className="w-1/6 md:w-1/4"></div> {/* Separación entre mapa y logo derecho */}
            <img
              src={NBAEastern}
              alt={`NBAEastern`}
              className="w-1/12 max-w-xs md:w-1/10 lg:w-1/12 ml-8 cursor-pointer"
              onClick={() => handleConferenceChange('Eastern')}
            />
          </div>
        )}




        {conferenceFilter === 'Eastern' && (
          <div className="flex flex-wrap justify-between w-full mt-4">
            {Object.keys(divisions).map(division => (
              <div key={division} className="w-full lg:w-1/3 p-4"> {/* Ajustado el ancho del contenedor */}
                <h3 className="text-2xl font-semibold mb-4">{division.toUpperCase()} DIVISION</h3> {/* Ajustado el tamaño del texto */}
                <table className="w-full bg-white rounded-lg shadow-md table-fixed">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b-2 border-gray-200 bg-blue-500 text-lg">Logo</th> {/* Ajustado el tamaño del texto */}
                      <th className="px-4 py-2 border-b-2 border-gray-200 bg-blue-500 text-lg">Team</th> {/* Ajustado el tamaño del texto */}
                    </tr>
                  </thead>
                  <tbody>
                    {divisions[division].map(team => (
                      <tr key={team.team_id} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border-b border-gray-200 text-center">
                          <img
                            src={getImageUrl(team.city, team.name)}
                            alt={`${team.city} ${team.name} Logo`}
                            className="mx-auto w-16 h-16"
                          />
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200 text-center">
                          <Link 
                            to={`/team/${team.team_id}`} 
                            className="text-blue-500 hover:underline text-lg whitespace-nowrap overflow-hidden overflow-ellipsis" /* Ajustado el tamaño del texto */
                          >
                            {team.city} {team.name}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        {conferenceFilter === 'Western' && (
          <div className="flex flex-wrap justify-between w-full mt-4">
            {Object.keys(divisions).map(division => (
              <div key={division} className="w-full lg:w-1/3 p-4"> {/* Ajustado el ancho del contenedor */}
                <h5 className="text-xl font-semibold mb-4">{division.toUpperCase()} DIVISION</h5> {/* Ajustado el tamaño del texto */}
                <table className="w-full bg-white rounded-lg shadow-md table-fixed">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b-2 border-gray-200 bg-red-500 text-lg">Logo</th> {/* Ajustado el tamaño del texto */}
                      <th className="px-4 py-2 border-b-2 border-gray-200 bg-red-500 text-lg">Team</th> {/* Ajustado el tamaño del texto */}
                    </tr>
                  </thead>
                  <tbody>
                    {divisions[division].map(team => (
                      <tr key={team.team_id} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border-b border-gray-200 text-center">
                          <img
                            src={getImageUrl(team.city, team.name)}
                            alt={`${team.city} ${team.name} Logo`}
                            className="mx-auto w-16 h-16"
                          />
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200 text-center">
                          <Link 
                            to={`/team/${team.team_id}`} 
                            className="text-blue-500 hover:underline text-lg whitespace-nowrap overflow-hidden overflow-ellipsis" /* Ajustado el tamaño del texto */
                          >
                            {team.city} {team.name}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default TeamsList;
