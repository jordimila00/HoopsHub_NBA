import React, { useState, useEffect, useRef } from 'react';
import NBADraft from '../../assets/images/The_NBA_Draft.png';
import { Link } from 'react-router-dom';

const DraftList = () => {
  const [years, setYears] = useState([]); // Estado para almacenar los años disponibles
  const [selectedYear, setSelectedYear] = useState(''); // Estado para el año seleccionado ('' indica ninguno seleccionado)
  const [players, setPlayers] = useState([]); // Estado para los jugadores filtrados por año
  const [showExplanation, setShowExplanation] = useState(true); // Estado para mostrar la explicación

  const selectRef = useRef(null); // Referencia al elemento select

  // Obtener la lista de años disponibles al montar el componente
  useEffect(() => {
    fetch('http://localhost:8080/championship/getAll')
      .then(response => response.json())
      .then(data => {
        const yearsArray = data.map(item => item.year).sort((a, b) => b - a); // Extraer solo los años y ordenar en orden descendente
        setYears(yearsArray);
        if (yearsArray.length > 0) {
          const mostRecentYear = yearsArray[0];
          setSelectedYear(mostRecentYear);
          fetchPlayersByYear(mostRecentYear);
        }
      })
      .catch(error => console.error('Error fetching years:', error));
  }, []);

  const fetchPlayersByYear = async (year) => {
    try {
      const response = await fetch(`http://localhost:8080/player/getByDraftYear/${year}`);
      if (response.ok) {
        const data = await response.json();
        data.sort((a, b) => a.draftPick - b.draftPick);
        setPlayers(data);
        setShowExplanation(false);
      } else {
        console.error('Error fetching players:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  // Función para manejar el cambio de año seleccionado
  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    fetchPlayersByYear(year);
  };

  // Función para dividir los jugadores en columnas según el rango de picks y ordenarlos por draftPick
  const getPlayersByPickRange = (start, end) => {
    return players
      .filter(player => player.draftPick >= start && player.draftPick <= end)
      .sort((a, b) => a.draftPick - b.draftPick); // Ordenar por draftPick de menor a mayor
  };

  // Función para manejar el scroll hacia abajo en el select de años
  const handleScroll = () => {
    if (selectRef.current) {
      selectRef.current.size = Math.min(8, years.length); // Mostrar hasta 10 opciones o menos si hay menos años
    }
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-8">
      {/* Columna 1: Imagen de draft y select de años */}
      <div className="col-span-1">
        <img src={NBADraft} alt="NBA Draft" className="w-full mb-8 -ml-6" />
        <select
          ref={selectRef}
          value={selectedYear}
          onChange={handleYearChange}
          onMouseOver={handleScroll}
          label="Select NBA Season"
          className="block w-full p-2 mb-6 text-sm border border-gray-300 rounded-lg h-96 focus:ring-blue-500 focus:border-blue-500 -ml-6"
        >
          {years.map((year) => (
            <option className="px-4 py-4 text-center text-sm font-bold uppercase" key={year} value={year}>
              Class of {year}
            </option>
          ))}
        </select>
      </div>

      {/* Columnas 2 a 5: División de picks */}
      <div className="col-span-4 grid grid-cols-4 gap-4">
        {[1, 16, 31, 46].map((startPick, index) => (
          <div key={index} className="col-span-1">
            <table className="-mt-6 w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-red-500 text-white">
                  <th className="w-80 py-2 text-center text-sm font-bold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="w-20 py-2 text-center text-sm font-bold uppercase tracking-wider">
                    Pick
                  </th>
                </tr>
              </thead>
              <tbody>
                {getPlayersByPickRange(startPick, startPick + 14).map(player => (
                  <tr key={player.player_id} className="border-b border-gray-200">
                    <td>
                      <Link to={`/player/${player.player_id}`} className="text-blue-500 hover:underline">
                        {player.name} {player.jerseyName}
                      </Link>
                    </td>
                    <td className="px-2 py-2 text-center">{player.draftPick}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraftList;
