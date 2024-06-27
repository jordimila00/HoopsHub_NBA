package com.milajordi.nbachamps.service;

import com.milajordi.nbachamps.model.TeamChampionshipPlayer;

import java.util.List;

public interface TeamChampionshipPlayerService {
    public void saveTeamChampionshipPlayer(TeamChampionshipPlayer teamChampionshipPlayer);

    List<TeamChampionshipPlayer> getAllTeamChampionshipPlayers();
}
