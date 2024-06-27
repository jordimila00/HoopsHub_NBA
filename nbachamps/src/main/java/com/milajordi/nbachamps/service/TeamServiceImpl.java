package com.milajordi.nbachamps.service;

import com.milajordi.nbachamps.model.Conference;
import com.milajordi.nbachamps.model.Division;
import com.milajordi.nbachamps.model.Players;
import com.milajordi.nbachamps.model.Teams;
import com.milajordi.nbachamps.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamServiceImpl implements TeamService{

    @Autowired
    private TeamRepository teamRepository;

    @Override
    public Teams addTeam(Teams teams) {
        // Validar la cantidad máxima de equipos por conferencia
        long countByConference = teamRepository.countByConference(teams.getConference());
        if (countByConference >= 15) {
            throw new IllegalArgumentException("La conferencia " + teams.getConference() + " ya tiene 15 equipos. No se pueden agregar más equipos.");
        }

        // Validar la cantidad máxima de equipos por división
        long countByDivision = teamRepository.countByDivision(teams.getDivision());
        if (countByDivision >= 5) {
            throw new IllegalArgumentException("La división " + teams.getDivision() + " ya tiene 5 equipos. No se pueden agregar más equipos.");
        }

        // Verificar las reglas adicionales de división y conferencia
        if (teams.getConference().equals(Conference.Eastern)) {
            // Verifica que la división sea una de las permitidas para la conferencia Eastern
            if (!(teams.getDivision() == Division.Atlantic ||
                    teams.getDivision() == Division.Central ||
                    teams.getDivision() == Division.Southeast)) {
                throw new IllegalArgumentException("Para la conferencia Eastern, la división debe ser Atlantic, Central o Southeast.");
            }
        } else if (teams.getConference().equals(Conference.Western)) {
            // Verifica que la división sea una de las permitidas para la conferencia Western
            if (!(teams.getDivision() == Division.Northwest ||
                    teams.getDivision() == Division.Pacific ||
                    teams.getDivision() == Division.Southwest)) {
                throw new IllegalArgumentException("Para la conferencia Western, la división debe ser Northwest, Pacific o Southwest.");
            }
        } else {
            throw new IllegalArgumentException("La conferencia debe ser Eastern o Western.");
        }

        return teamRepository.save(teams);
    }



    @Override
    public List<Teams> getAllTeams() {
        return teamRepository.findAll();
    }

    @Override
    public List<Teams> getTeamsByDivision(Division division) {
        return teamRepository.getTeamsByDivision(division);
    }

    @Override
    public List<Teams> getTeamsByConference(Conference conference) {
        return teamRepository.getTeamsByConference(conference);
    }

    @Override
    public Optional<Teams> getTeamsById(Integer team_id) {
        return teamRepository.findById(team_id);
    }
}
