package com.milajordi.nbachamps.service;

import com.milajordi.nbachamps.model.Teams;
import com.milajordi.nbachamps.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamServiceImpl implements TeamService{

    @Autowired
    private TeamRepository teamRepository;

    @Override
    public Teams addTeam(Teams teams) {
        return teamRepository.save(teams);
    }

    @Override
    public List<Teams> getAllTeams() {
        return teamRepository.findAll();
    }
}
