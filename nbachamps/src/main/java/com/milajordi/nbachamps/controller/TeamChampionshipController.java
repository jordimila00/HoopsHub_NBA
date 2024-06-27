package com.milajordi.nbachamps.controller;

import com.milajordi.nbachamps.model.TeamChampionship;
import com.milajordi.nbachamps.service.TeamChampionshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teamchampionship")
@CrossOrigin
public class TeamChampionshipController {

    @Autowired
    private TeamChampionshipService teamChampionshipService;


    @PostMapping("/add")
    public ResponseEntity<String> addTeamChampionship(@RequestBody TeamChampionship teamChampionship) {
        try {
            teamChampionshipService.saveTeamChampionship(teamChampionship);
            return ResponseEntity.ok("TeamChampionship created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/getAll")
    public List<TeamChampionship> getAllTeamChampionship(){
        return teamChampionshipService.getAllTeamChampionships();
    }
}
