package com.milajordi.nbachamps.service;

import com.milajordi.nbachamps.model.Players;
import com.milajordi.nbachamps.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerServiceImpl implements PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Override
    public Players addPlayer(Players players) {
        Integer draftYear = players.getDraftYear();
        Integer draftPick = players.getDraftPick();
        Double height = players.getHeight();
        Integer weight = players.getWeight();

        // Validar draftPick si no es null y no es "undrafted"
        if (draftPick != null && draftPick != 0) {
            if (draftPick < 1 || draftPick > 60) {
                throw new IllegalArgumentException("El número de pick de draft debe estar entre 1 y 60.");
            }
        }

        // Validar draftYear si no es null y no es "undrafted"
        if (draftYear != null && draftYear != 0) {
            // Comprobar si ya existe un jugador con el mismo draftYear y draftPick
            Players existingPlayer = playerRepository.findByDraftYearAndDraftPick(draftYear, draftPick);
            if (existingPlayer != null && !existingPlayer.getPlayer_id().equals(players.getPlayer_id())) {
                throw new IllegalArgumentException("Ya existe un jugador con el pick de draft " + draftPick + " para el año " + draftYear);
            }
        }

        // Validar height
        if (height < 1.50 || height >= 2.30 || String.valueOf(height).split("\\.")[1].length() != 2) {
            throw new IllegalArgumentException("La altura no es un formato válido. Debe ser 1.xx o 2.xx");
        }

        // Validar weight
        if (weight < 60 || weight > 150) {
            throw new IllegalArgumentException("El peso no es válido. Debe estar entre 70 y 140 kg.");
        }

        return playerRepository.save(players);
    }

    @Override
    public List<Players> getAllPlayers() {
        return playerRepository.findAll();
    }

    @Override
    public List<Players> getPlayersByDraftPick(Integer draftPick) {
        return playerRepository.getPlayersByDraftPick(draftPick);
    }

    @Override
    public List<Players> getPlayersByDraftYear(Integer draftYear) {
        return playerRepository.getPlayersByDraftYear(draftYear);
    }

    @Override
    public Optional<Players> getPlayersById(Integer player_id) {
        return playerRepository.findById(player_id);
    }
}
