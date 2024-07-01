package com.milajordi.nbachamps.service;

import com.milajordi.nbachamps.model.Players;
import com.milajordi.nbachamps.model.TeamChampionshipPlayer;
import com.milajordi.nbachamps.repository.PlayerRepository;
import com.milajordi.nbachamps.repository.TeamChampionshipPlayerRepository;
import com.milajordi.nbachamps.repository.TeamChampionshipRepository;
import com.milajordi.nbachamps.service.exception.DuplicatePlayerYearException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamChampionshipPlayerServiceImpl implements TeamChampionshipPlayerService {

    @Autowired
    private TeamChampionshipPlayerRepository teamChampionshipPlayerRepository;

    @Autowired
    private TeamChampionshipRepository teamChampionshipRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Override
    public void saveTeamChampionshipPlayer(TeamChampionshipPlayer teamChampionshipPlayer) {
        TeamChampionshipPlayer.TeamChampionshipPlayerId id = teamChampionshipPlayer.getId();
        Integer jerseyNumber = teamChampionshipPlayer.getJerseyNumber();

        // Verifying if exists player_id and year association
        if (teamChampionshipPlayerRepository.existsByPlayerIdAndYear(id.getPlayer_id(), id.getYear())) {
            throw new DuplicatePlayerYearException("El jugador " + id.getPlayer_id() + " ya está asociado al año " + id.getYear() + ".");
        // Verifying if team_id has taken part in year finals
        }else if (!teamChampionshipRepository.existsByTeamIdAndYear(id.getTeam_id(), id.getYear())) {
            throw new DuplicatePlayerYearException("El equipo "+id.getTeam_id()+" no ha participado en las finales del "+id.getYear());
        }

        // Verifying if jerseyNumber is in valid range
        if (jerseyNumber < 0 || jerseyNumber > 99) {
            throw new IllegalArgumentException("El número de camiseta debe estar entre 0 y 99.");
        }

        // Verifying if jerseyNumber exists with team_id and year association
        if (teamChampionshipPlayerRepository.existsByTeamIdYearAndJerseyNumber(id.getTeam_id(), id.getYear(), jerseyNumber)) {
            throw new DuplicatePlayerYearException("El número de camiseta " + jerseyNumber + " ya está en uso por el equipo " + id.getTeam_id() + " en el año " + id.getYear() + ".");
        }

        // Get Player by player_id
        Players player = playerRepository.findById(id.getPlayer_id()).orElseThrow(() ->
                // Verifying player_id exists
                new IllegalArgumentException("El jugador con ID " + id.getPlayer_id() + " no existe.")
        );

        // Verifying that the year he won a championship is not previous to his draft year
        if (id.getYear() < player.getDraftYear()) {
            throw new IllegalArgumentException("El jugador " + player.getName() + " no puede ser añadido a un año inferior a su año de draft " + player.getDraftYear() + ".");
        }

        // Saving Player
        teamChampionshipPlayerRepository.save(teamChampionshipPlayer);
    }

    @Override
    public List<TeamChampionshipPlayer> getAllTeamChampionshipPlayers() {
        return teamChampionshipPlayerRepository.findAll();
    }

    @Override
    public List<TeamChampionshipPlayer> getTeamChampionshipPlayersByYear(Integer year) {
        return teamChampionshipPlayerRepository.findByIdYear(year);
    }
}

