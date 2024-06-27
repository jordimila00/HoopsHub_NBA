package com.milajordi.nbachamps.controller;


import com.milajordi.nbachamps.model.Conference;
import com.milajordi.nbachamps.model.Division;
import com.milajordi.nbachamps.model.Players;
import com.milajordi.nbachamps.model.Teams;
import com.milajordi.nbachamps.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/team")
@CrossOrigin
public class TeamController {

    @Autowired
    private TeamService teamService;

    @PostMapping("/add")
    public ResponseEntity<Teams> addTeam(@RequestBody Teams teams){
        Teams createdTeam = teamService.addTeam(teams);
        return ResponseEntity.ok(createdTeam);
    }

    @GetMapping("/getAll")
    public List<Teams> getAllTeams(){
        return teamService.getAllTeams();
    }


    @GetMapping("/getByDivision/{division}")
    public List<Teams> getAllTeamsByDivision(@PathVariable Division division) {
        return teamService.getTeamsByDivision(division);
    }

    @GetMapping("/getByConference/{conference}")
    public List<Teams> getAllTeamsByConference(@PathVariable Conference conference) {
        return teamService.getTeamsByConference(conference);
    }

    @GetMapping("/getById/{team_id}")
    public Optional<Teams> getTeamsById(@PathVariable Integer team_id) {
        return teamService.getTeamsById(team_id);
    }


}
