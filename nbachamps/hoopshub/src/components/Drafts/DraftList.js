import React, { useState, useEffect, useRef } from 'react';
import './DraftList.css'; // Estilo CSS para el componente
import { Link } from 'react-router-dom';
import NBADraft from '../../assets/images/The_NBA_Draft.png';

const DraftList = () => {
  const [years, setYears] = useState([]); // Estado para almacenar los años disponibles
  const [selectedYear, setSelectedYear] = useState(''); // Estado para el año seleccionado ('' indica ninguno seleccionado)
  const [players, setPlayers] = useState([]); // Estado para los jugadores filtrados por año
  const selectRef = useRef(null); // Referencia al elemento select

  // Obtener la lista de años disponibles al montar el componente
  useEffect(() => {
    fetch('http://localhost:8080/championship/getAll')
      .then(response => response.json())
      .then(data => {
        const yearsArray = data.map(item => item.year); // Extraer solo los años
        setYears(yearsArray);
      })
      .catch(error => console.error('Error fetching years:', error));
  }, []);

  // Función para manejar el cambio de año seleccionado
  const handleYearChange = async (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    try {
      const response = await fetch(`http://localhost:8080/player/getByDraftYear/${year}`);
      if (response.ok) {
        const data = await response.json();
        setPlayers(data);
      } else {
        console.error('Error fetching players:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  // Función para dividir los jugadores en columnas según el rango de picks
  const getPlayersByPickRange = (start, end) => {
    return players.filter(player => player.draftPick >= start && player.draftPick <= end);
  };

  // Función para manejar el scroll hacia abajo en el select de años
  const handleScroll = () => {
    if (selectRef.current) {
      selectRef.current.size = Math.min(8, years.length); // Mostrar hasta 10 opciones o menos si hay menos años
    }
  };

  return (
    <div className="draft-list-container">
      <div className="draft-year-selection">
        <img src={NBADraft} alt="NBA Draft"/>
        <select
          ref={selectRef}
          value={selectedYear}
          onChange={handleYearChange}
          onDoubleClick={() => { selectRef.current.size = 1; }}
          onBlur={() => { selectRef.current.size = 1; }}
          onMouseOver={handleScroll}
          className="custom-select"
        >
          <option value="">Select One</option>
          {years.map((year, index) => (
            <option key={year} value={year}>
              Class of {year}
            </option>
          ))}
        </select>
      </div>
      <div className="draft-players-columns">
        {selectedYear && (
          <>
            {[1, 16, 31, 46].map((startPick, index) => (
              <div key={index} className="draft-players-column">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Pick</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPlayersByPickRange(startPick, startPick + 14).map(player => (
                      <tr key={player.player_id}>
                        <td>
                          <Link to={`/player/${player.player_id}`}>
                            {player.name} {player.jerseyName}
                          </Link>
                        </td>
                        <td>{player.draftPick}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default DraftList;
