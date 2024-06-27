package com.milajordi.nbachamps.service;

import com.milajordi.nbachamps.model.TeamChampionship;

import java.util.List;


public interface TeamChampionshipService {

    void saveTeamChampionship(TeamChampionship teamChampionship);

    List<TeamChampionship> getAllTeamChampionships();

    long countByTeamId(Integer team_id);
    long countChampionshipsWinsByTeamId(Integer team_id);

    List<Integer> findChampionshipYearsByTeamId(Integer team_id);


}
