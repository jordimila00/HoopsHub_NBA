package com.milajordi.nbachamps.service;

import com.milajordi.nbachamps.model.Conference;
import com.milajordi.nbachamps.model.Division;
import com.milajordi.nbachamps.model.Players;
import com.milajordi.nbachamps.model.Teams;

import java.util.List;
import java.util.Optional;

public interface TeamService {
    Teams addTeam(Teams teams);

    List<Teams> getAllTeams();
    List<Teams> getTeamsByDivision(Division division);

    List<Teams> getTeamsByConference(Conference conference);

    Optional<Teams> getTeamsById(Integer team_id);
}
