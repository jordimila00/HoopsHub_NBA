package com.milajordi.nbachamps.service;

import com.milajordi.nbachamps.model.TeamChampionship;
import com.milajordi.nbachamps.repository.TeamChampionshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamChampionshipServiceImpl implements TeamChampionshipService {

    @Autowired
    private TeamChampionshipRepository teamChampionshipRepository;

    @Override
    public void saveTeamChampionship(TeamChampionship teamChampionship) {
        // Validar si ya hay 2 registros para el mismo año en la base de datos
        List<TeamChampionship> existingEntries = teamChampionshipRepository.findByIdYear(teamChampionship.getId().getYear());

        if (existingEntries.size() >= 2) {
            throw new IllegalArgumentException("Ya hay dos equipos registrados para el año " + teamChampionship.getId().getYear());
        }

        // Validar el booleano isChampion
        if (teamChampionship.getIsChampion()) {
            // Si es campeón, verificar que no haya otro equipo campeón para el mismo año
            boolean hasChampion = existingEntries.stream()
                    .anyMatch(tc -> tc.getIsChampion() && !tc.getId().equals(teamChampionship.getId()));

            if (hasChampion) {
                throw new IllegalArgumentException("Ya hay otro equipo campeón registrado para el año " + teamChampionship.getId().getYear());
            }

            // Validar que games sea 4 si es campeón
            if (teamChampionship.getGames() != 4) {
                throw new IllegalArgumentException("El equipo campeón debe tener exactamente 4 juegos ganados.");
            }
        } else {
            // Validar que games sea 0, 1, 2, o 3 si no es campeón
            if (teamChampionship.getGames() < 0 || teamChampionship.getGames() > 3) {
                throw new IllegalArgumentException("El equipo no campeón debe tener entre 0 y 3 juegos ganados.");
            }
        }

        // Guardar el registro
        teamChampionshipRepository.save(teamChampionship);
    }
    @Override
    public List<TeamChampionship> getAllTeamChampionships() {
        return teamChampionshipRepository.findAll();
    }

    @Override
    public long countByTeamId(Integer team_id) {
        return teamChampionshipRepository.countByTeamId(team_id);
    }

    @Override
    public long countChampionshipsWinsByTeamId(Integer team_id) {
        return teamChampionshipRepository.countChampionshipWinsByTeamId(team_id);
    }

    @Override
    public List<Integer> findChampionshipYearsByTeamId(Integer team_id) {
        return teamChampionshipRepository.findChampionshipYearsByTeamId(team_id);
    }

    @Override
    public List<TeamChampionship> getTeamChampionshipsByYear(Integer year) {
        return teamChampionshipRepository.findByChampionshipsYear(year);
    }
}
