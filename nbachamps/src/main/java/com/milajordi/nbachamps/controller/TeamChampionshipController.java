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

    @GetMapping("/count/{team_id}")
    public ResponseEntity<Long> countByTeamId(@PathVariable Integer team_id) {
        long count = teamChampionshipService.countByTeamId(team_id);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/wins/count/{team_id}")
    public ResponseEntity<Long> countChampionshipWinsByTeamId(@PathVariable Integer team_id) {
        long count = teamChampionshipService.countChampionshipsWinsByTeamId(team_id);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/wins/years/{team_id}")
    public ResponseEntity<List<Integer>> findChampionshipYearsByTeamId(@PathVariable Integer team_id) {
        List<Integer> years = teamChampionshipService.findChampionshipYearsByTeamId(team_id);
        return ResponseEntity.ok(years);
    }
}
