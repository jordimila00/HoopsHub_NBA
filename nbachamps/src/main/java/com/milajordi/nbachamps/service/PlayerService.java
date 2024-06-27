package com.milajordi.nbachamps.service;

import com.milajordi.nbachamps.model.Players;

import java.util.List;
import java.util.Optional;

public interface PlayerService {
    Players addPlayer(Players players);

    List<Players> getAllPlayers();

    List<Players> getPlayersByDraftPick(Integer draftPick);

    List<Players> getPlayersByDraftYear(Integer draftYear);

    Optional<Players> getPlayersById(Integer player_id);
}
