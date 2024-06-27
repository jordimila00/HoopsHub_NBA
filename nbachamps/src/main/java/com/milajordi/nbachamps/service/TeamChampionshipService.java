package com.milajordi.nbachamps.service;

import com.milajordi.nbachamps.model.TeamChampionship;

import java.util.List;


public interface TeamChampionshipService {

    public void saveTeamChampionship(TeamChampionship teamChampionship);

    List<TeamChampionship> getAllTeamChampionships();


}
