package com.milajordi.nbachamps.controller;


import com.milajordi.nbachamps.model.TeamChampionshipPlayer;
import com.milajordi.nbachamps.service.TeamChampionshipPlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teamchampionshipplayer")
@CrossOrigin
public class TeamChampionshipPlayerController {

    @Autowired
    private TeamChampionshipPlayerService teamChampionshipPlayerService;


    @PostMapping("/add")
    public ResponseEntity<String> addTeamChampionshipPlayer(@RequestBody TeamChampionshipPlayer teamChampionshipPlayer) {
        try {
            teamChampionshipPlayerService.saveTeamChampionshipPlayer(teamChampionshipPlayer);
            return ResponseEntity.ok("TeamChampionshipPlayer created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/getAll")
    public List<TeamChampionshipPlayer> getAllTeamChampionshipPlayer(){
        return teamChampionshipPlayerService.getAllTeamChampionshipPlayers();
    }

    @GetMapping("/getByYear/{year}")
    public ResponseEntity<List<TeamChampionshipPlayer>> getTeamChampionshipPlayersByYear(@PathVariable Integer year) {
        List<TeamChampionshipPlayer> players = teamChampionshipPlayerService.getTeamChampionshipPlayersByYear(year);
        return ResponseEntity.ok(players);
    }
}
