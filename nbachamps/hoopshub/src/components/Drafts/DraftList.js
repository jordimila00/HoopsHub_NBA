import React, { useState, useEffect } from 'react';
import './DraftList.css'; // Estilo CSS para el componente
import { Link } from 'react-router-dom';

const DraftList = () => {
  const [years, setYears] = useState([]); // Estado para almacenar los años disponibles
  const [selectedYear, setSelectedYear] = useState(null); // Estado para el año seleccionado
  const [players, setPlayers] = useState([]); // Estado para los jugadores filtrados por año

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
  const handleYearChange = async (year) => {
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

  return (
    <div className="draft-list-container">
      <div className="years-list">
        <h2>Years</h2>
        <ul>
  {years.map(year => (
    <li key={year} onClick={() => handleYearChange(year)} className={selectedYear === year ? 'selected' : ''}>
      {year}
    </li>
  ))}
</ul>
      </div>
      <div className="players-table">
        <h2>Players</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Pick</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
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
    </div>
  );
};

export default DraftList;
