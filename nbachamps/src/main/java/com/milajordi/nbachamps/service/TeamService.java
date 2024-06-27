package com.milajordi.nbachamps.service;

import com.milajordi.nbachamps.model.Teams;

import java.util.List;

public interface TeamService {
    Teams addTeam(Teams teams);

    List<Teams> getAllTeams();
}
