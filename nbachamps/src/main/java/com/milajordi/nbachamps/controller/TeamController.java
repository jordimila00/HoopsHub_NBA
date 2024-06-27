package com.milajordi.nbachamps.controller;


import com.milajordi.nbachamps.model.Teams;
import com.milajordi.nbachamps.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
