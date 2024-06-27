package com.milajordi.nbachamps.service;

import com.milajordi.nbachamps.model.Players;
import com.milajordi.nbachamps.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerServiceImpl implements PlayerService{

    @Autowired
    private PlayerRepository playerRepository;
    @Override
    public Players addPlayer(Players players) {
        Integer draftYear = players.getDraftYear();
        Integer draftPick= players.getDraftPick();
        Players existingPlayer = playerRepository.findByDraftYearAndDraftPick(draftYear, draftPick);
        if (existingPlayer != null && !existingPlayer.getPlayer_id().equals(players.getPlayer_id())) {
            throw new IllegalArgumentException("Ya existe un jugador con el pick de draft " + draftPick + " para el año " + draftYear);
        } else if (draftPick < 1 || draftPick > 60) {
            throw new IllegalArgumentException("El numero de pick de draft debe estar entre 1 y 60.");
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


}
